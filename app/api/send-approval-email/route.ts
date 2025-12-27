import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Approved - Creative Fusion</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background-color: #1f2937; padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #c4d600; font-size: 32px; font-weight: 700;">Creative Fusion</h1>
                      <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Your Account is Approved!</p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">Account Approved Successfully</h2>
                      <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Hi ${name},
                      </p>
                      <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Great news! Your account has been approved by our admin team. You can now access all of Creative Fusion's services and features.
                      </p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://creativefusion.llc"}/login" style="display: inline-block; background-color: #c4d600; color: #1f2937; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                              Login to Your Account
                            </a>
                          </td>
                        </tr>
                      </table>

                      <div style="margin: 30px 0; padding: 20px; background-color: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                        <p style="margin: 0; color: #2e7d32; font-size: 14px; line-height: 1.6;">
                          <strong>What you can do now:</strong>
                        </p>
                        <ul style="margin: 10px 0; padding-left: 20px; color: #2e7d32; font-size: 14px;">
                          <li>Book services</li>
                          <li>View your dashboard</li>
                          <li>Manage projects</li>
                          <li>Access premium features</li>
                        </ul>
                      </div>
                      
                      <p style="margin: 20px 0 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Questions? Contact our support team at support@creativefusion.llc
                      </p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="background-color: #1f2937; padding: 30px 40px; text-align: center;">
                      <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                        © 2025 Creative Fusion. All rights reserved.
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 12px;">
                        If you have any questions, contact us at support@creativefusion.llc
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

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("[v0] RESEND_API_KEY not configured for approval email")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Creative Fusion <noreply@updates.creativefusion.llc>",
        to: [email],
        subject: "Your Account is Approved - Creative Fusion",
        html: emailHtml,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Resend API error for approval email:", data)
      return NextResponse.json({ error: "Failed to send email", details: data }, { status: response.status })
    }

    console.log("[v0] Approval email sent successfully to:", email)

    return NextResponse.json({
      success: true,
      message: "Approval email sent successfully",
      email,
    })
  } catch (error) {
    console.error("[v0] Error sending approval email:", error)
    return NextResponse.json({ error: "Failed to send approval email" }, { status: 500 })
  }
}
