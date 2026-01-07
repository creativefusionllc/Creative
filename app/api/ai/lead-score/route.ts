import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { lead } = await req.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Analyze this lead and provide a score from 0-100 and key insights:
      
Lead Information:
- Company: ${lead.company}
- Contact: ${lead.contact}
- Email: ${lead.email}
- Industry: ${lead.industry || "Unknown"}
- Budget: ${lead.budget || "Not specified"}
- Timeline: ${lead.timeline || "Not specified"}
- Engagement: ${lead.engagement || "Low"}
- Source: ${lead.source || "Unknown"}

Provide a JSON response with:
1. score (0-100)
2. status (hot/warm/cold)
3. reasons (array of key factors)
4. nextSteps (array of recommended actions)
5. potentialValue (estimated deal value)`,
    })

    const analysis = JSON.parse(text)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("[v0] Lead scoring error:", error)
    return NextResponse.json({ success: false, error: "Failed to score lead" }, { status: 500 })
  }
}
