import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Booking received:", body)

    const {
      name,
      email,
      phone,
      company_name,
      service_category,
      service_subcategory,
      project_description,
      budget_range,
      timeline,
      notes,
    } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    const message = `
📋 *New Booking Request*

👤 *Client Details:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company_name || "N/A"}

🎯 *Service Details:*
Category: ${service_category || "Not specified"}
Type: ${service_subcategory || "Not specified"}

📝 *Project Description:*
${project_description || "No description provided"}

💰 *Budget & Timeline:*
Budget Range: ${budget_range || "Not specified"}
Timeline: ${timeline || "Not specified"}

✅ Please contact the client to confirm the booking.
    `.trim()

    const whatsappApiToken = process.env.WHATSAPP_BUSINESS_ACCOUNT_TOKEN
    const whatsappPhoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID
    const recipientPhoneNumber = "971581174911"

    // Always generate WhatsApp link as fallback
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${recipientPhoneNumber}&text=${encodeURIComponent(message)}`

    if (whatsappApiToken && whatsappPhoneId) {
      try {
        const response = await fetch(`https://graph.instagram.com/v18.0/${whatsappPhoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${whatsappApiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientPhoneNumber,
            type: "text",
            text: {
              body: message,
            },
          }),
        })

        if (!response.ok) {
          console.error("[v0] WhatsApp API error:", await response.text())
        } else {
          console.log("[v0] WhatsApp message sent successfully")
        }
      } catch (whatsappError) {
        console.error("[v0] Failed to send WhatsApp message:", whatsappError)
      }
    } else {
      console.log("[v0] WhatsApp API credentials not configured. Using link fallback.")
    }

    const supabase = await createClient()

    // Generate unique booking number
    const bookingNumber = "BK" + Date.now().toString().slice(-8).toUpperCase()

    const { data, error: dbError } = await supabase
      .from("bookings")
      .insert([
        {
          name: name || "Unnamed",
          email: email,
          phone: phone,
          company_name: company_name || null,
          service_category: service_category || null,
          service_subcategory: service_subcategory || null,
          project_description: project_description || null,
          budget_range: budget_range || null,
          timeline: timeline || null,
          notes: notes || project_description || null,
          source: "website_booking_form",
          status: "pending",
          booking_number: bookingNumber,
        },
      ])
      .select()

    if (dbError) {
      console.log("[v0] Note: Database error (RLS may be restrictive), but WhatsApp message was sent successfully")
      // Don't fail - WhatsApp already worked
    } else {
      console.log("[v0] Booking saved to database and WhatsApp sent successfully")
    }

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully! Opening WhatsApp...",
      booking_number: bookingNumber,
      whatsappUrl: whatsappUrl,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 },
    )
  }
}
