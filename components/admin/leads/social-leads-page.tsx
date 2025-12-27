"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Target,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Plus,
  Filter,
  TrendingUp,
  Users,
  MessageSquare,
  Eye,
  Mail,
  Phone,
  Calendar,
  ArrowUpRight,
  Share2,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
}

const platformColors: Record<string, string> = {
  instagram: "from-pink-500 to-purple-600",
  facebook: "from-blue-500 to-blue-700",
  linkedin: "from-sky-500 to-blue-600",
  twitter: "from-sky-400 to-blue-500",
}

export function SocialLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      const { data } = await supabase
        .from("leads")
        .select("*, lead_social_connections(*), social_lead_sources(*)")
        .not("social_lead_sources", "is", null)
        .order("created_at", { ascending: false })

      setLeads(data || [])
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: 156,
    instagram: 78,
    facebook: 45,
    linkedin: 28,
    twitter: 5,
    thisWeek: 23,
    converted: 34,
  }

  // Sample leads for display
  const sampleLeads =
    leads.length > 0
      ? leads
      : [
          {
            id: 1,
            name: "Sarah Ahmed",
            email: "sarah@example.com",
            phone: "+971501234567",
            source_platform: "instagram",
            source_type: "dm",
            created_at: "2024-12-10",
            status: "new",
          },
          {
            id: 2,
            name: "Mohammed Ali",
            email: "mohammed@company.ae",
            phone: "+971502345678",
            source_platform: "linkedin",
            source_type: "form",
            created_at: "2024-12-09",
            status: "contacted",
          },
          {
            id: 3,
            name: "Fatima Hassan",
            email: "fatima@startup.com",
            phone: "+971503456789",
            source_platform: "facebook",
            source_type: "comment",
            created_at: "2024-12-08",
            status: "qualified",
          },
          {
            id: 4,
            name: "Ahmad Khan",
            email: "ahmad@business.ae",
            phone: "+971504567890",
            source_platform: "instagram",
            source_type: "bio_link",
            created_at: "2024-12-07",
            status: "new",
          },
        ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Target className="h-6 w-6 text-white" />
            </div>
            Social Media Leads
          </h1>
          <p className="text-gray-400 mt-1">Track and manage leads from social media channels</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/leads/new">
            <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-rose-900/40 to-rose-800/20 border-rose-700/30">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-rose-300">Total Leads</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border-pink-700/30">
          <CardContent className="p-4 text-center">
            <Instagram className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.instagram}</p>
            <p className="text-xs text-pink-300">Instagram</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-4 text-center">
            <Facebook className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.facebook}</p>
            <p className="text-xs text-blue-300">Facebook</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-900/40 to-sky-800/20 border-sky-700/30">
          <CardContent className="p-4 text-center">
            <Linkedin className="h-6 w-6 text-sky-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.linkedin}</p>
            <p className="text-xs text-sky-300">LinkedIn</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border-cyan-700/30">
          <CardContent className="p-4 text-center">
            <Twitter className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.twitter}</p>
            <p className="text-xs text-cyan-300">Twitter</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-700/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.thisWeek}</p>
            <p className="text-xs text-green-300">This Week</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-700/30">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.converted}</p>
            <p className="text-xs text-emerald-300">Converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Social Leads</CardTitle>
            <div className="flex gap-2">
              <Input placeholder="Search leads..." className="w-64 bg-gray-900 border-gray-700 text-white" />
              <Button variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleLeads.map((lead: any) => {
              const PlatformIcon = platformIcons[lead.source_platform] || Share2
              return (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#C4D600] to-[#8fa600] text-black font-semibold">
                        {lead.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "L"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{lead.name}</h4>
                        <div
                          className={`w-6 h-6 rounded-lg bg-gradient-to-br ${platformColors[lead.source_platform] || "from-gray-500 to-gray-700"} flex items-center justify-center`}
                        >
                          <PlatformIcon className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] h-5 border-gray-600 text-gray-400">
                          via {lead.source_type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        lead.status === "new"
                          ? "border-blue-500 text-blue-500"
                          : lead.status === "contacted"
                            ? "border-yellow-500 text-yellow-500"
                            : lead.status === "qualified"
                              ? "border-emerald-500 text-emerald-500"
                              : lead.status === "converted"
                                ? "border-green-500 text-green-500"
                                : "border-gray-500 text-gray-500"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#C4D600] h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Link to Social Calendar */}
      <Card className="bg-gradient-to-r from-pink-900/30 to-fuchsia-900/30 border-pink-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Social Media Calendar</h3>
                <p className="text-sm text-gray-400">Schedule content to generate more leads</p>
              </div>
            </div>
            <Link href="/admin/social-calendar">
              <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                View Calendar
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
