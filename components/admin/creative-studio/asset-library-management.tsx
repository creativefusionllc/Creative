"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, ImageIcon, Trash2, Grid, List, Star } from "lucide-react"

export function AssetLibraryManagement() {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [assets, setAssets] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchAssets()
  }, [])

  async function fetchAssets() {
    const { data } = await supabase
      .from("asset_library")
      .select("*, clients(name)")
      .order("created_at", { ascending: false })
    setAssets(data || [])
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const img = new window.Image()
        img.onload = async () => {
          await supabase.from("asset_library").insert({
            name: file.name,
            file_url: event.target?.result as string,
            file_type: file.type,
            file_size: file.size,
            width: img.width,
            height: img.height,
            category: "uploads",
          })
          fetchAssets()
        }
        if (file.type.startsWith("image/")) {
          img.src = event.target?.result as string
        } else {
          await supabase.from("asset_library").insert({
            name: file.name,
            file_url: event.target?.result as string,
            file_type: file.type,
            file_size: file.size,
            category: "uploads",
          })
          fetchAssets()
        }
      }
      reader.readAsDataURL(file)
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function deleteAsset(id: string) {
    if (confirm("Delete this asset?")) {
      await supabase.from("asset_library").delete().eq("id", id)
      fetchAssets()
    }
  }

  async function toggleBrandAsset(id: string, isBrand: boolean) {
    await supabase.from("asset_library").update({ is_brand_asset: isBrand }).eq("id", id)
    fetchAssets()
  }

  const filteredAssets = assets.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || a.category === categoryFilter || (categoryFilter === "brand" && a.is_brand_asset)
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(assets.map((a) => a.category).filter(Boolean))]

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Asset Library</h1>
          <p className="text-gray-400 mt-1">Manage images, logos, and design assets</p>
        </div>
        <div className="flex gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Assets"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="all" className="text-white">
              All Assets
            </SelectItem>
            <SelectItem value="brand" className="text-white">
              Brand Assets
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-white capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex border border-white/10 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-400"}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-white/10 text-white" : "text-gray-400"}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Assets */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="group relative">
              <div className="aspect-square bg-[#141414] border border-white/10 rounded-lg overflow-hidden">
                {asset.file_type?.startsWith("image/") ? (
                  <img
                    src={asset.file_url || "/placeholder.svg"}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => toggleBrandAsset(asset.id, !asset.is_brand_asset)}
                  >
                    <Star className={`h-4 w-4 ${asset.is_brand_asset ? "fill-[#C4D600] text-[#C4D600]" : ""}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => deleteAsset(asset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {asset.is_brand_asset && (
                  <Badge className="absolute top-2 left-2 bg-[#C4D600] text-black text-xs">Brand</Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-white truncate">{asset.name}</p>
              <p className="text-xs text-gray-500">
                {asset.width && asset.height ? `${asset.width}x${asset.height}` : ""}
                {asset.file_size ? ` • ${formatFileSize(asset.file_size)}` : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center gap-4 p-3 bg-[#141414] border border-white/10 rounded-lg hover:bg-white/5"
            >
              <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden shrink-0">
                {asset.file_type?.startsWith("image/") ? (
                  <img
                    src={asset.file_url || "/placeholder.svg"}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white truncate">{asset.name}</p>
                <p className="text-xs text-gray-500">
                  {asset.width && asset.height ? `${asset.width}x${asset.height} • ` : ""}
                  {formatFileSize(asset.file_size || 0)}
                </p>
              </div>
              {asset.is_brand_asset && <Badge className="bg-[#C4D600] text-black">Brand</Badge>}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => toggleBrandAsset(asset.id, !asset.is_brand_asset)}
                >
                  <Star className={`h-4 w-4 ${asset.is_brand_asset ? "fill-[#C4D600] text-[#C4D600]" : ""}`} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-red-400"
                  onClick={() => deleteAsset(asset.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredAssets.length === 0 && (
        <Card className="bg-[#141414] border-white/10 border-dashed">
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No assets found</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First Asset
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
