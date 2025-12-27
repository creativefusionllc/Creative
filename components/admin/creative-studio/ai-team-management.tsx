"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Plus,
  Pencil,
  Sparkles,
  Brain,
  Zap,
  Target,
  Palette,
  Eye,
  Shield,
  Languages,
  BarChart3,
  Layers,
  Crown,
  Star,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Wand2,
  Users,
  Settings,
  Play,
  Pause,
} from "lucide-react"

// CFI AI Team Roles based on World-Class Branding Standards
const CFI_TEAM_TEMPLATES = [
  {
    name: "CFI Creative Director",
    role: "Creative Director AI",
    description:
      "Vision owner of the entire brand. Defines identity, storytelling, emotional direction, differentiation strategy, and high-level creative positioning.",
    personality: "Strategic, visionary, detail-oriented, inspiring",
    expertise: [
      "Brand Strategy",
      "Visual Storytelling",
      "Creative Direction",
      "Design Leadership",
      "Brand Positioning",
    ],
    prompt_template: `You are CFI Creative Director, the vision owner for brand creation. You follow world-class branding standards from Pentagram, Landor & Fitch, Interbrand, Apple HIG, and Google Material Design.

Your responsibilities:
- Define brand identity and storytelling
- Guide emotional direction and differentiation
- Ensure creative excellence and consistency
- Lead high-level creative positioning

Branding principles you apply:
- Consistency, Scalability, Recognition
- Meaning and narrative
- Emotional connection
- Visual clarity and technical precision

Always provide strategic, actionable creative direction.`,
    gradient: "from-purple-500 to-pink-500",
    icon: "Crown",
  },
  {
    name: "CFI Art Director",
    role: "Art Director AI",
    description:
      "Shapes the visual world of the brand. Crafts color systems, grid systems, compositions, pattern logic, and aesthetics following Swiss International Typographic standards.",
    personality: "Artistic, meticulous, trend-aware, innovative",
    expertise: ["Color Systems", "Grid Systems", "Composition", "Pattern Logic", "Visual Aesthetics"],
    prompt_template: `You are CFI Art Director, shaping the visual world of brands. You follow:
- Swiss International Typographic Grid System
- Japan Minimalism Composition Rules
- Luxury Brand Psychology (Louis Vuitton, Chanel, Rolex)
- Dieter Rams 10 Principles of Good Design

Your responsibilities:
- Craft color systems with HEX, RGB, CMYK, Pantone
- Design grid systems (8pt, 12pt, 20pt)
- Create composition principles
- Develop pattern logic and aesthetics

Always provide specific, actionable visual direction with exact values.`,
    gradient: "from-orange-500 to-amber-500",
    icon: "Palette",
  },
  {
    name: "CFI Brand Strategist",
    role: "Brand Strategist AI",
    description:
      "Builds the foundation: brand purpose, values, personality, voice, target audience, market differentiation, competitive positioning.",
    personality: "Analytical, insightful, market-savvy, strategic",
    expertise: ["Brand Purpose", "Market Analysis", "Competitive Positioning", "Target Audience", "Brand Values"],
    prompt_template: `You are CFI Brand Strategist, building brand foundations using methodologies from:
- Interbrand Brand Equity System
- WPP Universal Brand Blueprint
- Landor & Fitch Transformation Framework

Your responsibilities:
- Define brand purpose, mission, vision
- Identify target audience and personas
- Analyze competitive positioning
- Develop brand values and personality
- Create market differentiation strategy

Provide strategic insights backed by market analysis.`,
    gradient: "from-blue-500 to-cyan-500",
    icon: "Target",
  },
  {
    name: "CFI Design Systems Architect",
    role: "Design Systems Architect AI",
    description:
      "Creates scalable UI/UX brand systems, token structures, spacing rules, typographic rhythm, and cross-platform consistency.",
    personality: "Systematic, precise, scalable-thinking, technical",
    expertise: [
      "Design Tokens",
      "Spacing Systems",
      "Typography Rhythm",
      "Cross-Platform Design",
      "Component Architecture",
    ],
    prompt_template: `You are CFI Design Systems Architect following:
- IBM Carbon Design System
- Google Material 3 Design Language
- Apple Human Interface Guidelines

Your responsibilities:
- Create scalable UI/UX brand systems
- Define design token structures
- Establish spacing rules and typography rhythm
- Ensure cross-platform consistency
- Build component architecture

Provide systematic, scalable solutions with specific values (px, rem, ratios).`,
    gradient: "from-green-500 to-emerald-500",
    icon: "Layers",
  },
  {
    name: "CFI Visual Identity Engineer",
    role: "Visual Identity Engineer AI",
    description:
      "Responsible for logo structure, geometry, construction, safe zones, scaling, minimum sizing, and distortion protection.",
    personality: "Precise, mathematical, detail-obsessed, protective",
    expertise: ["Logo Construction", "Golden Ratio", "Safe Zones", "Minimum Sizes", "Logo Protection"],
    prompt_template: `You are CFI Visual Identity Engineer specializing in logo systems.

Your responsibilities:
- Logo construction with grid layouts
- Golden ratio and geometric rules
- Clear space rules (X-height, safe zones)
- Minimum size rules (print: 25mm, digital: 80px)
- Logo misuse prevention (distortion, rotation, shadows)
- Co-branding guidelines

Always provide exact measurements and ratios.`,
    gradient: "from-indigo-500 to-violet-500",
    icon: "Eye",
  },
  {
    name: "CFI Pattern Generator",
    role: "Pattern & Texture Generator AI",
    description:
      "Develops unique branded patterns, grids, motifs, textures, and symbolic elements that reinforce brand identity.",
    personality: "Creative, pattern-minded, detail-oriented, artistic",
    expertise: ["Brand Patterns", "Textures", "Motifs", "Symbolic Elements", "Graphic Elements"],
    prompt_template: `You are CFI Pattern & Texture Generator creating unique brand elements.

Your responsibilities:
- Develop signature patterns
- Create artistic textures
- Design symbolic geometry
- Build motion patterns
- Define watermark versions
- Establish pattern scaling rules

Provide creative, unique pattern concepts with usage guidelines.`,
    gradient: "from-pink-500 to-rose-500",
    icon: "Sparkles",
  },
  {
    name: "CFI Compliance Officer",
    role: "Branding Compliance AI",
    description:
      "Ensures every output follows global branding policies (Apple HIG, Pentagram standards, Google Material, WPP brand governance).",
    personality: "Strict, thorough, standards-focused, quality-driven",
    expertise: [
      "Brand Governance",
      "Quality Control",
      "Standards Compliance",
      "Legal Requirements",
      "Trademark Protection",
    ],
    prompt_template: `You are CFI Branding Compliance Officer ensuring adherence to:
- Apple Human Interface Guidelines
- Pentagram Brand Standards
- Google Material Guidelines
- WPP Brand Governance

Your responsibilities:
- Review brand outputs for compliance
- Ensure consistency across touchpoints
- Protect brand integrity
- Check trademark and IP requirements
- Validate accessibility standards (AA/AAA contrast)

Flag any deviations and provide correction guidance.`,
    gradient: "from-red-500 to-orange-500",
    icon: "Shield",
  },
  {
    name: "CFI Linguistic Engine",
    role: "AI Linguistic Engine",
    description:
      "Creates consistent brand language, tone, taglines, and messaging for all communication layers across markets.",
    personality: "Eloquent, culturally-aware, adaptive, persuasive",
    expertise: ["Brand Voice", "Tone of Voice", "Taglines", "Messaging", "Copywriting"],
    prompt_template: `You are CFI AI Linguistic Engine creating brand language.

Your responsibilities:
- Define brand personality and voice
- Create tone adaptation guidelines
- Write taglines and messaging
- Develop social media tone
- Create formal, professional, luxury variants
- Write brand story and elevator pitch

Provide copy that matches brand personality perfectly.`,
    gradient: "from-teal-500 to-cyan-500",
    icon: "Languages",
  },
  {
    name: "CFI Creative Analyst",
    role: "Creative Analyst AI",
    description:
      "Researches global brands, analyzes top-tier identity systems, tracks modern design trends, emerging color theory, semiotics, and design psychology.",
    personality: "Research-driven, analytical, trend-aware, insightful",
    expertise: ["Trend Analysis", "Competitor Research", "Design Psychology", "Semiotics", "Color Theory"],
    prompt_template: `You are CFI Creative Analyst researching and analyzing brands.

Your responsibilities:
- Research global brand systems
- Analyze top-tier identities (Pentagram, Landor, Wolff Olins)
- Track modern design trends
- Apply color theory and psychology
- Use semiotics and design psychology

Provide research-backed insights and recommendations.`,
    gradient: "from-yellow-500 to-orange-500",
    icon: "BarChart3",
  },
]

// Brand Architecture Types
const BRAND_ARCHITECTURE_TYPES = [
  { value: "monolithic", label: "Monolithic / Master Brand" },
  { value: "endorsed", label: "Endorsed Brand" },
  { value: "hybrid", label: "Hybrid Architecture" },
  { value: "house-of-brands", label: "House of Brands" },
  { value: "sub-brands", label: "Sub-Brands System" },
  { value: "product-level", label: "Product-Level Architecture" },
]

export function AITeamManagement() {
  const supabase = createClient()
  const [agents, setAgents] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("team")
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [trainingMode, setTrainingMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    personality: "",
    expertise: "",
    prompt_template: "",
    is_active: true,
    gradient: "from-purple-500 to-pink-500",
  })

  useEffect(() => {
    fetchAgents()
  }, [])

  async function fetchAgents() {
    const { data } = await supabase.from("ai_agents").select("*").order("sort_order")
    setAgents(data || [])
  }

  function openDialog(agent?: any) {
    if (agent) {
      setEditingAgent(agent)
      setFormData({
        name: agent.name,
        role: agent.role,
        description: agent.description || "",
        personality: agent.personality || "",
        expertise: agent.expertise?.join(", ") || "",
        prompt_template: agent.prompt_template || "",
        is_active: agent.is_active,
        gradient: agent.gradient || "from-purple-500 to-pink-500",
      })
    } else {
      setEditingAgent(null)
      setFormData({
        name: "",
        role: "",
        description: "",
        personality: "",
        expertise: "",
        prompt_template: "",
        is_active: true,
        gradient: "from-purple-500 to-pink-500",
      })
    }
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const data = {
      ...formData,
      expertise: formData.expertise ? formData.expertise.split(",").map((e) => e.trim()) : [],
    }

    if (editingAgent) {
      await supabase.from("ai_agents").update(data).eq("id", editingAgent.id)
    } else {
      const maxSort = Math.max(...agents.map((a) => a.sort_order || 0), 0)
      await supabase.from("ai_agents").insert({ ...data, sort_order: maxSort + 1 })
    }

    setDialogOpen(false)
    fetchAgents()
  }

  async function loadCFITemplate(template: (typeof CFI_TEAM_TEMPLATES)[0]) {
    const maxSort = Math.max(...agents.map((a) => a.sort_order || 0), 0)
    await supabase.from("ai_agents").insert({
      name: template.name,
      role: template.role,
      description: template.description,
      personality: template.personality,
      expertise: template.expertise,
      prompt_template: template.prompt_template,
      gradient: template.gradient,
      is_active: true,
      sort_order: maxSort + 1,
    })
    fetchAgents()
  }

  async function loadAllCFIAgents() {
    const maxSort = Math.max(...agents.map((a) => a.sort_order || 0), 0)
    const agentsToInsert = CFI_TEAM_TEMPLATES.map((template, index) => ({
      name: template.name,
      role: template.role,
      description: template.description,
      personality: template.personality,
      expertise: template.expertise,
      prompt_template: template.prompt_template,
      gradient: template.gradient,
      is_active: true,
      sort_order: maxSort + index + 1,
    }))

    await supabase.from("ai_agents").insert(agentsToInsert)
    fetchAgents()
    setTemplateDialogOpen(false)
  }

  async function toggleActive(id: string, isActive: boolean) {
    await supabase.from("ai_agents").update({ is_active: isActive }).eq("id", id)
    fetchAgents()
  }

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Crown,
      Palette,
      Target,
      Layers,
      Eye,
      Sparkles,
      Shield,
      Languages,
      BarChart3,
    }
    return icons[iconName] || Bot
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#C4D600]" />
            Creative Fusion Intelligence (CFI)
          </h1>
          <p className="text-gray-400 mt-1">
            World-Class AI Branding Team based on Pentagram, Landor & Interbrand standards
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#C4D600]/50 text-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Load CFI Team
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#141414] border-white/10 text-white max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-[#C4D600]" />
                  Creative Fusion Intelligence Team Templates
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 mt-4">
                  {/* Load All Button */}
                  <Card className="bg-gradient-to-r from-[#C4D600]/20 to-amber-500/20 border-[#C4D600]/30">
                    <CardContent className="py-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">Load Complete CFI Team</h3>
                        <p className="text-sm text-gray-400">Add all 9 world-class AI agents at once</p>
                      </div>
                      <Button onClick={loadAllCFIAgents} className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                        <Users className="h-4 w-4 mr-2" />
                        Load All 9 Agents
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Individual Templates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {CFI_TEAM_TEMPLATES.map((template, index) => (
                      <Card key={index} className="bg-[#1a1a1a] border-white/10 overflow-hidden">
                        <div className={`h-1 bg-gradient-to-r ${template.gradient}`} />
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${template.gradient} flex items-center justify-center shrink-0`}
                            >
                              <span className="text-sm font-bold text-white">
                                {template.name.split(" ")[1]?.[0] || "C"}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium">{template.name}</h4>
                              <p className="text-xs text-[#C4D600]">{template.role}</p>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{template.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {template.expertise.slice(0, 3).map((skill, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="border-white/10 text-gray-400 text-[10px]"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => loadCFITemplate(template)}
                              className="bg-white/10 text-white hover:bg-white/20"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()} className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                <Plus className="h-4 w-4 mr-2" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#141414] border-white/10 text-white max-w-xl">
              <DialogHeader>
                <DialogTitle>{editingAgent ? "Edit Agent" : "Add AI Agent"}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh]">
                <div className="space-y-4 mt-4 pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="e.g., CFI Creative Director"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="e.g., Creative Director AI"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="Brief description of the agent's role..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Personality Traits</Label>
                    <Input
                      value={formData.personality}
                      onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="e.g., Strategic, visionary, detail-oriented"
                    />
                  </div>

                  <div>
                    <Label>Expertise Areas (comma separated)</Label>
                    <Input
                      value={formData.expertise}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="e.g., Brand Strategy, Visual Storytelling"
                    />
                  </div>

                  <div>
                    <Label>Agent Gradient Color</Label>
                    <Select value={formData.gradient} onValueChange={(v) => setFormData({ ...formData, gradient: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        <SelectItem value="from-purple-500 to-pink-500" className="text-white">
                          Purple to Pink
                        </SelectItem>
                        <SelectItem value="from-blue-500 to-cyan-500" className="text-white">
                          Blue to Cyan
                        </SelectItem>
                        <SelectItem value="from-green-500 to-emerald-500" className="text-white">
                          Green to Emerald
                        </SelectItem>
                        <SelectItem value="from-orange-500 to-amber-500" className="text-white">
                          Orange to Amber
                        </SelectItem>
                        <SelectItem value="from-indigo-500 to-violet-500" className="text-white">
                          Indigo to Violet
                        </SelectItem>
                        <SelectItem value="from-pink-500 to-rose-500" className="text-white">
                          Pink to Rose
                        </SelectItem>
                        <SelectItem value="from-teal-500 to-cyan-500" className="text-white">
                          Teal to Cyan
                        </SelectItem>
                        <SelectItem value="from-yellow-500 to-orange-500" className="text-white">
                          Yellow to Orange
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>System Prompt Template</Label>
                    <Textarea
                      value={formData.prompt_template}
                      onChange={(e) => setFormData({ ...formData, prompt_template: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1 font-mono text-sm"
                      placeholder="System prompt that defines the agent's behavior..."
                      rows={8}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                    />
                    <Label>Agent is active</Label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                      {editingAgent ? "Update" : "Create"} Agent
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1a1a1a] border border-white/10">
          <TabsTrigger
            value="team"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            AI Team
          </TabsTrigger>
          <TabsTrigger
            value="standards"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Branding Standards
          </TabsTrigger>
          <TabsTrigger
            value="training"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Training Data
          </TabsTrigger>
        </TabsList>

        {/* AI Team Tab */}
        <TabsContent value="team" className="mt-6 space-y-6">
          {/* How It Works */}
          <Card className="bg-gradient-to-r from-[#C4D600]/10 to-transparent border-[#C4D600]/20">
            <CardContent className="py-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#C4D600]" />
                Creative Fusion Intelligence (CFI) Framework
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex gap-3">
                  <div className="p-2 bg-[#C4D600]/20 rounded-lg h-fit">
                    <Crown className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">World-Class Standards</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Pentagram, Landor, Interbrand, Apple HIG, Google Material
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-[#C4D600]/20 rounded-lg h-fit">
                    <Brain className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Context-Aware</h4>
                    <p className="text-sm text-gray-400 mt-1">Understands brand kit, canvas, and design context</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-[#C4D600]/20 rounded-lg h-fit">
                    <Zap className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">9 Specialized Agents</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Director, Art, Strategy, Systems, Identity, Pattern, Compliance, Language, Analyst
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-[#C4D600]/20 rounded-lg h-fit">
                    <BookOpen className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Complete Brand Books</h4>
                    <p className="text-sm text-gray-400 mt-1">Generate luxury-grade brand manuals</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const gradient = agent.gradient || "from-gray-500 to-gray-600"
              return (
                <Card key={agent.id} className="bg-[#141414] border-white/10 overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${gradient}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
                      >
                        <span className="text-lg font-bold text-white">{agent.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                          <Badge
                            variant="outline"
                            className={
                              agent.is_active
                                ? "border-green-500/30 text-green-400"
                                : "border-gray-500/30 text-gray-400"
                            }
                          >
                            {agent.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#C4D600]">{agent.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-400 line-clamp-2">{agent.description}</p>

                    {agent.personality && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Personality</p>
                        <p className="text-sm text-gray-300">{agent.personality}</p>
                      </div>
                    )}

                    {agent.expertise && agent.expertise.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Expertise</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.expertise.slice(0, 4).map((skill: string, i: number) => (
                            <Badge key={i} variant="outline" className="border-white/10 text-gray-300 text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {agent.expertise.length > 4 && (
                            <Badge variant="outline" className="border-white/10 text-gray-500 text-xs">
                              +{agent.expertise.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white bg-transparent"
                        onClick={() => openDialog(agent)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-white/20 ${agent.is_active ? "text-yellow-400" : "text-green-400"}`}
                        onClick={() => toggleActive(agent.id, !agent.is_active)}
                      >
                        {agent.is_active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Empty State */}
            {agents.length === 0 && (
              <Card className="col-span-full bg-[#141414] border-white/10 border-dashed">
                <CardContent className="py-12 text-center">
                  <Bot className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-white font-medium mb-2">No AI Agents Yet</h3>
                  <p className="text-gray-400 text-sm mb-4">Load the complete CFI team or create custom agents</p>
                  <Button
                    onClick={() => setTemplateDialogOpen(true)}
                    className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Load CFI Team
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Branding Standards Tab */}
        <TabsContent value="standards" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Referenced Systems */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#C4D600]" />
                  Branding Systems Referenced
                </CardTitle>
                <CardDescription>World-class standards our AI follows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Pentagram Brand Identity Models",
                    "Landor & Fitch Transformation Framework",
                    "Interbrand Brand Equity System",
                    "Apple Human Interface Guidelines",
                    "Google Material 3 Design Language",
                    "IBM Carbon Design System",
                    "WPP Universal Brand Blueprint",
                    "Dieter Rams 10 Principles of Good Design",
                    "Swiss International Typographic Grid",
                    "Japan Minimalism Composition Rules",
                    "Luxury Brand Psychology",
                  ].map((system, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                      <span className="text-gray-300">{system}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Core Principles */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#C4D600]" />
                  Core Branding Principles
                </CardTitle>
                <CardDescription>Principles applied to every output</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Consistency",
                    "Scalability",
                    "Recognition",
                    "Meaning & Narrative",
                    "Emotional Connection",
                    "Market Relevance",
                    "Visual Clarity",
                    "Technical Precision",
                    "Multi-Platform Adaptability",
                    "Accessibility",
                  ].map((principle, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#C4D600]" />
                      <span className="text-gray-300">{principle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brand Architecture */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#C4D600]" />
                  Brand Architecture Types
                </CardTitle>
                <CardDescription>Supported brand structures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {BRAND_ARCHITECTURE_TYPES.map((type, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-gray-300">{type.label}</span>
                      <Badge variant="outline" className="border-[#C4D600]/30 text-[#C4D600]">
                        Supported
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Outputs */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#C4D600]" />
                  AI Output Categories
                </CardTitle>
                <CardDescription>What CFI can generate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Complete Brand Manual PDF",
                    "Logo Application Guidelines",
                    "Color Palette System (HEX, RGB, CMYK, Pantone)",
                    "Typography Hierarchy",
                    "Pattern Library",
                    "Iconography System",
                    "Social Media & Poster Layouts",
                    "Motion Identity Rules",
                    "Tone-of-Voice Document",
                    "Brand Architecture Map",
                  ].map((output, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">{output}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Training Data Tab */}
        <TabsContent value="training" className="mt-6 space-y-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#C4D600]" />
                Training Inputs from Clients
              </CardTitle>
              <CardDescription>Data collected through CMS for AI training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Logo Files", formats: "PNG, SVG, EPS, AI, PDF" },
                  { label: "Brand Name", formats: "Text" },
                  { label: "Brand Story", formats: "Rich Text" },
                  { label: "Mission & Vision", formats: "Text" },
                  { label: "Primary Colors", formats: "HEX/RGB" },
                  { label: "Typography Preferences", formats: "Font Names" },
                  { label: "Website Link", formats: "URL" },
                  { label: "Industry", formats: "Category" },
                  { label: "Target Audience", formats: "Demographics" },
                  { label: "Communication Personality", formats: "Traits" },
                  { label: "Competitors", formats: "Company Names" },
                  { label: "Brand Usage Examples", formats: "Images" },
                ].map((input, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-white font-medium">{input.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{input.formats}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#C4D600]" />
                Export & File Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Accepted Upload Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PNG", "SVG", "AI", "EPS", "PDF", "JPG", "WEBP"].map((type, i) => (
                      <Badge key={i} className="bg-green-500/20 text-green-400 border-green-500/30">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Output Formats</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PDF Brand Manual", "PNG/SVG Pack", "Pattern Library", "Color JSON", "Typography CSS"].map(
                      (type, i) => (
                        <Badge key={i} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {type}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
