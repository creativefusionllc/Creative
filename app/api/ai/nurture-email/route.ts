import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { lead, campaignType, emailNumber } = await req.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Create a professional nurturing email for this lead:

Lead: ${lead.name}
Company: ${lead.company}
Interest: ${lead.interest}
Campaign Type: ${campaignType}
Email ${emailNumber} in sequence

Write a compelling email that:
1. Addresses their specific interests
2. Provides value (tips, insights, case studies)
3. Has a clear call-to-action
4. Feels personal and helpful (not salesy)
5. Is concise and scannable

Format as JSON with: subject, body, cta`,
    })

    const email = JSON.parse(text)

    return NextResponse.json({
      success: true,
      email,
    })
  } catch (error) {
    console.error("[v0] Email generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate email" }, { status: 500 })
  }
}
