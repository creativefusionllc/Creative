"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"
import { ImageOrientationDetector, type ImageOrientation } from "./image-orientation-detector"

interface PortfolioImage {
  id: string
  image_url: string
  alt_text: string
  orientation: ImageOrientation
  width: number
  height: number
  display_order: number
}

interface PortfolioProject {
  id: string
  category_id: string
  title: string
  description: string
  featured_image: string
  images: PortfolioImage[]
}

interface Category {
  id: string
  name: string
  slug: string
}

export function AdvancedPortfolioGallery() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("portfolio_categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order")

      // Fetch projects with images
      const { data: projectsData } = await supabase
        .from("portfolio_projects")
        .select(`
          *,
          portfolio_images(*)
        `)
        .eq("status", "published")
        .order("display_order")

      setCategories(categoriesData || [])
      setProjects(projectsData || [])
    } catch (error) {
      console.error("Error fetching portfolio:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category_id === selectedCategory)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          All Projects
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found in this category</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mt-2">{project.description}</p>
              </div>

              {/* Image Gallery with Auto-Orientation Detection */}
              {project.images && project.images.length > 0 ? (
                <ImageOrientationDetector images={project.images} />
              ) : (
                <div className="bg-secondary rounded-lg h-96 flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
