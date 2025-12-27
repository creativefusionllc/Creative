import { type NextRequest, NextResponse } from "next/server"
import { SEOAuditEngine } from "@/lib/seo/seo-audit-engine"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, clientId } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    console.log(`[v0] Starting SEO audit for ${url}`)

    // Perform real SEO audit
    const engine = new SEOAuditEngine()
    const results = await engine.performAudit(url)

    console.log(`[v0] SEO audit complete. Score: ${results.overallScore}/100`)

    // Save to database if clientId provided
    if (clientId) {
      await engine.saveAuditResults(url, clientId, results)
      console.log(`[v0] Audit results saved to database for client ${clientId}`)
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("[v0] SEO Audit API Error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Audit failed" }, { status: 500 })
  }
}
