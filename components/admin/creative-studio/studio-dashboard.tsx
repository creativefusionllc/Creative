"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  FolderOpen,
  Palette,
  ImageIcon,
  Bot,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react"
import Link from "next/link"

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

export function CreativeStudioDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeDesigns: 0,
    brandKits: 0,
    assets: 0,
  })
  const [recentProjects, setRecentProjects] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    // Fetch stats
    const [projectsRes, canvasRes, brandKitsRes, assetsRes] = await Promise.all([
      supabase.from("creative_projects").select("id", { count: "exact" }),
      supabase.from("design_canvas").select("id", { count: "exact" }),
      supabase.from("brand_kits").select("id", { count: "exact" }),
      supabase.from("asset_library").select("id", { count: "exact" }),
    ])

    setStats({
      totalProjects: projectsRes.count || 0,
      activeDesigns: canvasRes.count || 0,
      brandKits: brandKitsRes.count || 0,
      assets: assetsRes.count || 0,
    })

    // Fetch recent projects
    const { data: projects } = await supabase
      .from("creative_projects")
      .select("*, clients(name), platform_templates(name, platform)")
      .order("created_at", { ascending: false })
      .limit(5)
    setRecentProjects(projects || [])

    // Fetch popular templates
    const { data: templatesData } = await supabase.from("platform_templates").select("*").order("sort_order").limit(8)
    setTemplates(templatesData || [])

    // Fetch AI agents
    const { data: agentsData } = await supabase.from("ai_agents").select("*").eq("is_active", true).order("sort_order")
    setAgents(agentsData || [])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Creative Studio</h1>
          <p className="text-gray-400 mt-1">Design stunning visuals with AI-powered assistance</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/creative-studio/editor">
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Plus className="h-4 w-4 mr-2" />
              New Design
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FolderOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
                <p className="text-sm text-gray-400">Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Palette className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeDesigns}</p>
                <p className="text-sm text-gray-400">Designs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C4D600]/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.brandKits}</p>
                <p className="text-sm text-gray-400">Brand Kits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-500/20 rounded-lg">
                <ImageIcon className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.assets}</p>
                <p className="text-sm text-gray-400">Assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Templates */}
      <Card className="bg-[#141414] border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Quick Start - Choose Template</CardTitle>
          <Link href="/admin/creative-studio/editor">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((template) => {
              const PlatformIcon = platformIcons[template.platform] || ImageIcon
              return (
                <Link key={template.id} href={`/admin/creative-studio/editor?template=${template.id}`}>
                  <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#C4D600]/50 transition-all cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-lg mb-3 flex items-center justify-center">
                      <PlatformIcon className="h-8 w-8 text-gray-500 group-hover:text-[#C4D600] transition-colors" />
                    </div>
                    <h4 className="text-sm font-medium text-white truncate">{template.name}</h4>
                    <p className="text-xs text-gray-500">
                      {template.width} x {template.height}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Creative Team */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="h-5 w-5 text-[#C4D600]" />
              AI Creative Team
            </CardTitle>
            <Link href="/admin/creative-studio/ai-team">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4D600] to-[#8fa600] flex items-center justify-center">
                    <span className="text-sm font-bold text-black">{agent.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{agent.role}</p>
                  </div>
                  <Badge variant="outline" className="border-[#C4D600]/30 text-[#C4D600] text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Recent Projects
            </CardTitle>
            <Link href="/admin/creative-studio/projects">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length > 0 ? (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <Link key={project.id} href={`/admin/creative-studio/editor?project=${project.id}`}>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <Palette className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{project.name}</h4>
                        <p className="text-xs text-gray-400">
                          {project.clients?.name || "No client"} • {project.platform_templates?.platform || "Custom"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          project.status === "completed"
                            ? "border-green-500/30 text-green-400"
                            : "border-yellow-500/30 text-yellow-400"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Palette className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No projects yet</p>
                <Link href="/admin/creative-studio/editor">
                  <Button className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]">Create First Design</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
