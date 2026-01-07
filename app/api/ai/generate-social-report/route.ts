import { generateText } from "ai"
import { NextResponse } from "next/server"
import { generateTemplateSocialReport } from "@/lib/ai/ai-provider"

async function generateWithFallback(prompt: string, fallbackData: any): Promise<{ text: string; provider: string }> {
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
            parameters: { max_new_tokens: 1500, temperature: 0.7 },
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
            generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
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
  return { text: generateTemplateSocialReport(fallbackData), provider: "template" }
}

export async function POST(request: Request) {
  try {
    const { clientName, totalFollowers, totalPosts, accounts, periodStart, periodEnd } = await request.json()

    const platforms = accounts?.map((a: any) => a.platform) || []
    const platformSummary = accounts
      ?.map((a: any) => `${a.platform}: ${a.followers_count} followers, ${a.posts_count} posts`)
      .join("; ")

    const prompt = `Generate a professional social media analytics report summary for ${clientName}.

Data:
- Report Period: ${periodStart} to ${periodEnd}
- Total Followers: ${totalFollowers}
- Total Posts: ${totalPosts}
- Platform Breakdown: ${platformSummary || "No accounts connected"}

Please provide:
1. Executive Summary (2-3 sentences)
2. Key Performance Highlights (3-4 bullet points)
3. Growth Opportunities (2-3 recommendations)
4. Strategic Recommendations (2-3 actionable items)

Format the response professionally and concisely.`

    const fallbackData = { clientName, totalFollowers, totalPosts, platforms }
    const { text, provider } = await generateWithFallback(prompt, fallbackData)

    return NextResponse.json({ insights: text, provider })
  } catch (error) {
    console.error("AI generation error:", error)
    // Return template content even on error
    const templateContent = generateTemplateSocialReport({
      clientName: "Client",
      totalFollowers: 0,
      totalPosts: 0,
      platforms: [],
    })
    return NextResponse.json({ insights: templateContent, provider: "template" }, { status: 200 })
  }
}
