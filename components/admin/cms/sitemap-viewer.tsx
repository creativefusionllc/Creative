"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Globe, FileText, Folder } from "lucide-react"

interface SitemapItem {
  path: string
  title: string
  type: "page" | "api" | "admin"
  status: "published" | "draft" | "archived"
  lastModified: string
}

export function SitemapViewer() {
  const [sitemap, setSitemap] = useState<SitemapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    // Simulate loading sitemap from database
    // In production, fetch from API
    setLoading(false)
  }, [])

  const filteredSitemap = sitemap.filter((item) => filter === "all" || item.type === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
        <p className="text-gray-500 mt-1">View all pages, routes, and templates in your website</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Pages & Routes</CardTitle>
              <CardDescription>Complete sitemap of your website structure</CardDescription>
            </div>
            <div className="flex gap-2">
              {["all", "page", "api", "admin"].map((type) => (
                <Badge
                  key={type}
                  variant={filter === type ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { path: "/", title: "Home", type: "page", status: "published", lastModified: "2024-01-15" },
              { path: "/services", title: "Services", type: "page", status: "published", lastModified: "2024-01-10" },
              { path: "/portfolio", title: "Portfolio", type: "page", status: "published", lastModified: "2024-01-05" },
              { path: "/about", title: "About Us", type: "page", status: "published", lastModified: "2024-01-08" },
              { path: "/contact", title: "Contact", type: "page", status: "published", lastModified: "2024-01-12" },
              { path: "/blog", title: "Blog", type: "page", status: "published", lastModified: "2024-01-14" },
              {
                path: "/admin",
                title: "Admin Dashboard",
                type: "admin",
                status: "published",
                lastModified: "2024-01-16",
              },
              {
                path: "/api/services",
                title: "Services API",
                type: "api",
                status: "published",
                lastModified: "2024-01-13",
              },
            ]
              .filter((item) => filter === "all" || item.type === filter)
              .map((item) => (
                <div
                  key={item.path}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {item.type === "page" && <Globe className="h-5 w-5 text-blue-500" />}
                    {item.type === "api" && <FileText className="h-5 w-5 text-purple-500" />}
                    {item.type === "admin" && <Folder className="h-5 w-5 text-orange-500" />}
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.path}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={item.status === "published" ? "default" : "outline"}>{item.status}</Badge>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{item.lastModified}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
