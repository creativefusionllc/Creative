"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogCategoryPage({ slug }: { slug: string }) {
  const [category, setCategory] = useState<any>(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchData()
  }, [slug])

  async function fetchData() {
    try {
      // Fetch category
      const { data: cat } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single()

      if (cat) {
        setCategory(cat)

        // Fetch posts in category
        const { data: postsData } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("category_id", cat.id)
          .eq("status", "published")
          .lte("published_at", new Date().toISOString())
          .order("published_at", { ascending: false })

        setPosts(postsData || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching category:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white">Loading...</div>
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white">Category not found</div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <div className="bg-gradient-to-b from-[#1C1C1C] to-[#0F0F0F] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-white mb-4 hover:text-[#C4D600]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{category.name}</h1>
          {category.description && <p className="text-xl text-white/70 max-w-2xl">{category.description}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center text-white/50">No posts in this category yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C4D600]/50 transition-all"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.read_time} min
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#C4D600] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
