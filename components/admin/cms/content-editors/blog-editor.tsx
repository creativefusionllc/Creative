"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function BlogContentEditor() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "blog")

      if (data && data.length > 0) setBlogs(data[0].content || [])
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  const handleAddBlog = () => {
    setBlogs([...blogs, { title: "", excerpt: "", content: "", category: "" }])
  }

  const handleUpdateBlog = (index, updated) => {
    const newBlogs = [...blogs]
    newBlogs[index] = updated
    setBlogs(newBlogs)
  }

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "blog",
      content: blogs,
      is_published: true,
    })
  }

  if (loading) return <div>Loading blog posts...</div>

  return (
    <div className="space-y-6">
      {blogs.map((blog, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Input
            value={blog.title || ""}
            onChange={(e) => handleUpdateBlog(index, { ...blog, title: e.target.value })}
            placeholder="Blog title"
          />
          <Input
            value={blog.category || ""}
            onChange={(e) => handleUpdateBlog(index, { ...blog, category: e.target.value })}
            placeholder="Category"
          />
          <Textarea
            value={blog.excerpt || ""}
            onChange={(e) => handleUpdateBlog(index, { ...blog, excerpt: e.target.value })}
            placeholder="Blog excerpt"
            className="h-16"
          />
          <Textarea
            value={blog.content || ""}
            onChange={(e) => handleUpdateBlog(index, { ...blog, content: e.target.value })}
            placeholder="Blog content"
            className="h-32"
          />
        </div>
      ))}
      <Button onClick={handleAddBlog} className="bg-lime-500 text-black hover:bg-lime-600">
        Add Blog Post
      </Button>
      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save Blog Posts
      </Button>
    </div>
  )
}
