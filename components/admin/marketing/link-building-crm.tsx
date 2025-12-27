"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Mail,
  Link2,
  Users,
  Plus,
  Search,
  Send,
  ExternalLink,
  Globe,
  Star,
  Sparkles,
  Zap,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

interface Prospect {
  id: number
  website: string
  da: number
  contact: string
  status: string
  lastContact: string | null
  type: string
}

interface EmailTemplate {
  id: number
  name: string
  subject: string
  openRate: number
  replyRate: number
}

export function LinkBuildingCRM() {
  const [showAddProspect, setShowAddProspect] = useState(false)
  const [showSendEmail, setShowSendEmail] = useState(false)
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [targetDomain, setTargetDomain] = useState("")

  const [prospects, setProspects] = useState<Prospect[]>([])
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([])

  const stats = {
    totalProspects: prospects.length,
    contacted: prospects.filter((p) => p.status !== "pending").length,
    secured: prospects.filter((p) => p.status === "secured").length,
    avgDA: prospects.length > 0 ? Math.round(prospects.reduce((a, b) => a + b.da, 0) / prospects.length) : 0,
  }

  async function handleFindProspects() {
    if (!targetDomain) {
      toast.error("Please enter a target domain or niche")
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/ai/competitor-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yourDomain: targetDomain,
          type: "link-building",
        }),
      })

      if (!response.ok) throw new Error("Failed to find prospects")

      const data = await response.json()

      if (data.prospects) {
        setProspects(data.prospects)
      }
      if (data.emailTemplates) {
        setEmailTemplates(data.emailTemplates)
      }

      toast.success("AI found link building opportunities!")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Failed to find prospects. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "secured":
        return "bg-green-500/20 text-green-400"
      case "negotiating":
        return "bg-blue-500/20 text-blue-400"
      case "replied":
        return "bg-purple-500/20 text-purple-400"
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            AI Link Building CRM
          </h1>
          <p className="text-gray-400 mt-1">AI-powered outreach tracking & prospect discovery</p>
        </div>
        <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
          <Sparkles className="h-3 w-3 mr-1" />
          GPT-4 Powered
        </Badge>
      </div>

      {/* AI Prospect Finder */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Target Domain or Niche</label>
              <Input
                placeholder="Enter domain or niche (e.g., marketing, saas, ecommerce)"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="bg-[#141414] border-[#2a2a2a] text-white"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={handleFindProspects}
                disabled={isAnalyzing}
                className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    AI Finding...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Find Prospects
                  </>
                )}
              </Button>
              <Dialog open={showAddProspect} onOpenChange={setShowAddProspect}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-[#2a2a2a] text-gray-400 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manual
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#141414] border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Add New Prospect</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Website URL</Label>
                      <Input className="bg-white/5 border-white/10 text-white mt-1" placeholder="https://example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Domain Authority</Label>
                        <Input className="bg-white/5 border-white/10 text-white mt-1" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Link Type</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a1a] border-white/10">
                            <SelectItem value="guest-post" className="text-white">
                              Guest Post
                            </SelectItem>
                            <SelectItem value="resource" className="text-white">
                              Resource Link
                            </SelectItem>
                            <SelectItem value="mention" className="text-white">
                              Brand Mention
                            </SelectItem>
                            <SelectItem value="broken-link" className="text-white">
                              Broken Link
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Contact Email</Label>
                      <Input className="bg-white/5 border-white/10 text-white mt-1" placeholder="contact@example.com" />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddProspect(false)}
                        className="border-white/20 text-white"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">Add Prospect</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats - Show 0 by default */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Prospects</p>
                <p className="text-2xl font-bold text-white">{stats.totalProspects}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Contacted</p>
                <p className="text-2xl font-bold text-white">{stats.contacted}</p>
              </div>
              <Send className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Links Secured</p>
                <p className="text-2xl font-bold text-white">{stats.secured}</p>
              </div>
              <Link2 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Avg DA</p>
                <p className="text-2xl font-bold text-white">{stats.avgDA}</p>
              </div>
              <Star className="h-8 w-8 text-[#C4D600]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="prospects">
        <TabsList className="bg-[#141414] border border-white/10">
          <TabsTrigger
            value="prospects"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Users className="h-4 w-4 mr-2" />
            Prospects
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prospects" className="mt-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Link Prospects</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search prospects..." className="pl-10 bg-white/5 border-white/10 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {prospects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No prospects yet. Enter a target domain and click "Find Prospects" to discover link building
                  opportunities.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-gray-400">Website</TableHead>
                      <TableHead className="text-gray-400">DA</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Contact</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Last Contact</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prospects.map((prospect) => (
                      <TableRow key={prospect.id} className="border-white/10">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <span className="text-white font-medium">{prospect.website}</span>
                            <ExternalLink className="h-3 w-3 text-gray-500" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              prospect.da >= 90
                                ? "bg-green-500/20 text-green-400"
                                : prospect.da >= 70
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            DA {prospect.da}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400 capitalize">{prospect.type.replace("-", " ")}</TableCell>
                        <TableCell className="text-gray-400">{prospect.contact}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(prospect.status)}>{prospect.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-400">{prospect.lastContact || "-"}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-gray-400 bg-transparent"
                            onClick={() => {
                              setSelectedProspect(prospect)
                              setShowSendEmail(true)
                            }}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          {emailTemplates.length === 0 ? (
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-8 text-center text-gray-500">
                No email templates yet. AI will generate templates when you find prospects.
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {emailTemplates.map((template) => (
                <Card key={template.id} className="bg-[#141414] border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{template.name}</CardTitle>
                      <Button size="sm" variant="outline" className="border-white/20 text-gray-400 bg-transparent">
                        Edit
                      </Button>
                    </div>
                    <CardDescription className="text-gray-500">{template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{template.openRate}%</p>
                        <p className="text-xs text-gray-500">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">{template.replyRate}%</p>
                        <p className="text-xs text-gray-500">Reply Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Send Email Dialog */}
      <Dialog open={showSendEmail} onOpenChange={setShowSendEmail}>
        <DialogContent className="bg-[#141414] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Outreach Email</DialogTitle>
          </DialogHeader>
          {selectedProspect && (
            <div className="space-y-4 mt-4">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Sending to:</p>
                <p className="text-white font-medium">{selectedProspect.contact}</p>
                <p className="text-xs text-gray-500">{selectedProspect.website}</p>
              </div>
              <div>
                <Label>Email Template</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {emailTemplates.map((t) => (
                      <SelectItem key={t.id} value={t.id.toString()} className="text-white">
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input className="bg-white/5 border-white/10 text-white mt-1" placeholder="Email subject..." />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  className="bg-white/5 border-white/10 text-white mt-1"
                  rows={8}
                  placeholder="Your outreach message..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSendEmail(false)}
                  className="border-white/20 text-white"
                >
                  Cancel
                </Button>
                <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
