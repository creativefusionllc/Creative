"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Sparkles, Palette, Type, Star, Copy } from "lucide-react"

const fontOptions = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Playfair Display",
  "Poppins",
  "Oswald",
  "Lato",
  "Raleway",
  "Ubuntu",
  "Merriweather",
  "Source Sans Pro",
  "PT Sans",
  "Nunito",
  "Work Sans",
]

export function BrandKitsManagement() {
  const supabase = createClient()
  const [brandKits, setBrandKits] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingKit, setEditingKit] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    client_id: "",
    logo_url: "",
    logo_dark_url: "",
    primary_color: "#000000",
    secondary_color: "#ffffff",
    accent_color: "#0066cc",
    background_color: "#ffffff",
    text_color: "#000000",
    fonts: { heading: "Inter", body: "Inter", accent: "Inter" },
    brand_voice: "",
    tagline: "",
    keywords: "",
    is_default: false,
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [kitsRes, clientsRes] = await Promise.all([
      supabase.from("brand_kits").select("*, clients(name)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name"),
    ])
    setBrandKits(kitsRes.data || [])
    setClients(clientsRes.data || [])
  }

  function openDialog(kit?: any) {
    if (kit) {
      setEditingKit(kit)
      setFormData({
        name: kit.name,
        client_id: kit.client_id || "",
        logo_url: kit.logo_url || "",
        logo_dark_url: kit.logo_dark_url || "",
        primary_color: kit.primary_color,
        secondary_color: kit.secondary_color,
        accent_color: kit.accent_color,
        background_color: kit.background_color,
        text_color: kit.text_color,
        fonts: kit.fonts || { heading: "Inter", body: "Inter", accent: "Inter" },
        brand_voice: kit.brand_voice || "",
        tagline: kit.tagline || "",
        keywords: kit.keywords?.join(", ") || "",
        is_default: kit.is_default,
      })
    } else {
      setEditingKit(null)
      setFormData({
        name: "",
        client_id: "",
        logo_url: "",
        logo_dark_url: "",
        primary_color: "#000000",
        secondary_color: "#ffffff",
        accent_color: "#0066cc",
        background_color: "#ffffff",
        text_color: "#000000",
        fonts: { heading: "Inter", body: "Inter", accent: "Inter" },
        brand_voice: "",
        tagline: "",
        keywords: "",
        is_default: false,
      })
    }
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const data = {
      ...formData,
      client_id: formData.client_id === "none" || !formData.client_id ? null : formData.client_id,
      keywords: formData.keywords ? formData.keywords.split(",").map((k) => k.trim()) : [],
    }

    if (editingKit) {
      await supabase.from("brand_kits").update(data).eq("id", editingKit.id)
    } else {
      await supabase.from("brand_kits").insert(data)
    }

    setDialogOpen(false)
    fetchData()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this brand kit?")) {
      await supabase.from("brand_kits").delete().eq("id", id)
      fetchData()
    }
  }

  async function duplicateKit(kit: any) {
    const newKit = {
      ...kit,
      id: undefined,
      name: `${kit.name} (Copy)`,
      created_at: undefined,
      updated_at: undefined,
    }
    delete newKit.clients
    await supabase.from("brand_kits").insert(newKit)
    fetchData()
  }

  async function setAsDefault(id: string) {
    await supabase.from("brand_kits").update({ is_default: false }).neq("id", id)
    await supabase.from("brand_kits").update({ is_default: true }).eq("id", id)
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Brand Kits</h1>
          <p className="text-gray-400 mt-1">Manage brand identities for consistent designs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Plus className="h-4 w-4 mr-2" />
              New Brand Kit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141414] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingKit ? "Edit Brand Kit" : "Create Brand Kit"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kit Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="e.g., Acme Corp Brand"
                  />
                </div>
                <div>
                  <Label>Client (Optional)</Label>
                  <Select
                    value={formData.client_id || "none"}
                    onValueChange={(v) => setFormData({ ...formData, client_id: v === "none" ? "" : v })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="none" className="text-white">
                        No client
                      </SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id} className="text-white">
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4" /> Brand Colors
                </Label>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { key: "primary_color", label: "Primary" },
                    { key: "secondary_color", label: "Secondary" },
                    { key: "accent_color", label: "Accent" },
                    { key: "background_color", label: "Background" },
                    { key: "text_color", label: "Text" },
                  ].map((color) => (
                    <div key={color.key}>
                      <Label className="text-xs text-gray-400">{color.label}</Label>
                      <div className="flex gap-1 mt-1">
                        <input
                          type="color"
                          value={(formData as any)[color.key]}
                          onChange={(e) => setFormData({ ...formData, [color.key]: e.target.value })}
                          className="w-10 h-10 rounded cursor-pointer border border-white/20"
                        />
                        <Input
                          value={(formData as any)[color.key]}
                          onChange={(e) => setFormData({ ...formData, [color.key]: e.target.value })}
                          className="flex-1 bg-white/5 border-white/10 text-white h-10 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Type className="h-4 w-4" /> Typography
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {["heading", "body", "accent"].map((fontType) => (
                    <div key={fontType}>
                      <Label className="text-xs text-gray-400 capitalize">{fontType} Font</Label>
                      <Select
                        value={formData.fonts[fontType as keyof typeof formData.fonts]}
                        onValueChange={(v) => setFormData({ ...formData, fonts: { ...formData.fonts, [fontType]: v } })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-48">
                          {fontOptions.map((font) => (
                            <SelectItem key={font} value={font} className="text-white">
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tagline</Label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="e.g., Innovation for Tomorrow"
                  />
                </div>
                <div>
                  <Label>Keywords (comma separated)</Label>
                  <Input
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="e.g., modern, innovative, professional"
                  />
                </div>
              </div>

              <div>
                <Label>Brand Voice</Label>
                <Textarea
                  value={formData.brand_voice}
                  onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="Describe the brand's tone and personality..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-white/20 text-white">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                  {editingKit ? "Update" : "Create"} Brand Kit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandKits.map((kit) => (
          <Card key={kit.id} className="bg-[#141414] border-white/10 overflow-hidden">
            {/* Color Preview Bar */}
            <div className="h-2 flex">
              <div className="flex-1" style={{ backgroundColor: kit.primary_color }} />
              <div className="flex-1" style={{ backgroundColor: kit.secondary_color }} />
              <div className="flex-1" style={{ backgroundColor: kit.accent_color }} />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    {kit.name}
                    {kit.is_default && (
                      <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-0">
                        <Star className="h-3 w-3 mr-1" /> Default
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-400 mt-1">{kit.clients?.name || "No client assigned"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Colors */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Colors</p>
                <div className="flex gap-2">
                  {[kit.primary_color, kit.secondary_color, kit.accent_color, kit.background_color, kit.text_color].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg border border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Fonts */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Fonts</p>
                <p className="text-sm text-gray-300">
                  {kit.fonts?.heading} / {kit.fonts?.body}
                </p>
              </div>

              {/* Tagline */}
              {kit.tagline && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tagline</p>
                  <p className="text-sm text-gray-300 italic">"{kit.tagline}"</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/20 text-white bg-transparent"
                  onClick={() => openDialog(kit)}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white bg-transparent"
                  onClick={() => duplicateKit(kit)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                {!kit.is_default && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white bg-transparent"
                    onClick={() => setAsDefault(kit.id)}
                  >
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-red-400 hover:text-red-300 bg-transparent"
                  onClick={() => handleDelete(kit.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {brandKits.length === 0 && (
          <Card className="bg-[#141414] border-white/10 border-dashed col-span-full">
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No brand kits yet</p>
              <p className="text-sm text-gray-500 mt-1">Create your first brand kit to maintain consistent designs</p>
              <Button onClick={() => openDialog()} className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]">
                <Plus className="h-4 w-4 mr-2" />
                Create Brand Kit
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
