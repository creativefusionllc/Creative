import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { topic, platform, tone } = await req.json()

    const platformGuidelines = {
      instagram: "engaging, visual, use emojis, 2-3 hashtags",
      facebook: "conversational, storytelling, encourage engagement",
      twitter: "concise (280 chars), witty, use 1-2 hashtags",
      linkedin: "professional, value-driven, industry insights",
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Create a ${platform} post about: ${topic}

Tone: ${tone}
Platform Guidelines: ${platformGuidelines[platform as keyof typeof platformGuidelines]}

Generate a JSON with:
1. content (the post text)
2. hashtags (array of relevant hashtags)
3. bestTime (recommended posting time)
4. predictedEngagement (high/medium/low)`,
    })

    const post = JSON.parse(text)

    return NextResponse.json({
      success: true,
      post,
    })
  } catch (error) {
    console.error("[v0] Social post generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate post" }, { status: 500 })
  }
}
