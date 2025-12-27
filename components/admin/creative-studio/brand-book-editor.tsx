"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Save,
  Eye,
  ArrowLeft,
  Plus,
  ImageIcon,
  Type,
  Palette,
  FileText,
  Target,
  MessageSquare,
  Grid3X3,
  Layers,
  Download,
  Settings,
  Crown,
  X,
} from "lucide-react"
import Link from "next/link"

interface BrandBookEditorProps {
  brandBookId: string
}

export function BrandBookEditor({ brandBookId }: BrandBookEditorProps) {
  const [brandBook, setBrandBook] = useState<any>(null)
  const [sections, setSections] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState("story")
  const [storyData, setStoryData] = useState<any>({})
  const [logoData, setLogoData] = useState<any>({})
  const [colorsData, setColorsData] = useState<any>({})
  const [typographyData, setTypographyData] = useState<any>({})
  const [imageryData, setImageryData] = useState<any>({})
  const [voiceData, setVoiceData] = useState<any>({})
  const [iconographyData, setIconographyData] = useState<any>({})
  const [patternsData, setPatternsData] = useState<any>({})
  const [applicationsData, setApplicationsData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchBrandBook()
  }, [brandBookId])

  async function fetchBrandBook() {
    setLoading(true)

    const [
      bookRes,
      sectionsRes,
      storyRes,
      logoRes,
      colorsRes,
      typographyRes,
      imageryRes,
      voiceRes,
      iconographyRes,
      patternsRes,
      applicationsRes,
    ] = await Promise.all([
      supabase.from("brand_books").select("*, clients(company_name)").eq("id", brandBookId).single(),
      supabase.from("brand_book_sections").select("*").eq("brand_book_id", brandBookId).order("sort_order"),
      supabase.from("brand_book_story").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_logo").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_colors").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_typography").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_imagery").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_voice").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_iconography").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_patterns").select("*").eq("brand_book_id", brandBookId).single(),
      supabase.from("brand_book_applications").select("*").eq("brand_book_id", brandBookId).single(),
    ])

    if (bookRes.data) setBrandBook(bookRes.data)
    if (sectionsRes.data) setSections(sectionsRes.data)
    if (storyRes.data) setStoryData(storyRes.data)
    if (logoRes.data) setLogoData(logoRes.data)
    if (colorsRes.data) setColorsData(colorsRes.data)
    if (typographyRes.data) setTypographyData(typographyRes.data)
    if (imageryRes.data) setImageryData(imageryRes.data)
    if (voiceRes.data) setVoiceData(voiceRes.data)
    if (iconographyRes.data) setIconographyData(iconographyRes.data)
    if (patternsRes.data) setPatternsData(patternsRes.data)
    if (applicationsRes.data) setApplicationsData(applicationsRes.data)

    setLoading(false)
  }

  async function saveAll() {
    setSaving(true)

    await Promise.all([
      supabase.from("brand_book_story").update(storyData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_logo").update(logoData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_colors").update(colorsData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_typography").update(typographyData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_imagery").update(imageryData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_voice").update(voiceData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_iconography").update(iconographyData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_patterns").update(patternsData).eq("brand_book_id", brandBookId),
      supabase.from("brand_book_applications").update(applicationsData).eq("brand_book_id", brandBookId),
      supabase.from("brand_books").update({ updated_at: new Date().toISOString() }).eq("id", brandBookId),
    ])

    setSaving(false)
  }

  const sectionIcons: Record<string, any> = {
    story: Target,
    logo: ImageIcon,
    colors: Palette,
    typography: Type,
    imagery: ImageIcon,
    voice: MessageSquare,
    iconography: Grid3X3,
    patterns: Layers,
    applications: FileText,
    downloads: Download,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading brand book...</div>
      </div>
    )
  }

  if (!brandBook) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Brand book not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/creative-studio/brand-books">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{brandBook.title}</h1>
              <Badge className="bg-gradient-to-r from-[#C4D600]/20 to-amber-500/20 text-[#C4D600] border border-[#C4D600]/30">
                <Crown className="h-3 w-3 mr-1" />
                Creative Brand Book
              </Badge>
            </div>
            <p className="text-gray-400">{brandBook.clients?.company_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/brand-book/${brandBook.share_token}`} target="_blank">
            <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button onClick={saveAll} disabled={saving} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <Card className="col-span-12 lg:col-span-3 bg-[#141414] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Sections</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1">
                {[
                  { id: "story", label: "Brand Story & Mission" },
                  { id: "logo", label: "Logo Guidelines" },
                  { id: "colors", label: "Color Palette" },
                  { id: "typography", label: "Typography" },
                  { id: "imagery", label: "Imagery & Photography" },
                  { id: "voice", label: "Brand Voice & Tone" },
                  { id: "iconography", label: "Iconography" },
                  { id: "patterns", label: "Patterns & Textures" },
                  { id: "applications", label: "Brand Applications" },
                  { id: "settings", label: "Book Settings" },
                ].map((section) => {
                  const Icon = sectionIcons[section.id] || Settings
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                        activeSection === section.id
                          ? "bg-[#C4D600] text-black font-medium"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Editor */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Brand Story Section */}
          {activeSection === "story" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#C4D600]" />
                  Brand Story & Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Brand Story</Label>
                  <Textarea
                    value={storyData.brand_story || ""}
                    onChange={(e) => setStoryData({ ...storyData, brand_story: e.target.value })}
                    placeholder="Tell the story of the brand... its origins, journey, and what makes it unique."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[150px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Mission Statement</Label>
                    <Textarea
                      value={storyData.mission_statement || ""}
                      onChange={(e) => setStoryData({ ...storyData, mission_statement: e.target.value })}
                      placeholder="What is the brand's purpose?"
                      className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Vision Statement</Label>
                    <Textarea
                      value={storyData.vision_statement || ""}
                      onChange={(e) => setStoryData({ ...storyData, vision_statement: e.target.value })}
                      placeholder="Where is the brand headed?"
                      className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Brand Promise</Label>
                  <Input
                    value={storyData.brand_promise || ""}
                    onChange={(e) => setStoryData({ ...storyData, brand_promise: e.target.value })}
                    placeholder="What does the brand promise to deliver?"
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Unique Value Proposition</Label>
                  <Textarea
                    value={storyData.unique_value_proposition || ""}
                    onChange={(e) => setStoryData({ ...storyData, unique_value_proposition: e.target.value })}
                    placeholder="What makes this brand different from competitors?"
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Positioning Statement</Label>
                  <Textarea
                    value={storyData.positioning_statement || ""}
                    onChange={(e) => setStoryData({ ...storyData, positioning_statement: e.target.value })}
                    placeholder="For [target audience], [brand] is the [category] that [key benefit] because [reason to believe]."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Brand Archetype</Label>
                  <select
                    value={storyData.brand_archetype || ""}
                    onChange={(e) => setStoryData({ ...storyData, brand_archetype: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                  >
                    <option value="">Select an archetype</option>
                    <option value="hero">The Hero - Courageous, Bold, Transformative</option>
                    <option value="sage">The Sage - Wise, Knowledgeable, Trusted</option>
                    <option value="explorer">The Explorer - Adventurous, Independent, Pioneer</option>
                    <option value="outlaw">The Outlaw - Rebellious, Disruptive, Revolutionary</option>
                    <option value="magician">The Magician - Visionary, Transformative, Charismatic</option>
                    <option value="everyman">The Everyman - Relatable, Authentic, Down-to-earth</option>
                    <option value="lover">The Lover - Passionate, Intimate, Sensual</option>
                    <option value="jester">The Jester - Fun, Playful, Optimistic</option>
                    <option value="caregiver">The Caregiver - Nurturing, Compassionate, Protective</option>
                    <option value="creator">The Creator - Innovative, Artistic, Imaginative</option>
                    <option value="ruler">The Ruler - Leader, Responsible, Organized</option>
                    <option value="innocent">The Innocent - Pure, Optimistic, Honest</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Logo Guidelines Section */}
          {activeSection === "logo" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#C4D600]" />
                  Logo Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Primary Logo URL</Label>
                    <Input
                      value={logoData.primary_logo_url || ""}
                      onChange={(e) => setLogoData({ ...logoData, primary_logo_url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Dark Version URL</Label>
                    <Input
                      value={logoData.primary_logo_dark_url || ""}
                      onChange={(e) => setLogoData({ ...logoData, primary_logo_dark_url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Logo Description</Label>
                  <Textarea
                    value={logoData.logo_description || ""}
                    onChange={(e) => setLogoData({ ...logoData, logo_description: e.target.value })}
                    placeholder="Describe the logo design elements..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Logo Meaning & Symbolism</Label>
                  <Textarea
                    value={logoData.logo_meaning || ""}
                    onChange={(e) => setLogoData({ ...logoData, logo_meaning: e.target.value })}
                    placeholder="Explain the meaning behind the logo..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Logo Construction Grid URL</Label>
                    <Input
                      value={logoData.logo_grid_url || ""}
                      onChange={(e) => setLogoData({ ...logoData, logo_grid_url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Clear Space Image URL</Label>
                    <Input
                      value={logoData.clear_space_image_url || ""}
                      onChange={(e) => setLogoData({ ...logoData, clear_space_image_url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Clear Space Requirements</Label>
                  <Textarea
                    value={logoData.clear_space_description || ""}
                    onChange={(e) => setLogoData({ ...logoData, clear_space_description: e.target.value })}
                    placeholder="Define minimum clear space around the logo (e.g., 'The clear space around the logo should be equal to the height of the logomark')"
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Minimum Size (Print)</Label>
                    <Input
                      value={logoData.minimum_size_print || ""}
                      onChange={(e) => setLogoData({ ...logoData, minimum_size_print: e.target.value })}
                      placeholder="e.g., 25mm width"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Minimum Size (Digital)</Label>
                    <Input
                      value={logoData.minimum_size_digital || ""}
                      onChange={(e) => setLogoData({ ...logoData, minimum_size_digital: e.target.value })}
                      placeholder="e.g., 80px width"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Preferred Placement</Label>
                  <Textarea
                    value={logoData.preferred_placement || ""}
                    onChange={(e) => setLogoData({ ...logoData, preferred_placement: e.target.value })}
                    placeholder="Guidelines for logo placement on different materials..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Co-Branding Rules</Label>
                  <Textarea
                    value={logoData.co_branding_rules || ""}
                    onChange={(e) => setLogoData({ ...logoData, co_branding_rules: e.target.value })}
                    placeholder="Rules for using the logo alongside partner logos..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Colors Section */}
          {activeSection === "colors" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-[#C4D600]" />
                  Color Palette
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Color Philosophy</Label>
                  <Textarea
                    value={colorsData.color_philosophy || ""}
                    onChange={(e) => setColorsData({ ...colorsData, color_philosophy: e.target.value })}
                    placeholder="Explain the reasoning behind the color choices..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Color Usage Guidelines</Label>
                  <Textarea
                    value={colorsData.color_usage_guidelines || ""}
                    onChange={(e) => setColorsData({ ...colorsData, color_usage_guidelines: e.target.value })}
                    placeholder="How and when to use each color..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Accessibility Notes</Label>
                  <Textarea
                    value={colorsData.accessibility_notes || ""}
                    onChange={(e) => setColorsData({ ...colorsData, accessibility_notes: e.target.value })}
                    placeholder="WCAG compliance notes, contrast ratios..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <ColorPaletteEditor
                  label="Primary Colors"
                  colors={colorsData.primary_colors || []}
                  onChange={(colors) => setColorsData({ ...colorsData, primary_colors: colors })}
                />

                <ColorPaletteEditor
                  label="Secondary Colors"
                  colors={colorsData.secondary_colors || []}
                  onChange={(colors) => setColorsData({ ...colorsData, secondary_colors: colors })}
                />

                <ColorPaletteEditor
                  label="Accent Colors"
                  colors={colorsData.accent_colors || []}
                  onChange={(colors) => setColorsData({ ...colorsData, accent_colors: colors })}
                />

                <ColorPaletteEditor
                  label="Neutral Colors"
                  colors={colorsData.neutral_colors || []}
                  onChange={(colors) => setColorsData({ ...colorsData, neutral_colors: colors })}
                />
              </CardContent>
            </Card>
          )}

          {/* Typography Section */}
          {activeSection === "typography" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Type className="h-5 w-5 text-[#C4D600]" />
                  Typography System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Typography Philosophy</Label>
                  <Textarea
                    value={typographyData.typography_philosophy || ""}
                    onChange={(e) => setTypographyData({ ...typographyData, typography_philosophy: e.target.value })}
                    placeholder="Explain the typographic approach and choices..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <TypefaceEditor
                  label="Primary Typefaces"
                  typefaces={typographyData.primary_typefaces || []}
                  onChange={(typefaces) => setTypographyData({ ...typographyData, primary_typefaces: typefaces })}
                />

                <TypefaceEditor
                  label="Secondary Typefaces"
                  typefaces={typographyData.secondary_typefaces || []}
                  onChange={(typefaces) => setTypographyData({ ...typographyData, secondary_typefaces: typefaces })}
                />

                <TypeHierarchyEditor
                  hierarchy={typographyData.type_hierarchy || []}
                  onChange={(hierarchy) => setTypographyData({ ...typographyData, type_hierarchy: hierarchy })}
                />
              </CardContent>
            </Card>
          )}

          {/* Brand Voice Section */}
          {activeSection === "voice" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#C4D600]" />
                  Brand Voice & Tone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Voice Overview</Label>
                  <Textarea
                    value={voiceData.voice_overview || ""}
                    onChange={(e) => setVoiceData({ ...voiceData, voice_overview: e.target.value })}
                    placeholder="Describe the overall brand voice..."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Tone Guidelines</Label>
                  <Textarea
                    value={voiceData.tone_guidelines || ""}
                    onChange={(e) => setVoiceData({ ...voiceData, tone_guidelines: e.target.value })}
                    placeholder="How does the tone change in different contexts?"
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Writing Style</Label>
                  <Textarea
                    value={voiceData.writing_style || ""}
                    onChange={(e) => setVoiceData({ ...voiceData, writing_style: e.target.value })}
                    placeholder="Guidelines for writing style, sentence structure, etc."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">About Us (Short)</Label>
                    <Textarea
                      value={voiceData.about_us_short || ""}
                      onChange={(e) => setVoiceData({ ...voiceData, about_us_short: e.target.value })}
                      placeholder="One paragraph about us..."
                      className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Elevator Pitch</Label>
                    <Textarea
                      value={voiceData.elevator_pitch || ""}
                      onChange={(e) => setVoiceData({ ...voiceData, elevator_pitch: e.target.value })}
                      placeholder="30-second pitch..."
                      className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">About Us (Long)</Label>
                  <Textarea
                    value={voiceData.about_us_long || ""}
                    onChange={(e) => setVoiceData({ ...voiceData, about_us_long: e.target.value })}
                    placeholder="Full company description..."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[150px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Imagery Section */}
          {activeSection === "imagery" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#C4D600]" />
                  Imagery & Photography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Photography Style</Label>
                  <Textarea
                    value={imageryData.photography_style || ""}
                    onChange={(e) => setImageryData({ ...imageryData, photography_style: e.target.value })}
                    placeholder="Describe the overall photography style..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Photography Guidelines</Label>
                  <Textarea
                    value={imageryData.photography_guidelines || ""}
                    onChange={(e) => setImageryData({ ...imageryData, photography_guidelines: e.target.value })}
                    placeholder="Detailed guidelines for photography..."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Photography Mood</Label>
                  <select
                    value={imageryData.photography_mood || ""}
                    onChange={(e) => setImageryData({ ...imageryData, photography_mood: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                  >
                    <option value="">Select a mood</option>
                    <option value="warm">Warm & Inviting</option>
                    <option value="cool">Cool & Professional</option>
                    <option value="natural">Natural & Organic</option>
                    <option value="dramatic">Dramatic & Bold</option>
                    <option value="minimal">Minimal & Clean</option>
                    <option value="vibrant">Vibrant & Energetic</option>
                    <option value="moody">Moody & Atmospheric</option>
                    <option value="bright">Bright & Airy</option>
                  </select>
                </div>

                <div>
                  <Label className="text-gray-300">Illustration Style</Label>
                  <Textarea
                    value={imageryData.illustration_style || ""}
                    onChange={(e) => setImageryData({ ...imageryData, illustration_style: e.target.value })}
                    placeholder="Describe the illustration style if applicable..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Stock Photo Rules</Label>
                  <Textarea
                    value={imageryData.stock_photo_rules || ""}
                    onChange={(e) => setImageryData({ ...imageryData, stock_photo_rules: e.target.value })}
                    placeholder="Guidelines for selecting stock photos..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Iconography Section */}
          {activeSection === "iconography" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5 text-[#C4D600]" />
                  Iconography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Icon Style</Label>
                  <select
                    value={iconographyData.icon_style || ""}
                    onChange={(e) => setIconographyData({ ...iconographyData, icon_style: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                  >
                    <option value="">Select icon style</option>
                    <option value="outlined">Outlined / Line Icons</option>
                    <option value="filled">Filled / Solid Icons</option>
                    <option value="duotone">Duotone</option>
                    <option value="gradient">Gradient</option>
                    <option value="hand-drawn">Hand-drawn</option>
                    <option value="3d">3D / Isometric</option>
                  </select>
                </div>

                <div>
                  <Label className="text-gray-300">Icon Guidelines</Label>
                  <Textarea
                    value={iconographyData.icon_guidelines || ""}
                    onChange={(e) => setIconographyData({ ...iconographyData, icon_guidelines: e.target.value })}
                    placeholder="Guidelines for icon usage and creation..."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Stroke Width</Label>
                    <Input
                      value={iconographyData.stroke_width || ""}
                      onChange={(e) => setIconographyData({ ...iconographyData, stroke_width: e.target.value })}
                      placeholder="e.g., 1.5px, 2px"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Corner Radius</Label>
                    <Input
                      value={iconographyData.corner_radius || ""}
                      onChange={(e) => setIconographyData({ ...iconographyData, corner_radius: e.target.value })}
                      placeholder="e.g., 2px, rounded"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Icon Color Rules</Label>
                  <Textarea
                    value={iconographyData.icon_color_rules || ""}
                    onChange={(e) => setIconographyData({ ...iconographyData, icon_color_rules: e.target.value })}
                    placeholder="Which colors to use for icons..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Patterns Section */}
          {activeSection === "patterns" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#C4D600]" />
                  Patterns & Textures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Pattern Philosophy</Label>
                  <Textarea
                    value={patternsData.pattern_philosophy || ""}
                    onChange={(e) => setPatternsData({ ...patternsData, pattern_philosophy: e.target.value })}
                    placeholder="The role patterns play in the brand identity..."
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Pattern Usage Guidelines</Label>
                  <Textarea
                    value={patternsData.pattern_usage_guidelines || ""}
                    onChange={(e) => setPatternsData({ ...patternsData, pattern_usage_guidelines: e.target.value })}
                    placeholder="How and where to use patterns..."
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Applications Section */}
          {activeSection === "applications" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#C4D600]" />
                  Brand Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Upload mockups and examples showing the brand applied across different mediums. Use the Asset Library
                  to upload files and reference them here.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Business Cards",
                    "Letterheads",
                    "Email Signatures",
                    "Social Media",
                    "Website",
                    "Presentations",
                    "Brochures",
                    "Signage",
                    "Merchandise",
                  ].map((item) => (
                    <Card key={item} className="bg-white/5 border-white/10 p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{item}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#C4D600]" />
                  Book Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={brandBook.title}
                      onChange={async (e) => {
                        setBrandBook({ ...brandBook, title: e.target.value })
                        await supabase.from("brand_books").update({ title: e.target.value }).eq("id", brandBookId)
                      }}
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Version</Label>
                    <Input
                      value={brandBook.version}
                      onChange={async (e) => {
                        setBrandBook({ ...brandBook, version: e.target.value })
                        await supabase.from("brand_books").update({ version: e.target.value }).eq("id", brandBookId)
                      }}
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Public Access</p>
                    <p className="text-sm text-gray-400">Allow anyone with the link to view</p>
                  </div>
                  <Switch
                    checked={brandBook.is_public}
                    onCheckedChange={async (checked) => {
                      setBrandBook({ ...brandBook, is_public: checked })
                      await supabase.from("brand_books").update({ is_public: checked }).eq("id", brandBookId)
                    }}
                  />
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="font-medium text-white mb-2">Share Link</p>
                  <div className="flex gap-2">
                    <Input
                      value={`${typeof window !== "undefined" ? window.location.origin : ""}/brand-book/${brandBook.share_token}`}
                      readOnly
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/brand-book/${brandBook.share_token}`)
                      }}
                      variant="outline"
                      className="border-white/20 text-gray-300"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Color Palette Editor Component
function ColorPaletteEditor({
  label,
  colors,
  onChange,
}: {
  label: string
  colors: any[]
  onChange: (colors: any[]) => void
}) {
  const addColor = () => {
    onChange([...colors, { name: "", hex: "#000000", rgb: "", cmyk: "", pantone: "", usage: "" }])
  }

  const updateColor = (index: number, field: string, value: string) => {
    const updated = [...colors]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addColor}
          className="text-[#C4D600] hover:text-[#d4e600]"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Color
        </Button>
      </div>

      <div className="space-y-3">
        {colors.map((color, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color.hex || "#000000"}
                onChange={(e) => updateColor(index, "hex", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-0"
              />
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={color.name || ""}
                  onChange={(e) => updateColor(index, "name", e.target.value)}
                  placeholder="Color Name"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
                <Input
                  value={color.hex || ""}
                  onChange={(e) => updateColor(index, "hex", e.target.value)}
                  placeholder="#000000"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeColor(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                value={color.rgb || ""}
                onChange={(e) => updateColor(index, "rgb", e.target.value)}
                placeholder="RGB"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
              <Input
                value={color.cmyk || ""}
                onChange={(e) => updateColor(index, "cmyk", e.target.value)}
                placeholder="CMYK"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
              <Input
                value={color.pantone || ""}
                onChange={(e) => updateColor(index, "pantone", e.target.value)}
                placeholder="Pantone"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
            </div>
            <Input
              value={color.usage || ""}
              onChange={(e) => updateColor(index, "usage", e.target.value)}
              placeholder="Usage guidelines for this color"
              className="bg-white/5 border-white/10 text-white text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Typeface Editor Component
function TypefaceEditor({
  label,
  typefaces,
  onChange,
}: {
  label: string
  typefaces: any[]
  onChange: (typefaces: any[]) => void
}) {
  const addTypeface = () => {
    onChange([...typefaces, { name: "", family: "", weights: "", styles: "", usage: "", license: "" }])
  }

  const updateTypeface = (index: number, field: string, value: string) => {
    const updated = [...typefaces]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeTypeface = (index: number) => {
    onChange(typefaces.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addTypeface}
          className="text-[#C4D600] hover:text-[#d4e600]"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Typeface
        </Button>
      </div>

      <div className="space-y-3">
        {typefaces.map((typeface, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={typeface.name || ""}
                  onChange={(e) => updateTypeface(index, "name", e.target.value)}
                  placeholder="Font Name (e.g., Inter)"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
                <Input
                  value={typeface.family || ""}
                  onChange={(e) => updateTypeface(index, "family", e.target.value)}
                  placeholder="Font Family (e.g., sans-serif)"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTypeface(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={typeface.weights || ""}
                onChange={(e) => updateTypeface(index, "weights", e.target.value)}
                placeholder="Weights (e.g., 400, 500, 600, 700)"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
              <Input
                value={typeface.license || ""}
                onChange={(e) => updateTypeface(index, "license", e.target.value)}
                placeholder="License (e.g., Google Fonts, Commercial)"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
            </div>
            <Input
              value={typeface.usage || ""}
              onChange={(e) => updateTypeface(index, "usage", e.target.value)}
              placeholder="Usage guidelines for this typeface"
              className="bg-white/5 border-white/10 text-white text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Type Hierarchy Editor Component
function TypeHierarchyEditor({
  hierarchy,
  onChange,
}: {
  hierarchy: any[]
  onChange: (hierarchy: any[]) => void
}) {
  const addLevel = () => {
    onChange([...hierarchy, { level: "", name: "", font: "", size: "", weight: "", line_height: "", usage: "" }])
  }

  const updateLevel = (index: number, field: string, value: string) => {
    const updated = [...hierarchy]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeLevel = (index: number) => {
    onChange(hierarchy.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Type Hierarchy</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLevel}
          className="text-[#C4D600] hover:text-[#d4e600]"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Level
        </Button>
      </div>

      <div className="space-y-3">
        {hierarchy.map((level, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <Input
                  value={level.name || ""}
                  onChange={(e) => updateLevel(index, "name", e.target.value)}
                  placeholder="Name (e.g., H1, Body)"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
                <Input
                  value={level.size || ""}
                  onChange={(e) => updateLevel(index, "size", e.target.value)}
                  placeholder="Size (e.g., 48px)"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
                <Input
                  value={level.weight || ""}
                  onChange={(e) => updateLevel(index, "weight", e.target.value)}
                  placeholder="Weight (e.g., 700)"
                  className="bg-white/5 border-white/10 text-white text-sm"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeLevel(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={level.line_height || ""}
                onChange={(e) => updateLevel(index, "line_height", e.target.value)}
                placeholder="Line Height (e.g., 1.5)"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
              <Input
                value={level.usage || ""}
                onChange={(e) => updateLevel(index, "usage", e.target.value)}
                placeholder="Usage (e.g., Page titles)"
                className="bg-white/5 border-white/10 text-white text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
