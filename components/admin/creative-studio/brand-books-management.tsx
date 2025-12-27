"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BookOpen,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Copy,
  Share2,
  Crown,
  Search,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface BrandBook {
  id: string
  client_id: string
  brand_kit_id: string | null
  title: string
  subtitle: string | null
  version: string
  status: string
  is_public: boolean
  share_token: string | null
  password_protected: boolean
  created_at: string
  clients?: { company_name: string; contact_name: string }
}

interface Client {
  id: string
  company_name: string
  contact_name: string
  has_brand_book_access: boolean
  is_vip_client: boolean
}

interface BrandKit {
  id: string
  name: string
  client_id: string
}

export function BrandBooksManagement() {
  const [brandBooks, setBrandBooks] = useState<BrandBook[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [brandKits, setBrandKits] = useState<BrandKit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedBrandKit, setSelectedBrandKit] = useState("")
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookSubtitle, setNewBookSubtitle] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)

    const [booksRes, clientsRes, kitsRes] = await Promise.all([
      supabase
        .from("brand_books")
        .select("*, clients(company_name, contact_name)")
        .order("created_at", { ascending: false }),
      supabase
        .from("clients")
        .select("id, company_name, contact_name, has_brand_book_access, is_vip_client")
        .order("company_name"),
      supabase.from("brand_kits").select("id, name, client_id").order("name"),
    ])

    if (booksRes.data) setBrandBooks(booksRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    if (kitsRes.data) setBrandKits(kitsRes.data)

    setLoading(false)
  }

  async function createBrandBook() {
    if (!selectedClient || !newBookTitle) return

    const shareToken = crypto.randomUUID().replace(/-/g, "").slice(0, 16)

    const { data, error } = await supabase
      .from("brand_books")
      .insert({
        client_id: selectedClient,
        brand_kit_id: selectedBrandKit || null,
        title: newBookTitle,
        subtitle: newBookSubtitle || null,
        share_token: shareToken,
      })
      .select()
      .single()

    if (!error && data) {
      // Enable VIP access for the client
      await supabase
        .from("clients")
        .update({ has_brand_book_access: true, is_vip_client: true })
        .eq("id", selectedClient)

      // Create default sections
      const defaultSections = [
        { section_type: "introduction", title: "Introduction", sort_order: 1 },
        { section_type: "story", title: "Brand Story", sort_order: 2 },
        { section_type: "logo", title: "Logo Guidelines", sort_order: 3 },
        { section_type: "colors", title: "Color Palette", sort_order: 4 },
        { section_type: "typography", title: "Typography", sort_order: 5 },
        { section_type: "imagery", title: "Imagery & Photography", sort_order: 6 },
        { section_type: "voice", title: "Brand Voice & Tone", sort_order: 7 },
        { section_type: "iconography", title: "Iconography", sort_order: 8 },
        { section_type: "patterns", title: "Patterns & Textures", sort_order: 9 },
        { section_type: "applications", title: "Brand Applications", sort_order: 10 },
        { section_type: "downloads", title: "Downloads & Assets", sort_order: 11 },
      ]

      await supabase.from("brand_book_sections").insert(defaultSections.map((s) => ({ ...s, brand_book_id: data.id })))

      // Create related tables
      await Promise.all([
        supabase.from("brand_book_story").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_logo").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_colors").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_typography").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_imagery").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_voice").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_iconography").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_patterns").insert({ brand_book_id: data.id }),
        supabase.from("brand_book_applications").insert({ brand_book_id: data.id }),
      ])

      setIsDialogOpen(false)
      setNewBookTitle("")
      setNewBookSubtitle("")
      setSelectedClient("")
      setSelectedBrandKit("")
      fetchData()

      // Navigate to editor
      router.push(`/admin/creative-studio/brand-books/${data.id}/edit`)
    }
  }

  async function deleteBrandBook(id: string) {
    if (!confirm("Are you sure you want to delete this brand book?")) return

    await supabase.from("brand_books").delete().eq("id", id)
    fetchData()
  }

  async function duplicateBrandBook(book: BrandBook) {
    const shareToken = crypto.randomUUID().replace(/-/g, "").slice(0, 16)

    const { data } = await supabase
      .from("brand_books")
      .insert({
        client_id: book.client_id,
        brand_kit_id: book.brand_kit_id,
        title: `${book.title} (Copy)`,
        subtitle: book.subtitle,
        share_token: shareToken,
        status: "draft",
      })
      .select()
      .single()

    if (data) {
      fetchData()
    }
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("brand_books").update({ status }).eq("id", id)

    if (status === "published") {
      await supabase.from("brand_books").update({ published_at: new Date().toISOString() }).eq("id", id)
    }

    fetchData()
  }

  const filteredBooks = brandBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.clients?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || book.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const vipClients = clients.filter((c) => c.is_vip_client || c.has_brand_book_access)
  const clientBrandKits = brandKits.filter((k) => k.client_id === selectedClient)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "in_review":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">
            <Eye className="h-3 w-3 mr-1" />
            In Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-blue-500/20 text-blue-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "published":
        return (
          <Badge className="bg-green-500/20 text-green-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Published
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Crown className="h-6 w-6 text-[#C4D600]" />
            Creative Brand Book
            <Badge className="bg-gradient-to-r from-[#C4D600]/20 to-amber-500/20 text-[#C4D600] ml-2 border border-[#C4D600]/30">
              Signature Feature
            </Badge>
          </h1>
          <p className="text-gray-400 mt-1">Professional brand identity manuals for client branding & rebranding</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Plus className="h-4 w-4 mr-2" />
              Create Brand Book
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Create New Brand Book</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Select VIP Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex items-center gap-2">
                          {client.is_vip_client && <Crown className="h-3 w-3 text-[#C4D600]" />}
                          {client.company_name || client.contact_name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClient && clientBrandKits.length > 0 && (
                <div>
                  <Label>Link to Brand Kit (Optional)</Label>
                  <Select value={selectedBrandKit} onValueChange={setSelectedBrandKit}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                      <SelectValue placeholder="Select brand kit" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {clientBrandKits.map((kit) => (
                        <SelectItem key={kit.id} value={kit.id}>
                          {kit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Brand Book Title</Label>
                <Input
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="e.g., Brand Identity Guidelines"
                  className="bg-white/5 border-white/10 text-white mt-1"
                />
              </div>

              <div>
                <Label>Subtitle (Optional)</Label>
                <Input
                  value={newBookSubtitle}
                  onChange={(e) => setNewBookSubtitle(e.target.value)}
                  placeholder="e.g., Version 2024"
                  className="bg-white/5 border-white/10 text-white mt-1"
                />
              </div>

              <Button
                onClick={createBrandBook}
                disabled={!selectedClient || !newBookTitle}
                className="w-full bg-[#C4D600] text-black hover:bg-[#d4e600]"
              >
                Create & Start Editing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C4D600]/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{brandBooks.length}</p>
                <p className="text-xs text-gray-400">Total Brand Books</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {brandBooks.filter((b) => b.status === "published").length}
                </p>
                <p className="text-xs text-gray-400">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {brandBooks.filter((b) => b.status === "draft" || b.status === "in_review").length}
                </p>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Crown className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{vipClients.length}</p>
                <p className="text-xs text-gray-400">VIP Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#141414] border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand books..."
                className="pl-9 bg-white/5 border-white/10 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Brand Books Table */}
      <Card className="bg-[#141414] border-white/10">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No brand books found</p>
              <p className="text-sm text-gray-500 mt-1">Create your first brand book for a VIP client</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-400">Brand Book</TableHead>
                  <TableHead className="text-gray-400">Client</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Version</TableHead>
                  <TableHead className="text-gray-400">Access</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id} className="border-white/10">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{book.title}</p>
                        {book.subtitle && <p className="text-sm text-gray-400">{book.subtitle}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-[#C4D600]" />
                        <span className="text-gray-300">
                          {book.clients?.company_name || book.clients?.contact_name || "—"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(book.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/20 text-gray-300">
                        v{book.version}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {book.is_public ? (
                          <Badge className="bg-green-500/20 text-green-400">
                            <Unlock className="h-3 w-3 mr-1" />
                            Public
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white"
                            onClick={() => router.push(`/admin/creative-studio/brand-books/${book.id}/edit`)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white"
                            onClick={() => router.push(`/brand-book/${book.share_token}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/brand-book/${book.share_token}`)
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Copy Share Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white"
                            onClick={() => duplicateBrandBook(book)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          {book.status === "draft" && (
                            <DropdownMenuItem
                              className="text-yellow-400"
                              onClick={() => updateStatus(book.id, "in_review")}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Send for Review
                            </DropdownMenuItem>
                          )}
                          {book.status === "in_review" && (
                            <DropdownMenuItem
                              className="text-blue-400"
                              onClick={() => updateStatus(book.id, "approved")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {book.status === "approved" && (
                            <DropdownMenuItem
                              className="text-green-400"
                              onClick={() => updateStatus(book.id, "published")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-400" onClick={() => deleteBrandBook(book.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
