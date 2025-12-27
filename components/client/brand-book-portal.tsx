"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Book,
  Download,
  Eye,
  Lock,
  ArrowLeft,
  Search,
  Palette,
  Type,
  ImageIcon,
  FileText,
  Sparkles,
  Crown,
  Calendar,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export function ClientBrandBookPortal() {
  const supabase = createClient()
  const [brandBooks, setBrandBooks] = useState<any[]>([])
  const [assets, setAssets] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [booksRes, assetsRes] = await Promise.all([
      supabase.from("brand_books").select("*, clients(name, company_name)").eq("status", "published"),
      supabase.from("brand_book_assets").select("*, brand_books(title)").eq("is_public", true),
    ])
    setBrandBooks(booksRes.data || [])
    setAssets(assetsRes.data || [])
    setLoading(false)
  }

  const filteredBooks = brandBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.clients?.company_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.brand_books?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/client/dashboard" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-[#9aab00] rounded-lg flex items-center justify-center">
                  <Book className="h-5 w-5 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-bold text-white">Creative Brand Book</h1>
                    <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30 text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">Powered by Creative Fusion LLC</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand books..."
                  className="pl-10 bg-white/5 border-white/10 text-white w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 p-8 mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4D600]/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-[#C4D600]" />
              <span className="text-[#C4D600] font-medium">Professional Brand Guidelines</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Your Brand Identity, Documented</h2>
            <p className="text-gray-400 max-w-xl mb-6">
              Access your complete brand guidelines following international branding standards. Download assets, view
              specifications, and maintain brand consistency across all touchpoints.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Palette className="h-4 w-4 text-[#C4D600]" />
                <span>Color Systems</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Type className="h-4 w-4 text-[#C4D600]" />
                <span>Typography</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ImageIcon className="h-4 w-4 text-[#C4D600]" />
                <span>Logo Guidelines</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FileText className="h-4 w-4 text-[#C4D600]" />
                <span>Brand Voice</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="books" className="space-y-6">
          <TabsList className="bg-[#141414] border border-white/10">
            <TabsTrigger
              value="books"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Book className="h-4 w-4 mr-2" />
              Brand Books
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Download className="h-4 w-4 mr-2" />
              Downloadable Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-[#141414] border-white/10 animate-pulse">
                    <div className="aspect-[4/3] bg-white/5" />
                    <CardContent className="p-4">
                      <div className="h-5 bg-white/10 rounded mb-2 w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="bg-[#141414] border-white/10 overflow-hidden group hover:border-[#C4D600]/50 transition-all"
                  >
                    <div
                      className="aspect-[4/3] relative"
                      style={{
                        backgroundColor: book.cover_background_color || "#1a1a1a",
                      }}
                    >
                      {book.cover_image_url ? (
                        <img
                          src={book.cover_image_url || "/placeholder.svg"}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Book
                              className="h-16 w-16 mx-auto mb-3"
                              style={{ color: book.cover_text_color || "#ffffff" }}
                            />
                            <p className="text-lg font-bold" style={{ color: book.cover_text_color || "#ffffff" }}>
                              {book.title}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Link href={`/brand-book/${book.share_token}`}>
                          <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                            <Eye className="h-4 w-4 mr-2" />
                            View Book
                          </Button>
                        </Link>
                      </div>
                      {book.password_protected && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/50 text-white border-0">
                            <Lock className="h-3 w-3 mr-1" />
                            Protected
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{book.title}</h3>
                          {book.subtitle && <p className="text-gray-400 text-sm">{book.subtitle}</p>}
                        </div>
                        <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-0 text-xs">v{book.version}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        {book.published_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(book.published_at), "MMM d, yyyy")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          <span>Shareable Link</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#141414] border-white/10 border-dashed">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 bg-[#C4D600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book className="h-8 w-8 text-[#C4D600]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">No Brand Books Available</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Your brand book is being crafted by our creative team. Once published, you'll be able to access your
                    complete brand guidelines here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="assets">
            {filteredAssets.length > 0 ? (
              <div className="space-y-3">
                {filteredAssets.map((asset) => (
                  <Card key={asset.id} className="bg-[#141414] border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                            {asset.asset_type === "logo" && <ImageIcon className="h-6 w-6 text-[#C4D600]" />}
                            {asset.asset_type === "font" && <Type className="h-6 w-6 text-blue-400" />}
                            {asset.asset_type === "icon" && <Sparkles className="h-6 w-6 text-purple-400" />}
                            {asset.asset_type === "template" && <FileText className="h-6 w-6 text-green-400" />}
                            {!["logo", "font", "icon", "template"].includes(asset.asset_type) && (
                              <Download className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{asset.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span className="uppercase">{asset.file_format}</span>
                              {asset.file_size && <span>{Math.round(asset.file_size / 1024)} KB</span>}
                              {asset.brand_books?.title && <span>From: {asset.brand_books.title}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {asset.category && (
                            <Badge variant="outline" className="border-white/20 text-gray-400">
                              {asset.category}
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
                            onClick={() => window.open(asset.file_url, "_blank")}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#141414] border-white/10 border-dashed">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">No Assets Available</h3>
                  <p className="text-gray-400">Brand assets will appear here once your brand book is published.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer Branding */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Crown className="h-4 w-4 text-[#C4D600]" />
            <span>Creative Brand Book</span>
            <span className="text-gray-600">|</span>
            <span>Powered by Creative Fusion LLC</span>
          </div>
        </div>
      </main>
    </div>
  )
}
