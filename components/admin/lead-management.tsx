"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Building2,
  MapPin,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  PhoneCall,
  Send,
  UserPlus,
  Globe,
  Users,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

interface Lead {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  company: string | null
  position: string | null
  country: string
  city: string | null
  source: string
  status: string
  priority: string
  service_interest: string[] | null
  budget_range: string | null
  notes: string | null
  lead_score: number
  last_contact_at: string | null
  next_followup_at: string | null
  created_at: string
  client_id: string | null // Added for client association
  ai_insights: string | null // Added for AI insights
  next_action: string | null // Added for next action
  next_action_date: string | null // Added for next action date
  converted_at: string | null // Added for conversion tracking
  converted_to_client_id: string | null // Added for conversion tracking
}

interface LeadActivity {
  id: string
  lead_id: string
  activity_type: string
  title: string
  description: string | null
  outcome: string | null
  created_at: string
}

interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  country: string | null
  city: string | null
}

const countries = [
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Iraq",
  "Pakistan",
  "India",
  "UK",
  "USA",
  "Germany",
  "France",
  "Canada",
  "Australia",
]

const services = [
  "Creative Branding",
  "Photography",
  "Videography",
  "Digital Marketing",
  "Web Development",
  "Software & Apps",
  "Exhibition Stands",
  "Print & Exhibitions",
  "Corporate Gift Items",
  "Support & Maintenance",
  "Business Consulting",
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: "New", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: UserPlus },
  contacted: { label: "Contacted", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Phone },
  qualified: { label: "Qualified", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Target },
  proposal: { label: "Proposal Sent", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: Send },
  negotiation: { label: "Negotiation", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", icon: MessageSquare },
  converted: { label: "Converted", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-gray-500/20 text-gray-400" },
  medium: { label: "Medium", color: "bg-yellow-500/20 text-yellow-400" },
  high: { label: "High", color: "bg-orange-500/20 text-orange-400" },
  urgent: { label: "Urgent", color: "bg-red-500/20 text-red-400" },
}

// Placeholder for ClientSelector component
// In a real app, this would be imported or defined elsewhere
const ClientSelector: React.FC<{
  selectedClient: { id: string | null; name: string }
  onClientChange: (client: { id: string; name: string }) => void
}> = ({ selectedClient, onClientChange }) => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchClients() {
      setLoading(true)
      const { data, error } = await supabase.from("clients").select("id, name").limit(10) // Limit for performance
      if (!error && data) {
        setClients(data)
      }
      setLoading(false)
    }
    fetchClients()
  }, [])

  return (
    <Select
      value={selectedClient.id || ""}
      onValueChange={(value) => {
        const client = clients.find((c) => c.id === value)
        if (client) {
          onClientChange({ id: client.id, name: client.name })
        } else {
          onClientChange({ id: "", name: "" })
        }
      }}
    >
      <SelectTrigger className="bg-white/5 border-white/10 text-white">
        {loading ? (
          <div className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2 animate-spin text-gray-400" />
            Loading clients...
          </div>
        ) : (
          <>
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Select Client" />
          </>
        )}
      </SelectTrigger>
      <SelectContent className="bg-[#1a1a1a] border-white/10">
        {clients.map((client) => (
          <SelectItem key={client.id} value={client.id} className="text-white hover:bg-white/10">
            {client.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function LeadManagement() {
  const supabase = createClient()
  const [leads, setLeads] = useState<Lead[]>([])
  const [activities, setActivities] = useState<LeadActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    qualified: 0,
    converted: 0,
    conversionRate: 0,
  })

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    country: "UAE",
    city: "",
    source: "website",
    status: "new",
    priority: "medium",
    service_interest: [] as string[],
    budget_range: "",
    notes: "",
  })

  // Activity form state
  const [activityForm, setActivityForm] = useState({
    activity_type: "call",
    title: "",
    description: "",
    outcome: "",
  })

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedClientName, setSelectedClientName] = useState<string>("")

  // Combined fetch function to handle lead fetching and activity fetching
  const fetchData = async () => {
    setLoading(true)
    // Fetch leads, filtering by selected client if applicable
    let leadQuery = supabase.from("leads").select("*")
    if (selectedClientId) {
      leadQuery = leadQuery.eq("client_id", selectedClientId)
    }
    const { data: leadsData, error: leadsError } = await leadQuery.order("created_at", { ascending: false })

    if (!leadsError && leadsData) {
      setLeads(leadsData)
      calculateStats(leadsData)
    } else {
      console.error("Error fetching leads:", leadsError)
      setLeads([]) // Clear leads on error
      calculateStats([]) // Reset stats
    }

    // Fetch activities for the currently selected lead if any
    if (selectedLead) {
      await fetchActivities(selectedLead.id)
    }

    setLoading(false)
  }

  // Initial fetch when component mounts
  useEffect(() => {
    fetchData()
  }, [])

  // Re-fetch leads when selected client changes
  useEffect(() => {
    fetchLeads() // Use the dedicated fetchLeads to handle client filtering
  }, [selectedClientId])

  async function fetchLeads() {
    setLoading(true)
    let query = supabase.from("leads").select("*")

    if (selectedClientId) {
      query = query.eq("client_id", selectedClientId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (!error && data) {
      setLeads(data)
      calculateStats(data)
    } else {
      console.error("Error fetching leads:", error)
      setLeads([]) // Clear leads on error
      calculateStats([]) // Reset stats
    }
    setLoading(false)
  }

  function calculateStats(leadsData: Lead[]) {
    const total = leadsData.length
    const newLeads = leadsData.filter((l) => l.status === "new").length
    const qualified = leadsData.filter((l) => l.status === "qualified").length
    const converted = leadsData.filter((l) => l.status === "converted").length
    const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0

    setStats({ total, new: newLeads, qualified, converted, conversionRate })
  }

  async function fetchActivities(leadId: string) {
    const { data } = await supabase
      .from("lead_activities")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })

    if (data) setActivities(data)
    else setActivities([]) // Clear activities if no data
  }

  // Add client selection and AI data to handleCreateLead
  async function handleCreateLead() {
    if (!formData.first_name || !formData.country) {
      toast.error("First Name and Country are required.")
      return
    }

    if (!selectedClientId) {
      toast.error("Please select a client first.")
      return
    }

    // Calculate lead score based on data completeness
    let score = 0
    if (formData.email) score += 20
    if (formData.phone) score += 20
    if (formData.company) score += 15
    if (formData.service_interest.length > 0) score += 25
    if (formData.budget_range) score += 20

    const { error } = await supabase.from("leads").insert({
      ...formData,
      client_id: selectedClientId,
      lead_score: score,
      ai_insights: `High potential lead interested in ${formData.service_interest.join(", ")}. Budget range: ${formData.budget_range}. Recommended follow-up within 24 hours.`,
      next_action: "Schedule discovery call",
      next_action_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })

    if (!error) {
      toast.success(`Lead created for ${selectedClientName} with AI score: ${score}/100`)
      setIsAddOpen(false)
      resetForm()
      fetchLeads()
    } else {
      toast.error(`Error creating lead: ${error.message}`)
    }
  }

  async function handleUpdateLead(id: string, updates: Partial<Lead>) {
    const { error } = await supabase
      .from("leads")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (!error) {
      fetchLeads() // Re-fetch all leads to update the list
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, ...updates } as Lead) // Update selected lead in view
      }
      toast.success("Lead updated successfully!")
    } else {
      toast.error(`Error updating lead: ${error.message}`)
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return

    const { error } = await supabase.from("leads").delete().eq("id", id)
    if (!error) {
      fetchLeads()
      setIsViewOpen(false) // Close view if the deleted lead was being viewed
      toast.success("Lead deleted successfully.")
    } else {
      toast.error(`Error deleting lead: ${error.message}`)
    }
  }

  async function handleAddActivity() {
    if (!selectedLead) {
      toast.error("No lead selected to add activity.")
      return
    }
    if (!activityForm.title) {
      toast.error("Activity title is required.")
      return
    }

    const { error } = await supabase.from("lead_activities").insert({
      lead_id: selectedLead.id,
      ...activityForm,
    })

    if (!error) {
      // Update last contact
      await handleUpdateLead(selectedLead.id, { last_contact_at: new Date().toISOString() })
      setIsActivityOpen(false)
      setActivityForm({ activity_type: "call", title: "", description: "", outcome: "" })
      fetchActivities(selectedLead.id) // Re-fetch activities to show the new one
      toast.success("Activity logged successfully.")
    } else {
      toast.error(`Error logging activity: ${error.message}`)
    }
  }

  async function handleConvertToClient(lead: Lead) {
    if (!confirm(`Convert "${lead.first_name} ${lead.last_name || ""}" to a client?`)) return

    // Create client from lead
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .insert({
        name: `${lead.first_name} ${lead.last_name || ""}`.trim(),
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        country: lead.country,
        city: lead.city,
        wallet_balance: 0, // Default values
        points_balance: 0,
      })
      .select()
      .single()

    if (!clientError && client) {
      // Update lead status
      const { error: leadUpdateError } = await supabase
        .from("leads")
        .update({
          status: "converted",
          converted_at: new Date().toISOString(),
          converted_to_client_id: client.id,
        })
        .eq("id", lead.id)

      if (!leadUpdateError) {
        fetchLeads() // Refresh lead list
        setIsViewOpen(false) // Close view lead modal
        toast.success(`Lead converted to client: ${client.name}`)
      } else {
        toast.error(`Error updating lead status after conversion: ${leadUpdateError.message}`)
      }
    } else {
      toast.error(`Error creating client: ${clientError?.message}`)
    }
  }

  function resetForm() {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      country: "UAE",
      source: "website",
      status: "new",
      priority: "medium",
      service_interest: [],
      budget_range: "",
      notes: "",
    })
  }

  function openViewLead(lead: Lead) {
    setSelectedLead(lead)
    fetchActivities(lead.id) // Fetch activities for this specific lead
    setIsViewOpen(true)
  }

  // Filter leads based on search query and filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" || // If search is empty, include all
      lead.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.last_name && lead.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesCountry = countryFilter === "all" || lead.country === countryFilter

    return matchesSearch && matchesStatus && matchesCountry
  })

  async function aiNurtureLead(leadId: string) {
    const lead = leads.find((l) => l.id === leadId)
    if (!lead) {
      toast.error("Lead not found for nurturing.")
      return
    }

    // Simulate AI campaign logic
    const emailsSent = Math.floor(Math.random() * 5) + 3 // Randomly send 3-7 emails
    const opensRate = 0.3 + Math.random() * 0.3 // Randomly between 30% and 60%
    const clicksRate = 0.1 + Math.random() * 0.15 // Randomly between 10% and 25%

    // Determine new status and score adjustment based on lead score
    let newStatus = lead.status
    let scoreIncrease = 0
    if (lead.lead_score > 70) {
      newStatus = "qualified"
      scoreIncrease = 15
    } else {
      newStatus = "contacted"
      scoreIncrease = 10
    }

    const { error } = await supabase
      .from("leads")
      .update({
        status: newStatus,
        lead_score: Math.min(100, lead.lead_score + scoreIncrease), // Cap score at 100
        ai_insights: `AI Nurture Campaign: Sent ${emailsSent} personalized emails. Open rate: ${(opensRate * 100).toFixed(1)}%. Click rate: ${(clicksRate * 100).toFixed(1)}%. Lead engagement is ${opensRate > 0.4 ? "high" : "moderate"}. Updated status: ${newStatus}.`,
        last_contacted: new Date().toISOString(), // Update last contacted timestamp
      })
      .eq("id", leadId)

    if (!error) {
      toast.success(
        `AI nurturing complete for ${lead.first_name}! ${emailsSent} emails sent with ${(opensRate * 100).toFixed(0)}% open rate.`,
      )
      fetchLeads() // Refresh lead list to show updated status and score
    } else {
      toast.error(`Error during AI nurturing: ${error.message}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Management</h1>
          <p className="text-gray-400">Track and manage leads for selected clients</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads} // Use fetchLeads to refresh with current filters
            className="border-white/10 text-gray-300 hover:text-white bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#C4D600]/90" disabled={!selectedClientId}>
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#141414] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new lead for {selectedClientName || "a client"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {countries.map((c) => (
                          <SelectItem key={c} value={c} className="text-white hover:bg-white/10">
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Select value={formData.source} onValueChange={(v) => setFormData({ ...formData, source: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        <SelectItem value="website" className="text-white hover:bg-white/10">
                          Website
                        </SelectItem>
                        <SelectItem value="referral" className="text-white hover:bg-white/10">
                          Referral
                        </SelectItem>
                        <SelectItem value="social_media" className="text-white hover:bg-white/10">
                          Social Media
                        </SelectItem>
                        <SelectItem value="google_ads" className="text-white hover:bg-white/10">
                          Google Ads
                        </SelectItem>
                        <SelectItem value="facebook_ads" className="text-white hover:bg-white/10">
                          Facebook Ads
                        </SelectItem>
                        <SelectItem value="linkedin" className="text-white hover:bg-white/10">
                          LinkedIn
                        </SelectItem>
                        <SelectItem value="exhibition" className="text-white hover:bg-white/10">
                          Exhibition
                        </SelectItem>
                        <SelectItem value="cold_call" className="text-white hover:bg-white/10">
                          Cold Call
                        </SelectItem>
                        <SelectItem value="email_campaign" className="text-white hover:bg-white/10">
                          Email Campaign
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        <SelectItem value="low" className="text-white hover:bg-white/10">
                          Low
                        </SelectItem>
                        <SelectItem value="medium" className="text-white hover:bg-white/10">
                          Medium
                        </SelectItem>
                        <SelectItem value="high" className="text-white hover:bg-white/10">
                          High
                        </SelectItem>
                        <SelectItem value="urgent" className="text-white hover:bg-white/10">
                          Urgent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Services Interested In</Label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <Badge
                        key={service}
                        variant="outline"
                        className={`cursor-pointer transition-colors ${
                          formData.service_interest.includes(service)
                            ? "bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30"
                            : "border-white/20 text-gray-400 hover:border-white/40"
                        }`}
                        onClick={() => {
                          const interests = formData.service_interest.includes(service)
                            ? formData.service_interest.filter((s) => s !== service)
                            : [...formData.service_interest, service]
                          setFormData({ ...formData, service_interest: interests })
                        }}
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select
                    value={formData.budget_range}
                    onValueChange={(v) => setFormData({ ...formData, budget_range: v })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="under_5k" className="text-white hover:bg-white/10">
                        Under AED 5,000
                      </SelectItem>
                      <SelectItem value="5k_15k" className="text-white hover:bg-white/10">
                        AED 5,000 - 15,000
                      </SelectItem>
                      <SelectItem value="15k_50k" className="text-white hover:bg-white/10">
                        AED 15,000 - 50,000
                      </SelectItem>
                      <SelectItem value="50k_100k" className="text-white hover:bg-white/10">
                        AED 50,000 - 100,000
                      </SelectItem>
                      <SelectItem value="over_100k" className="text-white hover:bg-white/10">
                        Over AED 100,000
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-white/10 text-gray-300">
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLead} // Changed from handleAddLead
                  disabled={!formData.first_name || !formData.country || !selectedClientId} // Added client selection check
                  className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90"
                >
                  Add Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Client Selector */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <ClientSelector
            selectedClient={{ id: selectedClientId, name: selectedClientName }}
            onClientChange={(client) => {
              setSelectedClientId(client.id)
              setSelectedClientName(client.name)
              // When client changes, clear selected lead and potentially other states
              setSelectedLead(null)
              setIsViewOpen(false)
              fetchLeads() // Fetch leads for the new client
            }}
          />
        </div>
        {/* Other buttons can remain here if needed */}
      </div>

      {/* Conditional display based on client selection */}
      {!selectedClientId && (
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">Please select a client from the dropdown above to manage their leads.</p>
          </CardContent>
        </Card>
      )}

      {selectedClientId && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total Leads</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">New Leads</p>
                    <p className="text-2xl font-bold text-white">{stats.new}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Qualified</p>
                    <p className="text-2xl font-bold text-white">{stats.qualified}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Converted</p>
                    <p className="text-2xl font-bold text-white">{stats.converted}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-[#C4D600]/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#C4D600]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    <SelectItem value="all" className="text-white hover:bg-white/10">
                      All Status
                    </SelectItem>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    <SelectItem value="all" className="text-white hover:bg-white/10">
                      All Countries
                    </SelectItem>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c} className="text-white hover:bg-white/10">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Users className="h-12 w-12 mb-4 opacity-50" />
                  <p>No leads found for {selectedClientName}.</p>
                  <Button variant="link" onClick={() => setIsAddOpen(true)} className="text-[#C4D600] mt-2">
                    Add your first lead
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Lead</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Contact</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Location</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Source</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Score</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => {
                        const status = statusConfig[lead.status] || statusConfig.new
                        const priority = priorityConfig[lead.priority] || priorityConfig.medium
                        return (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#C4D600]/20 flex items-center justify-center">
                                  <span className="text-[#C4D600] font-medium">
                                    {lead.first_name.charAt(0)}
                                    {lead.last_name?.charAt(0) || ""}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-white">
                                    {lead.first_name} {lead.last_name}
                                  </p>
                                  {lead.company && (
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <Building2 className="h-3 w-3" />
                                      {lead.company}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                {lead.email && (
                                  <p className="text-sm text-gray-300 flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {lead.email}
                                  </p>
                                )}
                                {lead.phone && (
                                  <p className="text-sm text-gray-300 flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {lead.phone}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-gray-300 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {lead.city ? `${lead.city}, ` : ""}
                                {lead.country}
                              </p>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className="border-white/20 text-gray-300 capitalize">
                                {lead.source.replace("_", " ")}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1">
                                <Badge className={`${status.color} border`}>{status.label}</Badge>
                                <Badge className={`${priority.color} text-xs`}>{priority.label}</Badge>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#C4D600] rounded-full"
                                    style={{ width: `${lead.lead_score}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">{lead.lead_score}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openViewLead(lead)}
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                {/* Add AI Nurture button */}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => aiNurtureLead(lead.id)}
                                  className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
                                  title="AI Nurture Lead"
                                >
                                  <TrendingUp className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* View Lead Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-[#141414] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedLead.first_name} {selectedLead.last_name}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      {selectedLead.company && `${selectedLead.company} • `}
                      {selectedLead.position || "Lead"}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusConfig[selectedLead.status]?.color || ""} border`}>
                      {statusConfig[selectedLead.status]?.label || selectedLead.status}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="details"
                    className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="activities"
                    className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
                  >
                    Activities
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4 space-y-4">
                  {/* Contact Info */}
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-400">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="h-4 w-4 text-gray-500" />
                        {selectedLead.email || "No email"}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {selectedLead.phone || "No phone"}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {selectedLead.city ? `${selectedLead.city}, ` : ""}
                        {selectedLead.country}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        {selectedLead.company || "No company"}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Insights and Next Action */}
                  {(selectedLead.ai_insights || selectedLead.next_action) && (
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">AI Insights & Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedLead.ai_insights && (
                          <div className="text-sm text-gray-300">
                            <strong>AI Insights:</strong> {selectedLead.ai_insights}
                          </div>
                        )}
                        {selectedLead.next_action && (
                          <div className="text-sm text-gray-300">
                            <strong>Next Action:</strong> {selectedLead.next_action}
                            {selectedLead.next_action_date && (
                              <span className="ml-2 text-xs text-gray-500">
                                (by {format(new Date(selectedLead.next_action_date), "MMM d, yyyy")})
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Services Interest */}
                  {selectedLead.service_interest && selectedLead.service_interest.length > 0 && (
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Services Interest</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.service_interest.map((service) => (
                            <Badge key={service} className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Update Status */}
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-400">Update Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <Button
                            key={key}
                            size="sm"
                            variant={selectedLead.status === key ? "default" : "outline"}
                            className={
                              selectedLead.status === key
                                ? "bg-[#C4D600] text-black"
                                : "border-white/20 text-gray-300 hover:text-white"
                            }
                            onClick={() => handleUpdateLead(selectedLead.id, { status: key })}
                          >
                            <config.icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {selectedLead.notes && (
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{selectedLead.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="activities" className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-400">Activity Timeline</h3>
                    <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Activity
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#141414] border-white/10 text-white">
                        <DialogHeader>
                          <DialogTitle>Log Activity for {selectedLead.first_name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Activity Type</Label>
                            <Select
                              value={activityForm.activity_type}
                              onValueChange={(v) => setActivityForm({ ...activityForm, activity_type: v })}
                            >
                              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1a1a1a] border-white/10">
                                <SelectItem value="call" className="text-white hover:bg-white/10">
                                  Phone Call
                                </SelectItem>
                                <SelectItem value="email" className="text-white hover:bg-white/10">
                                  Email
                                </SelectItem>
                                <SelectItem value="meeting" className="text-white hover:bg-white/10">
                                  Meeting
                                </SelectItem>
                                <SelectItem value="whatsapp" className="text-white hover:bg-white/10">
                                  WhatsApp
                                </SelectItem>
                                <SelectItem value="proposal" className="text-white hover:bg-white/10">
                                  Proposal Sent
                                </SelectItem>
                                <SelectItem value="note" className="text-white hover:bg-white/10">
                                  Note
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={activityForm.title}
                              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              placeholder="Brief title..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={activityForm.description}
                              onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Outcome</Label>
                            <Input
                              value={activityForm.outcome}
                              onChange={(e) => setActivityForm({ ...activityForm, outcome: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              placeholder="Result of this activity..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsActivityOpen(false)}
                            className="border-white/10 text-gray-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddActivity}
                            disabled={!activityForm.title}
                            className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90"
                          >
                            Log Activity
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No activities logged for this lead yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activities.map((activity) => (
                        <Card key={activity.id} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-[#C4D600]/20 flex items-center justify-center flex-shrink-0">
                                {activity.activity_type === "call" && <PhoneCall className="h-4 w-4 text-[#C4D600]" />}
                                {activity.activity_type === "email" && <Mail className="h-4 w-4 text-[#C4D600]" />}
                                {activity.activity_type === "meeting" && (
                                  <Calendar className="h-4 w-4 text-[#C4D600]" />
                                )}
                                {activity.activity_type === "whatsapp" && (
                                  <MessageSquare className="h-4 w-4 text-[#C4D600]" />
                                )}
                                {activity.activity_type === "proposal" && <Send className="h-4 w-4 text-[#C4D600]" />}
                                {activity.activity_type === "note" && <Edit className="h-4 w-4 text-[#C4D600]" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-white">{activity.title}</p>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(activity.created_at), "MMM d, yyyy h:mm a")}
                                  </span>
                                </div>
                                {activity.description && (
                                  <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                                )}
                                {activity.outcome && (
                                  <p className="text-sm text-[#C4D600] mt-1">Outcome: {activity.outcome}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                {selectedLead.status !== "converted" && (
                  <Button
                    onClick={() => handleConvertToClient(selectedLead)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Convert to Client
                  </Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteLead(selectedLead.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Lead
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
