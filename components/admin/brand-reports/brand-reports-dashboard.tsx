"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Award,
  Plus,
  Filter,
  FileText,
  Printer,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Share2,
  Target,
  BarChart3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export function BrandReportsDashboard() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchReports()
  }, [])

  async function fetchReports() {
    try {
      const { data } = await supabase
        .from("brand_reports")
        .select("*, clients(company_name)")
        .order("created_at", { ascending: false })

      setReports(data || [])
    } catch (error) {
      console.error("Error fetching reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const reportTypes = [
    { type: "brand_audit", label: "Brand Audit", icon: Award, color: "from-purple-500 to-pink-600" },
    { type: "competitor_analysis", label: "Competitor Analysis", icon: Target, color: "from-blue-500 to-cyan-600" },
    { type: "social_audit", label: "Social Media Audit", icon: Share2, color: "from-pink-500 to-rose-600" },
    { type: "market_research", label: "Market Research", icon: BarChart3, color: "from-green-500 to-emerald-600" },
  ]

  const stats = {
    total: reports.length || 12,
    draft: reports.filter((r) => r.status === "draft").length || 3,
    delivered: reports.filter((r) => r.status === "delivered").length || 8,
    inReview: reports.filter((r) => r.status === "in_review").length || 1,
  }

  // Sample reports for display
  const sampleReports =
    reports.length > 0
      ? reports
      : [
          {
            id: 1,
            title: "Q4 2024 Brand Audit Report",
            report_type: "brand_audit",
            status: "delivered",
            clients: { company_name: "TechStart LLC" },
            created_at: "2024-12-01",
          },
          {
            id: 2,
            title: "Competitor Analysis - Retail Sector",
            report_type: "competitor_analysis",
            status: "in_review",
            clients: { company_name: "Fashion Hub" },
            created_at: "2024-12-05",
          },
          {
            id: 3,
            title: "Social Media Performance Review",
            report_type: "social_audit",
            status: "draft",
            clients: { company_name: "Food Express" },
            created_at: "2024-12-08",
          },
          {
            id: 4,
            title: "Market Research - UAE E-commerce",
            report_type: "market_research",
            status: "delivered",
            clients: { company_name: "Digital Mart" },
            created_at: "2024-11-28",
          },
        ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Award className="h-6 w-6 text-white" />
            </div>
            Brand Reports
          </h1>
          <p className="text-gray-400 mt-1">Create professional, printable brand analysis reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/brand-reports/create">
            <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border-amber-700/30">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-amber-300">Total Reports</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-gray-700/30">
          <CardContent className="p-4 text-center">
            <Edit className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.draft}</p>
            <p className="text-xs text-gray-300">Drafts</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.inReview}</p>
            <p className="text-xs text-blue-300">In Review</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-700/30">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.delivered}</p>
            <p className="text-xs text-emerald-300">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reportTypes.map((type) => (
          <Link key={type.type} href={`/admin/brand-reports/create?type=${type.type}`}>
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#C4D600]/50 transition-all cursor-pointer group">
              <CardContent className="p-5 text-center">
                <div
                  className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                >
                  <type.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#C4D600] transition-colors">{type.label}</h3>
                <p className="text-xs text-gray-500 mt-1">Create new report</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Reports List */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">All Reports</CardTitle>
            <div className="flex gap-2">
              <Input placeholder="Search reports..." className="w-64 bg-gray-900 border-gray-700 text-white" />
              <Button variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleReports.map((report: any) => {
              const typeInfo = reportTypes.find((t) => t.type === report.report_type) || reportTypes[0]
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeInfo.color} flex items-center justify-center shadow-lg`}
                    >
                      <typeInfo.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{report.title}</h4>
                      <p className="text-sm text-gray-400">
                        {report.clients?.company_name || "No client"} •{" "}
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        report.status === "delivered"
                          ? "border-emerald-500 text-emerald-500"
                          : report.status === "in_review"
                            ? "border-blue-500 text-blue-500"
                            : report.status === "approved"
                              ? "border-green-500 text-green-500"
                              : "border-gray-500 text-gray-500"
                      }
                    >
                      {report.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Link href={`/admin/brand-reports/${report.id}`}>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/brand-reports/${report.id}/print`}>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#C4D600] h-8 w-8">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
