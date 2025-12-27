import { generateObject } from "ai"
import { z } from "zod"

const competitorAnalysisSchema = z.object({
  competitors: z.array(
    z.object({
      domain: z.string(),
      domainAuthority: z.number().min(0).max(100),
      estimatedTraffic: z.number(),
      topKeywords: z
        .array(
          z.object({
            keyword: z.string(),
            position: z.number(),
            volume: z.number(),
          }),
        )
        .describe("Top 5 ranking keywords"),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      contentStrategy: z.string(),
      backlinks: z.number(),
    }),
  ),
  keywordGap: z
    .array(
      z.object({
        keyword: z.string(),
        yourPosition: z.number().nullable(),
        competitorPositions: z.record(z.number()),
        volume: z.number(),
        opportunity: z.enum(["high", "medium", "low"]),
      }),
    )
    .describe("Keywords your competitors rank for but you don't"),
  contentGaps: z.array(z.string()).describe("Content topics competitors cover that you should target"),
  recommendations: z
    .array(
      z.object({
        action: z.string(),
        priority: z.enum(["high", "medium", "low"]),
        expectedImpact: z.string(),
      }),
    )
    .describe("Strategic recommendations"),
})

export async function POST(req: Request) {
  const { yourDomain, competitors, industry } = await req.json()

  if (!yourDomain || !competitors?.length) {
    return Response.json({ error: "Your domain and at least one competitor are required" }, { status: 400 })
  }

  const prompt = `You are a competitive intelligence analyst. Analyze these competitors:

YOUR DOMAIN: ${yourDomain}
COMPETITORS: ${competitors.join(", ")}
INDUSTRY: ${industry || "General"}

Provide a comprehensive competitive analysis including:
1. Detailed profile for each competitor: domain authority (0-100), estimated monthly traffic, top 5 ranking keywords, strengths, weaknesses, content strategy, backlink count
2. Keyword gap analysis: 10 keywords competitors rank for that present opportunities
3. 5 content gaps/topics competitors cover well
4. 5 strategic recommendations with priority and expected impact

Make metrics realistic for the industry. Domain authority should reflect real-world patterns.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: competitorAnalysisSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Competitor analysis error:", error)
    return Response.json({ error: "Failed to analyze competitors" }, { status: 500 })
  }
}
