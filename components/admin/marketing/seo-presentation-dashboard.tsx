"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Play,
  Search,
  Globe,
  TrendingUp,
  Link2,
  FileText,
  Target,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  Star,
  MapPin,
  Share2,
  Shield,
  Eye,
  Clock,
  ArrowUpRight,
} from "lucide-react"

// Presentation Slides Data matching the blueprint
const presentationSlides = [
  {
    id: 1,
    title: "Creative Fusion SEO Platform — Full SEO & AI Toolkit Demo",
    subtitle: "How Creative Fusion LLC uses data-driven SEO for clients",
    type: "cover",
    content: {
      company: "Creative Fusion LLC",
      tagline: "Data-Driven Digital Excellence",
    },
  },
  {
    id: 2,
    title: "What is Creative Fusion SEO Platform?",
    type: "overview",
    content: {
      description: "A comprehensive marketing & SEO platform: SEO, content, backlinks, rankings, AI-search insights.",
      purpose: "Central command center for domain health, SEO metrics, traffic estimates, backlinks, organic keywords.",
      features: ["Domain Overview", "Traffic Analytics", "Keyword Research", "Backlink Analysis", "Site Audit"],
    },
  },
  {
    id: 3,
    title: "Creative Fusion SEO Toolkit",
    type: "toolkit",
    content: {
      categories: [
        {
          name: "Technical & On-page SEO",
          tools: ["Site Audit", "On-Page SEO Checker", "Log File Analyzer"],
          icon: "Shield",
        },
        {
          name: "Keyword & Content Tools",
          tools: ["Keyword Magic Tool", "Content Template", "Topic Research", "SEO Writing Assistant"],
          icon: "Search",
        },
        {
          name: "Backlink Tools",
          tools: ["Backlink Analytics", "Backlink Audit", "Link Building Tool", "Bulk Analysis"],
          icon: "Link2",
        },
        {
          name: "Rank Tracking & Analysis",
          tools: ["Position Tracking", "Organic Research", "Domain Overview"],
          icon: "TrendingUp",
        },
      ],
    },
  },
  {
    id: 4,
    title: "How Creative Fusion SEO Works (Workflow)",
    type: "workflow",
    content: {
      steps: [
        { step: 1, title: "Create Project", description: "Set up SEO Dashboard for client" },
        { step: 2, title: "Run Site Audit", description: "Identify technical issues & crawl errors" },
        { step: 3, title: "Keyword Research", description: "Find content gaps & opportunities" },
        { step: 4, title: "Create Content", description: "SEO-optimized pages & posts" },
        { step: 5, title: "Build Backlinks", description: "Audit links, find opportunities" },
        { step: 6, title: "Track Performance", description: "Monitor visibility & rankings" },
      ],
    },
  },
  {
    id: 5,
    title: "Dashboard Overview",
    type: "dashboard",
    content: {
      metrics: [
        { label: "Domain Health", value: "85%", trend: "+5%" },
        { label: "Organic Keywords", value: "2,450", trend: "+12%" },
        { label: "Monthly Traffic", value: "45.2K", trend: "+8%" },
        { label: "Backlinks", value: "1,240", trend: "+15%" },
        { label: "Referring Domains", value: "320", trend: "+22%" },
        { label: "Domain Authority", value: "42", trend: "+3" },
      ],
      widgets: ["Site Audit", "Position Tracking", "Backlink Audit", "Organic Research"],
    },
  },
  {
    id: 6,
    title: "Benefits of Creative Fusion SEO",
    type: "benefits",
    content: {
      benefits: [
        {
          icon: "BarChart3",
          title: "Data-Driven Insights",
          description: "SEO, content, backlinks, and rankings analysis",
        },
        { icon: "Clock", title: "Time Savings", description: "Automates audits, research, and reporting" },
        { icon: "Users", title: "Scalable", description: "Multiple clients/projects from one dashboard" },
        { icon: "Target", title: "Competitive Edge", description: "Discover gaps, outperform competitors" },
        { icon: "FileText", title: "Content Strategy", description: "Creative output + SEO insights combined" },
      ],
    },
  },
  {
    id: 7,
    title: "Limitations to Consider",
    type: "limitations",
    content: {
      items: [
        "Tools highlight issues; human work still needed",
        "SEO results take time; consistent effort required",
        "Backlinks & outreach require relationship building",
        "Social signals alone don't boost rankings directly",
        "Black-hat tactics risk penalties",
      ],
    },
  },
  {
    id: 8,
    title: "Creative Fusion Strategy",
    type: "strategy",
    content: {
      strategies: [
        "Audit client websites → identify & fix SEO issues",
        "Build content strategy using keyword research & competitor analysis",
        "Provide SEO reporting & performance tracking to clients",
        "Combine creative content (photos, videos, graphics) + SEO insights",
      ],
    },
  },
  {
    id: 9,
    title: "Social Media & SEO Integration (2025-2026)",
    type: "social",
    content: {
      points: [
        "Social shares/likes/comments → referral traffic & content discovery",
        "Creative assets amplify content → potential backlinks & indexing",
        "Engage authentically; thread in keywords naturally",
        "Social signals indirectly support SEO via user behavior metrics",
      ],
    },
  },
  {
    id: 10,
    title: "Local SEO Best Practices",
    type: "local",
    content: {
      practices: [
        { icon: "MapPin", text: "NAP consistency across directories" },
        { icon: "Globe", text: "Google Business Profile / location-specific pages" },
        { icon: "Search", text: "Local keywords + schema markup" },
        { icon: "Star", text: "Encourage genuine reviews with images" },
        { icon: "Link2", text: "Focus on quality local backlinks, not quantity" },
      ],
    },
  },
  {
    id: 11,
    title: "Backlinks & Authority",
    type: "backlinks",
    content: {
      points: [
        "Prioritize relevant, authoritative backlinks",
        "Earn links via high-quality creative content + outreach",
        "Avoid link-farming, PBNs, bulk low-quality links",
        "Combine creative storytelling + SEO → links naturally",
      ],
    },
  },
  {
    id: 12,
    title: "Risks / What to Avoid",
    type: "risks",
    content: {
      risks: [
        { text: "Fake likes, purchased engagement, spammy links", severity: "high" },
        { text: "Over-automation, clickbait headlines", severity: "medium" },
        { text: "Keyword stuffing, manipulative tactics", severity: "high" },
        { text: "Over-reliance on social metrics as ranking shortcuts", severity: "medium" },
      ],
    },
  },
  {
    id: 13,
    title: "Suggested Demo Flow",
    type: "demo",
    content: {
      steps: [
        "Show login & dashboard",
        "Run sample Site Audit → display issues",
        "Keyword research & competitor analysis",
        "On-Page SEO Checker on sample page",
        "Backlink Analytics / Audit",
        "Position Tracking / Organic Research",
        "Export report (PDF / CSV)",
      ],
    },
  },
  {
    id: 14,
    title: "Conclusion / Next Steps",
    type: "conclusion",
    content: {
      nextSteps: [
        "Onboard pilot client(s) → Creative Fusion SEO + local SEO + social media integration",
        "Full audit + content plan",
        "Monthly SEO + content package → optimization + reporting",
        "Track KPIs: traffic, rankings, conversions",
        "Combine creative work + SEO + social media strategy",
      ],
    },
  },
  {
    id: 15,
    title: "Contact & Q&A",
    type: "contact",
    content: {
      company: "Creative Fusion LLC",
      website: "creativefusion.ae",
      services: ["SEO & Digital Marketing", "Branding & Design", "Web Development", "Content Creation"],
    },
  },
]

// Demo metrics for live dashboard
const liveMetrics = {
  domainHealth: 85,
  organicKeywords: 2450,
  monthlyTraffic: 45200,
  backlinks: 1240,
  referringDomains: 320,
  domainAuthority: 42,
  siteAuditIssues: { critical: 3, warnings: 12, notices: 28 },
  topKeywords: [
    { keyword: "digital marketing dubai", position: 5, volume: 12100 },
    { keyword: "branding agency uae", position: 3, volume: 8100 },
    { keyword: "web design sharjah", position: 7, volume: 5400 },
    { keyword: "seo services dubai", position: 12, volume: 9900 },
    { keyword: "creative agency uae", position: 4, volume: 4400 },
  ],
  recentBacklinks: [
    { source: "entrepreneur.com", da: 92, type: "dofollow" },
    { source: "forbes.com", da: 95, type: "nofollow" },
    { source: "gulfnews.com", da: 78, type: "dofollow" },
  ],
}

export function SeoPresentationDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("presentation")

  const slide = presentationSlides[currentSlide]

  function nextSlide() {
    if (currentSlide < presentationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  function getIconComponent(iconName: string) {
    const icons: Record<string, any> = {
      Shield,
      Search,
      Link2,
      TrendingUp,
      BarChart3,
      Clock,
      Users,
      Target,
      FileText,
      MapPin,
      Globe,
      Star,
    }
    return icons[iconName] || Search
  }

  function renderSlideContent() {
    switch (slide.type) {
      case "cover":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#C4D600] to-amber-500 rounded-2xl flex items-center justify-center">
              <Presentation className="h-12 w-12 text-black" />
            </div>
            <h1 className="text-5xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-amber-500 rounded-lg flex items-center justify-center">
                <Presentation className="h-5 w-5 text-black" />
              </div>
              {slide.title}
            </h1>
            <p className="text-2xl text-gray-400">{slide.subtitle}</p>
            <div className="flex items-center gap-4 mt-8">
              <Badge className="bg-[#C4D600]/20 text-[#C4D600] text-lg px-4 py-2">{slide.content.company}</Badge>
            </div>
          </div>
        )

      case "overview":
        return (
          <div className="space-y-8">
            <p className="text-xl text-gray-300">{slide.content.description}</p>
            <p className="text-lg text-gray-400">{slide.content.purpose}</p>
            <div className="grid grid-cols-5 gap-4 mt-8">
              {slide.content.features.map((feature: string, i: number) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-[#C4D600]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <p className="text-white text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case "toolkit":
        return (
          <div className="grid grid-cols-2 gap-6">
            {slide.content.categories.map((cat: any, i: number) => {
              const IconComponent = getIconComponent(cat.icon)
              return (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C4D600]/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-[#C4D600]" />
                      </div>
                      {cat.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cat.tools.map((tool: string, j: number) => (
                        <li key={j} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )

      case "workflow":
        return (
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {slide.content.steps.map((step: any, i: number) => (
                <div key={i} className="relative">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="w-12 h-12 bg-[#C4D600] rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {i < slide.content.steps.length - 1 && i !== 2 && (
                    <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-[#C4D600]/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {slide.content.metrics.map((metric: any, i: number) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-3xl font-bold text-white">{metric.value}</span>
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <ArrowUpRight className="h-4 w-4" />
                        {metric.trend}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex gap-3">
              {slide.content.widgets.map((widget: string, i: number) => (
                <Badge key={i} className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
                  {widget}
                </Badge>
              ))}
            </div>
          </div>
        )

      case "benefits":
        return (
          <div className="grid grid-cols-2 gap-6">
            {slide.content.benefits.map((benefit: any, i: number) => {
              const IconComponent = getIconComponent(benefit.icon)
              return (
                <div key={i} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )

      case "limitations":
        return (
          <div className="space-y-4">
            {slide.content.items.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        )

      case "strategy":
        return (
          <div className="space-y-4">
            {slide.content.strategies.map((strategy: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gradient-to-r from-[#C4D600]/10 to-transparent rounded-xl p-5 border border-[#C4D600]/20"
              >
                <div className="w-10 h-10 bg-[#C4D600] rounded-full flex items-center justify-center text-black font-bold">
                  {i + 1}
                </div>
                <p className="text-white text-lg">{strategy}</p>
              </div>
            ))}
          </div>
        )

      case "social":
        return (
          <div className="space-y-4">
            {slide.content.points.map((point: string, i: number) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                <Share2 className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        )

      case "local":
        return (
          <div className="grid grid-cols-2 gap-4">
            {slide.content.practices.map((practice: any, i: number) => {
              const IconComponent = getIconComponent(practice.icon)
              return (
                <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-orange-400" />
                  </div>
                  <p className="text-gray-300">{practice.text}</p>
                </div>
              )
            })}
          </div>
        )

      case "backlinks":
        return (
          <div className="space-y-4">
            {slide.content.points.map((point: string, i: number) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                <Link2 className="h-6 w-6 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        )

      case "risks":
        return (
          <div className="space-y-4">
            {slide.content.risks.map((risk: any, i: number) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-xl p-5 border ${
                  risk.severity === "high" ? "bg-red-500/10 border-red-500/30" : "bg-yellow-500/10 border-yellow-500/30"
                }`}
              >
                <XCircle
                  className={`h-6 w-6 flex-shrink-0 ${risk.severity === "high" ? "text-red-400" : "text-yellow-400"}`}
                />
                <p className="text-gray-300">{risk.text}</p>
                <Badge
                  className={`ml-auto ${
                    risk.severity === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {risk.severity}
                </Badge>
              </div>
            ))}
          </div>
        )

      case "demo":
        return (
          <div className="space-y-3">
            {slide.content.steps.map((step: string, i: number) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 bg-[#C4D600]/20 rounded-full flex items-center justify-center text-[#C4D600] font-semibold">
                  {i + 1}
                </div>
                <p className="text-gray-300">{step}</p>
                <Button size="sm" variant="ghost" className="ml-auto text-[#C4D600]">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )

      case "conclusion":
        return (
          <div className="space-y-4">
            {slide.content.nextSteps.map((step: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gradient-to-r from-[#C4D600]/10 to-transparent rounded-xl p-5 border border-[#C4D600]/20"
              >
                <CheckCircle className="h-6 w-6 text-[#C4D600]" />
                <p className="text-white">{step}</p>
              </div>
            ))}
          </div>
        )

      case "contact":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#C4D600] to-amber-500 rounded-2xl flex items-center justify-center text-4xl font-bold text-black">
              CF
            </div>
            <h2 className="text-4xl font-bold text-white">{slide.content.company}</h2>
            <a
              href={`https://${slide.content.website}`}
              className="text-[#C4D600] text-xl flex items-center gap-2 hover:underline"
            >
              <Globe className="h-5 w-5" />
              {slide.content.website}
            </a>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {slide.content.services.map((service: string, i: number) => (
                <Badge key={i} className="bg-white/10 text-gray-300 px-4 py-2">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-amber-500 rounded-lg flex items-center justify-center">
                <Presentation className="h-5 w-5 text-black" />
              </div>
              SEO Presentation
            </h1>
            <p className="text-gray-400 mt-1">
              Creative Fusion SEO-style client presentation with live demo capabilities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={toggleFullscreen} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Maximize2 className="h-4 w-4 mr-2" />
              Present
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger
              value="presentation"
              className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black"
            >
              Presentation
            </TabsTrigger>
            <TabsTrigger value="live-demo" className="data-[state=active]:bg-[#C4D600] data-[state=active]:text-black">
              Live Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presentation" className="mt-6">
            {/* Slide Display */}
            <Card className="bg-[#141414] border-white/10 min-h-[600px]">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-[#C4D600]/20 text-[#C4D600] mb-2">
                      Slide {currentSlide + 1} of {presentationSlides.length}
                    </Badge>
                    <CardTitle className="text-white text-2xl">{slide.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      disabled={currentSlide === presentationSlides.length - 1}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 min-h-[500px]">{renderSlideContent()}</CardContent>
            </Card>

            {/* Slide Navigator */}
            <div className="flex gap-2 overflow-x-auto py-4">
              {presentationSlides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`flex-shrink-0 w-32 h-20 rounded-lg border-2 p-2 transition-all ${
                    i === currentSlide
                      ? "border-[#C4D600] bg-[#C4D600]/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <p className="text-xs text-gray-400 truncate">{s.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">Slide {i + 1}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live-demo" className="mt-6 space-y-6">
            {/* Live Demo Dashboard */}
            <div className="grid grid-cols-6 gap-4">
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1f1f1f" strokeWidth="6" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#C4D600"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${(liveMetrics.domainHealth / 100) * 176} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#C4D600]">
                      {liveMetrics.domainHealth}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Domain Health</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-white">{liveMetrics.organicKeywords.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">Organic Keywords</p>
                  <span className="text-green-400 text-xs">+12%</span>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-white">{(liveMetrics.monthlyTraffic / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-400 mt-1">Monthly Traffic</p>
                  <span className="text-green-400 text-xs">+8%</span>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-white">{liveMetrics.backlinks.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">Backlinks</p>
                  <span className="text-green-400 text-xs">+15%</span>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-white">{liveMetrics.referringDomains}</p>
                  <p className="text-xs text-gray-400 mt-1">Referring Domains</p>
                  <span className="text-green-400 text-xs">+22%</span>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-[#C4D600]">{liveMetrics.domainAuthority}</p>
                  <p className="text-xs text-gray-400 mt-1">Domain Authority</p>
                  <span className="text-green-400 text-xs">+3</span>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Site Audit Issues */}
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#C4D600]" />
                    Site Audit Issues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-400" />
                      <span className="text-white">Critical Issues</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400">{liveMetrics.siteAuditIssues.critical}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">Warnings</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">{liveMetrics.siteAuditIssues.warnings}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <span className="text-white">Notices</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">{liveMetrics.siteAuditIssues.notices}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Top Keywords */}
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="h-5 w-5 text-[#C4D600]" />
                    Top Ranking Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {liveMetrics.topKeywords.map((kw, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <span className="text-gray-300 text-sm">{kw.keyword}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-xs">{kw.volume.toLocaleString()}/mo</span>
                          <Badge
                            className={`${
                              kw.position <= 3
                                ? "bg-green-500/20 text-green-400"
                                : kw.position <= 10
                                  ? "bg-[#C4D600]/20 text-[#C4D600]"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            #{kw.position}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Backlinks */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-[#C4D600]" />
                  Recent Backlinks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {liveMetrics.recentBacklinks.map((link, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{link.source}</p>
                          <p className="text-gray-500 text-xs">DA: {link.da}</p>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          link.type === "dofollow" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {link.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links to Tools */}
            <Card className="bg-gradient-to-r from-[#141414] to-[#1a1a1a] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Access to SEO Tools</h3>
                <div className="grid grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent h-auto py-4 flex-col"
                    asChild
                  >
                    <a href="/admin/seo-toolkit">
                      <BarChart3 className="h-6 w-6 mb-2 text-[#C4D600]" />
                      SEO Toolkit
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent h-auto py-4 flex-col"
                    asChild
                  >
                    <a href="/admin/marketing/position-tracking">
                      <TrendingUp className="h-6 w-6 mb-2 text-[#C4D600]" />
                      Position Tracking
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent h-auto py-4 flex-col"
                    asChild
                  >
                    <a href="/admin/marketing/keyword-gap">
                      <Target className="h-6 w-6 mb-2 text-[#C4D600]" />
                      Keyword Gap
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent h-auto py-4 flex-col"
                    asChild
                  >
                    <a href="/admin/marketing/local-seo">
                      <MapPin className="h-6 w-6 mb-2 text-[#C4D600]" />
                      Local SEO
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
