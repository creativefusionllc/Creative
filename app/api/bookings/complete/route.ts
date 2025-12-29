import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { bookingId, bookingAmount } = await request.json()

  try {
    const { data: booking } = await supabase
      .from("bookings")
      .select("user_id, budget_range")
      .eq("id", bookingId)
      .single()

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const { data: client } = await supabase
      .from("clients")
      .select("id, points_balance")
      .eq("user_id", booking.user_id)
      .single()

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    const amount = bookingAmount || 5000
    const pointsEarned = Math.floor(amount / 10)

    const newBalance = (client.points_balance || 0) + pointsEarned

    await supabase.from("clients").update({ points_balance: newBalance }).eq("id", client.id)

    await supabase.from("points_transactions").insert({
      client_id: client.id,
      type: "earned",
      points: pointsEarned,
      balance_after: newBalance,
      description: `Points earned from booking completion`,
      reference_type: "booking",
      reference_id: bookingId,
    })

    return NextResponse.json({
      success: true,
      pointsEarned,
      newBalance,
    })
  } catch (error) {
    console.error("[v0] Points error:", error)
    return NextResponse.json({ error: "Failed to award points" }, { status: 500 })
  }
}
