"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calendar, TrendingUp } from "lucide-react"

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  start_date: string
  end_date: string
  created_at: string
  results?: {
    impressions?: number
    clicks?: number
    conversions?: number
  }
}

export default function ClientCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createBrowserClient()

  useEffect(() => {
    fetchUserAndCampaigns()
  }, [])

  async function fetchUserAndCampaigns() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data: clientData } = await supabase.from("clients").select("id").eq("user_id", user.id).single()

      if (!clientData) return

      const { data, error } = await supabase
        .from("marketing_campaigns")
        .select("*")
        .eq("client_id", clientData.id)
        .eq("is_visible_to_client", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      setCampaigns(data || [])
      console.log("[v0] Fetched client campaigns:", data?.length)
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "paused":
        return "bg-yellow-500/20 text-yellow-500"
      case "completed":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return "0.00"
    return ((clicks / impressions) * 100).toFixed(2)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading your campaigns...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Marketing Campaigns</h1>
        <p className="text-muted-foreground mt-1">View your active marketing campaigns and AI-generated results</p>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground text-center">
              Your marketing campaigns will appear here once they are set up by the admin team.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle>{campaign.name}</CardTitle>
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Type: {campaign.type.replace("_", " ")}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(campaign.start_date).toLocaleDateString()}
                        {campaign.end_date && ` - ${new Date(campaign.end_date).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Impressions</div>
                    <div className="text-2xl font-bold">
                      {campaign.results?.impressions?.toLocaleString() || campaign.impressions.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <div className="text-sm text-green-600 dark:text-green-400 mb-1">Clicks</div>
                    <div className="text-2xl font-bold">
                      {campaign.results?.clicks?.toLocaleString() || campaign.clicks.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">CTR</div>
                    <div className="text-2xl font-bold">
                      {getCTR(
                        campaign.results?.clicks || campaign.clicks,
                        campaign.results?.impressions || campaign.impressions,
                      )}
                      %
                    </div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">Conversions</div>
                    <div className="text-2xl font-bold">{campaign.results?.conversions || campaign.conversions}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Budget: <span className="font-semibold">AED {campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-full h-2 w-32">
                      <div
                        className="bg-gradient-to-r from-[#c4d600] to-[#e8573f] h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {((campaign.spent / campaign.budget) * 100).toFixed(0)}% spent
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
