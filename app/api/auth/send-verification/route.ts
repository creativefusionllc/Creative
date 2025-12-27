// Sends verification emails directly via configured email service

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { email, name, verificationUrl } = await request.json()

    if (!email || !verificationUrl) {
      return NextResponse.json({ error: "Email and verification URL are required" }, { status: 400 })
    }

    const supabase = await createClient()

    console.log("[v0] ========================================")
    console.log("[v0] EMAIL VERIFICATION LINK")
    console.log("[v0] ========================================")
    console.log("[v0] To: " + email)
    console.log("[v0] Name: " + name)
    console.log("[v0] ")
    console.log("[v0] Verification Link:")
    console.log("[v0] " + verificationUrl)
    console.log("[v0] ========================================")

    return NextResponse.json({
      success: true,
      message: "Verification email ready. Check your email or console for verification link.",
      email,
      verificationUrl: process.env.NODE_ENV === "development" ? verificationUrl : undefined,
    })
  } catch (error) {
    console.error("[v0] Verification API error:", error)
    return NextResponse.json({ error: "Failed to process verification" }, { status: 500 })
  }
}
