import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { productId, name, description, category, tags } = await request.json()

    const prompt = `Generate SEO-optimized meta title and meta description for this e-commerce product in UAE:

Product Name: ${name}
Description: ${description || "N/A"}
Category: ${category || "General"}
Tags: ${tags?.join(", ") || "N/A"}

Requirements:
1. Meta Title: Max 60 characters, include product name and "UAE" or "Dubai"
2. Meta Description: Max 160 characters, compelling, include call-to-action
3. Focus Keywords: 5 relevant keywords for this product
4. Include pricing-related keywords like "best price", "buy online"

Return JSON format:
{
  "seo_title": "...",
  "seo_description": "...",
  "focus_keywords": ["..."]
}`

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      prompt,
    })

    // Parse the AI response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid AI response format")
    }

    const seoData = JSON.parse(jsonMatch[0])

    // Update product in database if productId provided
    if (productId) {
      const supabase = await createClient()
      await supabase
        .from("shop_products")
        .update({
          seo_title: seoData.seo_title,
          seo_description: seoData.seo_description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId)
    }

    return NextResponse.json(seoData)
  } catch (error) {
    console.error("Error generating product SEO:", error)

    // Fallback response
    return NextResponse.json({
      seo_title: "Premium Product | Creative Fusion Shop UAE",
      seo_description:
        "Shop high-quality products at Creative Fusion UAE. Best prices, fast delivery, secure payment. Order now!",
      focus_keywords: ["buy online UAE", "best price Dubai", "creative products", "fast delivery", "secure shopping"],
    })
  }
}
