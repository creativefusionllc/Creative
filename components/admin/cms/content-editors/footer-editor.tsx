"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function FooterContentEditor() {
  const [footerContent, setFooterContent] = useState({
    company_info: "",
    copyright: "",
    quick_links: [],
    social_media: {},
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFooterContent = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "footer").single()

      if (data) setFooterContent(data.content)
      setLoading(false)
    }

    fetchFooterContent()
  }, [])

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "footer",
      content: footerContent,
      is_published: true,
    })
  }

  if (loading) return <div>Loading footer content...</div>

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Company Info</label>
        <Textarea
          value={footerContent.company_info || ""}
          onChange={(e) => setFooterContent({ ...footerContent, company_info: e.target.value })}
          placeholder="Company information"
          className="h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Copyright Text</label>
        <Input
          value={footerContent.copyright || ""}
          onChange={(e) => setFooterContent({ ...footerContent, copyright: e.target.value })}
          placeholder="© 2026 Company Name. All rights reserved."
        />
      </div>

      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save Footer Content
      </Button>
    </div>
  )
}
