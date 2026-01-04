import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { token } = await request.json()

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 })
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()

    // Score threshold: 0.0 is bot, 1.0 is human. Use 0.5 as default
    if (data.success && data.score > 0.5) {
      return NextResponse.json({ verified: true, score: data.score })
    }

    return NextResponse.json({ verified: false, score: data.score }, { status: 403 })
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
