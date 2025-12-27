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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
  Plus,
  RefreshCw,
  Trash2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Share2,
  Edit,
  ExternalLink,
} from "lucide-react"

interface Client {
  id: string
  name: string
}

interface SocialAccount {
  id: string
  client_id: string
  platform: string
  account_handle: string
  account_url: string
  followers_count: number
  following_count: number
  posts_count: number
  is_verified: boolean
  is_active: boolean
  last_synced_at: string | null
  clients?: { name: string }
}

const platforms = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "twitter", label: "Twitter/X", icon: Twitter },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "tiktok", label: "TikTok", icon: Share2 },
]

const platformColors: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  tiktok: "#000000",
}

export function ClientSocialAccountsManagement() {
  const supabase = createClient()
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<SocialAccount | null>(null)

  const [formData, setFormData] = useState({
    client_id: "",
    platform: "",
    account_handle: "",
    account_url: "",
    followers_count: 0,
    following_count: 0,
    posts_count: 0,
    is_verified: false,
  })

  async function fetchData() {
    const [accountsRes, clientsRes] = await Promise.all([
      supabase.from("social_media_accounts").select("*, clients(name)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ])

    if (accountsRes.data) setAccounts(accountsRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function resetForm() {
    setFormData({
      client_id: "",
      platform: "",
      account_handle: "",
      account_url: "",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      is_verified: false,
    })
    setEditingAccount(null)
  }

  function handleEdit(account: SocialAccount) {
    setEditingAccount(account)
    setFormData({
      client_id: account.client_id,
      platform: account.platform,
      account_handle: account.account_handle,
      account_url: account.account_url || "",
      followers_count: account.followers_count,
      following_count: account.following_count,
      posts_count: account.posts_count,
      is_verified: account.is_verified,
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    if (!formData.client_id || !formData.platform || !formData.account_handle) {
      toast.error("Please fill in all required fields")
      return
    }

    if (editingAccount) {
      const { error } = await supabase
        .from("social_media_accounts")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingAccount.id)

      if (error) {
        toast.error("Failed to update account")
        return
      }
      toast.success("Account updated successfully")
    } else {
      const { error } = await supabase.from("social_media_accounts").insert([formData])

      if (error) {
        toast.error("Failed to add account")
        return
      }
      toast.success("Account added successfully")
    }

    setDialogOpen(false)
    resetForm()
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this account?")) return

    const { error } = await supabase.from("social_media_accounts").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete account")
      return
    }

    toast.success("Account deleted successfully")
    fetchData()
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    const { error } = await supabase.from("social_media_accounts").update({ is_active: !currentStatus }).eq("id", id)

    if (error) {
      toast.error("Failed to update status")
      return
    }

    fetchData()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Social Media Accounts</h1>
          <p className="text-gray-400">Manage social media accounts for analytics tracking</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141414] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{editingAccount ? "Edit Account" : "Add Social Media Account"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingAccount ? "Update the account details" : "Connect a client's social media account for tracking"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Client *</Label>
                <Select value={formData.client_id} onValueChange={(v) => setFormData({ ...formData, client_id: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Platform *</Label>
                <Select value={formData.platform} onValueChange={(v) => setFormData({ ...formData, platform: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center gap-2">
                          <p.icon className="h-4 w-4" />
                          {p.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Account Handle *</Label>
                <Input
                  value={formData.account_handle}
                  onChange={(e) => setFormData({ ...formData, account_handle: e.target.value })}
                  placeholder="username (without @)"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label>Profile URL</Label>
                <Input
                  value={formData.account_url}
                  onChange={(e) => setFormData({ ...formData, account_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Followers</Label>
                  <Input
                    type="number"
                    value={formData.followers_count}
                    onChange={(e) =>
                      setFormData({ ...formData, followers_count: Number.parseInt(e.target.value) || 0 })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Following</Label>
                  <Input
                    type="number"
                    value={formData.following_count}
                    onChange={(e) =>
                      setFormData({ ...formData, following_count: Number.parseInt(e.target.value) || 0 })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Posts</Label>
                  <Input
                    type="number"
                    value={formData.posts_count}
                    onChange={(e) => setFormData({ ...formData, posts_count: Number.parseInt(e.target.value) || 0 })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Verified Account</Label>
                <Switch
                  checked={formData.is_verified}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                />
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
                {editingAccount ? "Update" : "Add Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => {
          const platformInfo = platforms.find((p) => p.value === account.platform.toLowerCase())
          const Icon = platformInfo?.icon || Share2
          return (
            <Card key={account.id} className="bg-[#141414] border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${platformColors[account.platform.toLowerCase()] || "#666"}20` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: platformColors[account.platform.toLowerCase()] || "#666" }}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">@{account.account_handle}</p>
                      <p className="text-sm text-gray-400">{account.clients?.name}</p>
                    </div>
                  </div>
                  <Switch
                    checked={account.is_active}
                    onCheckedChange={() => toggleActive(account.id, account.is_active)}
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="capitalize border-white/20 text-gray-300">
                    {account.platform}
                  </Badge>
                  {account.is_verified && <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>}
                  {!account.is_active && <Badge variant="destructive">Inactive</Badge>}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-bold text-white">{account.followers_count.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Followers</p>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-bold text-white">{account.following_count.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Following</p>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-bold text-white">{account.posts_count.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Posts</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {account.account_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/20 text-gray-300 hover:bg-white/10 bg-transparent"
                      onClick={() => window.open(account.account_url, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-gray-300 hover:bg-white/10 bg-transparent"
                    onClick={() => handleEdit(account)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={() => handleDelete(account.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {accounts.length === 0 && (
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="py-12 text-center">
            <Share2 className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 mb-2">No social media accounts added yet</p>
            <p className="text-sm text-gray-500 mb-4">Add client social media accounts to start tracking analytics</p>
            <Button onClick={() => setDialogOpen(true)} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Plus className="h-4 w-4 mr-2" />
              Add First Account
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
