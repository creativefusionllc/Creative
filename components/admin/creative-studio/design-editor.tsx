"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Save,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Type,
  Square,
  Circle,
  ImageIcon,
  Bot,
  Sparkles,
  Send,
  Trash2,
  Copy,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  MousePointer,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Grid3X3,
  X,
  Wand2,
  Eraser,
  Paintbrush,
  Droplet,
  Palette,
  Triangle,
  Star,
  Heart,
  Hexagon,
  Pentagon,
  Octagon,
  ArrowRight,
  Minus,
  Plus,
  Maximize,
  Upload,
  FolderOpen,
  FileImage,
  Loader2,
  Check,
  Zap,
  Music,
  Camera,
  Hash,
  ChevronLeft,
  ChevronRight,
  Globe,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// =====================================================
// TYPES & INTERFACES
// =====================================================

interface CanvasElement {
  id: string
  type: "text" | "shape" | "image" | "group" | "line" | "path"
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  locked: boolean
  visible: boolean
  name: string
  // Text properties
  text?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  textAlign?: string
  lineHeight?: number
  letterSpacing?: number
  color?: string
  textShadow?: string
  // Shape properties
  shapeType?:
    | "rectangle"
    | "circle"
    | "triangle"
    | "star"
    | "heart"
    | "hexagon"
    | "pentagon"
    | "octagon"
    | "line"
    | "arrow"
  fill?: string
  stroke?: string
  strokeWidth?: number
  borderRadius?: number
  shadowX?: number
  shadowY?: number
  shadowBlur?: number
  shadowColor?: string
  // Image properties
  src?: string
  filters?: ImageFilters
  // Group properties
  children?: string[]
  // Blending
  blendMode?: string
}

interface ImageFilters {
  brightness: number
  contrast: number
  saturation: number
  blur: number
  grayscale: number
  sepia: number
  hueRotate: number
  invert: number
}

interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  capabilities: string[]
  icon: string
  free: boolean
}

// =====================================================
// CONSTANTS
// =====================================================

const AI_MODELS: AIModel[] = [
  {
    id: "leonardo",
    name: "Leonardo AI",
    provider: "Leonardo",
    description: "High-quality image generation",
    capabilities: ["text-to-image", "image-to-image", "upscale"],
    icon: "🎨",
    free: true,
  },
  {
    id: "ideogram",
    name: "Ideogram",
    provider: "Ideogram",
    description: "Best for text in images",
    capabilities: ["text-to-image", "typography"],
    icon: "✍️",
    free: true,
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion XL",
    provider: "Stability AI",
    description: "Open-source powerhouse",
    capabilities: ["text-to-image", "image-to-image", "inpainting"],
    icon: "🖼️",
    free: true,
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    description: "Best prompt understanding",
    capabilities: ["text-to-image"],
    icon: "🤖",
    free: true,
  },
  {
    id: "flux",
    name: "FLUX.1",
    provider: "Black Forest Labs",
    description: "Latest generation model",
    capabilities: ["text-to-image", "fast"],
    icon: "⚡",
    free: true,
  },
]

const AI_TOOLS = [
  { id: "generate", name: "Generate Image", icon: Wand2, description: "Create images from text" },
  { id: "enhance", name: "Enhance/Upscale", icon: Zap, description: "Upscale & improve quality" },
  { id: "remove-bg", name: "Remove Background", icon: Eraser, description: "Auto remove backgrounds" },
  { id: "inpaint", name: "Inpainting", icon: Paintbrush, description: "Edit parts of image" },
  { id: "outpaint", name: "Outpainting", icon: Maximize, description: "Extend image boundaries" },
  { id: "style-transfer", name: "Style Transfer", icon: Palette, description: "Apply artistic styles" },
  { id: "face-enhance", name: "Face Enhance", icon: Camera, description: "Improve facial details" },
  { id: "colorize", name: "Colorize", icon: Droplet, description: "Add color to B&W" },
]

const SHAPES = [
  { id: "rectangle", icon: Square, name: "Rectangle" },
  { id: "circle", icon: Circle, name: "Circle" },
  { id: "triangle", icon: Triangle, name: "Triangle" },
  { id: "star", icon: Star, name: "Star" },
  { id: "heart", icon: Heart, name: "Heart" },
  { id: "hexagon", icon: Hexagon, name: "Hexagon" },
  { id: "pentagon", icon: Pentagon, name: "Pentagon" },
  { id: "octagon", icon: Octagon, name: "Octagon" },
  { id: "line", icon: Minus, name: "Line" },
  { id: "arrow", icon: ArrowRight, name: "Arrow" },
]

const BLEND_MODES = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
]

const FONT_FAMILIES = [
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
  "Bebas Neue",
  "Archivo Black",
  "DM Sans",
  "Space Grotesk",
  "Outfit",
  "Sora",
]

const PLATFORM_PRESETS = [
  { id: "instagram-post", name: "Instagram Post", width: 1080, height: 1080, platform: "instagram" },
  { id: "instagram-story", name: "Instagram Story", width: 1080, height: 1920, platform: "instagram" },
  { id: "instagram-reel", name: "Instagram Reel", width: 1080, height: 1920, platform: "instagram" },
  { id: "facebook-post", name: "Facebook Post", width: 1200, height: 630, platform: "facebook" },
  { id: "facebook-cover", name: "Facebook Cover", width: 820, height: 312, platform: "facebook" },
  { id: "twitter-post", name: "Twitter/X Post", width: 1200, height: 675, platform: "twitter" },
  { id: "twitter-header", name: "Twitter/X Header", width: 1500, height: 500, platform: "twitter" },
  { id: "linkedin-post", name: "LinkedIn Post", width: 1200, height: 627, platform: "linkedin" },
  { id: "linkedin-banner", name: "LinkedIn Banner", width: 1584, height: 396, platform: "linkedin" },
  { id: "youtube-thumbnail", name: "YouTube Thumbnail", width: 1280, height: 720, platform: "youtube" },
  { id: "youtube-banner", name: "YouTube Banner", width: 2560, height: 1440, platform: "youtube" },
  { id: "pinterest", name: "Pinterest Pin", width: 1000, height: 1500, platform: "pinterest" },
  { id: "tiktok", name: "TikTok Video", width: 1080, height: 1920, platform: "tiktok" },
  { id: "logo", name: "Logo", width: 500, height: 500, platform: "general" },
  { id: "business-card", name: "Business Card", width: 1050, height: 600, platform: "print" },
  { id: "a4", name: "A4 Document", width: 2480, height: 3508, platform: "print" },
  { id: "presentation", name: "Presentation", width: 1920, height: 1080, platform: "general" },
]

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  pinterest: Hash,
  tiktok: Music,
  print: FileImage,
  general: Globe,
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function DesignEditor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()
  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Canvas state
  const [canvasWidth, setCanvasWidth] = useState(1080)
  const [canvasHeight, setCanvasHeight] = useState(1080)
  const [canvasBackground, setCanvasBackground] = useState("#ffffff")
  const [zoom, setZoom] = useState(0.5)
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [tool, setTool] = useState<string>("select")
  const [history, setHistory] = useState<CanvasElement[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showGrid, setShowGrid] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const [gridSize, setGridSize] = useState(20)

  // Project state
  const [projectId, setProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState("Untitled Design")
  const [templates, setTemplates] = useState<any[]>([])
  const [brandKits, setBrandKits] = useState<any[]>([])
  const [selectedBrandKit, setSelectedBrandKit] = useState<any>(null)
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  // AI state
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [aiTab, setAiTab] = useState<string>("generate")
  const [selectedAiModel, setSelectedAiModel] = useState<string>("leonardo")
  const [aiPrompt, setAiPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiProgress, setAiProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [aiStyle, setAiStyle] = useState("realistic")
  const [aiAspectRatio, setAiAspectRatio] = useState("1:1")

  // AI Chat/Agent state
  const [agents, setAgents] = useState<any[]>([])
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<any[]>([])
  const [aiInput, setAiInput] = useState("")
  const [aiChatLoading, setAiChatLoading] = useState(false)

  // Panel state
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [leftPanelTab, setLeftPanelTab] = useState("templates")

  // Dragging state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // =====================================================
  // EFFECTS
  // =====================================================

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    const templateId = searchParams.get("template")
    const projectIdParam = searchParams.get("project")

    if (templateId) {
      loadTemplate(templateId)
    }
    if (projectIdParam) {
      loadProject(projectIdParam)
    }
  }, [searchParams])

  // Auto-save
  useEffect(() => {
    if (autoSave && projectId && elements.length > 0) {
      const timer = setTimeout(() => {
        handleSave(true)
      }, 30000) // Auto-save every 30 seconds
      return () => clearTimeout(timer)
    }
  }, [elements, autoSave, projectId])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      // Ctrl/Cmd + Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      }
      // Ctrl/Cmd + Shift + Z = Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
        e.preventDefault()
        handleRedo()
      }
      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        handleSave()
      }
      // Delete = Delete selected
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedElements.length > 0) {
          e.preventDefault()
          deleteSelectedElements()
        }
      }
      // Ctrl/Cmd + D = Duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault()
        duplicateSelectedElements()
      }
      // Ctrl/Cmd + G = Group
      if ((e.ctrlKey || e.metaKey) && e.key === "g" && !e.shiftKey) {
        e.preventDefault()
        groupSelectedElements()
      }
      // V = Select tool
      if (e.key === "v") setTool("select")
      // T = Text tool
      if (e.key === "t") setTool("text")
      // R = Rectangle
      if (e.key === "r") setTool("rectangle")
      // O = Circle
      if (e.key === "o") setTool("circle")
      // + = Zoom in
      if (e.key === "=" || e.key === "+") setZoom((z) => Math.min(z + 0.1, 3))
      // - = Zoom out
      if (e.key === "-") setZoom((z) => Math.max(z - 0.1, 0.1))
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedElements, historyIndex])

  // =====================================================
  // DATA FETCHING
  // =====================================================

  async function fetchInitialData() {
    const [templatesRes, brandKitsRes, clientsRes, agentsRes] = await Promise.all([
      supabase.from("platform_templates").select("*").order("sort_order"),
      supabase.from("brand_kits").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").eq("status", "active"),
      supabase.from("ai_agents").select("*").eq("is_active", true).order("sort_order"),
    ])

    setTemplates(templatesRes.data || [])
    setBrandKits(brandKitsRes.data || [])
    setClients(clientsRes.data || [])
    setAgents(agentsRes.data || [])
  }

  async function loadTemplate(templateId: string) {
    const template = templates.find((t) => t.id === templateId) || PLATFORM_PRESETS.find((p) => p.id === templateId)
    if (template) {
      setCanvasWidth(template.width)
      setCanvasHeight(template.height)
      setProjectName(`${template.name} - ${new Date().toLocaleDateString()}`)
    }
  }

  async function loadProject(id: string) {
    const { data } = await supabase.from("design_canvas").select("*, creative_projects(*)").eq("id", id).single()

    if (data) {
      setProjectId(data.id)
      setProjectName(data.creative_projects?.name || data.name || "Untitled")
      setCanvasWidth(data.canvas_width || 1080)
      setCanvasHeight(data.canvas_height || 1080)
      setCanvasBackground(data.canvas_background || "#ffffff")
      setElements(data.elements || [])
      setSelectedClient(data.creative_projects?.client_id || "")
    }
  }

  // =====================================================
  // HISTORY MANAGEMENT
  // =====================================================

  function saveToHistory(newElements: CanvasElement[]) {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newElements])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  function handleUndo() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements([...history[historyIndex - 1]])
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements([...history[historyIndex + 1]])
    }
  }

  // =====================================================
  // ELEMENT OPERATIONS
  // =====================================================

  function addElement(type: string, props: Partial<CanvasElement> = {}) {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type as any,
      x: canvasWidth / 2 - 100,
      y: canvasHeight / 2 - 50,
      width: 200,
      height: 100,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${elements.length + 1}`,
      ...props,
    }

    if (type === "text") {
      newElement.text = "Double click to edit"
      newElement.fontSize = 32
      newElement.fontFamily = "Inter"
      newElement.fontWeight = "normal"
      newElement.color = "#000000"
      newElement.textAlign = "center"
      newElement.lineHeight = 1.4
      newElement.letterSpacing = 0
    }

    if (type === "shape") {
      newElement.shapeType = (props.shapeType as any) || "rectangle"
      newElement.fill = "#C4D600"
      newElement.stroke = "transparent"
      newElement.strokeWidth = 0
      newElement.borderRadius = 0
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    saveToHistory(newElements)
    setSelectedElements([newElement.id])
    setTool("select")
  }

  function updateElement(id: string, updates: Partial<CanvasElement>) {
    const newElements = elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    setElements(newElements)
  }

  function deleteSelectedElements() {
    const newElements = elements.filter((el) => !selectedElements.includes(el.id))
    setElements(newElements)
    saveToHistory(newElements)
    setSelectedElements([])
  }

  function duplicateSelectedElements() {
    const duplicated = elements
      .filter((el) => selectedElements.includes(el.id))
      .map((el) => ({
        ...el,
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        x: el.x + 20,
        y: el.y + 20,
        name: `${el.name} Copy`,
      }))

    const newElements = [...elements, ...duplicated]
    setElements(newElements)
    saveToHistory(newElements)
    setSelectedElements(duplicated.map((el) => el.id))
  }

  function groupSelectedElements() {
    if (selectedElements.length < 2) return
    // Group implementation
  }

  function moveElementInStack(id: string, direction: "up" | "down" | "top" | "bottom") {
    const index = elements.findIndex((el) => el.id === id)
    if (index === -1) return

    const newElements = [...elements]
    const [element] = newElements.splice(index, 1)

    switch (direction) {
      case "up":
        newElements.splice(Math.min(index + 1, newElements.length), 0, element)
        break
      case "down":
        newElements.splice(Math.max(index - 1, 0), 0, element)
        break
      case "top":
        newElements.push(element)
        break
      case "bottom":
        newElements.unshift(element)
        break
    }

    setElements(newElements)
    saveToHistory(newElements)
  }

  // =====================================================
  // AI IMAGE GENERATION
  // =====================================================

  async function handleAiGenerate() {
    if (!aiPrompt.trim()) return

    setAiGenerating(true)
    setAiProgress(0)
    setGeneratedImages([])

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAiProgress((p) => Math.min(p + 10, 90))
      }, 500)

      const response = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedAiModel,
          prompt: aiPrompt,
          negativePrompt,
          style: aiStyle,
          aspectRatio: aiAspectRatio,
          width: canvasWidth,
          height: canvasHeight,
        }),
      })

      clearInterval(progressInterval)
      setAiProgress(100)

      if (response.ok) {
        const data = await response.json()
        setGeneratedImages(data.images || [data.imageUrl])
      } else {
        // Demo mode - generate placeholder
        setGeneratedImages([
          `/placeholder.svg?height=${canvasHeight}&width=${canvasWidth}&query=${encodeURIComponent(aiPrompt)}`,
        ])
      }
    } catch (error) {
      console.error("AI generation error:", error)
      // Fallback to placeholder
      setGeneratedImages([
        `/placeholder.svg?height=${canvasHeight}&width=${canvasWidth}&query=${encodeURIComponent(aiPrompt)}`,
      ])
    } finally {
      setAiGenerating(false)
    }
  }

  function addGeneratedImageToCanvas(imageUrl: string) {
    addElement("image", {
      src: imageUrl,
      width: canvasWidth * 0.8,
      height: canvasHeight * 0.8,
      x: canvasWidth * 0.1,
      y: canvasHeight * 0.1,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
        invert: 0,
      },
    })
    setAiPanelOpen(false)
  }

  // =====================================================
  // AI CHAT
  // =====================================================

  async function handleAiChat() {
    if (!aiInput.trim() || !selectedAgent) return

    const userMessage = { role: "user", content: aiInput }
    setAiMessages((prev) => [...prev, userMessage])
    setAiInput("")
    setAiChatLoading(true)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...aiMessages, userMessage],
          agent: selectedAgent,
          context: {
            canvasWidth,
            canvasHeight,
            elements: elements.length,
            brandKit: selectedBrandKit,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiMessages((prev) => [...prev, { role: "assistant", content: data.message }])
      } else {
        setAiMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I'm ${selectedAgent.name}, your ${selectedAgent.role}. How can I help you with this design? I can suggest color palettes, typography, layouts, and creative directions based on your brand guidelines.`,
          },
        ])
      }
    } catch (error) {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm here to help with your design. What would you like to create?",
        },
      ])
    } finally {
      setAiChatLoading(false)
    }
  }

  // =====================================================
  // SAVE & EXPORT
  // =====================================================

  async function handleSave(isAutoSave = false) {
    setSaving(true)
    try {
      const canvasData = {
        name: projectName,
        canvas_width: canvasWidth,
        canvas_height: canvasHeight,
        canvas_background: canvasBackground,
        elements,
        updated_at: new Date().toISOString(),
      }

      if (projectId) {
        await supabase.from("design_canvas").update(canvasData).eq("id", projectId)
      } else {
        const { data } = await supabase.from("design_canvas").insert(canvasData).select().single()
        if (data) setProjectId(data.id)
      }

      if (!isAutoSave) {
        // Show success toast
      }
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setSaving(false)
    }
  }

  async function handleExport(format: "png" | "jpg" | "svg" | "pdf") {
    // Export implementation using html2canvas or similar
    console.log("Exporting as", format)
  }

  // =====================================================
  // FILE UPLOAD
  // =====================================================

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        addElement("image", {
          src: event.target?.result as string,
          width: Math.min(img.width, canvasWidth * 0.8),
          height: Math.min(img.height, canvasHeight * 0.8),
        })
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // =====================================================
  // GET SELECTED ELEMENT
  // =====================================================

  const selectedElement = selectedElements.length === 1 ? elements.find((el) => el.id === selectedElements[0]) : null

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-14 bg-[#141414] border-b border-white/10 flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href="/admin/creative-studio">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent border-none text-white font-medium w-64 focus:ring-0"
            />
            {saving && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
            {autoSave && !saving && <Check className="h-4 w-4 text-green-500" />}
          </div>
        </div>

        {/* Center Section - Tools */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", tool === "select" && "bg-[#C4D600] text-black")}
            onClick={() => setTool("select")}
            title="Select (V)"
          >
            <MousePointer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", tool === "text" && "bg-[#C4D600] text-black")}
            onClick={() => {
              setTool("text")
              addElement("text")
            }}
            title="Text (T)"
          >
            <Type className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", tool.startsWith("shape") && "bg-[#C4D600] text-black")}
                title="Shapes"
              >
                <Square className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 bg-[#1a1a1a] border-white/10">
              <div className="grid grid-cols-5 gap-1">
                {SHAPES.map((shape) => (
                  <Button
                    key={shape.id}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white/10"
                    onClick={() => {
                      setTool(`shape-${shape.id}`)
                      addElement("shape", { shapeType: shape.id as any })
                    }}
                    title={shape.name}
                  >
                    <shape.icon className="h-4 w-4 text-gray-400" />
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", tool === "image" && "bg-[#C4D600] text-black")}
            onClick={() => fileInputRef.current?.click()}
            title="Upload Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <div className="w-px h-6 bg-white/10 mx-1" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", aiPanelOpen && "bg-[#C4D600] text-black")}
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
          >
            <Wand2 className="h-4 w-4" />
            AI Studio
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", aiChatOpen && "bg-blue-500 text-white")}
            onClick={() => setAiChatOpen(!aiChatOpen)}
          >
            <Bot className="h-4 w-4" />
            AI Team
          </Button>
          <div className="w-px h-6 bg-white/10" />
          <Button variant="ghost" size="icon" onClick={() => handleSave()} title="Save (Ctrl+S)">
            <Save className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" title="Export">
                <Download className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 bg-[#1a1a1a] border-white/10">
              <div className="space-y-1">
                {["PNG", "JPG", "SVG", "PDF"].map((format) => (
                  <Button
                    key={format}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white"
                    onClick={() => handleExport(format.toLowerCase() as any)}
                  >
                    Export as {format}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        {leftPanelOpen && (
          <div className="w-72 bg-[#141414] border-r border-white/10 flex flex-col">
            <Tabs value={leftPanelTab} onValueChange={setLeftPanelTab} className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none p-0">
                <TabsTrigger
                  value="templates"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none"
                >
                  Templates
                </TabsTrigger>
                <TabsTrigger
                  value="layers"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none"
                >
                  Layers
                </TabsTrigger>
                <TabsTrigger
                  value="assets"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none"
                >
                  Assets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="flex-1 p-4 mt-0">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-2">CANVAS SIZE</h4>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <Label className="text-xs text-gray-500">Width</Label>
                          <Input
                            type="number"
                            value={canvasWidth}
                            onChange={(e) => setCanvasWidth(Number(e.target.value))}
                            className="h-8 bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Height</Label>
                          <Input
                            type="number"
                            value={canvasHeight}
                            onChange={(e) => setCanvasHeight(Number(e.target.value))}
                            className="h-8 bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-2">PRESETS</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORM_PRESETS.slice(0, 8).map((preset) => {
                          const PlatformIcon = platformIcons[preset.platform] || Globe
                          return (
                            <button
                              key={preset.id}
                              onClick={() => {
                                setCanvasWidth(preset.width)
                                setCanvasHeight(preset.height)
                              }}
                              className={cn(
                                "p-2 rounded-lg border text-left transition-all",
                                canvasWidth === preset.width && canvasHeight === preset.height
                                  ? "bg-[#C4D600]/20 border-[#C4D600]/50"
                                  : "bg-white/5 border-white/10 hover:border-white/20",
                              )}
                            >
                              <PlatformIcon className="h-4 w-4 text-gray-400 mb-1" />
                              <p className="text-xs text-white truncate">{preset.name}</p>
                              <p className="text-[10px] text-gray-500">
                                {preset.width}x{preset.height}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {brandKits.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-400 mb-2">BRAND KITS</h4>
                        <Select
                          value={selectedBrandKit?.id || ""}
                          onValueChange={(v) => {
                            const kit = brandKits.find((k) => k.id === v)
                            setSelectedBrandKit(kit)
                            if (kit?.colors?.primary) setCanvasBackground(kit.colors.primary)
                          }}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select brand kit" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a1a] border-white/10">
                            {brandKits.map((kit) => (
                              <SelectItem key={kit.id} value={kit.id} className="text-white">
                                {kit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedBrandKit && (
                          <div className="mt-2 flex gap-1">
                            {Object.values(selectedBrandKit.colors || {})
                              .slice(0, 5)
                              .map((color: any, i: number) => (
                                <button
                                  key={i}
                                  className="w-6 h-6 rounded border border-white/20"
                                  style={{ backgroundColor: color }}
                                  onClick={() => {
                                    if (selectedElement?.type === "text") {
                                      updateElement(selectedElement.id, { color })
                                    } else if (selectedElement?.type === "shape") {
                                      updateElement(selectedElement.id, { fill: color })
                                    }
                                  }}
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="layers" className="flex-1 p-4 mt-0">
                <ScrollArea className="h-full">
                  <div className="space-y-1">
                    {[...elements].reverse().map((el, i) => (
                      <div
                        key={el.id}
                        onClick={() => setSelectedElements([el.id])}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                          selectedElements.includes(el.id)
                            ? "bg-[#C4D600]/20 border border-[#C4D600]/50"
                            : "hover:bg-white/5",
                        )}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateElement(el.id, { visible: !el.visible })
                          }}
                        >
                          {el.visible ? (
                            <Eye className="h-3 w-3 text-gray-400" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-gray-600" />
                          )}
                        </Button>
                        {el.type === "text" && <Type className="h-4 w-4 text-gray-400" />}
                        {el.type === "shape" && <Square className="h-4 w-4 text-gray-400" />}
                        {el.type === "image" && <ImageIcon className="h-4 w-4 text-gray-400" />}
                        <span className="text-sm text-gray-300 flex-1 truncate">{el.name}</span>
                        {el.locked && <Lock className="h-3 w-3 text-gray-500" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="assets" className="flex-1 p-4 mt-0">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-white/20 text-gray-400 bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Asset
                    </Button>
                    <Link href="/admin/creative-studio/assets">
                      <Button variant="ghost" className="w-full text-gray-400">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Browse Asset Library
                      </Button>
                    </Link>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Toggle Left Panel */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-6 rounded-l-none bg-[#1a1a1a] border border-l-0 border-white/10"
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
        >
          {leftPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-8 bg-[#0a0a0a] relative">
          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-2 border border-white/10 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-white/10" />
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", showGrid && "bg-white/10")}
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="mx-auto relative shadow-2xl"
            style={{
              width: canvasWidth * zoom,
              height: canvasHeight * zoom,
              backgroundColor: canvasBackground,
              backgroundImage: showGrid
                ? `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`
                : "none",
              backgroundSize: showGrid ? `${gridSize * zoom}px ${gridSize * zoom}px` : "auto",
            }}
            onClick={(e) => {
              if (e.target === canvasRef.current) {
                setSelectedElements([])
              }
            }}
          >
            {/* Render Elements */}
            {elements.map((el) => {
              if (!el.visible) return null

              const style: React.CSSProperties = {
                position: "absolute",
                left: el.x * zoom,
                top: el.y * zoom,
                width: el.width * zoom,
                height: el.height * zoom,
                transform: `rotate(${el.rotation}deg)`,
                opacity: el.opacity,
                cursor: el.locked ? "not-allowed" : "move",
                outline: selectedElements.includes(el.id) ? "2px solid #C4D600" : "none",
                outlineOffset: "2px",
              }

              if (el.type === "text") {
                return (
                  <div
                    key={el.id}
                    style={{
                      ...style,
                      fontSize: (el.fontSize || 32) * zoom,
                      fontFamily: el.fontFamily,
                      fontWeight: el.fontWeight,
                      fontStyle: el.fontStyle,
                      textDecoration: el.textDecoration,
                      textAlign: el.textAlign as any,
                      color: el.color,
                      lineHeight: el.lineHeight,
                      letterSpacing: el.letterSpacing,
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        el.textAlign === "center" ? "center" : el.textAlign === "right" ? "flex-end" : "flex-start",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!el.locked) setSelectedElements([el.id])
                    }}
                  >
                    {el.text}
                  </div>
                )
              }

              if (el.type === "shape") {
                const shapeStyle: React.CSSProperties = {
                  ...style,
                  backgroundColor: el.shapeType !== "circle" ? el.fill : undefined,
                  borderRadius: el.shapeType === "circle" ? "50%" : el.borderRadius,
                  border: el.stroke && el.strokeWidth ? `${el.strokeWidth}px solid ${el.stroke}` : "none",
                  boxShadow: el.shadowBlur
                    ? `${el.shadowX}px ${el.shadowY}px ${el.shadowBlur}px ${el.shadowColor}`
                    : "none",
                }

                if (el.shapeType === "circle") {
                  return (
                    <div
                      key={el.id}
                      style={{ ...shapeStyle, backgroundColor: el.fill }}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!el.locked) setSelectedElements([el.id])
                      }}
                    />
                  )
                }

                return (
                  <div
                    key={el.id}
                    style={shapeStyle}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!el.locked) setSelectedElements([el.id])
                    }}
                  />
                )
              }

              if (el.type === "image") {
                const filterStr = el.filters
                  ? `brightness(${el.filters.brightness}%) contrast(${el.filters.contrast}%) saturate(${el.filters.saturation}%) blur(${el.filters.blur}px) grayscale(${el.filters.grayscale}%) sepia(${el.filters.sepia}%) hue-rotate(${el.filters.hueRotate}deg) invert(${el.filters.invert}%)`
                  : "none"

                return (
                  <img
                    key={el.id}
                    src={el.src || "/placeholder.svg"}
                    alt=""
                    style={{
                      ...style,
                      objectFit: "cover",
                      filter: filterStr,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!el.locked) setSelectedElements([el.id])
                    }}
                    draggable={false}
                  />
                )
              }

              return null
            })}
          </div>
        </div>

        {/* Right Panel - Properties */}
        {rightPanelOpen && selectedElement && (
          <div className="w-72 bg-[#141414] border-l border-white/10 p-4 overflow-y-auto">
            <ScrollArea className="h-full">
              <div className="space-y-6">
                {/* Position & Size */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-3">TRANSFORM</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-500">X</Label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.x)}
                        onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                        className="h-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Y</Label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.y)}
                        onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                        className="h-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Width</Label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.width)}
                        onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                        className="h-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Height</Label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.height)}
                        onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                        className="h-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Rotation</Label>
                      <Input
                        type="number"
                        value={selectedElement.rotation}
                        onChange={(e) => updateElement(selectedElement.id, { rotation: Number(e.target.value) })}
                        className="h-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Opacity</Label>
                      <Slider
                        value={[selectedElement.opacity * 100]}
                        onValueChange={([v]) => updateElement(selectedElement.id, { opacity: v / 100 })}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Properties */}
                {selectedElement.type === "text" && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-3">TEXT</h4>
                    <Textarea
                      value={selectedElement.text || ""}
                      onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mb-3"
                      rows={3}
                    />
                    <Select
                      value={selectedElement.fontFamily}
                      onValueChange={(v) => updateElement(selectedElement.id, { fontFamily: v })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white mb-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-60">
                        {FONT_FAMILIES.map((font) => (
                          <SelectItem key={font} value={font} className="text-white" style={{ fontFamily: font }}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <Label className="text-xs text-gray-500">Size</Label>
                        <Input
                          type="number"
                          value={selectedElement.fontSize || 32}
                          onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                          className="h-8 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Color</Label>
                        <Input
                          type="color"
                          value={selectedElement.color || "#000000"}
                          onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                          className="h-8 bg-white/5 border-white/10 p-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.fontWeight === "bold" && "bg-white/10")}
                        onClick={() =>
                          updateElement(selectedElement.id, {
                            fontWeight: selectedElement.fontWeight === "bold" ? "normal" : "bold",
                          })
                        }
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.fontStyle === "italic" && "bg-white/10")}
                        onClick={() =>
                          updateElement(selectedElement.id, {
                            fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic",
                          })
                        }
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.textDecoration === "underline" && "bg-white/10")}
                        onClick={() =>
                          updateElement(selectedElement.id, {
                            textDecoration: selectedElement.textDecoration === "underline" ? "none" : "underline",
                          })
                        }
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-8 bg-white/10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.textAlign === "left" && "bg-white/10")}
                        onClick={() => updateElement(selectedElement.id, { textAlign: "left" })}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.textAlign === "center" && "bg-white/10")}
                        onClick={() => updateElement(selectedElement.id, { textAlign: "center" })}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", selectedElement.textAlign === "right" && "bg-white/10")}
                        onClick={() => updateElement(selectedElement.id, { textAlign: "right" })}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Shape Properties */}
                {selectedElement.type === "shape" && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-3">SHAPE</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-500">Fill</Label>
                        <Input
                          type="color"
                          value={selectedElement.fill || "#C4D600"}
                          onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                          className="h-8 bg-white/5 border-white/10 p-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Stroke</Label>
                        <Input
                          type="color"
                          value={selectedElement.stroke || "#000000"}
                          onChange={(e) => updateElement(selectedElement.id, { stroke: e.target.value })}
                          className="h-8 bg-white/5 border-white/10 p-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Stroke Width</Label>
                        <Input
                          type="number"
                          value={selectedElement.strokeWidth || 0}
                          onChange={(e) => updateElement(selectedElement.id, { strokeWidth: Number(e.target.value) })}
                          className="h-8 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Border Radius</Label>
                        <Input
                          type="number"
                          value={selectedElement.borderRadius || 0}
                          onChange={(e) => updateElement(selectedElement.id, { borderRadius: Number(e.target.value) })}
                          className="h-8 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Filters */}
                {selectedElement.type === "image" && selectedElement.filters && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-3">FILTERS</h4>
                    <div className="space-y-3">
                      {[
                        { key: "brightness", label: "Brightness", max: 200 },
                        { key: "contrast", label: "Contrast", max: 200 },
                        { key: "saturation", label: "Saturation", max: 200 },
                        { key: "blur", label: "Blur", max: 20 },
                        { key: "grayscale", label: "Grayscale", max: 100 },
                        { key: "sepia", label: "Sepia", max: 100 },
                      ].map((filter) => (
                        <div key={filter.key}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">{filter.label}</span>
                            <span className="text-gray-400">
                              {selectedElement.filters?.[filter.key as keyof ImageFilters]}
                            </span>
                          </div>
                          <Slider
                            value={[selectedElement.filters?.[filter.key as keyof ImageFilters] || 0]}
                            onValueChange={([v]) =>
                              updateElement(selectedElement.id, {
                                filters: { ...selectedElement.filters!, [filter.key]: v },
                              })
                            }
                            max={filter.max}
                            step={1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layer Actions */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-3">LAYER</h4>
                  <div className="flex gap-1 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => moveElementInStack(selectedElement.id, "top")}
                    >
                      <ChevronsUp className="h-3 w-3 mr-1" /> Top
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => moveElementInStack(selectedElement.id, "up")}
                    >
                      <ChevronUp className="h-3 w-3 mr-1" /> Up
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => moveElementInStack(selectedElement.id, "down")}
                    >
                      <ChevronDown className="h-3 w-3 mr-1" /> Down
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => moveElementInStack(selectedElement.id, "bottom")}
                    >
                      <ChevronsDown className="h-3 w-3 mr-1" /> Bottom
                    </Button>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 flex-1"
                      onClick={() => updateElement(selectedElement.id, { locked: !selectedElement.locked })}
                    >
                      {selectedElement.locked ? <Unlock className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
                      {selectedElement.locked ? "Unlock" : "Lock"}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 flex-1" onClick={duplicateSelectedElements}>
                      <Copy className="h-3 w-3 mr-1" /> Duplicate
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-400 hover:text-red-300"
                      onClick={deleteSelectedElements}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}

        {/* AI Studio Panel */}
        {aiPanelOpen && (
          <div className="w-80 bg-[#141414] border-l border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-[#C4D600]" />
                  AI Studio
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setAiPanelOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={aiTab} onValueChange={setAiTab} className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none p-0 px-4">
                <TabsTrigger
                  value="generate"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none text-xs"
                >
                  Generate
                </TabsTrigger>
                <TabsTrigger
                  value="enhance"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none text-xs"
                >
                  Enhance
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="text-gray-400 data-[state=active]:text-[#C4D600] data-[state=active]:border-b-2 data-[state=active]:border-[#C4D600] rounded-none text-xs"
                >
                  Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="flex-1 p-4 mt-0 overflow-y-auto">
                <div className="space-y-4">
                  {/* AI Model Selection */}
                  <div>
                    <Label className="text-xs text-gray-400 mb-2 block">AI Model</Label>
                    <Select value={selectedAiModel} onValueChange={setSelectedAiModel}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {AI_MODELS.map((model) => (
                          <SelectItem key={model.id} value={model.id} className="text-white">
                            <div className="flex items-center gap-2">
                              <span>{model.icon}</span>
                              <span>{model.name}</span>
                              {model.free && <Badge className="bg-green-500/20 text-green-400 text-[10px]">Free</Badge>}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prompt */}
                  <div>
                    <Label className="text-xs text-gray-400 mb-2 block">Prompt</Label>
                    <Textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Describe what you want to create..."
                      className="bg-white/5 border-white/10 text-white min-h-24"
                    />
                  </div>

                  {/* Negative Prompt */}
                  <div>
                    <Label className="text-xs text-gray-400 mb-2 block">Negative Prompt (Optional)</Label>
                    <Textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="What to avoid..."
                      className="bg-white/5 border-white/10 text-white min-h-16"
                    />
                  </div>

                  {/* Style */}
                  <div>
                    <Label className="text-xs text-gray-400 mb-2 block">Style</Label>
                    <Select value={aiStyle} onValueChange={setAiStyle}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {[
                          "realistic",
                          "artistic",
                          "anime",
                          "3d-render",
                          "digital-art",
                          "photography",
                          "illustration",
                          "cinematic",
                          "abstract",
                          "minimalist",
                        ].map((style) => (
                          <SelectItem key={style} value={style} className="text-white capitalize">
                            {style.replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Generate Button */}
                  <Button
                    className="w-full bg-[#C4D600] text-black hover:bg-[#d4e600]"
                    onClick={handleAiGenerate}
                    disabled={aiGenerating || !aiPrompt.trim()}
                  >
                    {aiGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>

                  {aiGenerating && (
                    <div className="space-y-2">
                      <Progress value={aiProgress} className="h-2" />
                      <p className="text-xs text-gray-400 text-center">{aiProgress}% - Creating your masterpiece...</p>
                    </div>
                  )}

                  {/* Generated Images */}
                  {generatedImages.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-400">Generated Images</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {generatedImages.map((img, i) => (
                          <div
                            key={i}
                            className="relative group cursor-pointer rounded-lg overflow-hidden border border-white/10"
                            onClick={() => addGeneratedImageToCanvas(img)}
                          >
                            <img src={img || "/placeholder.svg"} alt="" className="w-full aspect-square object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Plus className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="enhance" className="flex-1 p-4 mt-0">
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Select an image on canvas to enhance</p>
                  {AI_TOOLS.slice(1, 5).map((tool) => (
                    <Button
                      key={tool.id}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                      disabled={selectedElement?.type !== "image"}
                    >
                      <tool.icon className="h-4 w-4 mr-3 text-[#C4D600]" />
                      <div className="text-left">
                        <p className="text-sm">{tool.name}</p>
                        <p className="text-xs text-gray-500">{tool.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tools" className="flex-1 p-4 mt-0">
                <div className="space-y-3">
                  {AI_TOOLS.map((tool) => (
                    <Button
                      key={tool.id}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      <tool.icon className="h-4 w-4 mr-3 text-[#C4D600]" />
                      <div className="text-left">
                        <p className="text-sm">{tool.name}</p>
                        <p className="text-xs text-gray-500">{tool.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* AI Chat Panel */}
        {aiChatOpen && (
          <div className="w-80 bg-[#141414] border-l border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-400" />
                  AI Creative Team
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setAiChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Agent Selection */}
            <div className="p-4 border-b border-white/10">
              <Label className="text-xs text-gray-400 mb-2 block">Select Agent</Label>
              <Select
                value={selectedAgent?.id || ""}
                onValueChange={(v) => {
                  const agent = agents.find((a) => a.id === v)
                  setSelectedAgent(agent)
                  setAiMessages([])
                }}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Choose an AI agent" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id} className="text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C4D600] to-[#8fa600] flex items-center justify-center">
                          <span className="text-[10px] font-bold text-black">{agent.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm">{agent.name}</p>
                          <p className="text-xs text-gray-500">{agent.role}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {aiMessages.length === 0 && selectedAgent && (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      Hi! I'm {selectedAgent.name}, your {selectedAgent.role}. How can I help you today?
                    </p>
                  </div>
                )}
                {aiMessages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg p-3 text-sm",
                        msg.role === "user" ? "bg-[#C4D600] text-black" : "bg-white/10 text-white",
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiChat()}
                  placeholder="Ask for design advice..."
                  className="bg-white/5 border-white/10 text-white"
                  disabled={!selectedAgent}
                />
                <Button
                  size="icon"
                  className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
                  onClick={handleAiChat}
                  disabled={!selectedAgent || !aiInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
