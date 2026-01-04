import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { capturePayPalOrder } from "@/lib/paypal/paypal-server"

export async function POST(request: Request) {
  try {
    const { orderId, clientId, amount } = await request.json()

    if (!orderId || !clientId || !amount) {
      return Response.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Capture the PayPal order
    const captureResult = await capturePayPalOrder(orderId)

    console.log("[v0] PayPal order captured:", captureResult)

    const capturedAmount = Number.parseFloat(captureResult.purchase_units[0].amount.value) || amount

    const { data: currentClient } = await supabase.from("clients").select("wallet_balance").eq("id", clientId).single()

    if (!currentClient) {
      return Response.json({ error: "Client not found" }, { status: 404 })
    }

    const currentBalance = typeof currentClient.wallet_balance === "number" ? currentClient.wallet_balance : 0
    const updatedBalance = currentBalance + capturedAmount

    const { error: updateError } = await supabase
      .from("clients")
      .update({ wallet_balance: updatedBalance })
      .eq("id", clientId)

    if (updateError) {
      console.error("[v0] Failed to update wallet balance:", updateError)
      throw new Error("Failed to update wallet balance")
    }

    // Record transaction
    const { error: transactionError } = await supabase.from("wallet_transactions").insert({
      client_id: clientId,
      type: "credit",
      amount: capturedAmount,
      balance_after: updatedBalance,
      description: "Wallet top-up via PayPal",
      payment_method: "paypal",
      verification_status: "verified",
    })

    if (transactionError) {
      console.error("[v0] Failed to record transaction:", transactionError)
      throw new Error("Payment captured but transaction record failed")
    }

    return Response.json({
      success: true,
      message: "Payment captured successfully",
      newBalance: updatedBalance,
    })
  } catch (error: any) {
    console.error("[v0] PayPal capture error:", error)
    return Response.json({ error: error.message || "Failed to capture PayPal order" }, { status: 500 })
  }
}
