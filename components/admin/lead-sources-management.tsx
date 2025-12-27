"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  RefreshCw,
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  SearchIcon,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  MoreVertical,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LeadSource {
  id: string
  name: string
  type: string
  campaign_id: string | null
  cost: number
  leads_count: number
  conversions_count: number
  is_active: boolean
  created_at: string
}

const sourceTypeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  organic: { label: "Organic", icon: Globe, color: "bg-green-500/20 text-green-400" },
  google_ads: { label: "Google Ads", icon: SearchIcon, color: "bg-blue-500/20 text-blue-400" },
  facebook_ads: { label: "Facebook Ads", icon: Facebook, color: "bg-indigo-500/20 text-indigo-400" },
  linkedin_ads: { label: "LinkedIn Ads", icon: Linkedin, color: "bg-sky-500/20 text-sky-400" },
  instagram_ads: { label: "Instagram Ads", icon: Instagram, color: "bg-pink-500/20 text-pink-400" },
  referral: { label: "Referral", icon: Users, color: "bg-purple-500/20 text-purple-400" },
  email: { label: "Email Campaign", icon: Target, color: "bg-orange-500/20 text-orange-400" },
  exhibition: { label: "Exhibition", icon: Globe, color: "bg-yellow-500/20 text-yellow-400" },
}

export function LeadSourcesManagement() {
  const [sources, setSources] = useState<LeadSource[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: "",
    type: "organic",
    campaign_id: "",
    cost: 0,
  })

  const [stats, setStats] = useState({
    totalSources: 0,
    totalLeads: 0,
    totalConversions: 0,
    totalSpent: 0,
    avgCostPerLead: 0,
  })

  useEffect(() => {
    fetchSources()
  }, [])

  async function fetchSources() {
    setLoading(true)
    const { data, error } = await supabase.from("lead_sources").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setSources(data)
      calculateStats(data)
    }
    setLoading(false)
  }

  function calculateStats(sourcesData: LeadSource[]) {
    const totalSources = sourcesData.length
    const totalLeads = sourcesData.reduce((sum, s) => sum + s.leads_count, 0)
    const totalConversions = sourcesData.reduce((sum, s) => sum + s.conversions_count, 0)
    const totalSpent = sourcesData.reduce((sum, s) => sum + s.cost, 0)
    const avgCostPerLead = totalLeads > 0 ? totalSpent / totalLeads : 0

    setStats({ totalSources, totalLeads, totalConversions, totalSpent, avgCostPerLead })
  }

  async function handleAddSource() {
    const { error } = await supabase.from("lead_sources").insert(formData)

    if (!error) {
      setIsAddOpen(false)
      setFormData({ name: "", type: "organic", campaign_id: "", cost: 0 })
      fetchSources()
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    await supabase.from("lead_sources").update({ is_active: !isActive }).eq("id", id)
    fetchSources()
  }

  async function handleDeleteSource(id: string) {
    if (!confirm("Are you sure you want to delete this source?")) return
    await supabase.from("lead_sources").delete().eq("id", id)
    fetchSources()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Sources</h1>
          <p className="text-gray-400">Track and manage your lead generation channels</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSources}
            className="border-white/10 text-gray-300 hover:text-white bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#141414] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Add Lead Source</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new channel to track lead generation
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Source Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="e.g., Google Ads - UAE Campaign"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {Object.entries(sourceTypeConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                          <div className="flex items-center gap-2">
                            <config.icon className="h-4 w-4" />
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Campaign ID (Optional)</Label>
                  <Input
                    value={formData.campaign_id}
                    onChange={(e) => setFormData({ ...formData, campaign_id: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="External campaign identifier"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget / Cost (AED)</Label>
                  <Input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-white/10 text-gray-300">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSource}
                  disabled={!formData.name}
                  className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90"
                >
                  Add Source
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total Sources</p>
                <p className="text-2xl font-bold text-white">{stats.totalSources}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total Leads</p>
                <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Conversions</p>
                <p className="text-2xl font-bold text-white">{stats.totalConversions}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-white">AED {stats.totalSpent.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Cost/Lead</p>
                <p className="text-2xl font-bold text-white">AED {stats.avgCostPerLead.toFixed(0)}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-[#C4D600]/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-[#C4D600]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : sources.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
            <Globe className="h-12 w-12 mb-4 opacity-50" />
            <p>No lead sources yet</p>
            <Button variant="link" onClick={() => setIsAddOpen(true)} className="text-[#C4D600] mt-2">
              Add your first source
            </Button>
          </div>
        ) : (
          sources.map((source) => {
            const config = sourceTypeConfig[source.type] || sourceTypeConfig.organic
            const conversionRate =
              source.leads_count > 0 ? ((source.conversions_count / source.leads_count) * 100).toFixed(1) : 0
            const costPerLead = source.leads_count > 0 ? (source.cost / source.leads_count).toFixed(0) : 0

            return (
              <Card key={source.id} className={`bg-[#141414] border-white/10 ${!source.is_active ? "opacity-60" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${config.color} flex items-center justify-center`}>
                        <config.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-white">{source.name}</CardTitle>
                        <Badge className={config.color}>{config.label}</Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(source.id, source.is_active)}
                          className="text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          {source.is_active ? (
                            <>
                              <ToggleRight className="h-4 w-4 mr-2" /> Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="h-4 w-4 mr-2" /> Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteSource(source.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">{source.leads_count}</p>
                      <p className="text-xs text-gray-400">Leads</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">{source.conversions_count}</p>
                      <p className="text-xs text-gray-400">Conversions</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#C4D600]">{conversionRate}%</p>
                      <p className="text-xs text-gray-400">Conv. Rate</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">AED {costPerLead}</p>
                      <p className="text-xs text-gray-400">Cost/Lead</p>
                    </div>
                  </div>
                  {source.cost > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Budget Spent</span>
                        <span className="text-white font-medium">AED {source.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
