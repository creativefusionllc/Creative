"use client"

import { useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  Palette,
  Phone,
  Mail,
  MapPin,
  Save,
  Sparkles,
  Building2,
  Share2,
  Layout,
  Eye,
  Settings,
  Loader2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit,
  Copy,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react"

interface SiteSettings {
  company_name: string
  tagline: string
  description: string
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  country: string
  license_number: string
  website: string
  logo_url: string
  logo_dark_url: string
  favicon_url: string
  primary_color: string
  secondary_color: string
  accent_color: string
  instagram: string
  facebook: string
  linkedin: string
  youtube: string
  twitter: string
  tiktok: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  og_image: string
  show_shop: boolean
  show_blog: boolean
  show_booking: boolean
  show_portfolio: boolean
  show_testimonials: boolean
  show_pricing: boolean
  maintenance_mode: boolean
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  hero_cta_link: string
  hero_image: string
  about_title: string
  about_description: string
  years_experience: number
  projects_completed: number
  happy_clients: number
  team_members: number
}

interface CmsSection {
  id: string
  section_key: string
  section_name: string
  section_type: string
  is_enabled: boolean
  sort_order: number
  title: string
  subtitle: string
  description: string
  content: any
  background_color: string
  text_color: string
  accent_color: string
  background_image: string
  font_family: string
  font_size: string
  images: any[]
  videos: any[]
  items: any[]
  meta_title: string
  meta_description: string
  created_at: string
  updated_at: string
}

const defaultSettings: SiteSettings = {
  company_name: "Creative Fusion",
  tagline: "Your Vision, Our Expertise",
  description: "Full-service creative digital agency providing premium branding, marketing, and technology solutions.",
  email: "info@creativefusion.llc",
  phone: "+971 58 117 4911",
  whatsapp: "+971581174911",
  address: "Sharjah Media City (SHAMS)",
  city: "Sharjah",
  country: "United Arab Emirates",
  license_number: "2430411.01",
  website: "https://creativefusion.llc",
  logo_url: "/images/creative-fusion-logo.jpg",
  logo_dark_url: "/images/creative-fusion-logo.jpg",
  favicon_url: "/favicon.ico",
  primary_color: "#C4D600",
  secondary_color: "#E8573F",
  accent_color: "#1C1C1C",
  instagram: "https://www.instagram.com/creativefusion.llc/",
  facebook: "https://www.facebook.com/CreativeFusionPro.LLC",
  linkedin: "https://www.linkedin.com/company/creativefusionllc",
  youtube: "https://www.youtube.com/@CreativeFusionLLC",
  twitter: "https://x.com/CreativesFusion",
  tiktok: "https://www.tiktok.com/@creativefusion.llc",
  meta_title: "Creative Fusion LLC | Digital Agency in UAE",
  meta_description:
    "Creative Fusion is a full-service digital agency in UAE offering branding, web development, digital marketing, photography, videography, and software solutions.",
  meta_keywords: "digital agency UAE, branding agency Dubai, web development Sharjah, digital marketing UAE",
  og_image: "/images/og-image.png",
  show_shop: true,
  show_blog: true,
  show_booking: true,
  show_portfolio: true,
  show_testimonials: true,
  show_pricing: true,
  maintenance_mode: false,
  hero_title: "Transform Your Brand With Creative Excellence",
  hero_subtitle: "Premium digital solutions that elevate your business presence",
  hero_cta_text: "Start Your Project",
  hero_cta_link: "/contact",
  hero_image: "/images/hero-slide-digital-marketing-strategy.jpg",
  about_title: "About Creative Fusion",
  about_description:
    "We are a team of passionate creatives and technologists dedicated to delivering exceptional digital experiences.",
  years_experience: 15,
  projects_completed: 500,
  happy_clients: 200,
  team_members: 25,
}

const fontOptions = [
  { value: "Inter", label: "Inter (Default)" },
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Playfair Display", label: "Playfair Display" },
]

const fontSizeOptions = [
  { value: "sm", label: "Small" },
  { value: "base", label: "Normal" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2X Large" },
]

export function WebsiteCmsManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [sections, setSections] = useState<CmsSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("sections")
  const [generating, setGenerating] = useState(false)
  const [selectedSection, setSelectedSection] = useState<CmsSection | null>(null)
  const [showSectionEditor, setShowSectionEditor] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const supabase = createBrowserClient()

  useEffect(() => {
    fetchData()
  }, [])

  // Track changes for undo/redo
  const saveToHistory = useCallback(
    (data: any) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(data)))
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setHasUnsavedChanges(true)
    },
    [history, historyIndex],
  )

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      const previousState = history[historyIndex - 1]
      if (previousState.sections) setSections(previousState.sections)
      if (previousState.settings) setSettings(previousState.settings)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      const nextState = history[historyIndex + 1]
      if (nextState.sections) setSections(nextState.sections)
      if (nextState.settings) setSettings(nextState.settings)
    }
  }

  async function fetchData() {
    setLoading(true)
    try {
      // Fetch settings
      const { data: settingsData } = await supabase.from("website_settings").select("*").single()
      if (settingsData) {
        setSettings({ ...defaultSettings, ...settingsData.settings })
      }

      // Fetch sections
      const { data: sectionsData } = await supabase
        .from("website_cms_sections")
        .select("*")
        .order("sort_order", { ascending: true })

      if (sectionsData) {
        setSections(sectionsData)
      }

      // Initialize history
      setHistory([{ settings: settingsData?.settings || defaultSettings, sections: sectionsData || [] }])
      setHistoryIndex(0)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error("Not authenticated. Please log in.")
        setSaving(false)
        return
      }

      console.log("[v0] Saving CMS with sections count:", sections.length)

      const { error: settingsError } = await supabase.from("website_settings").upsert(
        {
          id: "main",
          settings: settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      )

      if (settingsError) throw settingsError

      for (const section of sections) {
        const { error: sectionError } = await supabase.from("website_cms_sections").upsert(
          {
            ...section,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
          },
          { onConflict: "section_key" },
        )

        if (sectionError) throw sectionError
      }

      await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update",
          title: "CMS Updated",
          message: "Website content has been successfully updated",
          metadata: {
            sections_updated: sections.length,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch(() => {})

      toast.success(`✓ All changes saved! (${sections.length} sections updated)`)
      setHasUnsavedChanges(false)
      console.log("[v0] CMS saved successfully")
    } catch (error: any) {
      console.error("[v0] CMS Save Error:", error)
      toast.error(`Failed to save: ${error.message || "Unknown error"}`)
    }
    setSaving(false)
  }

  async function generateAIContent(field: string, context?: string) {
    setGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            context ||
            `Generate a compelling ${field} for a creative digital agency named "${settings.company_name}" based in ${settings.city}, ${settings.country}. The agency offers branding, web development, digital marketing, photography, and videography services. Keep it professional, engaging, and SEO-friendly.`,
          provider: "auto",
        }),
      })

      const data = await response.json()
      setGenerating(false)
      if (data.content) {
        return data.content.substring(0, field === "description" ? 500 : 200)
      }
      return null
    } catch (error) {
      toast.error("AI generation failed")
      setGenerating(false)
      return null
    }
  }

  // Section management functions
  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...sections]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    const temp = newSections[index]
    newSections[index] = newSections[newIndex]
    newSections[newIndex] = temp

    // Update sort_order
    newSections.forEach((s, i) => {
      s.sort_order = i + 1
    })

    setSections(newSections)
    saveToHistory({ settings, sections: newSections })
  }

  const toggleSection = (sectionKey: string) => {
    const newSections = sections.map((s) => (s.section_key === sectionKey ? { ...s, is_enabled: !s.is_enabled } : s))
    setSections(newSections)
    saveToHistory({ settings, sections: newSections })
  }

  const updateSection = (sectionKey: string, updates: Partial<CmsSection>) => {
    const newSections = sections.map((s) => (s.section_key === sectionKey ? { ...s, ...updates } : s))
    setSections(newSections)
    saveToHistory({ settings, sections: newSections })
  }

  const duplicateSection = (section: CmsSection) => {
    const newSection: CmsSection = {
      ...section,
      id: crypto.randomUUID(),
      section_key: `${section.section_key}_copy_${Date.now()}`,
      section_name: `${section.section_name} (Copy)`,
      sort_order: sections.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    const newSections = [...sections, newSection]
    setSections(newSections)
    saveToHistory({ settings, sections: newSections })
    toast.success("Section duplicated")
  }

  const deleteSection = async (sectionKey: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return

    const newSections = sections.filter((s) => s.section_key !== sectionKey)
    setSections(newSections)

    // Delete from database
    await supabase.from("website_cms_sections").delete().eq("section_key", sectionKey)

    saveToHistory({ settings, sections: newSections })
    toast.success("Section deleted")
  }

  const addNewSection = () => {
    const newSection: CmsSection = {
      id: crypto.randomUUID(),
      section_key: `custom_section_${Date.now()}`,
      section_name: "New Section",
      section_type: "custom",
      is_enabled: true,
      sort_order: sections.length + 1,
      title: "Section Title",
      subtitle: "Section Subtitle",
      description: "Section description goes here",
      content: {},
      background_color: "#1C1C1C",
      text_color: "#FFFFFF",
      accent_color: "#C4D600",
      background_image: "",
      font_family: "Inter",
      font_size: "base",
      images: [],
      videos: [],
      items: [],
      meta_title: "",
      meta_description: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    const newSections = [...sections, newSection]
    setSections(newSections)
    setSelectedSection(newSection)
    setShowSectionEditor(true)
    saveToHistory({ settings, sections: newSections })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Website CMS</h1>
          <p className="text-gray-400">Manage all website content, sections, and styling</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={historyIndex <= 0}
              className="h-8 w-8 text-gray-400 hover:text-white disabled:opacity-50"
              title="Undo"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="h-8 w-8 text-gray-400 hover:text-white disabled:opacity-50"
              title="Redo"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Unsaved changes indicator */}
          {hasUnsavedChanges && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              Unsaved
            </Badge>
          )}

          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            onClick={() => window.open("/", "_blank")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            onClick={fetchData}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]">
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#141414] border border-white/10 flex-wrap h-auto p-1">
          <TabsTrigger
            value="sections"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Layout className="h-4 w-4 mr-2" />
            Sections
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger
            value="branding"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Palette className="h-4 w-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Social
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Globe className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="text-gray-400 data-[state=active]:bg-[#C4D600] data-[state=active]:text-gray-900"
          >
            <Settings className="h-4 w-4 mr-2" />
            Features
          </TabsTrigger>
        </TabsList>

        {/* Sections Management Tab */}
        <TabsContent value="sections">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Website Sections</h2>
              <Button onClick={addNewSection} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            <div className="space-y-2">
              {sections.map((section, index) => (
                <Card
                  key={section.section_key}
                  className={`bg-[#141414] border-white/10 ${!section.is_enabled ? "opacity-50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Drag handle */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="h-6 w-6 text-gray-500 hover:text-white"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSection(index, "down")}
                          disabled={index === sections.length - 1}
                          className="h-6 w-6 text-gray-500 hover:text-white"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Section info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{section.section_name}</h3>
                          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {section.section_type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{section.title || section.description}</p>
                      </div>

                      {/* Section styling preview */}
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-white/20"
                          style={{ backgroundColor: section.background_color || "#1C1C1C" }}
                          title="Background"
                        />
                        <div
                          className="w-6 h-6 rounded border border-white/20"
                          style={{ backgroundColor: section.accent_color || "#C4D600" }}
                          title="Accent"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={section.is_enabled}
                          onCheckedChange={() => toggleSection(section.section_key)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedSection(section)
                            setShowSectionEditor(true)
                          }}
                          className="h-8 w-8 text-gray-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => duplicateSection(section)}
                          className="h-8 w-8 text-gray-400 hover:text-white"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteSection(section.section_key)}
                          className="h-8 w-8 text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Company Info Tab */}
        <TabsContent value="company">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#C4D600]" />
                Company Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Basic company details displayed across the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Company Name</Label>
                  <Input
                    value={settings.company_name}
                    onChange={(e) => {
                      setSettings({ ...settings, company_name: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Tagline</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings.tagline}
                      onChange={(e) => {
                        setSettings({ ...settings, tagline: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-white/20 shrink-0 bg-transparent"
                      onClick={async () => {
                        const content = await generateAIContent("tagline")
                        if (content) {
                          setSettings({ ...settings, tagline: content })
                          setHasUnsavedChanges(true)
                          toast.success("AI generated tagline!")
                        }
                      }}
                      disabled={generating}
                    >
                      <Sparkles className="h-4 w-4 text-[#C4D600]" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Description</Label>
                <div className="flex gap-2">
                  <Textarea
                    value={settings.description}
                    onChange={(e) => {
                      setSettings({ ...settings, description: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-white/20 shrink-0 bg-transparent"
                    onClick={async () => {
                      const content = await generateAIContent("description")
                      if (content) {
                        setSettings({ ...settings, description: content })
                        setHasUnsavedChanges(true)
                        toast.success("AI generated description!")
                      }
                    }}
                    disabled={generating}
                  >
                    <Sparkles className="h-4 w-4 text-[#C4D600]" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      value={settings.email}
                      onChange={(e) => {
                        setSettings({ ...settings, email: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      value={settings.phone}
                      onChange={(e) => {
                        setSettings({ ...settings, phone: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">WhatsApp</Label>
                  <Input
                    value={settings.whatsapp}
                    onChange={(e) => {
                      setSettings({ ...settings, whatsapp: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="+971XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-300">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      value={settings.address}
                      onChange={(e) => {
                        setSettings({ ...settings, address: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">License Number</Label>
                  <Input
                    value={settings.license_number}
                    onChange={(e) => {
                      setSettings({ ...settings, license_number: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">City</Label>
                  <Input
                    value={settings.city}
                    onChange={(e) => {
                      setSettings({ ...settings, city: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Country</Label>
                  <Input
                    value={settings.country}
                    onChange={(e) => {
                      setSettings({ ...settings, country: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Website URL</Label>
                  <Input
                    value={settings.website}
                    onChange={(e) => {
                      setSettings({ ...settings, website: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#C4D600]" />
                Brand Identity
              </CardTitle>
              <CardDescription className="text-gray-400">Logo, colors, and visual identity settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-gray-300">Logo (Light Background)</Label>
                  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                    <Input
                      value={settings.logo_url}
                      onChange={(e) => {
                        setSettings({ ...settings, logo_url: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white mb-2"
                      placeholder="/images/logo.png"
                    />
                    {settings.logo_url && (
                      <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                        <img src={settings.logo_url || "/placeholder.svg"} alt="Logo Preview" className="max-h-16" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-gray-300">Logo (Dark Background)</Label>
                  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                    <Input
                      value={settings.logo_dark_url}
                      onChange={(e) => {
                        setSettings({ ...settings, logo_dark_url: e.target.value })
                        setHasUnsavedChanges(true)
                      }}
                      className="bg-white/5 border-white/10 text-white mb-2"
                      placeholder="/images/logo-dark.png"
                    />
                    {settings.logo_dark_url && (
                      <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <img
                          src={settings.logo_dark_url || "/placeholder.svg"}
                          alt="Logo Preview"
                          className="max-h-16"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300">Brand Colors</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-400">Primary Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.primary_color}
                        onChange={(e) => {
                          setSettings({ ...settings, primary_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={settings.primary_color}
                        onChange={(e) => {
                          setSettings({ ...settings, primary_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-400">Secondary Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.secondary_color}
                        onChange={(e) => {
                          setSettings({ ...settings, secondary_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={settings.secondary_color}
                        onChange={(e) => {
                          setSettings({ ...settings, secondary_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-400">Accent Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.accent_color}
                        onChange={(e) => {
                          setSettings({ ...settings, accent_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={settings.accent_color}
                        onChange={(e) => {
                          setSettings({ ...settings, accent_color: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Share2 className="h-5 w-5 text-[#C4D600]" />
                Social Media Links
              </CardTitle>
              <CardDescription className="text-gray-400">Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Facebook</Label>
                  <Input
                    value={settings.facebook}
                    onChange={(e) => {
                      setSettings({ ...settings, facebook: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Instagram</Label>
                  <Input
                    value={settings.instagram}
                    onChange={(e) => {
                      setSettings({ ...settings, instagram: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">LinkedIn</Label>
                  <Input
                    value={settings.linkedin}
                    onChange={(e) => {
                      setSettings({ ...settings, linkedin: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">YouTube</Label>
                  <Input
                    value={settings.youtube}
                    onChange={(e) => {
                      setSettings({ ...settings, youtube: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://youtube.com/@..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Twitter / X</Label>
                  <Input
                    value={settings.twitter}
                    onChange={(e) => {
                      setSettings({ ...settings, twitter: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://x.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">TikTok</Label>
                  <Input
                    value={settings.tiktok}
                    onChange={(e) => {
                      setSettings({ ...settings, tiktok: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#C4D600]" />
                SEO Settings
              </CardTitle>
              <CardDescription className="text-gray-400">
                Search engine optimization for better visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Meta Title</Label>
                <div className="flex gap-2">
                  <Input
                    value={settings.meta_title}
                    onChange={(e) => {
                      setSettings({ ...settings, meta_title: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-white/20 shrink-0 bg-transparent"
                    onClick={async () => {
                      const content = await generateAIContent(
                        "meta_title",
                        `Generate an SEO-optimized meta title for ${settings.company_name}, a digital agency in ${settings.city}, UAE`,
                      )
                      if (content) {
                        setSettings({ ...settings, meta_title: content })
                        setHasUnsavedChanges(true)
                        toast.success("AI generated meta title!")
                      }
                    }}
                    disabled={generating}
                  >
                    <Sparkles className="h-4 w-4 text-[#C4D600]" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">{settings.meta_title.length}/60 characters</p>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Meta Description</Label>
                <div className="flex gap-2">
                  <Textarea
                    value={settings.meta_description}
                    onChange={(e) => {
                      setSettings({ ...settings, meta_description: e.target.value })
                      setHasUnsavedChanges(true)
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-white/20 shrink-0 bg-transparent"
                    onClick={async () => {
                      const content = await generateAIContent(
                        "meta_description",
                        `Generate an SEO-optimized meta description for ${settings.company_name}, a digital agency in ${settings.city}, UAE offering branding, web development, digital marketing, photography, and videography`,
                      )
                      if (content) {
                        setSettings({ ...settings, meta_description: content })
                        setHasUnsavedChanges(true)
                        toast.success("AI generated meta description!")
                      }
                    }}
                    disabled={generating}
                  >
                    <Sparkles className="h-4 w-4 text-[#C4D600]" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">{settings.meta_description.length}/160 characters</p>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Meta Keywords</Label>
                <Input
                  value={settings.meta_keywords}
                  onChange={(e) => {
                    setSettings({ ...settings, meta_keywords: e.target.value })
                    setHasUnsavedChanges(true)
                  }}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">OG Image URL</Label>
                <Input
                  value={settings.og_image}
                  onChange={(e) => {
                    setSettings({ ...settings, og_image: e.target.value })
                    setHasUnsavedChanges(true)
                  }}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="/images/og-image.png"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#C4D600]" />
                Feature Toggles
              </CardTitle>
              <CardDescription className="text-gray-400">Enable or disable website features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "show_shop", label: "Shop", description: "E-commerce store" },
                  { key: "show_blog", label: "Blog", description: "News and articles" },
                  { key: "show_booking", label: "Booking", description: "Appointment scheduling" },
                  { key: "show_portfolio", label: "Portfolio", description: "Project showcase" },
                  { key: "show_testimonials", label: "Testimonials", description: "Client reviews" },
                  { key: "show_pricing", label: "Pricing", description: "Package pricing" },
                  { key: "maintenance_mode", label: "Maintenance Mode", description: "Show maintenance page" },
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{feature.label}</p>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                    <Switch
                      checked={(settings as any)[feature.key]}
                      onCheckedChange={(checked) => {
                        setSettings({ ...settings, [feature.key]: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Section Editor Dialog */}
      <Dialog open={showSectionEditor} onOpenChange={setShowSectionEditor}>
        <DialogContent className="bg-[#141414] border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Section: {selectedSection?.section_name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Customize content, styling, and items for this section
            </DialogDescription>
          </DialogHeader>

          {selectedSection && (
            <div className="space-y-6 mt-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Section Name</Label>
                  <Input
                    value={selectedSection.section_name}
                    onChange={(e) => setSelectedSection({ ...selectedSection, section_name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Section Type</Label>
                  <Select
                    value={selectedSection.section_type}
                    onValueChange={(value) => setSelectedSection({ ...selectedSection, section_type: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="testimonials">Testimonials</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                      <SelectItem value="cta">CTA</SelectItem>
                      <SelectItem value="features">Features</SelectItem>
                      <SelectItem value="process">Process</SelectItem>
                      <SelectItem value="trust">Trust Badges</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Content</h3>
                <div className="space-y-2">
                  <Label className="text-gray-300">Title</Label>
                  <div className="flex gap-2">
                    <Input
                      value={selectedSection.title || ""}
                      onChange={(e) => setSelectedSection({ ...selectedSection, title: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-white/20 shrink-0 bg-transparent"
                      onClick={async () => {
                        const content = await generateAIContent(
                          "title",
                          `Generate a compelling title for the ${selectedSection.section_type} section of a creative digital agency website`,
                        )
                        if (content) {
                          setSelectedSection({ ...selectedSection, title: content })
                          toast.success("AI generated title!")
                        }
                      }}
                      disabled={generating}
                    >
                      <Sparkles className="h-4 w-4 text-[#C4D600]" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Subtitle</Label>
                  <Input
                    value={selectedSection.subtitle || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, subtitle: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={selectedSection.description || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, description: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Styling */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Styling</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Background Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedSection.background_color || "#1C1C1C"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, background_color: e.target.value })}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={selectedSection.background_color || "#1C1C1C"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, background_color: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Text Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedSection.text_color || "#FFFFFF"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, text_color: e.target.value })}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={selectedSection.text_color || "#FFFFFF"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, text_color: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Accent Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedSection.accent_color || "#C4D600"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, accent_color: e.target.value })}
                        className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer"
                      />
                      <Input
                        value={selectedSection.accent_color || "#C4D600"}
                        onChange={(e) => setSelectedSection({ ...selectedSection, accent_color: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Font Family</Label>
                    <Select
                      value={selectedSection.font_family || "Inter"}
                      onValueChange={(value) => setSelectedSection({ ...selectedSection, font_family: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Font Size</Label>
                    <Select
                      value={selectedSection.font_size || "base"}
                      onValueChange={(value) => setSelectedSection({ ...selectedSection, font_size: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {fontSizeOptions.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Background Image URL</Label>
                  <Input
                    value={selectedSection.background_image || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, background_image: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="/images/background.jpg"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSectionEditor(false)}
                  className="border-white/20 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateSection(selectedSection.section_key, selectedSection)
                    setShowSectionEditor(false)
                    toast.success("Section updated")
                  }}
                  className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Section
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
