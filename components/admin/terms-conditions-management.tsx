"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, CheckCircle } from "lucide-react"

interface TermsCondition {
  id: string
  service_category: string
  title: string
  content: string
  is_active: boolean
  version: number
  created_at: string
  updated_at: string
}

export function TermsConditionsManagement() {
  const [terms, setTerms] = useState<TermsCondition[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingTerm, setEditingTerm] = useState<TermsCondition | null>(null)
  const [formData, setFormData] = useState({
    service_category: "",
    title: "",
    content: "",
  })
  const [services, setServices] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchTerms()
    fetchServices()
  }, [])

  const fetchTerms = async () => {
    const { data, error } = await supabase
      .from("terms_conditions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching terms:", error)
      return
    }

    setTerms(data || [])
    setLoading(false)
  }

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("category, title")
      .eq("is_active", true)
      .order("display_order")

    if (data) {
      setServices([...new Set(data.map((s) => s.category))])
    }
  }

  const handleSave = async () => {
    if (!formData.service_category || !formData.title || !formData.content) {
      alert("Please fill in all fields")
      return
    }

    if (editingTerm) {
      const { error } = await supabase
        .from("terms_conditions")
        .update({
          service_category: formData.service_category,
          title: formData.title,
          content: formData.content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingTerm.id)

      if (error) {
        alert("Error updating terms: " + error.message)
        return
      }
    } else {
      const { error } = await supabase.from("terms_conditions").insert({
        service_category: formData.service_category,
        title: formData.title,
        content: formData.content,
        is_active: true,
        version: 1,
      })

      if (error) {
        alert("Error creating terms: " + error.message)
        return
      }
    }

    setFormData({ service_category: "", title: "", content: "" })
    setEditingTerm(null)
    setShowAddDialog(false)
    fetchTerms()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this T&C?")) return

    const { error } = await supabase.from("terms_conditions").delete().eq("id", id)

    if (error) {
      alert("Error deleting terms: " + error.message)
      return
    }

    fetchTerms()
  }

  const handleEdit = (term: TermsCondition) => {
    setEditingTerm(term)
    setFormData({
      service_category: term.service_category,
      title: term.title,
      content: term.content,
    })
    setShowAddDialog(true)
  }

  const handleCloseDialog = () => {
    setShowAddDialog(false)
    setEditingTerm(null)
    setFormData({ service_category: "", title: "", content: "" })
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions Manager</h2>
          <p className="text-gray-600 mt-1">Manage T&Cs for each service category</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] text-black hover:bg-[#b0c200]">
              <Plus className="h-4 w-4 mr-2" />
              Add T&C
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTerm ? "Edit T&C" : "Add New T&C"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Service Category *</Label>
                <select
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  value={formData.service_category}
                  onChange={(e) => setFormData({ ...formData, service_category: e.target.value })}
                  disabled={!!editingTerm}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>T&C Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Payment & Refund Policy"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>T&C Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the full T&C text..."
                  rows={8}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button className="bg-[#C4D600] text-black hover:bg-[#b0c200]" onClick={handleSave}>
                  {editingTerm ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {terms.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border">
          <p className="text-gray-600">No T&Cs created yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {terms.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-lg border p-6 flex items-start justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{term.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {term.service_category}
                  </Badge>
                  {term.is_active && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{term.content}</p>
                <p className="text-xs text-gray-500">
                  Version {term.version} • Updated {new Date(term.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(term)} className="text-gray-600">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(term.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
