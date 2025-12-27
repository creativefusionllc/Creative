"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Gift, Edit, Trash2, Tag, Percent, Calendar } from "lucide-react"

interface Promotion {
  id: string
  name: string
  description: string
  discount_type: string
  discount_value: number
  points_multiplier: number
  code: string
  start_date: string
  end_date: string
  is_active: boolean
  usage_limit: number | null
  used_count: number
  created_at: string
}

export function PromotionsManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState<Promotion | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    points_multiplier: "1",
    code: "",
    start_date: "",
    end_date: "",
    usage_limit: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const { data } = await supabase.from("promotions").select("*").order("created_at", { ascending: false })

    if (data) setPromotions(data)
    setLoading(false)
  }

  async function handleSubmit() {
    const payload = {
      name: form.name,
      description: form.description,
      discount_type: form.discount_type,
      discount_value: Number.parseFloat(form.discount_value) || 0,
      points_multiplier: Number.parseFloat(form.points_multiplier) || 1,
      code: form.code.toUpperCase(),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      usage_limit: form.usage_limit ? Number.parseInt(form.usage_limit) : null,
    }

    if (editing) {
      await supabase.from("promotions").update(payload).eq("id", editing.id)
    } else {
      await supabase.from("promotions").insert(payload)
    }

    setShowCreate(false)
    setEditing(null)
    resetForm()
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this promotion?")) return
    await supabase.from("promotions").delete().eq("id", id)
    fetchData()
  }

  async function toggleActive(id: string, isActive: boolean) {
    await supabase.from("promotions").update({ is_active: !isActive }).eq("id", id)
    fetchData()
  }

  function startEdit(promo: Promotion) {
    setEditing(promo)
    setForm({
      name: promo.name,
      description: promo.description || "",
      discount_type: promo.discount_type,
      discount_value: promo.discount_value?.toString() || "",
      points_multiplier: promo.points_multiplier?.toString() || "1",
      code: promo.code,
      start_date: promo.start_date || "",
      end_date: promo.end_date || "",
      usage_limit: promo.usage_limit?.toString() || "",
    })
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      discount_type: "percentage",
      discount_value: "",
      points_multiplier: "1",
      code: "",
      start_date: "",
      end_date: "",
      usage_limit: "",
    })
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600">Manage discount codes and promotional campaigns</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      {/* Promotions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`bg-white rounded-xl shadow-sm border p-6 ${!promo.is_active && "opacity-60"}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C4D600]/20 rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{promo.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${promo.is_active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {promo.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => startEdit(promo)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {promo.description && <p className="text-sm text-gray-600 mb-4">{promo.description}</p>}

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{promo.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-gray-400" />
                <span>
                  {promo.discount_type === "percentage"
                    ? `${promo.discount_value}% off`
                    : `AED ${promo.discount_value} off`}
                </span>
              </div>
              {promo.points_multiplier > 1 && (
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-gray-400" />
                  <span>{promo.points_multiplier}x points</span>
                </div>
              )}
              {(promo.start_date || promo.end_date) && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>
                    {promo.start_date && new Date(promo.start_date).toLocaleDateString()}
                    {promo.start_date && promo.end_date && " - "}
                    {promo.end_date && new Date(promo.end_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Used: {promo.used_count}/{promo.usage_limit || "∞"}
              </span>
              <Button variant="outline" size="sm" onClick={() => toggleActive(promo.id, promo.is_active)}>
                {promo.is_active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {promotions.length === 0 && (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No promotions yet</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreate || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">{editing ? "Edit Promotion" : "Create Promotion"}</h2>

            <div className="space-y-4">
              <div>
                <Label>Promotion Name *</Label>
                <Input
                  placeholder="Summer Sale"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Get discounts on all services..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <Label>Promo Code *</Label>
                <Input
                  placeholder="SUMMER2024"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Discount Type</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={form.discount_type}
                    onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    placeholder={form.discount_type === "percentage" ? "10" : "100"}
                    value={form.discount_value}
                    onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Points Multiplier</Label>
                <Input
                  type="number"
                  placeholder="1"
                  step="0.5"
                  value={form.points_multiplier}
                  onChange={(e) => setForm({ ...form, points_multiplier: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Usage Limit (leave empty for unlimited)</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={form.usage_limit}
                  onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setShowCreate(false)
                    setEditing(null)
                    resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#C4D600] hover:bg-[#a8b800] text-black"
                  onClick={handleSubmit}
                  disabled={!form.name || !form.code}
                >
                  {editing ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
