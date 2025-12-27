"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Palette,
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Eye,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Grid3X3,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { format } from "date-fns"

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

const statusColors: Record<string, string> = {
  draft: "border-gray-500/30 text-gray-400",
  "in-progress": "border-blue-500/30 text-blue-400",
  review: "border-yellow-500/30 text-yellow-400",
  completed: "border-green-500/30 text-green-400",
}

export function ProjectsManagement() {
  const supabase = createClient()
  const [projects, setProjects] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from("creative_projects")
      .select("*, clients(name), brand_kits(name), platform_templates(name, platform, width, height)")
      .order("created_at", { ascending: false })
    setProjects(data || [])
  }

  async function deleteProject(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      await supabase.from("creative_projects").delete().eq("id", id)
      fetchProjects()
    }
  }

  async function duplicateProject(project: any) {
    const { data } = await supabase
      .from("creative_projects")
      .insert({
        name: `${project.name} (Copy)`,
        client_id: project.client_id,
        brand_kit_id: project.brand_kit_id,
        template_id: project.template_id,
        platform: project.platform,
        status: "draft",
      })
      .select()
      .single()

    if (data) {
      // Copy canvases
      const { data: canvases } = await supabase.from("design_canvas").select("*").eq("project_id", project.id)

      if (canvases) {
        for (const canvas of canvases) {
          await supabase.from("design_canvas").insert({
            ...canvas,
            id: undefined,
            project_id: data.id,
            created_at: undefined,
            updated_at: undefined,
          })
        }
      }
    }

    fetchProjects()
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clients?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    const matchesPlatform = platformFilter === "all" || p.platform_templates?.platform === platformFilter
    return matchesSearch && matchesStatus && matchesPlatform
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Creative Projects</h1>
          <p className="text-gray-400 mt-1">Manage all your design projects</p>
        </div>
        <Link href="/admin/creative-studio/editor">
          <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="all" className="text-white">
              All Status
            </SelectItem>
            <SelectItem value="draft" className="text-white">
              Draft
            </SelectItem>
            <SelectItem value="in-progress" className="text-white">
              In Progress
            </SelectItem>
            <SelectItem value="review" className="text-white">
              Review
            </SelectItem>
            <SelectItem value="completed" className="text-white">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="all" className="text-white">
              All Platforms
            </SelectItem>
            <SelectItem value="instagram" className="text-white">
              Instagram
            </SelectItem>
            <SelectItem value="facebook" className="text-white">
              Facebook
            </SelectItem>
            <SelectItem value="linkedin" className="text-white">
              LinkedIn
            </SelectItem>
            <SelectItem value="twitter" className="text-white">
              Twitter/X
            </SelectItem>
            <SelectItem value="youtube" className="text-white">
              YouTube
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => {
          const PlatformIcon = platformIcons[project.platform_templates?.platform] || Grid3X3
          return (
            <Card key={project.id} className="bg-[#141414] border-white/10 overflow-hidden group">
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 relative flex items-center justify-center">
                <PlatformIcon className="h-12 w-12 text-gray-600" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link href={`/admin/creative-studio/editor?project=${project.id}`}>
                    <Button size="sm" className="bg-[#C4D600] text-black">
                      <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="border-white/20 text-white bg-transparent">
                    <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{project.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{project.clients?.name || "No client"}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1a1a1a] border-white/10">
                      <DropdownMenuItem className="text-white cursor-pointer" onClick={() => duplicateProject(project)}>
                        <Copy className="h-4 w-4 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 cursor-pointer"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={statusColors[project.status] || statusColors.draft}>
                    {project.status}
                  </Badge>
                  {project.platform_templates && (
                    <Badge variant="outline" className="border-white/10 text-gray-400 text-xs">
                      {project.platform_templates.width}x{project.platform_templates.height}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(project.created_at), "MMM d, yyyy")}
                  </span>
                  {project.brand_kits && (
                    <span className="flex items-center gap-1">
                      <Palette className="h-3.5 w-3.5" />
                      {project.brand_kits.name}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredProjects.length === 0 && (
          <Card className="bg-[#141414] border-white/10 border-dashed col-span-full">
            <CardContent className="py-12 text-center">
              <Palette className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No projects found</p>
              <Link href="/admin/creative-studio/editor">
                <Button className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
