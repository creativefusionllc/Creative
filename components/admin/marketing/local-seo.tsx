"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Star,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Zap,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

interface GBPData {
  name: string
  category: string
  address: string
  phone: string
  website: string
  rating: number
  totalReviews: number
  profileStrength: number
  verified: boolean
}

interface ProfileChecklistItem {
  item: string
  status: "complete" | "warning" | "incomplete"
  note?: string
}

interface Review {
  author: string
  rating: number
  text: string
  date: string
  replied: boolean
}

interface LocalKeyword {
  keyword: string
  position: number
  change: number
}

export function LocalSeoDashboard() {
  const [refreshing, setRefreshing] = useState(false)
  const [businessName, setBusinessName] = useState("")
  const [analyzed, setAnalyzed] = useState(false)

  const [gbpData, setGbpData] = useState<GBPData | null>(null)
  const [profileChecklist, setProfileChecklist] = useState<ProfileChecklistItem[]>([])
  const [recentReviews, setRecentReviews] = useState<Review[]>([])
  const [localKeywords, setLocalKeywords] = useState<LocalKeyword[]>([])

  const completedItems = profileChecklist.filter((i) => i.status === "complete").length
  const profileCompletion =
    profileChecklist.length > 0 ? Math.round((completedItems / profileChecklist.length) * 100) : 0

  async function handleAnalyze() {
    if (!businessName) {
      toast.error("Please enter your business name")
      return
    }

    setRefreshing(true)

    try {
      const response = await fetch("/api/ai/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: businessName,
          type: "local-seo",
        }),
      })

      if (!response.ok) throw new Error("Failed to analyze")

      const data = await response.json()

      // Set AI-generated data
      if (data.localSeo) {
        setGbpData(data.localSeo.gbpData)
        setProfileChecklist(data.localSeo.checklist || [])
        setRecentReviews(data.localSeo.reviews || [])
        setLocalKeywords(data.localSeo.keywords || [])
      }

      setAnalyzed(true)
      toast.success("Local SEO analysis complete!")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Failed to analyze. Please try again.")
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              AI Local SEO
            </h1>
            <p className="text-gray-400 mt-1">AI-powered Google Business Profile and local search analysis</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Business Input */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-400 mb-2 block">Business Name or Website</label>
                <Input
                  placeholder="Enter your business name or website URL"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-[#141414] border-[#2a2a2a] text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={refreshing}
                  className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                >
                  {refreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Local SEO
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {analyzed && gbpData && (
          <>
            {/* GBP Overview */}
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C4D600] to-amber-500 rounded-xl flex items-center justify-center text-2xl font-bold text-black">
                      {gbpData.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">{gbpData.name}</h2>
                        {gbpData.verified && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-0">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400">{gbpData.category}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {gbpData.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-3xl font-bold text-white">{gbpData.rating}</span>
                      </div>
                      <p className="text-xs text-gray-400">{gbpData.totalReviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#1f1f1f" strokeWidth="6" fill="none" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#C4D600"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${(profileCompletion / 100) * 176} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-[#C4D600]">{profileCompletion}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Profile Strength</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Checklist */}
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C4D600]" />
                    Profile Optimization Checklist
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete all items for maximum local visibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profileChecklist.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No checklist data yet. Run analysis to see recommendations.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profileChecklist.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.status === "complete" ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : item.status === "warning" ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                            )}
                            <span className={item.status === "complete" ? "text-white" : "text-gray-400"}>
                              {item.item}
                            </span>
                          </div>
                          {item.note && <span className="text-xs text-yellow-400">{item.note}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        Recent Reviews
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage and respond to customer reviews
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentReviews.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No reviews data yet. Run analysis to see reviews.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentReviews.map((review, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-xl">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="font-medium text-white">{review.author}</span>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">{review.date}</span>
                              {review.replied ? (
                                <Badge className="ml-2 bg-green-500/20 text-green-400 border-0 text-xs">Replied</Badge>
                              ) : (
                                <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-0 text-xs">
                                  Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{review.text}</p>
                          {!review.replied && (
                            <Button variant="ghost" size="sm" className="mt-2 text-[#C4D600] hover:text-[#d4e600]">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Local Keyword Rankings */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="h-5 w-5 text-[#C4D600]" />
                  Local Keyword Rankings
                </CardTitle>
                <CardDescription className="text-gray-400">Track your rankings in local search results</CardDescription>
              </CardHeader>
              <CardContent>
                {localKeywords.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No keyword data yet. Run analysis to see local rankings.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-3 text-gray-400 font-medium">Keyword</th>
                          <th className="text-center p-3 text-gray-400 font-medium">Local Pack Position</th>
                          <th className="text-center p-3 text-gray-400 font-medium">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localKeywords.map((kw, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-3 text-white font-medium">{kw.keyword}</td>
                            <td className="p-3 text-center">
                              <Badge
                                className={`${
                                  kw.position <= 3
                                    ? "bg-green-500/20 text-green-400"
                                    : kw.position <= 5
                                      ? "bg-[#C4D600]/20 text-[#C4D600]"
                                      : "bg-yellow-500/20 text-yellow-400"
                                } border-0`}
                              >
                                #{kw.position}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              {kw.change > 0 ? (
                                <span className="text-green-400 flex items-center justify-center gap-1">
                                  <TrendingUp className="h-4 w-4" />+{kw.change}
                                </span>
                              ) : kw.change < 0 ? (
                                <span className="text-red-400 flex items-center justify-center gap-1">
                                  <TrendingUp className="h-4 w-4 rotate-180" />
                                  {kw.change}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {!analyzed && (
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-12 text-center">
              <MapPin className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Local SEO Data Yet</h3>
              <p className="text-gray-400 mb-6">
                Enter your business name or website URL and click "Analyze Local SEO" to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
