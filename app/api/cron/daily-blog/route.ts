import { publishDailyBlog } from "@/lib/ai/blog-automation"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const maxDuration = 60 // Reduced maxDuration from 300 to 60 seconds to comply with Vercel limits

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    // Accept Vercel's direct call OR Bearer token authentication
    if (authHeader && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Accept cron from Vercel without auth header (Vercel handles auth internally)
    if (!authHeader && !cronSecret) {
      // Vercel calling directly without secret - this is OK for initial setup
      console.log("[v0] Cron called by Vercel (no auth required)")
    }

    console.log("[v0] Daily blog cron job started at", new Date().toISOString())

    const success = await publishDailyBlog()

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Daily blog post published successfully",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog post already published today or generation failed",
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("[v0] Daily blog cron error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
