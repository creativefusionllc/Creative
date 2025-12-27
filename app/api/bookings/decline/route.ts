import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { bookingId, reason } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 })
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, user_id, email, name, budget_range, status")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      console.error("[v0] Booking not found:", bookingError)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    if (booking.status !== "pending" && booking.status !== "confirmed") {
      return NextResponse.json({ error: "Can only decline pending or confirmed bookings" }, { status: 400 })
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        project_status: "cancelled",
        cancellation_reason: reason || "Declined by admin",
      })
      .eq("id", bookingId)

    if (updateError) {
      console.error("[v0] Booking decline error:", updateError)
      return NextResponse.json({ error: "Failed to decline booking" }, { status: 500 })
    }

    // If confirmed booking with payment, process refund
    if (booking.status === "confirmed") {
      const budgetAmount = booking.budget_range
        ? Number.parseFloat(booking.budget_range.replace(/[^\d.-]/g, "")) || 5000
        : 5000

      const { data: client } = await supabase
        .from("clients")
        .select("wallet_balance")
        .eq("user_id", booking.user_id)
        .single()

      if (client) {
        const refundedBalance = (client.wallet_balance || 0) + budgetAmount

        await supabase.from("clients").update({ wallet_balance: refundedBalance }).eq("user_id", booking.user_id)

        await supabase.from("wallet_transactions").insert({
          client_id: booking.user_id,
          type: "credit",
          amount: budgetAmount,
          balance_after: refundedBalance,
          description: `Refund for declined booking #${booking.id}`,
          payment_method: "refund",
          verification_status: "verified",
        })
      }
    }

    console.log("[v0] Booking declined successfully:", bookingId)

    return NextResponse.json({
      success: true,
      booking: {
        id: bookingId,
        status: "cancelled",
      },
      message: `Booking declined. ${booking.status === "confirmed" ? "Refund processed." : ""}`,
    })
  } catch (error) {
    console.error("[v0] Booking decline error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to decline booking" },
      { status: 500 },
    )
  }
}
