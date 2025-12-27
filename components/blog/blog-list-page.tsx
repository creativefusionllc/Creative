"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { Calendar, Clock, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function BlogListPage() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchData()
  }, [selectedCategory, searchQuery])

  async function fetchData() {
    try {
      setLoading(true)

      // Fetch categories
      const { data: cats } = await supabase.from("blog_categories").select("*").order("created_at")

      setCategories(cats || [])

      // Fetch posts
      let query = supabase
        .from("blog_posts")
        .select("*, category:blog_categories(*)")
        .eq("status", "published")
        .not("published_at", "is", null) // Only posts with published_at set
        .order("published_at", { ascending: false })
        .limit(50)

      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
      }

      const { data: blogPosts, error } = await query

      if (error) {
        console.error("[v0] Blog fetch error:", error)
      } else {
        console.log("[v0] Fetched blog posts:", blogPosts?.length || 0)
        setPosts(blogPosts || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching blog data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getReadTime = (content: string) => {
    if (!content) return 5
    const words = content.split(/\s+/).length
    return Math.ceil(words / 200) || 5
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1C1C1C] to-[#0F0F0F] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blog & Resources</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Expert insights on digital marketing, branding, and creative strategies from Dubai UAE
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-[#141414] border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-[#1C1C1C] border-white/20 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-[#C4D600] text-black" : ""}
              >
                All
              </Button>
              {categories.map((cat: any) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? "bg-[#C4D600] text-black" : ""}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center text-white/50">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-white/50">No published posts yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="group bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C4D600]/50 transition-all"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image || "/placeholder.svg?height=400&width=600&query=creative+agency"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#C4D600] text-black text-xs font-semibold rounded-full">
                          {post.category.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {getReadTime(post.content)} min
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#C4D600] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {post.excerpt || post.content?.substring(0, 100)}
                    </p>

                    {post.seo_keywords && post.seo_keywords.length > 0 && (
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {post.seo_keywords.slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="text-xs text-[#C4D600] flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
