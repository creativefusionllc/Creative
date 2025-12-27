import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"
import { createClient } from "@/lib/supabase/server"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error: any) {
    console.error("[v0] Webhook error:", error.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as any
      const clientId = paymentIntent.metadata?.clientId
      const amount = paymentIntent.amount / 100 // Convert from cents

      if (clientId && amount) {
        // Get current wallet balance
        const { data: client } = await supabase.from("clients").select("wallet_balance").eq("id", clientId).single()

        const newBalance = (client?.wallet_balance || 0) + amount

        // Update wallet balance
        await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", clientId)

        // Create transaction record
        await supabase.from("wallet_transactions").insert({
          client_id: clientId,
          type: "credit",
          amount,
          description: "Wallet top-up via credit card",
          payment_method: "credit_card",
          verification_status: "verified",
          balance_after: newBalance,
          reference_id: paymentIntent.id,
        })

        console.log("[v0] Payment successful - Wallet updated for client", clientId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
