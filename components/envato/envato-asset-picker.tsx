"use client"

import { useState, useEffect } from "react"
import { Search, Download, ImageIcon, FileText, Video, Layout, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EnvatoAsset {
  id: string
  asset_type: string
  title: string
  description: string
  preview_url: string
  download_url: string
  thumbnail_url: string
  tags: string[]
  categories: string[]
  dimensions: { width: number; height: number }
  format: string
  author_name: string
}

interface EnvatoAssetPickerProps {
  onSelect: (asset: EnvatoAsset) => void
  assetType?: string
  clientId?: string
  usageContext?: string
}

export function EnvatoAssetPicker({ onSelect, assetType, clientId, usageContext }: EnvatoAssetPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState(assetType || "")
  const [assets, setAssets] = useState<EnvatoAsset[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<EnvatoAsset | null>(null)

  const assetTypes = [
    { value: "", label: "All Assets", icon: Grid },
    { value: "photo", label: "Photos", icon: ImageIcon },
    { value: "graphic", label: "Graphics", icon: Layout },
    { value: "template", label: "Templates", icon: FileText },
    { value: "video", label: "Videos", icon: Video },
  ]

  useEffect(() => {
    if (isOpen && searchQuery) {
      searchAssets()
    }
  }, [searchQuery, selectedType, isOpen])

  async function searchAssets() {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type: selectedType,
      })

      const response = await fetch(`/api/envato/search?${params}`)
      const data = await response.json()

      setAssets(data.assets || [])
    } catch (error) {
      console.error("Failed to search Envato assets:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelect(asset: EnvatoAsset) {
    // Track usage
    if (clientId) {
      await fetch("/api/envato/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetId: asset.id,
          clientId,
          usageType: assetType || "general",
          usageContext,
        }),
      })
    }

    onSelect(asset)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full">
        <ImageIcon className="mr-2 h-4 w-4" />
        Browse Envato Elements
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Envato Elements - Unlimited Stock Assets</DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 flex-col flex-1 overflow-hidden">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search photos, graphics, templates, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={searchAssets} disabled={!searchQuery || loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 flex-wrap">
              {assetTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {type.label}
                  </Button>
                )
              })}
            </div>

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Searching Envato Elements...</p>
                </div>
              ) : assets.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "No assets found. Try different keywords."
                      : "Enter a search term to browse millions of assets"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {assets.map((asset) => (
                    <Card
                      key={asset.id}
                      className="cursor-pointer hover:border-primary transition-colors overflow-hidden"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <div className="aspect-square relative bg-muted">
                        <img
                          src={asset.thumbnail_url || "/placeholder.svg"}
                          alt={asset.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">{asset.format}</Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm truncate">{asset.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">by {asset.author_name}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Asset Preview Dialog */}
      {selectedAsset && (
        <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedAsset.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedAsset.preview_url || selectedAsset.thumbnail_url}
                  alt={selectedAsset.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{selectedAsset.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedAsset.tags.slice(0, 10).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Format:</strong> {selectedAsset.format}
                    </p>
                    <p>
                      <strong>Dimensions:</strong> {selectedAsset.dimensions.width} × {selectedAsset.dimensions.height}
                      px
                    </p>
                    <p>
                      <strong>Author:</strong> {selectedAsset.author_name}
                    </p>
                  </div>
                  <Button onClick={() => handleSelect(selectedAsset)}>
                    <Download className="mr-2 h-4 w-4" />
                    Use This Asset
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
