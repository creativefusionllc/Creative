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
      .select("id, email, name, budget_range, user_id")
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

    const defaultTaxRate = cmsSettings?.settings?.tax_rate || 0.05
    const budgetAmount = booking.budget_range
      ? Number.parseFloat(booking.budget_range.replace(/[^\d.-]/g, "")) || 5000
      : 5000

    const invoiceNumber = `INV-${Date.now().toString().slice(-8).toUpperCase()}`

    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
        client_id: booking.user_id,
        booking_id: bookingId,
        amount: budgetAmount,
        tax_amount: Math.round(budgetAmount * defaultTaxRate * 100) / 100,
        total_amount: Math.round(budgetAmount * (1 + defaultTaxRate) * 100) / 100,
        status: "sent",
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      })
      .select()
      .single()

    if (invoiceError) {
      console.error("[v0] Invoice creation RLS error:", invoiceError)
      return NextResponse.json({ error: `Invoice creation failed: ${invoiceError.message}` }, { status: 500 })
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "confirmed", project_status: "confirmed" })
      .eq("id", bookingId)

    if (updateError) {
      console.error("[v0] Booking status update error:", updateError)
    }

    console.log("[v0] Booking confirmed successfully - Invoice:", invoiceNumber)

    return NextResponse.json({
      success: true,
      booking: {
        id: bookingId,
        status: "confirmed",
      },
      invoice: {
        id: invoiceData?.id,
        invoice_number: invoiceNumber,
        amount: budgetAmount,
        tax_amount: Math.round(budgetAmount * defaultTaxRate * 100) / 100,
        total_amount: Math.round(budgetAmount * (1 + defaultTaxRate) * 100) / 100,
      },
      message: `Booking confirmed! Invoice ${invoiceNumber} created.`,
    })
  } catch (error) {
    console.error("[v0] Booking confirmation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to confirm booking" },
      { status: 500 },
    )
  }
}
