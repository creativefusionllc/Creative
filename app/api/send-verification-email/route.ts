import { NextResponse } from "next/server"
import type { Request } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, name, verificationUrl } = await request.json()

    if (!email || !verificationUrl) {
      console.error("[v0] Missing required fields: email or verificationUrl")
      return NextResponse.json({ error: "Email and verification URL are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error("[v0] Invalid email format:", email)
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("[v0] RESEND_API_KEY not configured in environment variables")
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY to environment variables." },
        { status: 500 },
      )
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - Creative Fusion</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background-color: #1f2937; padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #c4d600; font-size: 32px; font-weight: 700;">Creative Fusion</h1>
                      <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Email Verification</p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                      <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Hi ${name || "there"},
                      </p>
                      <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Thank you for registering with Creative Fusion! Please verify your email address to complete your registration.
                      </p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${verificationUrl}" style="display: inline-block; background-color: #c4d600; color: #1f2937; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                              Verify Email Address
                            </a>
                          </td>
                        </tr>
                      </table>

                      <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                        <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                          <strong>What happens next:</strong>
                        </p>
                        <p style="margin: 10px 0 0; color: #92400e; font-size: 14px;">
                          After you verify your email, our admin team will review your account. You'll receive another email once your account is approved.
                        </p>
                      </div>

                      <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        <strong>This link expires in 24 hours.</strong> If you didn't create this account, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="background-color: #1f2937; padding: 30px 40px; text-align: center;">
                      <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                        © 2025 Creative Fusion. All rights reserved.
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 12px;">
                        Questions? Contact us at support@creativefusion.llc
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    console.log("[v0] Sending verification email to:", email)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Creative Fusion <noreply@resend.dev>",
        to: email,
        subject: "Verify Your Creative Fusion Account",
        html: emailHtml,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Resend API error response:", {
        status: response.status,
        error: data.message || data.error,
        details: data,
      })
      return NextResponse.json(
        { error: "Failed to send verification email", details: data.message || data.error },
        { status: response.status },
      )
    }

    console.log("[v0] Verification email sent successfully. Resend ID:", data.id)

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
      email,
      resendId: data.id,
    })
  } catch (error) {
    console.error("[v0] Verification email exception:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send verification email" },
      { status: 500 },
    )
  }
}
