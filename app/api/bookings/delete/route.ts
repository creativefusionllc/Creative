import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 })
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, status, user_id")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      console.error("[v0] Booking not found:", bookingError)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Delete related invoices first
    await supabase.from("invoices").delete().eq("booking_id", bookingId)

    // Delete booking
    const { error: deleteError } = await supabase.from("bookings").delete().eq("id", bookingId)

    if (deleteError) {
      console.error("[v0] Booking delete error:", deleteError)
      return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
    }

    console.log("[v0] Booking deleted successfully:", bookingId)

    return NextResponse.json({
      success: true,
      message: "Booking deleted permanently",
    })
  } catch (error) {
    console.error("[v0] Booking delete error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete booking" },
      { status: 500 },
    )
  }
}
