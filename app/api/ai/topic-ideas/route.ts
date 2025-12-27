import { generateObject } from "ai"
import { z } from "zod"

const topicIdeasSchema = z.object({
  mainTopic: z.string(),
  contentIdeas: z
    .array(
      z.object({
        title: z.string().describe("Compelling, SEO-optimized headline"),
        type: z.enum(["blog", "guide", "listicle", "how-to", "comparison", "case-study", "infographic", "video"]),
        targetKeyword: z.string(),
        estimatedWordCount: z.number(),
        difficulty: z.enum(["easy", "medium", "hard"]),
        outline: z.array(z.string()).describe("5-7 main sections/headings"),
        hook: z.string().describe("Compelling opening hook or angle"),
        cta: z.string().describe("Suggested call to action"),
      }),
    )
    .describe("10 unique content ideas"),
  trendingAngles: z.array(z.string()).describe("5 trending angles or news hooks for this topic"),
  competitorGaps: z.array(z.string()).describe("5 content gaps competitors might be missing"),
})

export async function POST(req: Request) {
  const { topic, industry, targetAudience } = await req.json()

  if (!topic) {
    return Response.json({ error: "Topic is required" }, { status: 400 })
  }

  const prompt = `You are a content strategist for a ${industry || "digital marketing"} company. Generate content ideas for:

TOPIC: ${topic}
INDUSTRY: ${industry || "General"}
TARGET AUDIENCE: ${targetAudience || "Business professionals"}

Provide:
1. 10 unique, compelling content ideas with SEO-optimized titles, content type, target keyword, word count, difficulty, outline, hook, and CTA
2. 5 trending angles or news hooks relevant to this topic
3. 5 content gaps that competitors might be missing

Focus on creating genuinely useful, actionable content that would rank well and convert readers.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: topicIdeasSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Topic research error:", error)
    return Response.json({ error: "Failed to generate topic ideas" }, { status: 500 })
  }
}
