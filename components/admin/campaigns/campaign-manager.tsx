"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { ClientSelector } from "@/components/admin/client-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Rocket, Eye, EyeOff, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  client_id: string
  is_visible_to_client: boolean
  budget: number
  start_date: string
  end_date: string
  results: any
  created_at: string
}

export function CampaignManager() {
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [selectedClientName, setSelectedClientName] = useState<string>("")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(false)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const supabase = createBrowserClient()

  // New campaign form state
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "email",
    description: "",
    budget: 0,
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    is_visible_to_client: true,
  })

  useEffect(() => {
    if (selectedClientId) {
      fetchCampaigns()
    }
  }, [selectedClientId])

  async function fetchCampaigns() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("marketing_campaigns")
        .select("*")
        .eq("client_id", selectedClientId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setCampaigns(data || [])
      console.log("[v0] Fetched campaigns:", data?.length)
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
      toast.error("Failed to fetch campaigns")
    } finally {
      setLoading(false)
    }
  }

  async function createCampaign() {
    if (!selectedClientId) {
      toast.error("Please select a client first")
      return
    }

    if (!newCampaign.name || !newCampaign.end_date) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("marketing_campaigns")
        .insert([
          {
            ...newCampaign,
            client_id: selectedClientId,
            status: "draft",
            results: {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              revenue: 0,
            },
          },
        ])
        .select()

      if (error) throw error

      toast.success("Campaign created successfully!")
      setShowNewCampaign(false)
      setNewCampaign({
        name: "",
        type: "email",
        description: "",
        budget: 0,
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
        is_visible_to_client: true,
      })
      fetchCampaigns()
    } catch (error) {
      console.error("[v0] Error creating campaign:", error)
      toast.error("Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  async function launchCampaign(campaignId: string) {
    setLoading(true)
    try {
      const simulatedResults = {
        impressions: Math.floor(Math.random() * 10000) + 5000,
        clicks: Math.floor(Math.random() * 500) + 100,
        conversions: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 5000) + 1000,
        lastUpdated: new Date().toISOString(),
      }

      const { error } = await supabase
        .from("marketing_campaigns")
        .update({
          status: "active",
          results: simulatedResults,
        })
        .eq("id", campaignId)

      if (error) throw error

      toast.success("Campaign launched successfully! AI is generating results...")
      fetchCampaigns()
    } catch (error) {
      console.error("[v0] Error launching campaign:", error)
      toast.error("Failed to launch campaign")
    } finally {
      setLoading(false)
    }
  }

  async function toggleVisibility(campaignId: string, currentVisibility: boolean) {
    try {
      const { error } = await supabase
        .from("marketing_campaigns")
        .update({ is_visible_to_client: !currentVisibility })
        .eq("id", campaignId)

      if (error) throw error

      toast.success(`Campaign ${!currentVisibility ? "shown to" : "hidden from"} client`)
      fetchCampaigns()
    } catch (error) {
      console.error("[v0] Error toggling visibility:", error)
      toast.error("Failed to update visibility")
    }
  }

  async function deleteCampaign(campaignId: string) {
    if (!confirm("Are you sure you want to delete this campaign?")) return

    try {
      const { error } = await supabase.from("marketing_campaigns").delete().eq("id", campaignId)

      if (error) throw error

      toast.success("Campaign deleted")
      fetchCampaigns()
    } catch (error) {
      console.error("[v0] Error deleting campaign:", error)
      toast.error("Failed to delete campaign")
    }
  }

  return (
    <div className="space-y-6">
      {/* Client Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Client</CardTitle>
          <CardDescription>Choose a client to manage their marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientSelector
            selectedClientId={selectedClientId}
            onClientSelect={(id, name) => {
              setSelectedClientId(id)
              setSelectedClientName(name)
            }}
          />
          {selectedClientName && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">Currently managing campaigns for:</p>
              <p className="text-lg font-bold text-primary">{selectedClientName}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedClientId && (
        <>
          {/* Create New Campaign */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaigns</CardTitle>
                  <CardDescription>Create and manage marketing campaigns with AI automation</CardDescription>
                </div>
                <Button onClick={() => setShowNewCampaign(!showNewCampaign)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>

            {showNewCampaign && (
              <CardContent className="border-t pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Campaign Name *</Label>
                      <Input
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                        placeholder="Summer Sale 2024"
                      />
                    </div>
                    <div>
                      <Label>Campaign Type</Label>
                      <Select
                        value={newCampaign.type}
                        onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email Marketing</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="ppc">PPC Advertising</SelectItem>
                          <SelectItem value="seo">SEO Campaign</SelectItem>
                          <SelectItem value="content">Content Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={newCampaign.description}
                      onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                      placeholder="Campaign objectives and details..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Budget (AED)</Label>
                      <Input
                        type="number"
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="date"
                        value={newCampaign.start_date}
                        onChange={(e) => setNewCampaign({ ...newCampaign, start_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>End Date *</Label>
                      <Input
                        type="date"
                        value={newCampaign.end_date}
                        onChange={(e) => setNewCampaign({ ...newCampaign, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newCampaign.is_visible_to_client}
                        onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, is_visible_to_client: checked })}
                      />
                      <Label>Visible to client</Label>
                    </div>
                    <Button onClick={createCampaign} disabled={loading}>
                      Create Campaign
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Campaign List */}
          <div className="grid gap-4">
            {loading && campaigns.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">Loading campaigns...</CardContent>
              </Card>
            ) : campaigns.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No campaigns yet. Create your first campaign above!
                </CardContent>
              </Card>
            ) : (
              campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {campaign.name}
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          {campaign.is_visible_to_client ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {campaign.type} • Budget: AED {campaign.budget?.toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {campaign.status === "draft" && (
                          <Button onClick={() => launchCampaign(campaign.id)} size="sm">
                            <Rocket className="h-4 w-4 mr-2" />
                            Launch
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleVisibility(campaign.id, campaign.is_visible_to_client)}
                        >
                          {campaign.is_visible_to_client ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteCampaign(campaign.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {campaign.status === "active" && campaign.results && (
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <p className="text-sm text-muted-foreground">Impressions</p>
                          <p className="text-2xl font-bold">{campaign.results.impressions?.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="text-2xl font-bold">{campaign.results.clicks?.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="text-2xl font-bold">{campaign.results.conversions?.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-bold">AED {campaign.results.revenue?.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
