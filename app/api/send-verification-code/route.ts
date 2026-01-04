import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    const cleanedPhone = phone.replace(/[^\d+]/g, "") // Remove all non-digit and non-plus characters
    const e164Phone = cleanedPhone.startsWith("+") ? cleanedPhone : "+" + cleanedPhone

    console.log("[v0] Sending SMS to:", e164Phone)

    const code = Math.random().toString().slice(2, 8)

    // Send SMS via Twilio
    const response = await fetch(
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
          From: process.env.TWILIO_PHONE_NUMBER!,
          To: e164Phone, // Use properly formatted E.164 phone number
          Body: `Your verification code is: ${code}. Valid for 10 minutes.`,
        }).toString(),
      },
    )

    console.log("[v0] Twilio response status:", response.status)

    if (response.ok) {
      return NextResponse.json({ code, success: true })
    } else {
      const errorBody = await response.text()
      console.error("[v0] Twilio error:", errorBody)
      return NextResponse.json({ error: "Failed to send SMS", details: errorBody }, { status: 500 })
    }
  } catch (error) {
    console.error("SMS error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
