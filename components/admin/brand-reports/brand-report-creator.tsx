"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Award,
  ArrowLeft,
  Save,
  Eye,
  Printer,
  Plus,
  Trash2,
  Upload,
  FileText,
  Star,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function BrandReportCreator() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [reportData, setReportData] = useState({
    title: "",
    report_type: "brand_audit",
    client_id: "",
    executive_summary: "",
    brand_overview: "",
    brand_strengths: [""],
    brand_weaknesses: [""],
    recommendations: [""],
    include_cover_page: true,
    include_toc: true,
    include_appendix: true,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const addListItem = (field: "brand_strengths" | "brand_weaknesses" | "recommendations") => {
    setReportData({
      ...reportData,
      [field]: [...reportData[field], ""],
    })
  }

  const updateListItem = (
    field: "brand_strengths" | "brand_weaknesses" | "recommendations",
    index: number,
    value: string,
  ) => {
    const updated = [...reportData[field]]
    updated[index] = value
    setReportData({ ...reportData, [field]: updated })
  }

  const removeListItem = (field: "brand_strengths" | "brand_weaknesses" | "recommendations", index: number) => {
    const updated = reportData[field].filter((_, i) => i !== index)
    setReportData({ ...reportData, [field]: updated })
  }

  async function handleSave() {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("brand_reports")
        .insert({
          ...reportData,
          brand_strengths: reportData.brand_strengths.filter((s) => s.trim()),
          brand_weaknesses: reportData.brand_weaknesses.filter((s) => s.trim()),
          recommendations: reportData.recommendations.filter((s) => s.trim()),
          status: "draft",
          report_number: `BR-${Date.now()}`,
        })
        .select()
        .single()

      if (error) throw error
      router.push(`/admin/brand-reports/${data.id}`)
    } catch (error) {
      console.error("Error saving report:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/brand-reports">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Create Brand Report</h1>
            <p className="text-gray-400">Build a professional, printable brand analysis report</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Report Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-gray-400">Report Title</Label>
                  <Input
                    placeholder="Q4 2024 Brand Audit Report"
                    value={reportData.title}
                    onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Report Type</Label>
                  <Select
                    value={reportData.report_type}
                    onValueChange={(v) => setReportData({ ...reportData, report_type: v })}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-800">
                      <SelectItem value="brand_audit">Brand Audit</SelectItem>
                      <SelectItem value="competitor_analysis">Competitor Analysis</SelectItem>
                      <SelectItem value="social_audit">Social Media Audit</SelectItem>
                      <SelectItem value="market_research">Market Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-400">Client</Label>
                  <Select
                    value={reportData.client_id}
                    onValueChange={(v) => setReportData({ ...reportData, client_id: v })}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-800">
                      <SelectItem value="1">TechStart LLC</SelectItem>
                      <SelectItem value="2">Fashion Hub</SelectItem>
                      <SelectItem value="3">Food Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#C4D600]" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Provide a high-level overview of the brand analysis findings..."
                value={reportData.executive_summary}
                onChange={(e) => setReportData({ ...reportData, executive_summary: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
              />
            </CardContent>
          </Card>

          {/* Brand Overview */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C4D600]" />
                Brand Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe the brand's current market position, identity, and perception..."
                value={reportData.brand_overview}
                onChange={(e) => setReportData({ ...reportData, brand_overview: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
              />
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-emerald-400" />
                  Brand Strengths
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addListItem("brand_strengths")}
                  className="text-[#C4D600]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportData.brand_strengths.map((strength, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Strength ${i + 1}`}
                    value={strength}
                    onChange={(e) => updateListItem("brand_strengths", i, e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("brand_strengths", i)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  Areas for Improvement
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addListItem("brand_weaknesses")}
                  className="text-[#C4D600]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportData.brand_weaknesses.map((weakness, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Area ${i + 1}`}
                    value={weakness}
                    onChange={(e) => updateListItem("brand_weaknesses", i, e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("brand_weaknesses", i)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-400" />
                  Recommendations
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addListItem("recommendations")}
                  className="text-[#C4D600]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportData.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Recommendation ${i + 1}`}
                    value={rec}
                    onChange={(e) => updateListItem("recommendations", i, e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("recommendations", i)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Print Options */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Printer className="h-5 w-5 text-[#C4D600]" />
                Print Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-400">Include Cover Page</Label>
                <Switch
                  checked={reportData.include_cover_page}
                  onCheckedChange={(v) => setReportData({ ...reportData, include_cover_page: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-400">Include Table of Contents</Label>
                <Switch
                  checked={reportData.include_toc}
                  onCheckedChange={(v) => setReportData({ ...reportData, include_toc: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-400">Include Appendix</Label>
                <Switch
                  checked={reportData.include_appendix}
                  onCheckedChange={(v) => setReportData({ ...reportData, include_appendix: v })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-[#C4D600]/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Click to upload cover image</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Report Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sections Completed</span>
                <Badge className="bg-[#C4D600]/20 text-[#C4D600]">
                  {
                    [
                      reportData.title,
                      reportData.executive_summary,
                      reportData.brand_overview,
                      reportData.brand_strengths.some((s) => s),
                      reportData.brand_weaknesses.some((s) => s),
                      reportData.recommendations.some((s) => s),
                    ].filter(Boolean).length
                  }{" "}
                  / 6
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Strengths Listed</span>
                <span className="text-white">{reportData.brand_strengths.filter((s) => s).length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Weaknesses Listed</span>
                <span className="text-white">{reportData.brand_weaknesses.filter((s) => s).length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Recommendations</span>
                <span className="text-white">{reportData.recommendations.filter((s) => s).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
