"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Sparkles, TrendingUp, TrendingDown, Minus, Trash2, Loader2, AlertCircle, Settings } from "lucide-react"

type AIProvider = "auto" | "huggingface" | "vercel" | "google" | "manual"

interface AIProviderOption {
  value: AIProvider
  label: string
  description: string
  badge?: string
}

const AI_PROVIDER_OPTIONS: AIProviderOption[] = [
  {
    value: "auto",
    label: "Auto (Smart Fallback)",
    description: "Tries free options first, then paid",
    badge: "Recommended",
  },
  { value: "huggingface", label: "Hugging Face", description: "Free tier - Add HUGGINGFACE_API_KEY", badge: "Free" },
  { value: "vercel", label: "Vercel AI Gateway", description: "Fast - May require verification" },
  { value: "google", label: "Google Gemini", description: "High quality - Add GOOGLE_GENERATIVE_AI_API_KEY" },
  { value: "manual", label: "Manual Input", description: "Write content yourself - No AI needed", badge: "Free" },
]

export function SeoCmsManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [keywords, setKeywords] = useState<any[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [backlinks, setBacklinks] = useState<any[]>([])
  const [aiContent, setAiContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const [selectedProvider, setSelectedProvider] = useState<AIProvider>("auto")
  const [aiError, setAiError] = useState<string | null>(null)
  const [lastUsedProvider, setLastUsedProvider] = useState<string | null>(null)
  const [showProviderSettings, setShowProviderSettings] = useState(false)

  // Dialogs
  const [showKeywordDialog, setShowKeywordDialog] = useState(false)
  const [showPageDialog, setShowPageDialog] = useState(false)
  const [showBacklinkDialog, setShowBacklinkDialog] = useState(false)
  const [showContentDialog, setShowContentDialog] = useState(false)

  // Forms
  const [keywordForm, setKeywordForm] = useState({
    keyword: "",
    search_volume: 0,
    difficulty: "medium",
    target_url: "",
    country: "UAE",
  })
  const [pageForm, setPageForm] = useState({ url: "", title: "", meta_description: "", h1_tag: "" })
  const [backlinkForm, setBacklinkForm] = useState({
    source_url: "",
    target_url: "",
    anchor_text: "",
    domain_authority: 0,
    is_dofollow: true,
  })
  const [contentForm, setContentForm] = useState({
    title: "",
    content_type: "blog",
    target_keywords: "",
    excerpt: "",
  })
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiGeneratedContent, setAiGeneratedContent] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    setLoading(true)
    const [keywordsRes, pagesRes, backlinksRes, contentRes] = await Promise.all([
      supabase.from("seo_keywords").select("*").order("created_at", { ascending: false }),
      supabase.from("seo_pages").select("*").order("created_at", { ascending: false }),
      supabase.from("seo_backlinks").select("*").order("created_at", { ascending: false }),
      supabase.from("seo_ai_content").select("*").order("created_at", { ascending: false }),
    ])
    setKeywords(keywordsRes.data || [])
    setPages(pagesRes.data || [])
    setBacklinks(backlinksRes.data || [])
    setAiContent(contentRes.data || [])
    setLoading(false)
  }

  // CRUD operations
  async function handleAddKeyword() {
    const { error } = await supabase.from("seo_keywords").insert([keywordForm])
    if (!error) {
      setShowKeywordDialog(false)
      setKeywordForm({ keyword: "", search_volume: 0, difficulty: "medium", target_url: "", country: "UAE" })
      fetchAllData()
    }
  }

  async function handleDeleteKeyword(id: string) {
    await supabase.from("seo_keywords").delete().eq("id", id)
    fetchAllData()
  }

  async function handleAddPage() {
    const { error } = await supabase.from("seo_pages").insert([{ ...pageForm, seo_score: 0 }])
    if (!error) {
      setShowPageDialog(false)
      setPageForm({ url: "", title: "", meta_description: "", h1_tag: "" })
      fetchAllData()
    }
  }

  async function handleDeletePage(id: string) {
    await supabase.from("seo_pages").delete().eq("id", id)
    fetchAllData()
  }

  async function handleAddBacklink() {
    const { error } = await supabase.from("seo_backlinks").insert([backlinkForm])
    if (!error) {
      setShowBacklinkDialog(false)
      setBacklinkForm({ source_url: "", target_url: "", anchor_text: "", domain_authority: 0, is_dofollow: true })
      fetchAllData()
    }
  }

  async function handleDeleteBacklink(id: string) {
    await supabase.from("seo_backlinks").delete().eq("id", id)
    fetchAllData()
  }

  async function handleGenerateContent() {
    if (!aiPrompt && selectedProvider !== "manual") return
    setGenerating(true)
    setAiError(null)

    // Manual mode - just open editor
    if (selectedProvider === "manual") {
      setAiGeneratedContent("")
      setGenerating(false)
      return
    }

    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          provider: selectedProvider,
          title: contentForm.title,
          contentType: contentForm.content_type,
          targetKeywords: contentForm.target_keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.suggestion === "manual") {
          setAiError(
            data.message || "AI unavailable. Try adding HUGGINGFACE_API_KEY (free) in Vars, or use Manual mode.",
          )
          setSelectedProvider("manual")
        } else {
          throw new Error(data.error || "Failed to generate content")
        }
      } else {
        setAiGeneratedContent(data.content)
        setLastUsedProvider(data.provider)
        setAiError(null)
      }
    } catch (error: any) {
      console.error("Error generating content:", error)
      setAiError(error.message || "Error generating content. Please try Manual mode.")
    }

    setGenerating(false)
  }

  async function handleSaveAiContent() {
    if (!aiGeneratedContent && selectedProvider !== "manual") return

    const content = selectedProvider === "manual" ? aiGeneratedContent : aiGeneratedContent
    const wordCount = content.split(/\s+/).filter(Boolean).length

    const { error } = await supabase.from("seo_ai_content").insert([
      {
        title: contentForm.title,
        content: content,
        content_type: contentForm.content_type,
        target_keywords: contentForm.target_keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        excerpt: contentForm.excerpt || content.substring(0, 160),
        word_count: wordCount,
        status: "draft",
        seo_score: Math.min(100, 50 + wordCount / 20),
      },
    ])

    if (!error) {
      setShowContentDialog(false)
      setContentForm({ title: "", content_type: "blog", target_keywords: "", excerpt: "" })
      setAiPrompt("")
      setAiGeneratedContent("")
      setAiError(null)
      fetchAllData()
    }
  }

  // AI Meta Tag Generator with error handling
  async function generateMetaTags(url: string, pageId: string) {
    setGenerating(true)
    setAiError(null)
    try {
      const response = await fetch("/api/ai/generate-meta-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, pageId }),
      })

      const data = await response.json()

      if (!response.ok) {
        setAiError(data.message || "Failed to generate meta tags. Try adding an API key in Vars.")
      } else {
        setLastUsedProvider(data.provider)
      }

      fetchAllData()
    } catch (error: any) {
      console.error("Error generating meta tags:", error)
      setAiError("Error generating meta tags. Check your API keys in Vars.")
    }
    setGenerating(false)
  }

  async function handlePublishContent(id: string) {
    await supabase
      .from("seo_ai_content")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", id)
    fetchAllData()
  }

  async function handleDeleteContent(id: string) {
    await supabase.from("seo_ai_content").delete().eq("id", id)
    fetchAllData()
  }

  const avgSeoScore =
    pages.length > 0 ? Math.round(pages.reduce((a, b) => a + (b.seo_score || 0), 0) / pages.length) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {aiError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{aiError}</span>
            <Button variant="outline" size="sm" onClick={() => setShowProviderSettings(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Configure AI
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {lastUsedProvider && !aiError && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            AI Provider: <Badge variant="outline">{lastUsedProvider}</Badge>
            <Button variant="ghost" size="sm" className="ml-2" onClick={() => setShowProviderSettings(true)}>
              Change
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SEO & CMS Management</h2>
          <p className="text-muted-foreground">Manage keywords, pages, backlinks, and AI-generated content</p>
        </div>
        <Button variant="outline" onClick={() => setShowProviderSettings(true)}>
          <Settings className="h-4 w-4 mr-2" />
          AI Settings
        </Button>
      </div>

      <Dialog open={showProviderSettings} onOpenChange={setShowProviderSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Provider Settings</DialogTitle>
            <DialogDescription>Choose your preferred AI provider for content generation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select AI Provider</Label>
              <Select value={selectedProvider} onValueChange={(v) => setSelectedProvider(v as AIProvider)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_PROVIDER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        {option.badge && (
                          <Badge variant={option.badge === "Free" ? "secondary" : "default"} className="text-xs">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Provider Details:</p>
              {AI_PROVIDER_OPTIONS.find((p) => p.value === selectedProvider)?.description}
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm space-y-2">
              <p className="font-medium">How to add free AI:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Go to huggingface.co and create free account</li>
                <li>Get your API token from settings</li>
                <li>Add HUGGINGFACE_API_KEY in v0 Vars sidebar</li>
                <li>Select "Auto" mode - it will use free tier first</li>
              </ol>
            </div>

            <Button onClick={() => setShowProviderSettings(false)} className="w-full">
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-[#141414] border border-white/10">
          <TabsTrigger
            value="overview"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="keywords"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Keywords
          </TabsTrigger>
          <TabsTrigger
            value="pages"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Pages
          </TabsTrigger>
          <TabsTrigger
            value="backlinks"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Backlinks
          </TabsTrigger>
          <TabsTrigger
            value="ai-content"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            AI Content
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Keywords Tracked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{keywords.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pages Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pages.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{backlinks.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSeoScore}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {keywords.slice(0, 5).map((kw) => (
                    <div key={kw.id} className="flex items-center justify-between">
                      <span className="font-medium">{kw.keyword}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{kw.current_position || "-"}</Badge>
                        {kw.current_position && kw.previous_position && (
                          <>
                            {kw.current_position < kw.previous_position && (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            )}
                            {kw.current_position > kw.previous_position && (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            {kw.current_position === kw.previous_position && (
                              <Minus className="h-4 w-4 text-gray-500" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {aiContent.slice(0, 5).map((content) => (
                    <div key={content.id} className="flex items-center justify-between">
                      <span className="font-medium truncate max-w-[200px]">{content.title}</span>
                      <Badge variant={content.status === "published" ? "default" : "secondary"}>{content.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Keywords Tracking</h3>
            <Button onClick={() => setShowKeywordDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Keyword
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((kw) => (
                <TableRow key={kw.id}>
                  <TableCell className="font-medium">{kw.keyword}</TableCell>
                  <TableCell>{kw.search_volume?.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        kw.difficulty === "easy" ? "secondary" : kw.difficulty === "hard" ? "destructive" : "default"
                      }
                    >
                      {kw.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      #{kw.current_position || "-"}
                      {kw.current_position && kw.previous_position && kw.current_position < kw.previous_position && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                      {kw.current_position && kw.previous_position && kw.current_position > kw.previous_position && (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{kw.country}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteKeyword(kw.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Pages SEO</h3>
            <Button onClick={() => setShowPageDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{page.url}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{page.title || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            page.seo_score >= 80
                              ? "bg-green-500"
                              : page.seo_score >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${page.seo_score}%` }}
                        />
                      </div>
                      <span className="text-sm">{page.seo_score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generateMetaTags(page.url, page.id)}
                        disabled={generating}
                      >
                        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Backlinks</h3>
            <Button onClick={() => setShowBacklinkDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Backlink
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source URL</TableHead>
                <TableHead>Target URL</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>DA</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backlinks.map((bl) => (
                <TableRow key={bl.id}>
                  <TableCell className="max-w-[150px] truncate">{bl.source_url}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{bl.target_url}</TableCell>
                  <TableCell>{bl.anchor_text}</TableCell>
                  <TableCell>{bl.domain_authority}</TableCell>
                  <TableCell>
                    <Badge variant={bl.is_dofollow ? "default" : "secondary"}>
                      {bl.is_dofollow ? "DoFollow" : "NoFollow"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBacklink(bl.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* AI Content Tab */}
        <TabsContent value="ai-content" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">AI-Generated Content</h3>
            <Button onClick={() => setShowContentDialog(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiContent.map((content) => (
              <Card key={content.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base line-clamp-2">{content.title}</CardTitle>
                    <Badge variant={content.status === "published" ? "default" : "secondary"}>{content.status}</Badge>
                  </div>
                  <CardDescription>
                    {content.content_type} • {content.word_count} words
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{content.excerpt}</p>
                  <div className="flex gap-2 mt-4">
                    {content.status === "draft" && (
                      <Button size="sm" onClick={() => handlePublishContent(content.id)}>
                        Publish
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteContent(content.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Keyword Dialog */}
      <Dialog open={showKeywordDialog} onOpenChange={setShowKeywordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Keyword</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Keyword</Label>
              <Input
                value={keywordForm.keyword}
                onChange={(e) => setKeywordForm({ ...keywordForm, keyword: e.target.value })}
                placeholder="e.g., digital marketing UAE"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Search Volume</Label>
                <Input
                  type="number"
                  value={keywordForm.search_volume}
                  onChange={(e) => setKeywordForm({ ...keywordForm, search_volume: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={keywordForm.difficulty}
                  onValueChange={(v) => setKeywordForm({ ...keywordForm, difficulty: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Target URL</Label>
              <Input
                value={keywordForm.target_url}
                onChange={(e) => setKeywordForm({ ...keywordForm, target_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Country</Label>
              <Select value={keywordForm.country} onValueChange={(v) => setKeywordForm({ ...keywordForm, country: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UAE">UAE</SelectItem>
                  <SelectItem value="KSA">Saudi Arabia</SelectItem>
                  <SelectItem value="Qatar">Qatar</SelectItem>
                  <SelectItem value="Kuwait">Kuwait</SelectItem>
                  <SelectItem value="Bahrain">Bahrain</SelectItem>
                  <SelectItem value="Oman">Oman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddKeyword} className="w-full">
              Add Keyword
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Page Dialog */}
      <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>URL</Label>
              <Input
                value={pageForm.url}
                onChange={(e) => setPageForm({ ...pageForm, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={pageForm.title}
                onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                placeholder="Page title"
              />
            </div>
            <div>
              <Label>Meta Description</Label>
              <Textarea
                value={pageForm.meta_description}
                onChange={(e) => setPageForm({ ...pageForm, meta_description: e.target.value })}
                placeholder="Meta description..."
              />
            </div>
            <Button onClick={handleAddPage} className="w-full">
              Add Page
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Backlink Dialog */}
      <Dialog open={showBacklinkDialog} onOpenChange={setShowBacklinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Backlink</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Source URL</Label>
              <Input
                value={backlinkForm.source_url}
                onChange={(e) => setBacklinkForm({ ...backlinkForm, source_url: e.target.value })}
                placeholder="https://external-site.com/page"
              />
            </div>
            <div>
              <Label>Target URL</Label>
              <Input
                value={backlinkForm.target_url}
                onChange={(e) => setBacklinkForm({ ...backlinkForm, target_url: e.target.value })}
                placeholder="https://your-site.com/page"
              />
            </div>
            <div>
              <Label>Anchor Text</Label>
              <Input
                value={backlinkForm.anchor_text}
                onChange={(e) => setBacklinkForm({ ...backlinkForm, anchor_text: e.target.value })}
                placeholder="Link text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Domain Authority</Label>
                <Input
                  type="number"
                  value={backlinkForm.domain_authority}
                  onChange={(e) =>
                    setBacklinkForm({ ...backlinkForm, domain_authority: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={backlinkForm.is_dofollow ? "dofollow" : "nofollow"}
                  onValueChange={(v) => setBacklinkForm({ ...backlinkForm, is_dofollow: v === "dofollow" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dofollow">DoFollow</SelectItem>
                    <SelectItem value="nofollow">NoFollow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddBacklink} className="w-full">
              Add Backlink
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate AI Content</DialogTitle>
            <DialogDescription>Create SEO-optimized content using AI or write manually</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Provider Selection */}
            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
              <Label className="whitespace-nowrap">AI Provider:</Label>
              <Select value={selectedProvider} onValueChange={(v) => setSelectedProvider(v as AIProvider)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_PROVIDER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.label}
                        {option.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {lastUsedProvider && (
                <Badge variant="outline" className="ml-auto">
                  Last used: {lastUsedProvider}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  placeholder="Article title"
                />
              </div>
              <div>
                <Label>Content Type</Label>
                <Select
                  value={contentForm.content_type}
                  onValueChange={(v) => setContentForm({ ...contentForm, content_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Target Keywords (comma-separated)</Label>
              <Input
                value={contentForm.target_keywords}
                onChange={(e) => setContentForm({ ...contentForm, target_keywords: e.target.value })}
                placeholder="seo, digital marketing, UAE"
              />
            </div>

            {selectedProvider !== "manual" ? (
              <>
                <div>
                  <Label>AI Prompt / Topic Description</Label>
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want the AI to write about..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleGenerateContent} disabled={generating || !aiPrompt} className="w-full">
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </>
            ) : null}

            {(aiGeneratedContent || selectedProvider === "manual") && (
              <div>
                <Label>
                  {selectedProvider === "manual" ? "Write Your Content" : "Generated Content (Edit if needed)"}
                </Label>
                <Textarea
                  value={aiGeneratedContent}
                  onChange={(e) => setAiGeneratedContent(e.target.value)}
                  rows={12}
                  placeholder={
                    selectedProvider === "manual"
                      ? "Write your content here..."
                      : "AI generated content will appear here..."
                  }
                />
              </div>
            )}

            {(aiGeneratedContent || selectedProvider === "manual") && (
              <Button
                onClick={handleSaveAiContent}
                className="w-full"
                disabled={!aiGeneratedContent && selectedProvider !== "manual"}
              >
                Save Content as Draft
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
