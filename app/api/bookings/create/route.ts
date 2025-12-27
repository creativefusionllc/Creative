import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { name, email, phone, service, budget_range, message } = await request.json()

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Name, email, and service are required" }, { status: 400 })
    }

    // Get client IP for RLS policy
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const user_agent = request.headers.get("user-agent") || "unknown"

    // Create booking without requiring authentication
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone: phone || null,
        service,
        budget_range: budget_range || "5000-10000",
        message: message || null,
        status: "pending",
        project_status: "pending",
        ip_address,
        user_agent,
        source: "website_form",
      })
      .select()
      .single()

    if (bookingError) {
      console.error("[v0] Booking creation error:", bookingError)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    console.log("[v0] Booking created successfully:", booking.id)

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          status: booking.status,
          email: booking.email,
        },
        message: "Booking created successfully! We'll contact you soon.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Booking creation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create booking" },
      { status: 500 },
    )
  }
}
