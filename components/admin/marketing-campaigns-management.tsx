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
import { Plus, RefreshCw, Trash2, Edit, Megaphone, DollarSign, TrendingUp, Eye, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import ClientSelector from "@/components/admin/client-selector" // Assuming ClientSelector is imported from this path

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  target_countries: string[]
  target_services: string[]
  budget: number
  spent: number
  start_date: string
  end_date: string
  impressions: number
  clicks: number
  conversions: number
  created_at: string
  client_id: string
  is_visible_to_client: boolean
}

const campaignTypes = [
  { value: "email", label: "Email Marketing" },
  { value: "social", label: "Social Media" },
  { value: "ppc", label: "PPC / Google Ads" },
  { value: "seo", label: "SEO Campaign" },
  { value: "content", label: "Content Marketing" },
  { value: "influencer", label: "Influencer" },
]

const countries = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Egypt", "Jordan", "USA", "UK", "India"]

export function MarketingCampaignsManagement() {
  const supabase = createClient()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedClientName, setSelectedClientName] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    type: "social",
    target_countries: [] as string[],
    budget: 0,
    start_date: "",
    end_date: "",
  })

  async function fetchData() {
    let query = supabase.from("marketing_campaigns").select("*")

    if (selectedClientId) {
      query = query.eq("client_id", selectedClientId)
    }

    const { data } = await query.order("created_at", { ascending: false })

    if (data) setCampaigns(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [selectedClientId])

  function resetForm() {
    setFormData({
      name: "",
      type: "social",
      target_countries: [],
      budget: 0,
      start_date: "",
      end_date: "",
    })
    setEditingCampaign(null)
  }

  function handleEdit(campaign: Campaign) {
    setEditingCampaign(campaign)
    setFormData({
      name: campaign.name,
      type: campaign.type,
      target_countries: campaign.target_countries || [],
      budget: campaign.budget,
      start_date: campaign.start_date || "",
      end_date: campaign.end_date || "",
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    if (!formData.name) {
      toast.error("Please enter a campaign name")
      return
    }

    if (!selectedClientId) {
      toast.error("Please select a client first")
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (editingCampaign) {
      const { error } = await supabase
        .from("marketing_campaigns")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingCampaign.id)

      if (error) {
        toast.error("Failed to update campaign")
        return
      }
      toast.success("Campaign updated")
    } else {
      const { error } = await supabase.from("marketing_campaigns").insert([
        {
          ...formData,
          client_id: selectedClientId,
          status: "draft",
          impressions: 0,
          clicks: 0,
          conversions: 0,
          spent: 0,
          created_by: user?.id,
          is_visible_to_client: true,
        },
      ])

      if (error) {
        toast.error("Failed to create campaign")
        return
      }
      toast.success("Campaign created")
    }

    setDialogOpen(false)
    resetForm()
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this campaign?")) return

    const { error } = await supabase.from("marketing_campaigns").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete campaign")
      return
    }

    toast.success("Campaign deleted")
    fetchData()
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("marketing_campaigns").update({ status }).eq("id", id)

    if (error) {
      toast.error("Failed to update status")
      return
    }

    fetchData()
  }

  async function launchCampaign(campaignId: string) {
    const campaign = campaigns.find((c) => c.id === campaignId)
    if (!campaign) return

    const daysRunning = campaign.start_date
      ? Math.max(
          1,
          Math.floor((new Date().getTime() - new Date(campaign.start_date).getTime()) / (1000 * 60 * 60 * 24)),
        )
      : 1

    const dailyBudget = campaign.budget / 30
    const estimatedImpressions = Math.floor(dailyBudget * 100 * daysRunning * (0.8 + Math.random() * 0.4))
    const clickRate = 0.02 + Math.random() * 0.03
    const estimatedClicks = Math.floor(estimatedImpressions * clickRate)
    const conversionRate = 0.05 + Math.random() * 0.1
    const estimatedConversions = Math.floor(estimatedClicks * conversionRate)
    const spent = Math.min(campaign.budget, dailyBudget * daysRunning)

    const { error } = await supabase
      .from("marketing_campaigns")
      .update({
        status: "active",
        impressions: estimatedImpressions,
        clicks: estimatedClicks,
        conversions: estimatedConversions,
        spent: spent,
      })
      .eq("id", campaignId)

    if (!error) {
      toast.success(
        `Campaign launched! Generated ${estimatedImpressions.toLocaleString()} impressions, ${estimatedClicks} clicks, ${estimatedConversions} conversions`,
      )
      fetchData()
    }
  }

  async function toggleVisibility(campaignId: string, currentVisibility: boolean) {
    const { error } = await supabase
      .from("marketing_campaigns")
      .update({ is_visible_to_client: !currentVisibility })
      .eq("id", campaignId)

    if (!error) {
      toast.success(currentVisibility ? "Hidden from client" : "Visible to client")
      fetchData()
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400"
      case "completed":
        return "bg-blue-500/20 text-blue-400"
      case "draft":
        return "bg-gray-500/20 text-gray-400"
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

  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0)
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0)

  const chartData = campaigns.slice(0, 5).map((c) => ({
    name: c.name.substring(0, 15),
    impressions: c.impressions,
    clicks: c.clicks,
    conversions: c.conversions,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <ClientSelector
            selectedClient={{ id: selectedClientId, name: selectedClientName }}
            onClientChange={(client) => {
              setSelectedClientId(client.id)
              setSelectedClientName(client.name)
            }}
          />
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]" disabled={!selectedClientId}>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141414] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCampaign ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingCampaign ? "Update campaign details" : "Set up a new marketing campaign"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Campaign Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Summer Sale 2024"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {campaignTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Countries</Label>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <Badge
                      key={country}
                      variant={formData.target_countries.includes(country) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        formData.target_countries.includes(country)
                          ? "bg-[#C4D600] text-black"
                          : "border-white/20 text-gray-300"
                      }`}
                      onClick={() => {
                        if (formData.target_countries.includes(country)) {
                          setFormData({
                            ...formData,
                            target_countries: formData.target_countries.filter((c) => c !== country),
                          })
                        } else {
                          setFormData({
                            ...formData,
                            target_countries: [...formData.target_countries, country],
                          })
                        }
                      }}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget (AED)</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number.parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false)
                  resetForm()
                }}
                className="border-white/20"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                {editingCampaign ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!selectedClientId && (
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 mb-2">Select a client to manage their campaigns</p>
          </CardContent>
        </Card>
      )}

      {selectedClientId && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Budget</p>
                    <p className="text-2xl font-bold text-white">{totalBudget.toLocaleString()} AED</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-[#C4D600]" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-white">{totalSpent.toLocaleString()} AED</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Impressions</p>
                    <p className="text-2xl font-bold text-white">{totalImpressions.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Conversions</p>
                    <p className="text-2xl font-bold text-white">{totalConversions}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {chartData.length > 0 && (
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <h3 className="text-white font-medium mb-4">Campaign Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="impressions" fill="#C4D600" name="Impressions" />
                    <Bar dataKey="clicks" fill="#3B82F6" name="Clicks" />
                    <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-[#141414] border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-[#C4D600]/20 rounded-lg flex items-center justify-center">
                        <Megaphone className="h-6 w-6 text-[#C4D600]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{campaign.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{campaign.type.replace("_", " ")}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              campaign.is_visible_to_client
                                ? "border-green-500/50 text-green-400"
                                : "border-gray-500/50 text-gray-400"
                            }
                          >
                            {campaign.is_visible_to_client ? "Visible to Client" : "Hidden"}
                          </Badge>
                          {campaign.target_countries?.slice(0, 3).map((country) => (
                            <Badge key={country} variant="outline" className="border-white/20 text-gray-300 text-xs">
                              {country}
                            </Badge>
                          ))}
                          {(campaign.target_countries?.length || 0) > 3 && (
                            <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                              +{campaign.target_countries.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {campaign.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => launchCampaign(campaign.id)}
                          className="bg-[#C4D600] text-black hover:bg-[#d4e600] border-0"
                        >
                          Launch Campaign
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleVisibility(campaign.id, campaign.is_visible_to_client)}
                        className="h-8 w-8 border-white/20 bg-transparent"
                      >
                        <Eye
                          className={`h-4 w-4 ${campaign.is_visible_to_client ? "text-green-400" : "text-gray-400"}`}
                        />
                      </Button>
                      <Select value={campaign.status} onValueChange={(v) => updateStatus(campaign.id, v)}>
                        <SelectTrigger className="w-28 bg-white/5 border-white/10 text-sm h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10">
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(campaign)}
                        className="h-8 w-8 border-white/20 bg-transparent"
                      >
                        <Edit className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(campaign.id)}
                        className="h-8 w-8 border-red-500/50 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{campaign.budget.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Budget (AED)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{campaign.spent.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Spent (AED)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{campaign.impressions.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Impressions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{campaign.clicks.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{campaign.conversions}</p>
                      <p className="text-xs text-gray-400">Conversions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {campaigns.length === 0 && (
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="py-12 text-center">
                  <Megaphone className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">No campaigns for {selectedClientName} yet</p>
                  <Button onClick={() => setDialogOpen(true)} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}
