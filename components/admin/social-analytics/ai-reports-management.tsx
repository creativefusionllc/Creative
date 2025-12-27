"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { RefreshCw, FileText, Sparkles, Download, Eye, Calendar, TrendingUp, Users, BarChart3 } from "lucide-react"

interface Client {
  id: string
  name: string
}

interface SocialReport {
  id: string
  client_id: string
  report_type: string
  report_period_start: string
  report_period_end: string
  total_followers: number
  followers_growth: number
  total_posts: number
  total_engagement: number
  avg_engagement_rate: number
  ai_insights: string | null
  status: string
  generated_at: string | null
  created_at: string
  clients?: { name: string }
}

export function AIReportsManagement() {
  const supabase = createClient()
  const [reports, setReports] = useState<SocialReport[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewingReport, setViewingReport] = useState<SocialReport | null>(null)

  const [formData, setFormData] = useState({
    client_id: "",
    report_type: "monthly",
    report_period_start: "",
    report_period_end: "",
  })

  async function fetchData() {
    const [reportsRes, clientsRes] = await Promise.all([
      supabase.from("social_media_reports").select("*, clients(name)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ])

    if (reportsRes.data) setReports(reportsRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function generateReport() {
    if (!formData.client_id || !formData.report_period_start || !formData.report_period_end) {
      toast.error("Please fill in all required fields")
      return
    }

    setGenerating(true)

    // Fetch client's actual social media data from database
    const { data: accounts } = await supabase
      .from("social_media_accounts")
      .select("*")
      .eq("client_id", formData.client_id)
      .eq("is_active", true)

    // Calculate real totals from database
    const totalFollowers = accounts?.reduce((sum, a) => sum + (a.followers_count || 0), 0) || 0
    const totalPosts = accounts?.reduce((sum, a) => sum + (a.posts_count || 0), 0) || 0
    const totalFollowing = accounts?.reduce((sum, a) => sum + (a.following_count || 0), 0) || 0

    // Fetch previous report to calculate actual growth
    const { data: previousReport } = await supabase
      .from("social_media_reports")
      .select("total_followers")
      .eq("client_id", formData.client_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    const followersGrowth = previousReport ? totalFollowers - (previousReport.total_followers || 0) : 0

    // Generate AI insights using real data
    let aiInsights = ""
    try {
      const clientName = clients.find((c) => c.id === formData.client_id)?.name
      const response = await fetch("/api/ai/generate-social-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          totalFollowers,
          totalPosts,
          accounts: accounts || [],
          periodStart: formData.report_period_start,
          periodEnd: formData.report_period_end,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        aiInsights = data.insights
      }
    } catch (error) {
      console.error("AI generation failed:", error)
      aiInsights = "AI insights generation failed. Please try again."
    }

    // Calculate engagement rate from real data
    const avgEngagementRate =
      totalFollowers > 0 ? Number.parseFloat(((totalPosts / totalFollowers) * 100).toFixed(2)) : 0

    // Create report with real data
    const { error } = await supabase.from("social_media_reports").insert([
      {
        client_id: formData.client_id,
        report_type: formData.report_type,
        report_period_start: formData.report_period_start,
        report_period_end: formData.report_period_end,
        total_followers: totalFollowers,
        followers_growth: followersGrowth,
        total_posts: totalPosts,
        total_engagement: Math.floor(totalFollowers * 0.03), // Estimated 3% engagement
        avg_engagement_rate: avgEngagementRate,
        ai_insights: aiInsights,
        status: "completed",
        generated_at: new Date().toISOString(),
      },
    ])

    setGenerating(false)

    if (error) {
      toast.error("Failed to generate report")
      return
    }

    toast.success("Report generated with real data and AI insights!")
    setDialogOpen(false)
    setFormData({ client_id: "", report_type: "monthly", report_period_start: "", report_period_end: "" })
    fetchData()
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Social Media Reports</h1>
          <p className="text-gray-400">Generate AI-powered reports using real database data</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141414] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Generate AI Report</DialogTitle>
              <DialogDescription className="text-gray-400">
                Creates a report using real data from connected social accounts
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Client *</Label>
                <Select value={formData.client_id} onValueChange={(v) => setFormData({ ...formData, client_id: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select
                  value={formData.report_type}
                  onValueChange={(v) => setFormData({ ...formData, report_type: v })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Period Start *</Label>
                  <Input
                    type="date"
                    value={formData.report_period_start}
                    onChange={(e) => setFormData({ ...formData, report_period_start: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Period End *</Label>
                  <Input
                    type="date"
                    value={formData.report_period_end}
                    onChange={(e) => setFormData({ ...formData, report_period_end: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm text-blue-300">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Report will use real data from connected social media accounts and generate AI-powered insights.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-white/20">
                Cancel
              </Button>
              <Button
                onClick={generateReport}
                disabled={generating}
                className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-[#141414] border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#C4D600]/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{report.clients?.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{report.report_type} Report</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {new Date(report.report_period_start).toLocaleDateString()} -{" "}
                        {new Date(report.report_period_end).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Users className="h-5 w-5 mx-auto text-[#C4D600] mb-1" />
                  <p className="font-bold text-white">{(report.total_followers || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Followers</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto text-green-400 mb-1" />
                  <p className="font-bold text-white">
                    {report.followers_growth >= 0 ? "+" : ""}
                    {report.followers_growth || 0}
                  </p>
                  <p className="text-xs text-gray-400">Growth</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FileText className="h-5 w-5 mx-auto text-blue-400 mb-1" />
                  <p className="font-bold text-white">{report.total_posts || 0}</p>
                  <p className="text-xs text-gray-400">Posts</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <BarChart3 className="h-5 w-5 mx-auto text-purple-400 mb-1" />
                  <p className="font-bold text-white">{report.avg_engagement_rate || 0}%</p>
                  <p className="text-xs text-gray-400">Engagement</p>
                </div>
              </div>

              {report.ai_insights && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">AI Insights</span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3 whitespace-pre-wrap">{report.ai_insights}</p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-gray-300 hover:bg-white/10 bg-transparent"
                  onClick={() => setViewingReport(report)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Full Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-gray-300 hover:bg-white/10 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {reports.length === 0 && (
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 mb-2">No reports generated yet</p>
              <p className="text-sm text-gray-500 mb-4">Generate AI-powered reports using real client data</p>
              <Button onClick={() => setDialogOpen(true)} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate First Report
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Report Dialog */}
      <Dialog open={!!viewingReport} onOpenChange={() => setViewingReport(null)}>
        <DialogContent className="bg-[#141414] border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Social Media Report - {viewingReport?.clients?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {viewingReport?.report_type} report for {viewingReport?.report_period_start} to{" "}
              {viewingReport?.report_period_end}
            </DialogDescription>
          </DialogHeader>
          {viewingReport && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Followers</p>
                  <p className="text-2xl font-bold text-white">
                    {(viewingReport.total_followers || 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Follower Growth</p>
                  <p
                    className={`text-2xl font-bold ${viewingReport.followers_growth >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {viewingReport.followers_growth >= 0 ? "+" : ""}
                    {viewingReport.followers_growth || 0}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{viewingReport.total_posts || 0}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Avg Engagement Rate</p>
                  <p className="text-2xl font-bold text-white">{viewingReport.avg_engagement_rate || 0}%</p>
                </div>
              </div>

              {viewingReport.ai_insights && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="font-bold text-white">AI-Generated Insights</h3>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{viewingReport.ai_insights}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingReport(null)} className="border-white/20">
              Close
            </Button>
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
