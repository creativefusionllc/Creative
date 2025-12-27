import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { to, subject, html, text, type = "notification" } = await request.json()

    if (!to || !subject) {
      return NextResponse.json({ error: "Email and subject are required" }, { status: 400 })
    }

    console.log("[v0] Email sending:", {
      to,
      subject,
      type,
      timestamp: new Date().toISOString(),
    })

    // For now, log to console and return success
    // Real email sending will be configured based on your email provider

    return NextResponse.json({
      success: true,
      message: "Email notification logged. Configure email service for production.",
      email: to,
      subject,
    })
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
