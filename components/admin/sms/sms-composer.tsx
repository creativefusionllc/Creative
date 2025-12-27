"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  Send,
  Users,
  User,
  Loader2,
  ArrowLeft,
  Phone,
  MessageSquare,
  Target,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  name: string
  phone: string
  email: string
}

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  status: string
}

interface SMSTemplate {
  id: string
  name: string
  code: string
  category: string
  content: string
  variables: { name: string }[]
  is_active: boolean
}

export function SMSComposer() {
  const [sendMode, setSendMode] = useState<"single" | "bulk" | "segment">("single")
  const [clients, setClients] = useState<Client[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [templates, setTemplates] = useState<SMSTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  // Form state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [recipientType, setRecipientType] = useState<"clients" | "leads" | "both">("clients")
  const [segmentFilter, setSegmentFilter] = useState("")

  // Preview state
  const [previewMessage, setPreviewMessage] = useState("")
  const [recipientCount, setRecipientCount] = useState(0)

  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    console.log("[v0] Fetching SMS composer data...")
    try {
      const [clientsRes, leadsRes, templatesRes] = await Promise.all([
        supabase.from("clients").select("id, name, phone, email").not("phone", "is", null).order("name"),
        supabase.from("leads").select("id, name, phone, email, status").not("phone", "is", null).order("name"),
        supabase.from("sms_templates").select("*").eq("is_active", true).order("name"),
      ])

      console.log("[v0] Clients:", clientsRes.data?.length)
      console.log("[v0] Leads:", leadsRes.data?.length)
      console.log("[v0] Templates:", templatesRes.data?.length)

      if (clientsRes.data) setClients(clientsRes.data)
      if (leadsRes.data) setLeads(leadsRes.data)
      if (templatesRes.data) setTemplates(templatesRes.data)
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update preview when message changes
  useEffect(() => {
    setPreviewMessage(message)

    // Calculate recipient count
    if (sendMode === "single") {
      setRecipientCount(phoneNumber ? 1 : 0)
    } else if (sendMode === "bulk") {
      setRecipientCount(selectedClients.length + selectedLeads.length)
    } else {
      // Segment mode
      let count = 0
      if (recipientType === "clients" || recipientType === "both") {
        count += clients.filter(
          (c) => !segmentFilter || c.name.toLowerCase().includes(segmentFilter.toLowerCase()),
        ).length
      }
      if (recipientType === "leads" || recipientType === "both") {
        count += leads.filter(
          (l) => !segmentFilter || l.name.toLowerCase().includes(segmentFilter.toLowerCase()),
        ).length
      }
      setRecipientCount(count)
    }
  }, [message, phoneNumber, selectedClients, selectedLeads, sendMode, recipientType, segmentFilter, clients, leads])

  function applyTemplate(templateId: string) {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setMessage(template.content)
      setSelectedTemplate(templateId)
    }
  }

  function replaceVariables(text: string, data: { name?: string; phone?: string; email?: string }) {
    return text
      .replace(/{client_name}/g, data.name || "Customer")
      .replace(/{lead_name}/g, data.name || "Customer")
      .replace(/{name}/g, data.name || "Customer")
      .replace(/{phone}/g, data.phone || "")
      .replace(/{email}/g, data.email || "")
  }

  async function handleSend() {
    if (!message) {
      toast({ title: "Error", description: "Please enter a message", variant: "destructive" })
      return
    }

    if (sendMode === "single" && !phoneNumber) {
      toast({ title: "Error", description: "Please enter a phone number", variant: "destructive" })
      return
    }

    if (sendMode === "bulk" && selectedClients.length === 0 && selectedLeads.length === 0) {
      toast({ title: "Error", description: "Please select at least one recipient", variant: "destructive" })
      return
    }

    setSending(true)
    console.log("[v0] Starting SMS send, mode:", sendMode)

    try {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id

      let successCount = 0
      let failCount = 0

      if (sendMode === "single") {
        // Single recipient
        const { error } = await supabase.from("sms_logs").insert({
          phone_number: phoneNumber,
          message_content: message,
          direction: "outbound",
          status: "sent",
          segments: Math.ceil(message.length / 160),
          sent_at: new Date().toISOString(),
          created_by: userId,
        })

        if (error) {
          console.log("[v0] Error:", error)
          failCount++
        } else {
          successCount++
        }
      } else if (sendMode === "bulk") {
        // Bulk send to selected recipients
        const recipients: { type: string; id: string; phone: string; name: string }[] = []

        selectedClients.forEach((id) => {
          const client = clients.find((c) => c.id === id)
          if (client?.phone) {
            recipients.push({ type: "client", id, phone: client.phone, name: client.name })
          }
        })

        selectedLeads.forEach((id) => {
          const lead = leads.find((l) => l.id === id)
          if (lead?.phone) {
            recipients.push({ type: "lead", id, phone: lead.phone, name: lead.name })
          }
        })

        console.log("[v0] Sending to", recipients.length, "recipients")

        for (const recipient of recipients) {
          const personalizedMessage = replaceVariables(message, { name: recipient.name })

          const { error } = await supabase.from("sms_logs").insert({
            phone_number: recipient.phone,
            message_content: personalizedMessage,
            recipient_type: recipient.type,
            recipient_id: recipient.id,
            direction: "outbound",
            status: "sent",
            segments: Math.ceil(personalizedMessage.length / 160),
            sent_at: new Date().toISOString(),
            created_by: userId,
          })

          if (error) {
            console.log("[v0] Error for", recipient.phone, ":", error)
            failCount++
          } else {
            successCount++
          }
        }
      } else {
        // Segment mode - send to filtered segment
        const recipients: { type: string; id: string; phone: string; name: string }[] = []

        if (recipientType === "clients" || recipientType === "both") {
          clients
            .filter((c) => !segmentFilter || c.name.toLowerCase().includes(segmentFilter.toLowerCase()))
            .forEach((client) => {
              if (client.phone) {
                recipients.push({ type: "client", id: client.id, phone: client.phone, name: client.name })
              }
            })
        }

        if (recipientType === "leads" || recipientType === "both") {
          leads
            .filter((l) => !segmentFilter || l.name.toLowerCase().includes(segmentFilter.toLowerCase()))
            .forEach((lead) => {
              if (lead.phone) {
                recipients.push({ type: "lead", id: lead.id, phone: lead.phone, name: lead.name })
              }
            })
        }

        console.log("[v0] Segment send to", recipients.length, "recipients")

        for (const recipient of recipients) {
          const personalizedMessage = replaceVariables(message, { name: recipient.name })

          const { error } = await supabase.from("sms_logs").insert({
            phone_number: recipient.phone,
            message_content: personalizedMessage,
            recipient_type: recipient.type,
            recipient_id: recipient.id,
            direction: "outbound",
            status: "sent",
            segments: Math.ceil(personalizedMessage.length / 160),
            sent_at: new Date().toISOString(),
            created_by: userId,
          })

          if (error) failCount++
          else successCount++
        }
      }

      // Update SMS usage
      const { data: settings } = await supabase.from("sms_settings").select("*").single()
      if (settings) {
        await supabase
          .from("sms_settings")
          .update({ current_usage: (settings.current_usage || 0) + successCount })
          .eq("id", settings.id)
      }

      console.log("[v0] Send complete. Success:", successCount, "Failed:", failCount)

      toast({
        title: "SMS Sent",
        description: `Successfully sent ${successCount} message(s)${failCount > 0 ? `, ${failCount} failed` : ""}`,
      })

      // Reset form
      setPhoneNumber("")
      setMessage("")
      setSelectedTemplate("")
      setSelectedClients([])
      setSelectedLeads([])
    } catch (error) {
      console.error("[v0] SMS send error:", error)
      toast({ title: "Error", description: "Failed to send SMS", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/sms">
            <Button variant="outline" size="icon" className="border-gray-700 bg-transparent text-gray-300">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Compose SMS</h1>
            <p className="text-gray-400">Send personalized messages to clients and leads</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Send Mode Selection */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-[#C4D600]" />
                Send Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setSendMode("single")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sendMode === "single"
                      ? "border-[#C4D600] bg-[#C4D600]/10"
                      : "border-gray-700 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <User
                    className={`h-6 w-6 mx-auto mb-2 ${sendMode === "single" ? "text-[#C4D600]" : "text-gray-400"}`}
                  />
                  <p className={`text-sm font-medium ${sendMode === "single" ? "text-[#C4D600]" : "text-gray-300"}`}>
                    Single
                  </p>
                  <p className="text-xs text-gray-500 mt-1">One recipient</p>
                </button>
                <button
                  onClick={() => setSendMode("bulk")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sendMode === "bulk"
                      ? "border-[#C4D600] bg-[#C4D600]/10"
                      : "border-gray-700 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <Users
                    className={`h-6 w-6 mx-auto mb-2 ${sendMode === "bulk" ? "text-[#C4D600]" : "text-gray-400"}`}
                  />
                  <p className={`text-sm font-medium ${sendMode === "bulk" ? "text-[#C4D600]" : "text-gray-300"}`}>
                    Bulk Select
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Pick recipients</p>
                </button>
                <button
                  onClick={() => setSendMode("segment")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sendMode === "segment"
                      ? "border-[#C4D600] bg-[#C4D600]/10"
                      : "border-gray-700 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <Target
                    className={`h-6 w-6 mx-auto mb-2 ${sendMode === "segment" ? "text-[#C4D600]" : "text-gray-400"}`}
                  />
                  <p className={`text-sm font-medium ${sendMode === "segment" ? "text-[#C4D600]" : "text-gray-300"}`}>
                    Segment
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Filter audience</p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Selection */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#C4D600]" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sendMode === "single" && (
                <div>
                  <Label className="text-gray-400">Phone Number</Label>
                  <Input
                    placeholder="+971 50 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white mt-1"
                  />
                </div>
              )}

              {sendMode === "bulk" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400 mb-2 block">
                      Select Clients ({selectedClients.length} selected)
                    </Label>
                    <div className="max-h-40 overflow-y-auto bg-gray-900 rounded-lg p-2 space-y-1">
                      {clients.length === 0 ? (
                        <p className="text-gray-500 text-sm p-2">No clients with phone numbers</p>
                      ) : (
                        clients.map((client) => (
                          <label
                            key={client.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedClients.includes(client.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedClients([...selectedClients, client.id])
                                } else {
                                  setSelectedClients(selectedClients.filter((id) => id !== client.id))
                                }
                              }}
                            />
                            <span className="text-gray-300 text-sm">{client.name}</span>
                            <span className="text-gray-500 text-xs">{client.phone}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 mb-2 block">Select Leads ({selectedLeads.length} selected)</Label>
                    <div className="max-h-40 overflow-y-auto bg-gray-900 rounded-lg p-2 space-y-1">
                      {leads.length === 0 ? (
                        <p className="text-gray-500 text-sm p-2">No leads with phone numbers</p>
                      ) : (
                        leads.map((lead) => (
                          <label
                            key={lead.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLeads([...selectedLeads, lead.id])
                                } else {
                                  setSelectedLeads(selectedLeads.filter((id) => id !== lead.id))
                                }
                              }}
                            />
                            <span className="text-gray-300 text-sm">{lead.name}</span>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {lead.status}
                            </Badge>
                            <span className="text-gray-500 text-xs">{lead.phone}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {sendMode === "segment" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Recipient Type</Label>
                    <Select
                      value={recipientType}
                      onValueChange={(v: "clients" | "leads" | "both") => setRecipientType(v)}
                    >
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-gray-800">
                        <SelectItem value="clients" className="text-gray-300">
                          Clients Only
                        </SelectItem>
                        <SelectItem value="leads" className="text-gray-300">
                          Leads Only
                        </SelectItem>
                        <SelectItem value="both" className="text-gray-300">
                          Both Clients & Leads
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-400">Filter by Name (optional)</Label>
                    <Input
                      placeholder="Type to filter..."
                      value={segmentFilter}
                      onChange={(e) => setSegmentFilter(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message Composer */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#C4D600]" />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-400">Use Template (optional)</Label>
                <Select value={selectedTemplate} onValueChange={applyTemplate}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id} className="text-gray-300">
                        <div className="flex items-center gap-2">
                          <span>{template.name}</span>
                          <Badge variant="outline" className="text-xs border-gray-600">
                            {template.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-400">Message Content</Label>
                <Textarea
                  placeholder="Type your message here... Use {client_name} or {lead_name} for personalization"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white min-h-[150px] mt-1"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    Variables: {"{client_name}"}, {"{lead_name}"}, {"{name}"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {message.length}/160 characters ({Math.ceil(message.length / 160) || 1} segment)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Send Panel */}
        <div className="space-y-6">
          {/* Preview */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#C4D600]" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[150px]">
                {previewMessage ? (
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{previewMessage}</p>
                ) : (
                  <p className="text-gray-500 text-sm italic">Your message preview will appear here...</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Send Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Recipients</span>
                <span className="text-white font-medium">{recipientCount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Segments</span>
                <span className="text-white font-medium">{Math.ceil(message.length / 160) || 1}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Est. Cost</span>
                <span className="text-white font-medium">
                  AED {((recipientCount * Math.ceil(message.length / 160) || 1) * 0.05).toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleSend}
                disabled={sending || recipientCount === 0 || !message}
                className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800] mt-4"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send to {recipientCount} Recipient{recipientCount !== 1 ? "s" : ""}
                  </>
                )}
              </Button>

              {recipientCount === 0 && (
                <div className="flex items-center gap-2 text-amber-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Select recipients to send</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
