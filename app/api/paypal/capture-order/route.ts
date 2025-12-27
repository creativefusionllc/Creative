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

    // Update wallet balance
    const newBalance = Number.parseInt(captureResult.purchase_units[0].amount.value) || amount

    const { data: currentClient } = await supabase.from("clients").select("wallet_balance").eq("id", clientId).single()

    const updatedBalance = (currentClient?.wallet_balance || 0) + newBalance

    await supabase.from("clients").update({ wallet_balance: updatedBalance }).eq("id", clientId)

    // Record transaction
    await supabase.from("wallet_transactions").insert({
      client_id: clientId,
      type: "credit",
      amount: newBalance,
      balance_after: updatedBalance,
      description: "Wallet top-up via PayPal",
      payment_method: "paypal",
      verification_status: "verified",
    })

    return Response.json({
      success: true,
      message: "Payment captured successfully",
      newBalance,
    })
  } catch (error: any) {
    console.error("[v0] PayPal capture error:", error)
    return Response.json({ error: error.message || "Failed to capture PayPal order" }, { status: 500 })
  }
}
