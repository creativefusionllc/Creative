"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function HeroContentEditor() {
  const [heroContent, setHeroContent] = useState({
    headline: "",
    subheadline: "",
    cta_button_text: "",
    cta_button_url: "",
    background_image: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroContent = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "hero").single()

      if (data) {
        setHeroContent(data.content)
      }
      setLoading(false)
    }

    fetchHeroContent()
  }, [])

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "hero",
      content: heroContent,
      is_published: true,
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Headline</label>
        <Input
          value={heroContent.headline}
          onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
          placeholder="Enter hero headline"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subheadline</label>
        <Textarea
          value={heroContent.subheadline}
          onChange={(e) => setHeroContent({ ...heroContent, subheadline: e.target.value })}
          placeholder="Enter hero subheadline"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Button Text</label>
        <Input
          value={heroContent.cta_button_text}
          onChange={(e) => setHeroContent({ ...heroContent, cta_button_text: e.target.value })}
          placeholder="e.g., Get Started"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Button URL</label>
        <Input
          value={heroContent.cta_button_url}
          onChange={(e) => setHeroContent({ ...heroContent, cta_button_url: e.target.value })}
          placeholder="e.g., /contact"
        />
      </div>

      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save Hero Content
      </Button>
    </div>
  )
}
