"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Edit, Eye, Trash2 } from "lucide-react"

interface Page {
  id: string
  title: string
  path: string
  status: "published" | "draft"
  lastModified: string
  editor: string
}

export function PageTemplateEditor() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages & Templates</h1>
          <p className="text-gray-500 mt-1">Edit website pages and templates with role-based access</p>
        </div>
        <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">Create Page</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>Manage website pages and CMS templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                id: "1",
                title: "Home Page",
                path: "/",
                status: "published" as const,
                lastModified: "2024-01-15",
                editor: "Super Admin",
              },
              {
                id: "2",
                title: "Services Page",
                path: "/services",
                status: "published" as const,
                lastModified: "2024-01-10",
                editor: "Admin",
              },
              {
                id: "3",
                title: "Blog Template",
                path: "/blog",
                status: "draft" as const,
                lastModified: "2024-01-14",
                editor: "Content Manager",
              },
            ].map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{page.title}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{page.path}</span>
                    <Badge variant="outline" className="text-xs">
                      {page.editor}
                    </Badge>
                    <span>{page.lastModified}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={page.status === "published" ? "default" : "outline"}>{page.status}</Badge>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
