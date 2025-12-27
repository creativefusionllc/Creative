"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Target,
  ImageIcon,
  Palette,
  Type,
  MessageSquare,
  Grid3X3,
  Layers,
  FileText,
  Download,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

interface BrandBookViewerProps {
  brandBook: any
  story: any
  logo: any
  colors: any
  typography: any
  imagery: any
  voice: any
  iconography: any
  patterns: any
  applications: any
  assets: any[]
}

export function BrandBookViewer({
  brandBook,
  story,
  logo,
  colors,
  typography,
  imagery,
  voice,
  iconography,
  patterns,
  applications,
  assets,
}: BrandBookViewerProps) {
  const [activeSection, setActiveSection] = useState("cover")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections = [
    { id: "cover", label: "Cover", icon: BookOpen },
    { id: "story", label: "Brand Story", icon: Target },
    { id: "logo", label: "Logo Guidelines", icon: ImageIcon },
    { id: "colors", label: "Color Palette", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "imagery", label: "Imagery", icon: ImageIcon },
    { id: "voice", label: "Brand Voice", icon: MessageSquare },
    { id: "iconography", label: "Iconography", icon: Grid3X3 },
    { id: "patterns", label: "Patterns", icon: Layers },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "downloads", label: "Downloads", icon: Download },
  ]

  const primaryColor = colors?.primary_colors?.[0]?.hex || "#C4D600"

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-semibold truncate max-w-[200px]">{brandBook.title}</span>
        <Badge variant="outline">v{brandBook.version}</Badge>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-semibold">Contents</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ScrollArea className="h-[calc(100vh-60px)]">
              <nav className="p-4 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeSection === section.id ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-gray-50 border-r">
          <div className="p-6 border-b bg-white">
            <h1 className="font-bold text-xl">{brandBook.title}</h1>
            {brandBook.subtitle && <p className="text-gray-500 text-sm mt-1">{brandBook.subtitle}</p>}
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline">v{brandBook.version}</Badge>
              <Badge className="text-white" style={{ backgroundColor: primaryColor }}>
                {brandBook.clients?.company_name}
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeSection === section.id ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  {section.label}
                  {activeSection === section.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} {brandBook.clients?.company_name}
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
          {/* Cover Section */}
          {activeSection === "cover" && (
            <section
              className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
              style={{ backgroundColor: brandBook.cover_background_color || "#ffffff" }}
            >
              {logo?.primary_logo_url && (
                <img
                  src={logo.primary_logo_url || "/placeholder.svg"}
                  alt="Logo"
                  className="max-w-[300px] max-h-[200px] object-contain mb-12"
                />
              )}
              <h1
                className="text-5xl md:text-7xl font-bold mb-4"
                style={{ color: brandBook.cover_text_color || "#000000" }}
              >
                {brandBook.title}
              </h1>
              {brandBook.subtitle && (
                <p
                  className="text-xl md:text-2xl opacity-60"
                  style={{ color: brandBook.cover_text_color || "#000000" }}
                >
                  {brandBook.subtitle}
                </p>
              )}
              <div className="mt-12">
                <Badge className="text-lg px-4 py-2" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  Version {brandBook.version}
                </Badge>
              </div>
            </section>
          )}

          {/* Brand Story Section */}
          {activeSection === "story" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  01
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Brand Story</h2>
                <p className="text-xl text-gray-500">The heart and soul of our brand</p>
              </div>

              {story?.brand_story && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
                  <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{story.brand_story}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {story?.mission_statement && (
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-3">Mission</h3>
                    <p className="text-gray-600">{story.mission_statement}</p>
                  </div>
                )}
                {story?.vision_statement && (
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-3">Vision</h3>
                    <p className="text-gray-600">{story.vision_statement}</p>
                  </div>
                )}
              </div>

              {story?.brand_promise && (
                <div className="p-8 rounded-2xl text-center mb-12" style={{ backgroundColor: primaryColor }}>
                  <h3 className="text-xl font-semibold mb-3">Brand Promise</h3>
                  <p className="text-lg font-medium">{story.brand_promise}</p>
                </div>
              )}

              {story?.unique_value_proposition && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Value Proposition</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{story.unique_value_proposition}</p>
                </div>
              )}

              {story?.brand_archetype && (
                <div className="p-6 border-2 border-gray-200 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-2">Brand Archetype</h3>
                  <Badge className="text-lg capitalize">{story.brand_archetype}</Badge>
                </div>
              )}
            </section>
          )}

          {/* Logo Section */}
          {activeSection === "logo" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  02
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Logo Guidelines</h2>
                <p className="text-xl text-gray-500">Proper usage of our brand mark</p>
              </div>

              {(logo?.primary_logo_url || logo?.primary_logo_dark_url) && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {logo?.primary_logo_url && (
                    <div className="p-12 bg-white border rounded-2xl flex items-center justify-center">
                      <img
                        src={logo.primary_logo_url || "/placeholder.svg"}
                        alt="Primary Logo"
                        className="max-w-full max-h-[200px] object-contain"
                      />
                    </div>
                  )}
                  {logo?.primary_logo_dark_url && (
                    <div className="p-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                      <img
                        src={logo.primary_logo_dark_url || "/placeholder.svg"}
                        alt="Logo Dark Version"
                        className="max-w-full max-h-[200px] object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {logo?.logo_description && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">About Our Logo</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{logo.logo_description}</p>
                </div>
              )}

              {logo?.logo_meaning && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Symbolism & Meaning</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{logo.logo_meaning}</p>
                </div>
              )}

              {logo?.clear_space_description && (
                <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-3">Clear Space</h3>
                  <p className="text-gray-600">{logo.clear_space_description}</p>
                  {logo?.clear_space_image_url && (
                    <img
                      src={logo.clear_space_image_url || "/placeholder.svg"}
                      alt="Clear Space"
                      className="mt-4 max-w-full rounded-lg"
                    />
                  )}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {logo?.minimum_size_print && (
                  <div className="p-6 border rounded-2xl">
                    <h4 className="font-semibold mb-2">Minimum Size (Print)</h4>
                    <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {logo.minimum_size_print}
                    </p>
                  </div>
                )}
                {logo?.minimum_size_digital && (
                  <div className="p-6 border rounded-2xl">
                    <h4 className="font-semibold mb-2">Minimum Size (Digital)</h4>
                    <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {logo.minimum_size_digital}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Colors Section */}
          {activeSection === "colors" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  03
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Color Palette</h2>
                <p className="text-xl text-gray-500">Our brand colors and their usage</p>
              </div>

              {colors?.color_philosophy && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Color Philosophy</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{colors.color_philosophy}</p>
                </div>
              )}

              {colors?.primary_colors?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Primary Colors</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colors.primary_colors.map((color: any, index: number) => (
                      <div key={index} className="rounded-2xl overflow-hidden border">
                        <div className="h-32" style={{ backgroundColor: color.hex }} />
                        <div className="p-4 bg-white">
                          <h4 className="font-semibold mb-2">{color.name || `Color ${index + 1}`}</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">HEX:</span> {color.hex}
                            </p>
                            {color.rgb && (
                              <p>
                                <span className="font-medium">RGB:</span> {color.rgb}
                              </p>
                            )}
                            {color.cmyk && (
                              <p>
                                <span className="font-medium">CMYK:</span> {color.cmyk}
                              </p>
                            )}
                            {color.pantone && (
                              <p>
                                <span className="font-medium">Pantone:</span> {color.pantone}
                              </p>
                            )}
                          </div>
                          {color.usage && <p className="mt-3 text-sm text-gray-500">{color.usage}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {colors?.secondary_colors?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Secondary Colors</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colors.secondary_colors.map((color: any, index: number) => (
                      <div key={index} className="rounded-2xl overflow-hidden border">
                        <div className="h-24" style={{ backgroundColor: color.hex }} />
                        <div className="p-4 bg-white">
                          <h4 className="font-semibold mb-2">{color.name || `Color ${index + 1}`}</h4>
                          <p className="text-sm text-gray-600">HEX: {color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {colors?.accessibility_notes && (
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-gray-600">{colors.accessibility_notes}</p>
                </div>
              )}
            </section>
          )}

          {/* Typography Section */}
          {activeSection === "typography" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  04
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Typography</h2>
                <p className="text-xl text-gray-500">Our typographic system</p>
              </div>

              {typography?.typography_philosophy && (
                <div className="mb-12">
                  <p className="text-lg text-gray-600 leading-relaxed">{typography.typography_philosophy}</p>
                </div>
              )}

              {typography?.primary_typefaces?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Primary Typefaces</h3>
                  <div className="space-y-6">
                    {typography.primary_typefaces.map((typeface: any, index: number) => (
                      <div key={index} className="p-6 border rounded-2xl">
                        <h4 className="text-3xl font-bold mb-2" style={{ fontFamily: typeface.family }}>
                          {typeface.name}
                        </h4>
                        <p className="text-gray-500 mb-4">{typeface.family}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {typeface.weights?.split(",").map((weight: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {weight.trim()}
                            </Badge>
                          ))}
                        </div>
                        {typeface.usage && <p className="text-sm text-gray-600">{typeface.usage}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {typography?.type_hierarchy?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Type Hierarchy</h3>
                  <div className="space-y-4">
                    {typography.type_hierarchy.map((level: any, index: number) => (
                      <div key={index} className="p-4 border-l-4 bg-gray-50" style={{ borderColor: primaryColor }}>
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          <span className="font-semibold">{level.name}</span>
                          <Badge variant="outline">{level.size}</Badge>
                          <Badge variant="outline">Weight: {level.weight}</Badge>
                          {level.line_height && <Badge variant="outline">Line Height: {level.line_height}</Badge>}
                        </div>
                        {level.usage && <p className="text-sm text-gray-500">{level.usage}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Brand Voice Section */}
          {activeSection === "voice" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  06
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Brand Voice</h2>
                <p className="text-xl text-gray-500">How we communicate</p>
              </div>

              {voice?.voice_overview && (
                <div className="mb-12">
                  <p className="text-lg text-gray-600 leading-relaxed">{voice.voice_overview}</p>
                </div>
              )}

              {voice?.tone_guidelines && (
                <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-3">Tone Guidelines</h3>
                  <p className="text-gray-600">{voice.tone_guidelines}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {voice?.about_us_short && (
                  <div className="p-6 border rounded-2xl">
                    <h4 className="font-semibold mb-3">About Us (Short)</h4>
                    <p className="text-gray-600">{voice.about_us_short}</p>
                  </div>
                )}
                {voice?.elevator_pitch && (
                  <div className="p-6 border rounded-2xl">
                    <h4 className="font-semibold mb-3">Elevator Pitch</h4>
                    <p className="text-gray-600">{voice.elevator_pitch}</p>
                  </div>
                )}
              </div>

              {voice?.about_us_long && (
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold mb-3">About Us (Full)</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{voice.about_us_long}</p>
                </div>
              )}
            </section>
          )}

          {/* Imagery Section */}
          {activeSection === "imagery" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  05
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Imagery</h2>
                <p className="text-xl text-gray-500">Visual content guidelines</p>
              </div>

              {imagery?.photography_style && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Photography Style</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{imagery.photography_style}</p>
                </div>
              )}

              {imagery?.photography_mood && (
                <div className="mb-12 p-6 border-2 rounded-2xl" style={{ borderColor: primaryColor }}>
                  <h4 className="font-semibold mb-2">Photography Mood</h4>
                  <Badge className="text-lg capitalize">{imagery.photography_mood}</Badge>
                </div>
              )}

              {imagery?.photography_guidelines && (
                <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-3">Guidelines</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{imagery.photography_guidelines}</p>
                </div>
              )}

              {imagery?.illustration_style && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Illustration Style</h3>
                  <p className="text-lg text-gray-600">{imagery.illustration_style}</p>
                </div>
              )}
            </section>
          )}

          {/* Iconography Section */}
          {activeSection === "iconography" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  07
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Iconography</h2>
                <p className="text-xl text-gray-500">Icon system and usage</p>
              </div>

              {iconography?.icon_style && (
                <div className="mb-12 p-6 border-2 rounded-2xl" style={{ borderColor: primaryColor }}>
                  <h4 className="font-semibold mb-2">Icon Style</h4>
                  <Badge className="text-lg capitalize">{iconography.icon_style}</Badge>
                </div>
              )}

              {iconography?.icon_guidelines && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Guidelines</h3>
                  <p className="text-lg text-gray-600">{iconography.icon_guidelines}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {iconography?.stroke_width && (
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-semibold mb-2">Stroke Width</h4>
                    <p className="text-2xl font-bold">{iconography.stroke_width}</p>
                  </div>
                )}
                {iconography?.corner_radius && (
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-semibold mb-2">Corner Radius</h4>
                    <p className="text-2xl font-bold">{iconography.corner_radius}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Patterns Section */}
          {activeSection === "patterns" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  08
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Patterns & Textures</h2>
                <p className="text-xl text-gray-500">Brand patterns and visual textures</p>
              </div>

              {patterns?.pattern_philosophy && (
                <div className="mb-12">
                  <p className="text-lg text-gray-600 leading-relaxed">{patterns.pattern_philosophy}</p>
                </div>
              )}

              {patterns?.pattern_usage_guidelines && (
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-3">Usage Guidelines</h3>
                  <p className="text-gray-600">{patterns.pattern_usage_guidelines}</p>
                </div>
              )}
            </section>
          )}

          {/* Applications Section */}
          {activeSection === "applications" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  09
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Brand Applications</h2>
                <p className="text-xl text-gray-500">How our brand comes to life</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div key={item} className="p-6 border rounded-2xl hover:shadow-lg transition-shadow">
                    <FileText className="h-8 w-8 mb-3" style={{ color: primaryColor }} />
                    <h4 className="font-semibold">{item}</h4>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Downloads Section */}
          {activeSection === "downloads" && (
            <section className="max-w-4xl mx-auto p-8 md:p-16">
              <div className="mb-12">
                <Badge className="mb-4" style={{ backgroundColor: primaryColor, color: "#000" }}>
                  10
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Downloads</h2>
                <p className="text-xl text-gray-500">Brand assets and resources</p>
              </div>

              {assets.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assets.map((asset) => (
                    <a
                      key={asset.id}
                      href={asset.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-6 border rounded-2xl hover:shadow-lg transition-shadow group"
                    >
                      <Download
                        className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform"
                        style={{ color: primaryColor }}
                      />
                      <h4 className="font-semibold mb-1">{asset.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{asset.description}</p>
                      <Badge variant="outline">{asset.file_format?.toUpperCase()}</Badge>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assets available for download yet.</p>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
