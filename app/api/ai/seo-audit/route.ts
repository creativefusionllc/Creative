import { generateObject } from "ai"
import { z } from "zod"

const seoAuditSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categories: z.object({
    technical: z.object({
      score: z.number().min(0).max(100),
      issues: z.array(
        z.object({
          severity: z.enum(["critical", "warning", "info"]),
          issue: z.string(),
          recommendation: z.string(),
        }),
      ),
    }),
    onPage: z.object({
      score: z.number().min(0).max(100),
      issues: z.array(
        z.object({
          severity: z.enum(["critical", "warning", "info"]),
          issue: z.string(),
          recommendation: z.string(),
        }),
      ),
    }),
    content: z.object({
      score: z.number().min(0).max(100),
      issues: z.array(
        z.object({
          severity: z.enum(["critical", "warning", "info"]),
          issue: z.string(),
          recommendation: z.string(),
        }),
      ),
    }),
    performance: z.object({
      score: z.number().min(0).max(100),
      issues: z.array(
        z.object({
          severity: z.enum(["critical", "warning", "info"]),
          issue: z.string(),
          recommendation: z.string(),
        }),
      ),
    }),
  }),
  priorityActions: z
    .array(
      z.object({
        action: z.string(),
        impact: z.enum(["high", "medium", "low"]),
        effort: z.enum(["easy", "medium", "hard"]),
        category: z.string(),
      }),
    )
    .describe("Top 10 priority actions sorted by impact"),
  competitorInsights: z.array(z.string()).describe("5 insights based on competitor analysis"),
})

export async function POST(req: Request) {
  const { url, industry, competitors } = await req.json()

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 })
  }

  const prompt = `You are an expert SEO auditor. Perform a comprehensive SEO audit simulation for:

WEBSITE URL: ${url}
INDUSTRY: ${industry || "General"}
COMPETITORS: ${competitors?.join(", ") || "Not specified"}

Simulate a detailed SEO audit including:
1. Overall score (0-100)
2. Category scores and issues for: Technical SEO, On-Page SEO, Content Quality, Performance
3. Top 10 priority actions sorted by impact (high/medium/low) and effort (easy/medium/hard)
4. 5 competitor insights

Make the audit realistic and actionable. Include specific technical issues like missing meta tags, slow load times, mobile issues, etc.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: seoAuditSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("SEO audit error:", error)
    return Response.json({ error: "Failed to perform SEO audit" }, { status: 500 })
  }
}
