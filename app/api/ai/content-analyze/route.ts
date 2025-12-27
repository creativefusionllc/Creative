import { generateObject } from "ai"
import { z } from "zod"

const contentAnalysisSchema = z.object({
  scores: z.object({
    overall: z.number().min(0).max(100).describe("Overall content quality score"),
    readability: z.number().min(0).max(100).describe("How easy the content is to read"),
    seo: z.number().min(0).max(100).describe("SEO optimization score"),
    tone: z.number().min(0).max(100).describe("Tone consistency score"),
    originality: z.number().min(0).max(100).describe("Content originality score"),
  }),
  suggestions: z.array(
    z.object({
      type: z.enum(["error", "warning", "success", "info"]),
      category: z.string(),
      message: z.string(),
      fix: z.string().optional(),
    }),
  ),
  keywordAnalysis: z.object({
    density: z.number(),
    occurrences: z.number(),
    inTitle: z.boolean(),
    inFirstParagraph: z.boolean(),
    inHeadings: z.boolean(),
  }),
  readabilityMetrics: z.object({
    fleschScore: z.number(),
    gradeLevel: z.string(),
    avgSentenceLength: z.number(),
    complexWords: z.number(),
  }),
  improvements: z.array(z.string()).describe("Top 5 specific improvements to make"),
})

export async function POST(req: Request) {
  const { content, targetKeyword, title } = await req.json()

  if (!content) {
    return Response.json({ error: "Content is required" }, { status: 400 })
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length
  const paragraphCount = content.split(/\n\n+/).filter(Boolean).length

  const prompt = `Analyze this content for SEO and readability optimization.

CONTENT TITLE: ${title || "No title provided"}
TARGET KEYWORD: ${targetKeyword || "No keyword specified"}
CONTENT (${wordCount} words, ${sentenceCount} sentences, ${paragraphCount} paragraphs):
---
${content.substring(0, 5000)}
---

Provide a detailed SEO and content quality analysis including:
1. Scores (0-100) for overall quality, readability, SEO optimization, tone consistency, and originality
2. Specific suggestions categorized as error (critical issues), warning (improvements needed), success (well done), or info (tips)
3. Keyword analysis if a target keyword was provided
4. Readability metrics including Flesch score and grade level
5. Top 5 specific improvements to make

Be strict but fair in scoring. Focus on actionable, specific feedback.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: contentAnalysisSchema,
      prompt,
    })

    return Response.json(object)
  } catch (error) {
    console.error("AI analysis error:", error)
    return Response.json({ error: "Failed to analyze content" }, { status: 500 })
  }
}
