import { NextResponse } from "next/server"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"
import { generateTemplateMetaTags } from "@/lib/ai/ai-provider"

async function generateWithFallback(prompt: string, url: string): Promise<{ text: string; provider: string }> {
  // 1. Try Vercel AI Gateway (free, built-in)
  try {
    const result = await generateText({
      model: "google/gemini-2.0-flash",
      prompt,
    })
    return { text: result.text, provider: "vercel" }
  } catch (e: any) {
    console.log("Vercel AI Gateway failed:", e.message)
  }

  // 2. Try Hugging Face (free tier)
  if (process.env.HUGGINGFACE_API_KEY) {
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
            inputs: prompt,
            parameters: { max_new_tokens: 500, temperature: 0.3 },
          }),
        },
      )
      if (hfResponse.ok) {
        const result = await hfResponse.json()
        const text = result[0]?.generated_text || result.generated_text || ""
        if (text) return { text, provider: "huggingface" }
      }
    } catch (e) {
      console.log("Hugging Face failed, trying next...")
    }
  }

  // 3. Try Google Gemini directly
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const googleResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 500 },
          }),
        },
      )
      if (googleResponse.ok) {
        const result = await googleResponse.json()
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || ""
        if (text) return { text, provider: "google" }
      }
    } catch (e) {
      console.log("Google Gemini failed")
    }
  }

  // 4. Use template fallback (always works)
  const templateResult = generateTemplateMetaTags(url)
  return { text: JSON.stringify(templateResult), provider: "template" }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, pageId } = body

    if (!url || !pageId) {
      return NextResponse.json({ error: "URL and pageId are required" }, { status: 400 })
    }

    const prompt = `Generate SEO-optimized meta tags for this URL: ${url}

Based on the URL structure, suggest:
1. Page Title (50-60 characters)
2. Meta Description (150-160 characters)

Format as JSON only, no extra text: {"title": "...", "description": "..."}`

    const { text, provider } = await generateWithFallback(prompt, url)

    // Parse the JSON from the response
    let parsed: { title: string; description: string }
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : generateTemplateMetaTags(url)
    } catch {
      parsed = generateTemplateMetaTags(url)
    }

    // Calculate SEO score
    let seoScore = 50
    if (parsed.title && parsed.title.length >= 30 && parsed.title.length <= 60) seoScore += 20
    else if (parsed.title) seoScore += 10
    if (parsed.description && parsed.description.length >= 120 && parsed.description.length <= 160) seoScore += 20
    else if (parsed.description) seoScore += 10
    if (url && url.includes("-")) seoScore += 10
    seoScore = Math.min(seoScore, 100)

    // Update the page in database
    const supabase = await createClient()
    const { error } = await supabase
      .from("seo_pages")
      .update({
        title: parsed.title,
        meta_description: parsed.description,
        seo_score: seoScore,
        last_crawled_at: new Date().toISOString(),
      })
      .eq("id", pageId)

    if (error) {
      throw error
    }

    return NextResponse.json(
      {
        title: parsed.title,
        description: parsed.description,
        seoScore,
        provider,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error generating meta tags:", error)
    return NextResponse.json(
      {
        error: "Failed to generate meta tags",
        message: error.message,
        suggestion: "manual",
      },
      { status: 500 },
    )
  }
}
