import { generateObject } from "ai"
import { z } from "zod"

const brandMonitorSchema = z.object({
  brandName: z.string(),
  overallSentiment: z.object({
    score: z.number().min(-100).max(100),
    label: z.enum(["very_negative", "negative", "neutral", "positive", "very_positive"]),
  }),
  mentions: z
    .array(
      z.object({
        source: z.string(),
        platform: z.enum(["twitter", "reddit", "news", "blog", "review", "forum"]),
        sentiment: z.enum(["negative", "neutral", "positive"]),
        snippet: z.string(),
        date: z.string(),
        reach: z.number().describe("Estimated audience reach"),
        engagement: z.number().describe("Likes, shares, comments combined"),
      }),
    )
    .describe("Recent brand mentions"),
  sentimentTrend: z
    .array(
      z.object({
        period: z.string(),
        positive: z.number(),
        neutral: z.number(),
        negative: z.number(),
      }),
    )
    .describe("Sentiment over last 7 days"),
  topTopics: z
    .array(
      z.object({
        topic: z.string(),
        count: z.number(),
        sentiment: z.enum(["negative", "neutral", "positive"]),
      }),
    )
    .describe("Most discussed topics"),
  alerts: z.array(
    z.object({
      type: z.enum(["spike", "crisis", "opportunity", "competitor"]),
      message: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    }),
  ),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  const { brandName, industry, competitors } = await req.json()

  if (!brandName) {
    return Response.json({ error: "Brand name is required" }, { status: 400 })
  }

  const prompt = `You are a brand monitoring specialist. Simulate brand monitoring data for:

BRAND: ${brandName}
INDUSTRY: ${industry || "Digital Marketing Agency"}
COMPETITORS: ${competitors?.join(", ") || "Not specified"}

Generate realistic brand monitoring data including:
1. Overall sentiment score (-100 to 100) and label
2. 10 recent brand mentions from various platforms with sentiment, snippets, dates, reach, and engagement
3. Sentiment trend for last 7 days
4. Top 5 discussed topics
5. Any alerts (spikes, crises, opportunities, competitor mentions)
6. 5 actionable recommendations

Make the data realistic for a ${industry || "digital marketing"} company. Include both positive and negative mentions for authenticity.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: brandMonitorSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Brand monitoring error:", error)
    return Response.json({ error: "Failed to monitor brand" }, { status: 500 })
  }
}
