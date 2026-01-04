import { NextResponse } from "next/server"
import LeadQualityScorer from "@/lib/lead-scoring/quality-scorer"

export async function POST(req: Request) {
  try {
    const inquiryData = await req.json()

    // Score the inquiry
    const { score, status } = LeadQualityScorer.scoreInquiry(inquiryData)

    return NextResponse.json({
      success: true,
      score,
      status,
      recommendation:
        status === "hot"
          ? "Contact within 1 hour - High-priority lead"
          : status === "warm"
            ? "Contact within 24 hours - Follow up"
            : "Add to nurture sequence - Build relationship",
    })
  } catch (error) {
    console.error("[v0] Lead scoring error:", error)
    return NextResponse.json({ success: false, error: "Failed to score lead" }, { status: 500 })
  }
}
