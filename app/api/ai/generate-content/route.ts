import { NextResponse } from "next/server"
import { generateText } from "ai"
import { generateTemplateContent } from "@/lib/ai/ai-provider"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, provider = "auto" } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert SEO content writer. Generate a high-quality, SEO-optimized blog article based on this topic/prompt:

${prompt}

Requirements:
- Write in a professional but engaging tone
- Include relevant keywords naturally
- Structure with headings (H2, H3)
- Make it comprehensive (at least 800 words)
- Include a compelling introduction and conclusion
- Add bullet points where appropriate

Format the output as clean text with markdown headings.`

    let text = ""
    let usedProvider = provider

    if (provider === "auto" || provider === "vercel") {
      try {
        const result = await generateText({
          model: "google/gemini-2.0-flash",
          prompt: systemPrompt,
        })
        text = result.text
        usedProvider = "vercel"
      } catch (e: any) {
        console.log("Vercel AI Gateway failed:", e.message)
      }
    }

    // Try Hugging Face (free tier)
    if (!text && (provider === "auto" || provider === "huggingface") && process.env.HUGGINGFACE_API_KEY) {
      try {
        const hfResponse = await fetch(
          "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: systemPrompt,
              parameters: { max_new_tokens: 2000, temperature: 0.7 },
            }),
          },
        )
        if (hfResponse.ok) {
          const result = await hfResponse.json()
          text = result[0]?.generated_text || result.generated_text || ""
          usedProvider = "huggingface"
        }
      } catch (e) {
        console.log("Hugging Face failed, trying next provider...")
      }
    }

    // Try Google Gemini direct API
    if (!text && (provider === "auto" || provider === "google") && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        const googleResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
            }),
          },
        )
        if (googleResponse.ok) {
          const result = await googleResponse.json()
          text = result.candidates?.[0]?.content?.parts?.[0]?.text || ""
          usedProvider = "google"
        }
      } catch (e) {
        console.log("Google Gemini failed...")
      }
    }

    if (!text) {
      text = generateTemplateContent(prompt, "blog")
      usedProvider = "template"
    }

    return NextResponse.json({ content: text, provider: usedProvider }, { status: 200 })
  } catch (error: any) {
    console.error("Error generating content:", error)
    // Even on error, return template content
    const templateContent = generateTemplateContent(request.url || "Content", "blog")
    return NextResponse.json(
      { content: templateContent, provider: "template", note: "Used template due to error" },
      { status: 200 },
    )
  }
}
