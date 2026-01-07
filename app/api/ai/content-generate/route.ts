import { streamText } from "ai"

export const maxDuration = 60

export async function POST(req: Request) {
  const { topic, type, targetKeyword, tone, wordCount, outline } = await req.json()

  if (!topic) {
    return Response.json({ error: "Topic is required" }, { status: 400 })
  }

  const prompt = `You are an expert content writer specializing in SEO-optimized content for digital marketing agencies.

Write a ${type || "blog post"} about: ${topic}

REQUIREMENTS:
- Target keyword: ${targetKeyword || topic}
- Tone: ${tone || "professional yet engaging"}
- Word count: approximately ${wordCount || 1000} words
- ${outline ? `Follow this outline:\n${outline.join("\n")}` : "Create a logical structure with clear headings"}

GUIDELINES:
1. Include the target keyword naturally in the title, first paragraph, headings, and throughout the content (1-2% density)
2. Use H2 and H3 headings to structure the content
3. Write compelling meta description (150-160 chars) at the start
4. Include a strong introduction hook
5. Add actionable takeaways
6. End with a clear call-to-action
7. Use short paragraphs (2-3 sentences max)
8. Include transition words for better readability

Write the complete content now, formatted in markdown:`

  try {
    const result = streamText({
      model: "openai/gpt-4o-mini",
      prompt,
      maxOutputTokens: 4000,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Content generation error:", error)
    return Response.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
