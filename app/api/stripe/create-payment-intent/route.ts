import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"

export async function POST(request: NextRequest) {
  try {
    const { amount, clientId } = await request.json()

    if (!amount || amount <= 0) {
      console.error("[v0] Invalid amount:", amount)
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    if (!clientId) {
      console.error("[v0] Missing client ID")
      return NextResponse.json({ error: "Client ID required" }, { status: 400 })
    }

    const amountInCents = Math.round(amount * 100)
    console.log("[v0] Creating payment intent:", { amount, amountInCents, clientId })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "aed",
      metadata: {
        clientId: String(clientId),
        type: "wallet_topup",
        timestamp: new Date().toISOString(),
      },
      description: `Wallet top-up for client ${clientId}`,
      statement_descriptor: "CREATIVE FUSION WALLET",
    })

    console.log("[v0] Payment intent created successfully:", paymentIntent.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      success: true,
    })
  } catch (error: any) {
    console.error("[v0] Payment intent error:", error.message)
    console.error("[v0] Full error:", error)

    return NextResponse.json(
      {
        error: error.message || "Failed to create payment intent",
        code: error.code,
      },
      { status: 500 },
    )
  }
}
