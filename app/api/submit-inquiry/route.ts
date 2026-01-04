import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    })

    const { full_name, email, phone, company, service_id, sub_service_id } = body

    const verificationCode = Math.random().toString().slice(2, 8)

    // Save inquiry to leads table
    const { error: leadsError } = await supabase.from("leads").insert([
      {
        first_name: full_name?.split(" ")[0] || "",
        last_name: full_name?.split(" ").slice(1).join(" ") || "",
        email,
        phone,
        company: company || null,
        service_interest: [service_id, sub_service_id].filter(Boolean),
        status: "new",
        priority: "medium",
        source: "inquiry_form",
        lead_score: 60,
        verification_code: verificationCode,
        created_at: new Date().toISOString(),
      },
    ])

    if (leadsError) {
      console.error("Supabase error:", leadsError)
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 400 })
    }

    const twilioResponse = await fetch(
      "https://api.twilio.com/2010-04-01/Accounts/" + process.env.TWILIO_ACCOUNT_SID + "/Messages.json",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.TWILIO_ACCOUNT_SID + ":" + process.env.TWILIO_AUTH_TOKEN).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: "whatsapp:" + process.env.TWILIO_PHONE_NUMBER!,
          To: "whatsapp:" + phone,
          Body: `Your verification code is: ${verificationCode}`,
        }).toString(),
      },
    )

    const twilioResult = await twilioResponse.json()
    const messageId = twilioResult.sid

    return NextResponse.json({
      success: true,
      leadNumber: `INQ${Date.now().toString(36).toUpperCase()}`,
      verificationCode: verificationCode,
      messageId: messageId,
    })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
