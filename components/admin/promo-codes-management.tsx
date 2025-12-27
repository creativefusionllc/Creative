"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Plus, RefreshCw, Trash2, Edit, Copy, TicketPercent, Gift, Calendar, Users } from "lucide-react"

interface PromoCode {
  id: string
  code: string
  description: string | null
  discount_type: string
  discount_value: number
  applies_to: string
  max_uses: number | null
  uses_count: number
  min_amount: number
  is_free_report: boolean
  free_report_type: string | null
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
}

export function PromoCodesManagement() {
  const supabase = createClient()
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null)

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: 0,
    applies_to: "all",
    max_uses: "",
    min_amount: 0,
    is_free_report: false,
    free_report_type: "",
    valid_until: "",
  })

  async function fetchData() {
    const { data } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false })

    if (data) setPromoCodes(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, code })
  }

  function resetForm() {
    setFormData({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: 0,
      applies_to: "all",
      max_uses: "",
      min_amount: 0,
      is_free_report: false,
      free_report_type: "",
      valid_until: "",
    })
    setEditingCode(null)
  }

  function handleEdit(promo: PromoCode) {
    setEditingCode(promo)
    setFormData({
      code: promo.code,
      description: promo.description || "",
      discount_type: promo.discount_type,
      discount_value: promo.discount_value,
      applies_to: promo.applies_to,
      max_uses: promo.max_uses?.toString() || "",
      min_amount: promo.min_amount,
      is_free_report: promo.is_free_report,
      free_report_type: promo.free_report_type || "",
      valid_until: promo.valid_until ? promo.valid_until.split("T")[0] : "",
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    if (!formData.code) {
      toast.error("Please enter a promo code")
      return
    }

    const payload = {
      code: formData.code.toUpperCase(),
      description: formData.description || null,
      discount_type: formData.discount_type,
      discount_value: formData.discount_value,
      applies_to: formData.applies_to,
      max_uses: formData.max_uses ? Number.parseInt(formData.max_uses) : null,
      min_amount: formData.min_amount,
      is_free_report: formData.is_free_report,
      free_report_type: formData.is_free_report ? formData.free_report_type : null,
      valid_until: formData.valid_until || null,
    }

    if (editingCode) {
      const { error } = await supabase.from("promo_codes").update(payload).eq("id", editingCode.id)

      if (error) {
        toast.error("Failed to update promo code")
        return
      }
      toast.success("Promo code updated")
    } else {
      const { error } = await supabase.from("promo_codes").insert([payload])

      if (error) {
        if (error.code === "23505") {
          toast.error("This promo code already exists")
        } else {
          toast.error("Failed to create promo code")
        }
        return
      }
      toast.success("Promo code created")
    }

    setDialogOpen(false)
    resetForm()
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this promo code?")) return

    const { error } = await supabase.from("promo_codes").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete promo code")
      return
    }

    toast.success("Promo code deleted")
    fetchData()
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    const { error } = await supabase.from("promo_codes").update({ is_active: !currentStatus }).eq("id", id)

    if (error) {
      toast.error("Failed to update status")
      return
    }

    fetchData()
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  const activeCount = promoCodes.filter((p) => p.is_active).length
  const totalUses = promoCodes.reduce((sum, p) => sum + p.uses_count, 0)
  const freeReportCodes = promoCodes.filter((p) => p.is_free_report).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Promo Codes</h1>
          <p className="text-gray-400">Manage promotional codes for discounts and free reports</p>
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
              Create Promo Code
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141414] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCode ? "Edit Promo Code" : "Create Promo Code"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingCode
                  ? "Update the promo code details"
                  : "Create a new promotional code for discounts or free reports"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Promo Code *</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER2024"
                    className="bg-white/5 border-white/10 uppercase"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateCode}
                    className="border-white/20 bg-transparent"
                  >
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summer sale discount"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <Label>Free Report Code</Label>
                  <p className="text-xs text-gray-400">This code gives a free social media report</p>
                </div>
                <Switch
                  checked={formData.is_free_report}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_free_report: checked })}
                />
              </div>

              {formData.is_free_report ? (
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={formData.free_report_type}
                    onValueChange={(v) => setFormData({ ...formData, free_report_type: v })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="social_media">Social Media Report</SelectItem>
                      <SelectItem value="seo">SEO Audit Report</SelectItem>
                      <SelectItem value="competitor">Competitor Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Discount Type</Label>
                      <Select
                        value={formData.discount_type}
                        onValueChange={(v) => setFormData({ ...formData, discount_type: v })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10">
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (AED)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Discount Value</Label>
                      <Input
                        type="number"
                        value={formData.discount_value}
                        onChange={(e) =>
                          setFormData({ ...formData, discount_value: Number.parseFloat(e.target.value) || 0 })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Applies To</Label>
                    <Select
                      value={formData.applies_to}
                      onValueChange={(v) => setFormData({ ...formData, applies_to: v })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="subscriptions">Subscriptions Only</SelectItem>
                        <SelectItem value="shop">Shop Only</SelectItem>
                        <SelectItem value="reports">Reports Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Uses (optional)</Label>
                  <Input
                    type="number"
                    value={formData.max_uses}
                    onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                    placeholder="Unlimited"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valid Until (optional)</Label>
                  <Input
                    type="date"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
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
                {editingCode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Codes</p>
                <p className="text-2xl font-bold text-white">{promoCodes.length}</p>
              </div>
              <TicketPercent className="h-8 w-8 text-[#C4D600]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Codes</p>
                <p className="text-2xl font-bold text-white">{activeCount}</p>
              </div>
              <Gift className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Uses</p>
                <p className="text-2xl font-bold text-white">{totalUses}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Free Report Codes</p>
                <p className="text-2xl font-bold text-white">{freeReportCodes}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promo Codes Table */}
      <Card className="bg-[#141414] border-white/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-400">Code</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Value</TableHead>
                <TableHead className="text-gray-400">Uses</TableHead>
                <TableHead className="text-gray-400">Valid Until</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((promo) => (
                <TableRow key={promo.id} className="border-white/10">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-white/10 rounded text-[#C4D600] font-mono">{promo.code}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCode(promo.code)}>
                        <Copy className="h-3 w-3 text-gray-400" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {promo.is_free_report ? (
                      <Badge className="bg-purple-500/20 text-purple-400">Free Report</Badge>
                    ) : (
                      <Badge variant="outline" className="border-white/20 text-gray-300 capitalize">
                        {promo.discount_type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {promo.is_free_report
                      ? promo.free_report_type?.replace("_", " ")
                      : promo.discount_type === "percentage"
                        ? `${promo.discount_value}%`
                        : `${promo.discount_value} AED`}
                  </TableCell>
                  <TableCell className="text-white">
                    {promo.uses_count}
                    {promo.max_uses ? ` / ${promo.max_uses}` : ""}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {promo.valid_until ? new Date(promo.valid_until).toLocaleDateString() : "No expiry"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={promo.is_active} onCheckedChange={() => toggleActive(promo.id, promo.is_active)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(promo)} className="h-8 w-8">
                        <Edit className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(promo.id)} className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {promoCodes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    No promo codes created yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
