import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { url, keywords } = await req.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Analyze this URL and provide SEO optimization recommendations:

URL: ${url}
Target Keywords: ${keywords.join(", ")}

Provide a JSON response with:
1. currentScore (0-100)
2. issues (array of problems found)
3. recommendations (array of specific actions)
4. metaTitle (optimized title)
5. metaDescription (optimized description)
6. keywords (recommended keywords to target)
7. contentSuggestions (array of content improvements)`,
    })

    const analysis = JSON.parse(text)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("[v0] SEO analysis error:", error)
    return NextResponse.json({ success: false, error: "Failed to analyze SEO" }, { status: 500 })
  }
}
