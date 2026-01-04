import { type NextRequest, NextResponse } from "next/server"
import { sendVerificationCode } from "@/lib/sms/twilio-service"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json()

    if (!phoneNumber || !code) {
      return NextResponse.json({ error: "Phone number and code required" }, { status: 400 })
    }

    const success = await sendVerificationCode(phoneNumber, code)

    if (success) {
      return NextResponse.json({ success: true, message: "Code sent successfully" })
    } else {
      return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] SMS API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
