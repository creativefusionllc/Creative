import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { bookingId, bookingAmount } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 })
    }

    console.log("[v0] Starting booking completion for:", bookingId)

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("user_id, budget_range, name, email")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      console.error("[v0] Booking not found:", bookingError)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const { data: cmsSettings } = await supabase
      .from("website_settings")
      .select("settings")
      .eq("id", "booking_config")
      .single()

    const pointsPerAED = cmsSettings?.settings?.points_per_aed || 10
    const amount = bookingAmount || 5000
    const pointsEarned = Math.floor(amount / pointsPerAED)

    console.log(
      "[v0] Points calculation - Amount:",
      amount,
      "Points per AED:",
      pointsPerAED,
      "Points earned:",
      pointsEarned,
    )

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id, points_balance")
      .eq("user_id", booking.user_id)
      .single()

    if (clientError || !client) {
      console.error("[v0] Client not found:", clientError)
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    const newPointsBalance = (client.points_balance || 0) + pointsEarned

    const { error: updateError } = await supabase
      .from("clients")
      .update({ points_balance: newPointsBalance })
      .eq("id", client.id)

    if (updateError) {
      console.error("[v0] Error updating points balance:", updateError)
      return NextResponse.json({ error: "Failed to update points" }, { status: 500 })
    }

    const { error: transactionError } = await supabase.from("points_transactions").insert({
      client_id: client.id,
      type: "earned",
      points: pointsEarned,
      balance_after: newPointsBalance,
      description: `Points earned from booking completion (${booking.name})`,
      reference_id: bookingId,
    })

    if (transactionError) {
      console.error("[v0] Error recording points transaction:", transactionError)
    }

    const { error: statusError } = await supabase
      .from("bookings")
      .update({ status: "completed", project_status: "completed" })
      .eq("id", bookingId)

    if (statusError) {
      console.error("[v0] Error updating booking status:", statusError)
    }

    console.log("[v0] Booking completed successfully - Points awarded:", pointsEarned)

    return NextResponse.json({
      success: true,
      pointsEarned,
      newBalance: newPointsBalance,
      amount,
      message: `Booking completed! ${pointsEarned} points awarded to client.`,
    })
  } catch (error) {
    console.error("[v0] Booking completion error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to complete booking" },
      { status: 500 },
    )
  }
}
