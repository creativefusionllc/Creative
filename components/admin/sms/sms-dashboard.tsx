"use client"

import { useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Smartphone,
  Send,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Target,
  FileText,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react"

interface SMSTemplate {
  id: string
  name: string
  code: string
  category: string
  content: string
  variables: { name: string }[]
  is_active: boolean
  language: string
  character_count: number
  created_at: string
}

interface SMSCampaign {
  id: string
  name: string
  description: string
  template_id: string
  custom_message: string
  target_type: string
  target_segment: any
  recipient_count: number
  sent_count: number
  delivered_count: number
  failed_count: number
  status: string
  scheduled_at: string
  started_at: string
  completed_at: string
  created_at: string
}

interface SMSLog {
  id: string
  campaign_id: string
  template_id: string
  recipient_type: string
  recipient_id: string
  phone_number: string
  message_content: string
  direction: string
  status: string
  provider_message_id: string
  cost: number
  segments: number
  error_code: string
  error_message: string
  sent_at: string
  delivered_at: string
  created_at: string
}

interface SMSAutomation {
  id: string
  name: string
  description: string
  trigger_event: string
  template_id: string
  delay_minutes: number
  conditions: any
  is_active: boolean
  sent_count: number
  created_at: string
}

interface SMSSettings {
  id: string
  provider: string
  sender_id: string
  default_country_code: string
  is_active: boolean
  monthly_limit: number
  current_usage: number
  cost_per_sms: number
}

export function SMSDashboard() {
  const [templates, setTemplates] = useState<SMSTemplate[]>([])
  const [campaigns, setCampaigns] = useState<SMSCampaign[]>([])
  const [logs, setLogs] = useState<SMSLog[]>([])
  const [automations, setAutomations] = useState<SMSAutomation[]>([])
  const [settings, setSettings] = useState<SMSSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [sendingQuickSms, setSendingQuickSms] = useState(false)
  const [showQuickSend, setShowQuickSend] = useState(false)
  const [quickSendData, setQuickSendData] = useState({ phone: "", message: "", templateId: "" })

  // Template dialog states
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<SMSTemplate | null>(null)
  const [templateForm, setTemplateForm] = useState({
    name: "",
    code: "",
    category: "notification",
    content: "",
    language: "en",
    is_active: true,
  })
  const [savingTemplate, setSavingTemplate] = useState(false)

  // Automation dialog states
  const [showAutomationDialog, setShowAutomationDialog] = useState(false)
  const [editingAutomation, setEditingAutomation] = useState<SMSAutomation | null>(null)
  const [automationForm, setAutomationForm] = useState({
    name: "",
    description: "",
    trigger_event: "booking_confirmed",
    template_id: "",
    delay_minutes: 0,
    is_active: true,
  })
  const [savingAutomation, setSavingAutomation] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    totalSent: 0,
    delivered: 0,
    failed: 0,
    pending: 0,
    credits: 0,
    campaigns: 0,
    templates: 0,
    automations: 0,
  })

  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const [templatesRes, campaignsRes, logsRes, automationsRes, settingsRes] = await Promise.all([
        supabase.from("sms_templates").select("*").order("created_at", { ascending: false }),
        supabase.from("sms_campaigns").select("*").order("created_at", { ascending: false }).limit(20),
        supabase.from("sms_logs").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("sms_automations").select("*").order("created_at", { ascending: false }),
        supabase.from("sms_settings").select("*").limit(1).single(),
      ])

      const templateData = templatesRes.data || []
      const campaignData = campaignsRes.data || []
      const logData = logsRes.data || []
      const automationData = automationsRes.data || []
      const settingsData = settingsRes.data

      setTemplates(templateData)
      setCampaigns(campaignData)
      setLogs(logData)
      setAutomations(automationData)
      setSettings(settingsData)

      // Calculate real stats from logs
      const sentLogs = logData.filter((l: SMSLog) => l.status === "sent" || l.status === "delivered")
      const deliveredLogs = logData.filter((l: SMSLog) => l.status === "delivered")
      const failedLogs = logData.filter((l: SMSLog) => l.status === "failed")
      const pendingLogs = logData.filter((l: SMSLog) => l.status === "pending")

      setStats({
        totalSent: sentLogs.length + deliveredLogs.length,
        delivered: deliveredLogs.length,
        failed: failedLogs.length,
        pending: pendingLogs.length,
        credits: settingsData?.monthly_limit ? settingsData.monthly_limit - (settingsData.current_usage || 0) : 10000,
        campaigns: campaignData.length,
        templates: templateData.length,
        automations: automationData.filter((a: SMSAutomation) => a.is_active).length,
      })
    } catch (error) {
      console.error("Error fetching SMS data:", error)
      toast({
        title: "Error",
        description: "Failed to load SMS data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [supabase, toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Quick Send SMS
  async function handleQuickSend() {
    if (!quickSendData.phone || !quickSendData.message) {
      toast({
        title: "Error",
        description: "Please enter phone number and message",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] Starting SMS send to:", quickSendData.phone)
    console.log("[v0] Message:", quickSendData.message)

    setSendingQuickSms(true)
    try {
      const { data: userData } = await supabase.auth.getUser()
      console.log("[v0] User ID:", userData.user?.id)

      // Insert into sms_quick_sends
      const { data: quickSendResult, error: quickSendError } = await supabase
        .from("sms_quick_sends")
        .insert({
          phone_number: quickSendData.phone,
          message: quickSendData.message,
          status: "sent",
          sent_by: userData.user?.id,
        })
        .select()

      console.log("[v0] Quick send result:", quickSendResult)
      if (quickSendError) {
        console.log("[v0] Quick send error:", quickSendError)
        throw quickSendError
      }

      // Also log to sms_logs
      const { data: logResult, error: logError } = await supabase
        .from("sms_logs")
        .insert({
          phone_number: quickSendData.phone,
          message_content: quickSendData.message,
          direction: "outbound",
          status: "sent",
          segments: Math.ceil(quickSendData.message.length / 160),
          cost: settings?.cost_per_sms || 0.05,
          sent_at: new Date().toISOString(),
          created_by: userData.user?.id,
        })
        .select()

      console.log("[v0] Log result:", logResult)
      if (logError) {
        console.log("[v0] Log error:", logError)
        throw logError
      }

      // Update usage in settings
      if (settings) {
        const { error: updateError } = await supabase
          .from("sms_settings")
          .update({ current_usage: (settings.current_usage || 0) + 1 })
          .eq("id", settings.id)

        console.log("[v0] Settings update error:", updateError)
      }

      console.log("[v0] SMS sent successfully!")
      toast({
        title: "SMS Sent",
        description: `Message sent to ${quickSendData.phone}`,
      })

      setShowQuickSend(false)
      setQuickSendData({ phone: "", message: "", templateId: "" })
      fetchData()
    } catch (error) {
      console.error("[v0] Error sending SMS:", error)
      toast({
        title: "Error",
        description: "Failed to send SMS",
        variant: "destructive",
      })
    } finally {
      setSendingQuickSms(false)
    }
  }

  // Template CRUD
  function openTemplateDialog(template?: SMSTemplate) {
    if (template) {
      setEditingTemplate(template)
      setTemplateForm({
        name: template.name,
        code: template.code,
        category: template.category,
        content: template.content,
        language: template.language || "en",
        is_active: template.is_active,
      })
    } else {
      setEditingTemplate(null)
      setTemplateForm({
        name: "",
        code: "",
        category: "notification",
        content: "",
        language: "en",
        is_active: true,
      })
    }
    setShowTemplateDialog(true)
  }

  async function handleSaveTemplate() {
    if (!templateForm.name || !templateForm.code || !templateForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSavingTemplate(true)
    try {
      const { data: userData } = await supabase.auth.getUser()

      // Extract variables from content (format: {variable_name})
      const variableMatches = templateForm.content.match(/\{(\w+)\}/g) || []
      const variables = variableMatches.map((v) => ({ name: v.replace(/[{}]/g, "") }))

      const templateData = {
        name: templateForm.name,
        code: templateForm.code.toUpperCase().replace(/\s+/g, "_"),
        category: templateForm.category,
        content: templateForm.content,
        language: templateForm.language,
        is_active: templateForm.is_active,
        variables,
        character_count: templateForm.content.length,
        created_by: userData.user?.id,
      }

      if (editingTemplate) {
        const { error } = await supabase.from("sms_templates").update(templateData).eq("id", editingTemplate.id)
        if (error) throw error
        toast({ title: "Success", description: "Template updated" })
      } else {
        const { error } = await supabase.from("sms_templates").insert(templateData)
        if (error) throw error
        toast({ title: "Success", description: "Template created" })
      }

      setShowTemplateDialog(false)
      fetchData()
    } catch (error: any) {
      console.error("Error saving template:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save template",
        variant: "destructive",
      })
    } finally {
      setSavingTemplate(false)
    }
  }

  async function handleDeleteTemplate(id: string) {
    if (!confirm("Are you sure you want to delete this template?")) return

    try {
      const { error } = await supabase.from("sms_templates").delete().eq("id", id)
      if (error) throw error
      toast({ title: "Success", description: "Template deleted" })
      fetchData()
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      })
    }
  }

  // Automation CRUD
  function openAutomationDialog(automation?: SMSAutomation) {
    if (automation) {
      setEditingAutomation(automation)
      setAutomationForm({
        name: automation.name,
        description: automation.description || "",
        trigger_event: automation.trigger_event,
        template_id: automation.template_id || "",
        delay_minutes: automation.delay_minutes || 0,
        is_active: automation.is_active,
      })
    } else {
      setEditingAutomation(null)
      setAutomationForm({
        name: "",
        description: "",
        trigger_event: "booking_confirmed",
        template_id: "",
        delay_minutes: 0,
        is_active: true,
      })
    }
    setShowAutomationDialog(true)
  }

  async function handleSaveAutomation() {
    if (!automationForm.name || !automationForm.trigger_event) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSavingAutomation(true)
    try {
      const { data: userData } = await supabase.auth.getUser()

      const automationData = {
        name: automationForm.name,
        description: automationForm.description,
        trigger_event: automationForm.trigger_event,
        template_id: automationForm.template_id || null,
        delay_minutes: automationForm.delay_minutes,
        is_active: automationForm.is_active,
        created_by: userData.user?.id,
      }

      if (editingAutomation) {
        const { error } = await supabase.from("sms_automations").update(automationData).eq("id", editingAutomation.id)
        if (error) throw error
        toast({ title: "Success", description: "Automation updated" })
      } else {
        const { error } = await supabase.from("sms_automations").insert(automationData)
        if (error) throw error
        toast({ title: "Success", description: "Automation created" })
      }

      setShowAutomationDialog(false)
      fetchData()
    } catch (error: any) {
      console.error("Error saving automation:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save automation",
        variant: "destructive",
      })
    } finally {
      setSavingAutomation(false)
    }
  }

  async function toggleAutomation(id: string, isActive: boolean) {
    try {
      const { error } = await supabase.from("sms_automations").update({ is_active: isActive }).eq("id", id)
      if (error) throw error
      toast({
        title: "Success",
        description: `Automation ${isActive ? "activated" : "paused"}`,
      })
      fetchData()
    } catch (error) {
      console.error("Error toggling automation:", error)
      toast({
        title: "Error",
        description: "Failed to update automation",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteAutomation(id: string) {
    if (!confirm("Are you sure you want to delete this automation?")) return

    try {
      const { error } = await supabase.from("sms_automations").delete().eq("id", id)
      if (error) throw error
      toast({ title: "Success", description: "Automation deleted" })
      fetchData()
    } catch (error) {
      console.error("Error deleting automation:", error)
      toast({
        title: "Error",
        description: "Failed to delete automation",
        variant: "destructive",
      })
    }
  }

  // Use template in quick send
  const applyTemplateToQuickSend = useCallback(
    (template: SMSTemplate) => {
      setQuickSendData({
        ...quickSendData,
        message: template.content,
        templateId: template.id,
      })
    },
    [quickSendData],
  )

  const deliveryRate = stats.totalSent > 0 ? ((stats.delivered / stats.totalSent) * 100).toFixed(1) : "0"

  const triggerEvents = [
    { value: "booking_confirmed", label: "Booking Confirmed" },
    { value: "booking_reminder_24h", label: "Booking Reminder (24h)" },
    { value: "booking_reminder_1h", label: "Booking Reminder (1h)" },
    { value: "payment_received", label: "Payment Received" },
    { value: "invoice_created", label: "Invoice Created" },
    { value: "invoice_due", label: "Invoice Due" },
    { value: "client_created", label: "New Client Created" },
    { value: "lead_created", label: "New Lead Created" },
    { value: "project_started", label: "Project Started" },
    { value: "project_completed", label: "Project Completed" },
    { value: "birthday", label: "Client Birthday" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            SMS Center
          </h1>
          <p className="text-gray-400 mt-1">Manage SMS campaigns, templates, and automations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchData}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={showQuickSend} onOpenChange={setShowQuickSend}>
            <DialogTrigger asChild>
              <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                <Send className="h-4 w-4 mr-2" />
                Quick Send
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a1a] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Quick Send SMS</DialogTitle>
                <DialogDescription className="text-gray-400">Send a single SMS message</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-gray-400">Phone Number</Label>
                  <Input
                    placeholder="+971 50 123 4567"
                    value={quickSendData.phone}
                    onChange={(e) => setQuickSendData({ ...quickSendData, phone: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Message</Label>
                  <Textarea
                    placeholder="Enter your message..."
                    value={quickSendData.message}
                    onChange={(e) => setQuickSendData({ ...quickSendData, message: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white min-h-[100px] mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {quickSendData.message.length}/160 characters ({Math.ceil(quickSendData.message.length / 160) || 1}{" "}
                    segment)
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400">Or use template</Label>
                  <Select
                    value={quickSendData.templateId}
                    onValueChange={(value) => {
                      const template = templates.find((t) => t.id === value)
                      if (template) applyTemplateToQuickSend(template)
                    }}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-800">
                      {templates
                        .filter((t) => t.is_active)
                        .map((t) => (
                          <SelectItem key={t.id} value={t.id} className="text-gray-300">
                            {t.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowQuickSend(false)}
                  className="border-gray-700 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleQuickSend}
                  disabled={sendingQuickSms}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {sendingQuickSms ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send SMS
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-700/30">
          <CardContent className="p-4 text-center">
            <Send className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.totalSent.toLocaleString()}</p>
            <p className="text-xs text-green-300">Total Sent</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-700/30">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{deliveryRate}%</p>
            <p className="text-xs text-emerald-300">Delivered</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-900/40 to-red-800/20 border-red-700/30">
          <CardContent className="p-4 text-center">
            <XCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.failed}</p>
            <p className="text-xs text-red-300">Failed</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border-yellow-700/30">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.pending}</p>
            <p className="text-xs text-yellow-300">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-4 text-center">
            <Smartphone className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.credits.toLocaleString()}</p>
            <p className="text-xs text-blue-300">Credits</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.campaigns}</p>
            <p className="text-xs text-purple-300">Campaigns</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border-cyan-700/30">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.templates}</p>
            <p className="text-xs text-cyan-300">Templates</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border-orange-700/30">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.automations}</p>
            <p className="text-xs text-orange-300">Automations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-[#1a1a1a] border border-gray-800">
          <TabsTrigger value="templates" className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="automations" className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black">
            <Zap className="h-4 w-4 mr-2" />
            Automations
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black">
            <Target className="h-4 w-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black">
            <Clock className="h-4 w-4 mr-2" />
            Message Logs
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">SMS Templates</CardTitle>
                <Button
                  size="sm"
                  onClick={() => openTemplateDialog()}
                  className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {templates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className="bg-gray-900/50 border-gray-700 hover:border-[#C4D600]/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            className={
                              template.category === "booking"
                                ? "bg-blue-500/20 text-blue-400"
                                : template.category === "marketing"
                                  ? "bg-pink-500/20 text-pink-400"
                                  : template.category === "reminder"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : template.category === "otp"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {template.category}
                          </Badge>
                          {!template.is_active && (
                            <Badge variant="outline" className="border-gray-600 text-gray-500">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-white mb-1">{template.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">Code: {template.code}</p>
                        <p className="text-sm text-gray-400 line-clamp-3">{template.content}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                          <span className="text-xs text-gray-500">{template.content?.length || 0} chars</span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                navigator.clipboard.writeText(template.content)
                                toast({ title: "Copied to clipboard" })
                              }}
                              className="text-gray-400 hover:text-white h-7 w-7"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openTemplateDialog(template)}
                              className="text-gray-400 hover:text-white h-7 w-7"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTemplate(template.id)}
                              className="text-gray-400 hover:text-red-400 h-7 w-7"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No templates yet</p>
                  <Button onClick={() => openTemplateDialog()} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                    Create First Template
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automations Tab */}
        <TabsContent value="automations">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">SMS Automations</CardTitle>
                <Button
                  size="sm"
                  onClick={() => openAutomationDialog()}
                  className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Automation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {automations.length > 0 ? (
                <div className="space-y-3">
                  {automations.map((auto) => (
                    <div key={auto.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            auto.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{auto.name}</h4>
                          <p className="text-sm text-gray-400">
                            Trigger:{" "}
                            {triggerEvents.find((t) => t.value === auto.trigger_event)?.label || auto.trigger_event}
                            {auto.delay_minutes > 0 && ` (${auto.delay_minutes}min delay)`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{auto.sent_count || 0} sent</span>
                        <Switch
                          checked={auto.is_active}
                          onCheckedChange={(checked) => toggleAutomation(auto.id, checked)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openAutomationDialog(auto)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAutomation(auto.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No automations yet</p>
                  <Button onClick={() => openAutomationDialog()} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                    Create First Automation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">SMS Campaigns</CardTitle>
                <Button size="sm" className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {campaigns.length > 0 ? (
                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            campaign.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : campaign.status === "sending"
                                ? "bg-blue-500/20 text-blue-400"
                                : campaign.status === "scheduled"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{campaign.name}</h4>
                          <p className="text-sm text-gray-400">
                            {campaign.sent_count || 0} sent • {campaign.delivered_count || 0} delivered •{" "}
                            {campaign.failed_count || 0} failed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={
                            campaign.status === "completed"
                              ? "border-emerald-500 text-emerald-500"
                              : campaign.status === "sending"
                                ? "border-blue-500 text-blue-500"
                                : campaign.status === "scheduled"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-gray-500 text-gray-500"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No campaigns yet</p>
                  <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">Create First Campaign</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Message Logs</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by phone..."
                      className="pl-9 bg-gray-900 border-gray-700 text-white w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {logs.length > 0 ? (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.status === "delivered"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : log.status === "sent"
                                ? "bg-blue-500/20 text-blue-400"
                                : log.status === "failed"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {log.status === "delivered" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : log.status === "failed" ? (
                            <XCircle className="h-4 w-4" />
                          ) : log.status === "sent" ? (
                            <Send className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white">{log.phone_number}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-[300px]">{log.message_content}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              log.status === "delivered"
                                ? "border-emerald-500 text-emerald-500"
                                : log.status === "sent"
                                  ? "border-blue-500 text-blue-500"
                                  : log.status === "failed"
                                    ? "border-red-500 text-red-500"
                                    : "border-yellow-500 text-yellow-500"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.created_at).toLocaleDateString()}{" "}
                          {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No message logs yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">{editingTemplate ? "Edit Template" : "Create Template"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingTemplate ? "Update the SMS template" : "Create a new SMS template"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400">Name</Label>
                <Input
                  placeholder="Template name"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-400">Code</Label>
                <Input
                  placeholder="TEMPLATE_CODE"
                  value={templateForm.code}
                  onChange={(e) => setTemplateForm({ ...templateForm, code: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400">Category</Label>
                <Select
                  value={templateForm.category}
                  onValueChange={(value) => setTemplateForm({ ...templateForm, category: value })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="booking" className="text-gray-300">
                      Booking
                    </SelectItem>
                    <SelectItem value="notification" className="text-gray-300">
                      Notification
                    </SelectItem>
                    <SelectItem value="reminder" className="text-gray-300">
                      Reminder
                    </SelectItem>
                    <SelectItem value="marketing" className="text-gray-300">
                      Marketing
                    </SelectItem>
                    <SelectItem value="otp" className="text-gray-300">
                      OTP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-400">Language</Label>
                <Select
                  value={templateForm.language}
                  onValueChange={(value) => setTemplateForm({ ...templateForm, language: value })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="en" className="text-gray-300">
                      English
                    </SelectItem>
                    <SelectItem value="ar" className="text-gray-300">
                      Arabic
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-gray-400">Message Content</Label>
              <Textarea
                placeholder="Hi {client_name}, your booking #{booking_number} is confirmed..."
                value={templateForm.content}
                onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white min-h-[120px] mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use {"{variable_name}"} for dynamic content. {templateForm.content.length}/160 chars
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="template-active"
                checked={templateForm.is_active}
                onCheckedChange={(checked) => setTemplateForm({ ...templateForm, is_active: checked })}
              />
              <Label htmlFor="template-active" className="text-gray-400">
                Active
              </Label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowTemplateDialog(false)}
              className="border-gray-700 text-gray-300 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              disabled={savingTemplate}
              className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
            >
              {savingTemplate && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingTemplate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Automation Dialog */}
      <Dialog open={showAutomationDialog} onOpenChange={setShowAutomationDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingAutomation ? "Edit Automation" : "Create Automation"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingAutomation ? "Update the SMS automation" : "Create a new SMS automation"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-gray-400">Name</Label>
              <Input
                placeholder="Automation name"
                value={automationForm.name}
                onChange={(e) => setAutomationForm({ ...automationForm, name: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-400">Description</Label>
              <Input
                placeholder="What does this automation do?"
                value={automationForm.description}
                onChange={(e) => setAutomationForm({ ...automationForm, description: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-400">Trigger Event</Label>
              <Select
                value={automationForm.trigger_event}
                onValueChange={(value) => setAutomationForm({ ...automationForm, trigger_event: value })}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-gray-800">
                  {triggerEvents.map((event) => (
                    <SelectItem key={event.value} value={event.value} className="text-gray-300">
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-400">Template (Optional)</Label>
              <Select
                value={automationForm.template_id}
                onValueChange={(value) => setAutomationForm({ ...automationForm, template_id: value })}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-gray-800">
                  <SelectItem value="" className="text-gray-300">
                    None
                  </SelectItem>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id} className="text-gray-300">
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-400">Delay (minutes)</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={automationForm.delay_minutes}
                onChange={(e) =>
                  setAutomationForm({ ...automationForm, delay_minutes: Number.parseInt(e.target.value) || 0 })
                }
                className="bg-gray-900 border-gray-700 text-white mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Wait time before sending SMS after trigger</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="automation-active"
                checked={automationForm.is_active}
                onCheckedChange={(checked) => setAutomationForm({ ...automationForm, is_active: checked })}
              />
              <Label htmlFor="automation-active" className="text-gray-400">
                Active
              </Label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAutomationDialog(false)}
              className="border-gray-700 text-gray-300 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAutomation}
              disabled={savingAutomation}
              className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
            >
              {savingAutomation && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingAutomation ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
