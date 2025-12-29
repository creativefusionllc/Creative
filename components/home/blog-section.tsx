"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@/lib/supabase/client"

export function BlogSection() {
  const [posts, setPosts] = useState([])
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*, category:blog_categories(*)")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(3)

    setPosts(data || [])
  }

  return (
    <section className="py-20 lg:py-28 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-[#C4D600] font-semibold tracking-widest uppercase text-sm mb-3">Latest Insights</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Blog & Resources</h2>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/blog">
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C4D600]/50 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#C4D600] text-[#1C1C1C] text-xs font-semibold rounded-full">
                        {post.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.read_time} min read
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#C4D600] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{post.excerpt}</p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C4D600] hover:text-[#d4e600] transition-colors">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
