import { generateObject } from "ai"
import { z } from "zod"

const keywordResearchSchema = z.object({
  seedKeyword: z.string(),
  relatedKeywords: z
    .array(
      z.object({
        keyword: z.string(),
        searchVolume: z.number().describe("Estimated monthly search volume"),
        difficulty: z.number().min(0).max(100).describe("Keyword difficulty score"),
        cpc: z.number().describe("Cost per click estimate in USD"),
        intent: z.enum(["informational", "transactional", "navigational", "commercial"]),
        trend: z.enum(["rising", "stable", "declining"]),
      }),
    )
    .describe("15-20 related keyword suggestions"),
  longTailKeywords: z
    .array(
      z.object({
        keyword: z.string(),
        searchVolume: z.number(),
        difficulty: z.number().min(0).max(100),
      }),
    )
    .describe("10 long-tail keyword variations"),
  questions: z.array(z.string()).describe("10 common questions people ask about this topic"),
  contentIdeas: z
    .array(
      z.object({
        title: z.string(),
        type: z.enum(["blog", "guide", "listicle", "how-to", "comparison", "review"]),
        targetKeyword: z.string(),
      }),
    )
    .describe("5 content ideas based on these keywords"),
})

export async function POST(req: Request) {
  const { keyword, industry, location } = await req.json()

  if (!keyword) {
    return Response.json({ error: "Keyword is required" }, { status: 400 })
  }

  const prompt = `You are an expert SEO analyst. Perform comprehensive keyword research for:

SEED KEYWORD: ${keyword}
INDUSTRY: ${industry || "General"}
TARGET LOCATION: ${location || "Global"}

Provide realistic keyword data including:
1. 15-20 related keywords with estimated search volumes (100-100000), difficulty scores (0-100), CPC ($0.10-$50), search intent, and trends
2. 10 long-tail keyword variations (lower volume, lower difficulty)
3. 10 common questions people search related to this topic
4. 5 content ideas targeting these keywords

Make search volumes and metrics realistic for the given industry. Higher commercial intent keywords should have higher CPC.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: keywordResearchSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Keyword research error:", error)
    return Response.json({ error: "Failed to perform keyword research" }, { status: 500 })
  }
}
