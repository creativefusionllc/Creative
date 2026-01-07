import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { platform, industry, clientName, recentPosts } = body

    try {
      const { text } = await generateText({
        model: "anthropic/claude-sonnet-4-20250514",
        prompt: `Generate 10 social media content ideas for ${platform || "all platforms"}.

Client: ${clientName || "Creative Agency Client"}
Industry: ${industry || "Creative/Marketing Agency"}
Location: Dubai, UAE

Recent Posts Context:
${recentPosts || "No recent posts available"}

Return ONLY a valid JSON object (no markdown) with:
{
  "ideas": [
    {
      "title": "[catchy title]",
      "description": "[2-3 sentence description]",
      "platform": "${platform || "instagram"}",
      "contentType": "image" | "video" | "carousel" | "reel" | "story",
      "hashtags": ["#tag1", "#tag2", "#tag3"],
      "bestTime": "[posting time for UAE]",
      "engagementTip": "[tip to boost engagement]"
    }
  ]
}

Focus on UAE market, current trends, and high engagement potential.`,
        maxTokens: 1500,
      })

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const ideas = JSON.parse(jsonMatch[0])
        return NextResponse.json(ideas)
      }
    } catch (aiError) {
      console.error("AI Content Ideas Error:", aiError)
    }

    // Fallback ideas
    return NextResponse.json({
      ideas: [
        {
          title: "Behind the Scenes",
          description: "Show your team at work creating amazing content for clients.",
          platform: platform || "instagram",
          contentType: "carousel",
          hashtags: ["#BehindTheScenes", "#DubaiAgency", "#CreativeTeam"],
          bestTime: "10AM UAE",
          engagementTip: "Ask followers to guess what project you're working on",
        },
        {
          title: "Client Success Story",
          description: "Share a recent project success with before/after results.",
          platform: platform || "instagram",
          contentType: "carousel",
          hashtags: ["#ClientSuccess", "#CaseStudy", "#Results"],
          bestTime: "6PM UAE",
          engagementTip: "Tag the client and use their industry hashtags",
        },
        {
          title: "Quick Tips Tuesday",
          description: "Share 3 quick marketing tips in an engaging reel format.",
          platform: platform || "instagram",
          contentType: "reel",
          hashtags: ["#MarketingTips", "#TuesdayTips", "#DigitalMarketing"],
          bestTime: "12PM UAE",
          engagementTip: "Ask viewers to share their own tips in comments",
        },
      ],
    })
  } catch (error) {
    console.error("Content Ideas Error:", error)
    return NextResponse.json({ ideas: [], error: "Failed to generate content ideas" })
  }
}
