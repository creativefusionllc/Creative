"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function AboutContentEditor() {
  const [aboutContent, setAboutContent] = useState({
    company_description: "",
    mission: "",
    values: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutContent = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "about").single()

      if (data) setAboutContent(data.content)
      setLoading(false)
    }

    fetchAboutContent()
  }, [])

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "about",
      content: aboutContent,
      is_published: true,
    })
  }

  if (loading) return <div>Loading about content...</div>

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Company Description</label>
        <Textarea
          value={aboutContent.company_description || ""}
          onChange={(e) => setAboutContent({ ...aboutContent, company_description: e.target.value })}
          placeholder="Describe your company"
          className="h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mission</label>
        <Textarea
          value={aboutContent.mission || ""}
          onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
          placeholder="Company mission statement"
          className="h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Core Values</label>
        <Textarea
          value={aboutContent.values || ""}
          onChange={(e) => setAboutContent({ ...aboutContent, values: e.target.value })}
          placeholder="Company values (one per line)"
          className="h-24"
        />
      </div>

      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save About Content
      </Button>
    </div>
  )
}
