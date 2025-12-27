"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { Calendar, Clock, ArrowLeft, Share2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchPost()
  }, [slug])

  async function fetchPost() {
    try {
      const { data } = await supabase
        .from("blog_posts")
        .select("*, category:blog_categories(*)")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

      if (data) {
        setPost(data)
        // Increment view count
        await supabase
          .from("blog_posts")
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq("id", data.id)
      }
    } catch (error) {
      console.error("[v0] Error fetching blog post:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white">Loading...</div>
  }

  if (!post) {
    return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white">Post not found</div>
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={post.featured_image || "/placeholder.svg?height=800&width=1600"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="text-white mb-4 hover:text-[#C4D600]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {post.category && (
              <span className="inline-block px-3 py-1 bg-[#C4D600] text-black text-sm font-semibold rounded-full mb-4">
                {post.category.name}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.read_time} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-white/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-12 border-t border-white/10">
            <h3 className="text-white font-semibold mb-4">Tags</h3>
            <div className="flex gap-3 flex-wrap">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#1C1C1C] text-[#C4D600] text-sm rounded-full flex items-center gap-2"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
            <Share2 className="h-4 w-4 mr-2" />
            Share Article
          </Button>
        </div>
      </div>
    </div>
  )
}
