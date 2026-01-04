"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function TestimonialsContentEditor() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "testimonials")

      if (data) setTestimonials(data[0]?.content || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { quote: "", author: "", company: "", rating: 5 }])
  }

  const handleUpdateTestimonial = (index, updated) => {
    const newTestimonials = [...testimonials]
    newTestimonials[index] = updated
    setTestimonials(newTestimonials)
  }

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "testimonials",
      content: testimonials,
      is_published: true,
    })
  }

  if (loading) return <div>Loading testimonials...</div>

  return (
    <div className="space-y-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Textarea
            value={testimonial.quote || ""}
            onChange={(e) => handleUpdateTestimonial(index, { ...testimonial, quote: e.target.value })}
            placeholder="Testimonial quote"
            className="h-20"
          />
          <Input
            value={testimonial.author || ""}
            onChange={(e) => handleUpdateTestimonial(index, { ...testimonial, author: e.target.value })}
            placeholder="Client name"
          />
          <Input
            value={testimonial.company || ""}
            onChange={(e) => handleUpdateTestimonial(index, { ...testimonial, company: e.target.value })}
            placeholder="Company name"
          />
        </div>
      ))}
      <Button onClick={handleAddTestimonial} className="bg-lime-500 text-black hover:bg-lime-600">
        Add Testimonial
      </Button>
      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save All Testimonials
      </Button>
    </div>
  )
}
