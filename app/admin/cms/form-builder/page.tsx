"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createBrowserClient } from "@supabase/ssr"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface FormField {
  id: string
  name: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  required: boolean
  placeholder: string
  order: number
}

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>([])
  const [loading, setLoading] = useState(true)
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: "text",
    required: false,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchFields()
  }, [])

  const fetchFields = async () => {
    try {
      const { data } = await supabase.from("cms_form_fields").select("*").order("order")

      setFields(data || [])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching form fields:", err)
      setLoading(false)
    }
  }

  const addField = async () => {
    if (!newField.name || !newField.label) {
      alert("Name and Label are required")
      return
    }

    try {
      const { data } = await supabase
        .from("cms_form_fields")
        .insert([
          {
            ...newField,
            order: fields.length + 1,
          },
        ])
        .select()

      if (data) {
        setFields([...fields, data[0]])
        setNewField({ type: "text", required: false })
      }
    } catch (err) {
      console.error("Error adding field:", err)
    }
  }

  const updateField = async (id: string, updates: Partial<FormField>) => {
    try {
      await supabase.from("cms_form_fields").update(updates).eq("id", id)

      setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
      setEditingField(null)
    } catch (err) {
      console.error("Error updating field:", err)
    }
  }

  const deleteField = async (id: string) => {
    try {
      await supabase.from("cms_form_fields").delete().eq("id", id)

      setFields(fields.filter((f) => f.id !== id))
    } catch (err) {
      console.error("Error deleting field:", err)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Inquiry Form Builder</h1>

      {/* Existing Fields */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Current Form Fields</h2>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{field.label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Type: {field.type} | Required: {field.required ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingField(field)} className="h-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteField(field.id)} className="h-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Field */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4">Add New Field</h2>
        <div className="space-y-3">
          <Input
            placeholder="Field Name (e.g., company_name)"
            value={newField.name || ""}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
          />
          <Input
            placeholder="Label (e.g., Company Name)"
            value={newField.label || ""}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          />
          <select
            value={newField.type || "text"}
            onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField["type"] })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">Phone</option>
            <option value="textarea">Textarea</option>
            <option value="select">Select</option>
          </select>
          <Input
            placeholder="Placeholder Text"
            value={newField.placeholder || ""}
            onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newField.required || false}
              onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
            />
            <span className="text-sm">Required Field</span>
          </label>
          <Button onClick={addField} className="w-full bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
      </div>
    </div>
  )
}
