"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Service {
  id: string
  category: string
  title: string
  subtitle: string
  description: string
  icon_name: string
  category_fields: any
  features: string[]
  benefits: string[]
  subservices: string[]
  subservice_prices: number[] // Added price array for each sub-service
  is_active: boolean
  display_order: number
}

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [formData, setFormData] = useState<Partial<Service>>({
    category: "Photography",
    title: "",
    subtitle: "",
    description: "",
    icon_name: "Camera",
    category_fields: {},
    features: [],
    benefits: [],
    subservices: [],
    subservice_prices: [], // Initialize empty prices array
    is_active: true,
    display_order: 0,
  })
  const [featureInput, setFeatureInput] = useState("")
  const [benefitInput, setBenefitInput] = useState("")
  const [subserviceInput, setSubserviceInput] = useState("")
  const [subservicePriceInput, setSubservicePriceInput] = useState("") // Added price input state

  const supabase = createClient()

  const serviceCategories = [
    "Photography",
    "Videography",
    "Creative Branding",
    "Graphic Design",
    "Web Development",
    "Digital Marketing",
    "Marketing & PR",
    "Software & Apps",
    "Exhibition Stands",
    "Print & Exhibitions",
    "Gift Items",
    "Support & Maintenance",
    "Sales & Retail",
    "Photo Lab",
  ]

  const categoryFieldDefinitions: Record<string, any> = {
    Photography: {
      equipment: { type: "array", label: "Equipment List" },
      specializations: { type: "array", label: "Photography Specializations" },
    },
    Videography: {
      equipment: { type: "array", label: "Video Equipment" },
      editing_software: { type: "array", label: "Editing Software" },
      output_formats: { type: "array", label: "Output Formats" },
    },
    "Creative Branding": {
      design_tools: { type: "array", label: "Design Tools" },
      deliverables: { type: "array", label: "Deliverable Formats" },
      brand_elements: { type: "array", label: "Brand Elements" },
    },
    "Graphic Design": {
      design_tools: { type: "array", label: "Design Tools" },
      deliverables: { type: "array", label: "Deliverable Formats" },
      specializations: { type: "array", label: "Design Specializations" },
    },
    "Web Development": {
      technologies: { type: "array", label: "Technologies Used" },
      frameworks: { type: "array", label: "Frameworks" },
      hosting_options: { type: "array", label: "Hosting Options" },
    },
    "Digital Marketing": {
      platforms: { type: "array", label: "Marketing Platforms" },
      strategies: { type: "array", label: "Marketing Strategies" },
      analytics_tools: { type: "array", label: "Analytics Tools" },
    },
    "Marketing & PR": {
      media_channels: { type: "array", label: "Media Channels" },
      pr_services: { type: "array", label: "PR Services" },
      target_industries: { type: "array", label: "Target Industries" },
    },
    "Software & Apps": {
      technologies: { type: "array", label: "Technologies" },
      platforms: { type: "array", label: "Platforms" },
      integrations: { type: "array", label: "Integrations" },
    },
    "Exhibition Stands": {
      stand_types: { type: "array", label: "Stand Types" },
      materials: { type: "array", label: "Materials Used" },
      venues: { type: "array", label: "Supported Venues" },
    },
    "Print & Exhibitions": {
      print_types: { type: "array", label: "Print Types" },
      materials: { type: "array", label: "Materials" },
      finishing_options: { type: "array", label: "Finishing Options" },
    },
    "Gift Items": {
      product_categories: { type: "array", label: "Product Categories" },
      branding_methods: { type: "array", label: "Branding Methods" },
      occasions: { type: "array", label: "Suitable Occasions" },
    },
    "Support & Maintenance": {
      support_types: { type: "array", label: "Support Types" },
      technologies: { type: "array", label: "Supported Technologies" },
      response_times: { type: "array", label: "Response Times" },
    },
    "Sales & Retail": {
      sales_channels: { type: "array", label: "Sales Channels" },
      product_types: { type: "array", label: "Product Types" },
      locations: { type: "array", label: "Locations" },
    },
    "Photo Lab": {
      services: { type: "array", label: "Lab Services" },
      equipment: { type: "array", label: "Equipment" },
      output_formats: { type: "array", label: "Output Formats" },
    },
  }

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    setLoading(true)
    const { data } = await supabase.from("services").select("*").order("display_order")
    setServices(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from("services").update(formData).eq("id", editingId)
    } else {
      await supabase.from("services").insert([formData])
    }

    resetForm()
    fetchServices()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this service?")) {
      await supabase.from("services").delete().eq("id", id)
      fetchServices()
    }
  }

  function resetForm() {
    setFormData({
      category: "Photography",
      title: "",
      subtitle: "",
      description: "",
      icon_name: "Camera",
      category_fields: {},
      features: [],
      benefits: [],
      subservices: [],
      subservice_prices: [], // Initialize empty prices array
      is_active: true,
      display_order: 0,
    })
    setFeatureInput("")
    setBenefitInput("")
    setSubserviceInput("")
    setSubservicePriceInput("") // Reset price input state
    setEditingId(null)
    setShowAddForm(false)
  }

  function startEdit(service: Service) {
    setFormData(service)
    setEditingId(service.id)
    setShowAddForm(true)
  }

  function handleAddSubservice() {
    if (subserviceInput.trim() && subservicePriceInput.trim()) {
      setFormData({
        ...formData,
        subservices: [...(formData.subservices || []), subserviceInput.trim()],
        subservice_prices: [...(formData.subservice_prices || []), Number.parseInt(subservicePriceInput.trim())],
      })
      setSubserviceInput("")
      setSubservicePriceInput("")
    }
  }

  function handleRemoveSubservice(index: number) {
    setFormData({
      ...formData,
      subservices: formData.subservices?.filter((_, i) => i !== index) || [],
      subservice_prices: formData.subservice_prices?.filter((_, i) => i !== index) || [],
    })
  }

  const filteredServices =
    selectedCategory === "All" ? services : services.filter((s) => s.category === selectedCategory)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </Button>

        <select
          className="px-4 py-2 border rounded-md bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {serviceCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Service" : "Add New Service"}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                      category_fields: {},
                    })
                  }
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Icon Name</label>
                <Input
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="Camera, Video, Palette, Gift, Boxes"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Service Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            {/* Category-Specific Fields */}
            {formData.category && categoryFieldDefinitions[formData.category] && (
              <div className="border-t pt-4">
                <h4 className="font-bold text-lg mb-4">{formData.category}-Specific Fields</h4>
                {Object.entries(categoryFieldDefinitions[formData.category]).map(
                  ([fieldKey, fieldDef]: [string, any]) => (
                    <div key={fieldKey} className="mb-4">
                      <label className="block text-sm font-medium mb-1">{fieldDef.label}</label>
                      <CategoryFieldInput
                        fieldKey={fieldKey}
                        fieldDef={fieldDef}
                        value={formData.category_fields?.[fieldKey] || []}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            category_fields: {
                              ...formData.category_fields,
                              [fieldKey]: value,
                            },
                          })
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Features, Benefits, Subservices */}
            <div className="border-t pt-4 space-y-4">
              <ArrayFieldInput
                label="Features"
                items={formData.features || []}
                input={featureInput}
                setInput={setFeatureInput}
                onAdd={() => {
                  if (featureInput.trim()) {
                    setFormData({
                      ...formData,
                      features: [...(formData.features || []), featureInput.trim()],
                    })
                    setFeatureInput("")
                  }
                }}
                onRemove={(index) =>
                  setFormData({
                    ...formData,
                    features: formData.features?.filter((_, i) => i !== index) || [],
                  })
                }
              />

              <ArrayFieldInput
                label="Benefits"
                items={formData.benefits || []}
                input={benefitInput}
                setInput={setBenefitInput}
                onAdd={() => {
                  if (benefitInput.trim()) {
                    setFormData({
                      ...formData,
                      benefits: [...(formData.benefits || []), benefitInput.trim()],
                    })
                    setBenefitInput("")
                  }
                }}
                onRemove={(index) =>
                  setFormData({
                    ...formData,
                    benefits: formData.benefits?.filter((_, i) => i !== index) || [],
                  })
                }
              />

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Sub-Services</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={subserviceInput}
                    onChange={(e) => setSubserviceInput(e.target.value)}
                    placeholder="Add Sub-Service"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSubservice()
                      }
                    }}
                  />
                  <Input
                    type="number"
                    value={subservicePriceInput}
                    onChange={(e) => setSubservicePriceInput(e.target.value)}
                    placeholder="Price"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSubservice()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSubservice}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(formData.subservices || []).map((subservice: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <span className="flex-1 text-sm">
                        {subservice} - ${formData.subservice_prices?.[index] || 0}
                      </span>
                      <Button type="button" size="sm" variant="ghost" onClick={() => handleRemoveSubservice(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <span>Active</span>
              </label>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
                <Save className="h-4 w-4" />
                {editingId ? "Update" : "Create"} Service
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 mb-4">No services found in this category.</p>
              <Button onClick={() => setShowAddForm(true)} className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
                Add Your First Service
              </Button>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-sm px-3 py-1 bg-[#C4D600]/20 text-gray-900 rounded-full font-medium">
                      {service.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{service.title}</h3>
                    <p className="text-gray-600 mt-1">{service.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{service.description}</p>

                <div className="grid md:grid-cols-3 gap-4">
                  {service.features?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm space-y-1">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="text-gray-600">
                            • {f}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-gray-400">+{service.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {service.subservices?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Sub-Services:</h4>
                      <ul className="text-sm space-y-1">
                        {service.subservices.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-gray-600">
                            • {s} - ${service.subservice_prices?.[i] || 0}
                          </li>
                        ))}
                        {service.subservices.length > 3 && (
                          <li className="text-gray-400">+{service.subservices.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {Object.keys(service.category_fields || {}).length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Specific Details:</h4>
                      <ul className="text-sm space-y-1">
                        {Object.entries(service.category_fields).map(([key, value]: [string, any]) => (
                          <li key={key} className="text-gray-600">
                            • {key}: {Array.isArray(value) ? value.length : 1} items
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// Helper components
function ArrayFieldInput({ label, items, input, setInput, onAdd, onRemove }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add ${label.toLowerCase()}`}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
        />
        <Button type="button" onClick={onAdd}>
          Add
        </Button>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item: string, index: number) => (
          <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
            <span className="flex-1 text-sm">{item}</span>
            <Button type="button" size="sm" variant="ghost" onClick={() => onRemove(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CategoryFieldInput({ fieldKey, fieldDef, value, onChange }: any) {
  const [input, setInput] = useState("")

  if (fieldDef.type === "array") {
    return (
      <div>
        <div className="flex gap-2 mb-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Add to ${fieldDef.label}`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                if (input.trim()) {
                  onChange([...(value || []), input.trim()])
                  setInput("")
                }
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              if (input.trim()) {
                onChange([...(value || []), input.trim()])
                setInput("")
              }
            }}
          >
            Add
          </Button>
        </div>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {(value || []).map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded text-sm">
              <span className="flex-1">{item}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onChange(value.filter((_: any, i: number) => i !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return <Input value={value} onChange={(e) => onChange(e.target.value)} />
}
