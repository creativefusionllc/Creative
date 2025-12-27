import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { booking_id, payment_status, payment_amount } = body

    if (payment_status === "completed" && booking_id) {
      const supabase = await createClient()

      // Update booking status to confirmed
      await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking_id)

      // Create wallet transaction record
      const { data: booking } = await supabase.from("bookings").select("user_id, name").eq("id", booking_id).single()

      if (booking?.user_id) {
        const { data: client } = await supabase
          .from("clients")
          .select("id, wallet_balance")
          .eq("user_id", booking.user_id)
          .single()

        if (client) {
          const newBalance = (client.wallet_balance || 0) + payment_amount

          await supabase.from("wallet_transactions").insert({
            client_id: client.id,
            amount: payment_amount,
            type: "credit",
            description: `Payment received for booking`,
            balance_after: newBalance,
            reference_id: booking_id,
          })

          await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", client.id)
        }
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "Invalid payment status" })
  } catch (error) {
    console.error("[v0] Payment webhook error:", error)
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 })
  }
}
