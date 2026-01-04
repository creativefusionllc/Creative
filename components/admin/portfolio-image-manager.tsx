"use client"

import type React from "react"
import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Crop as Crop2, Trash2, GripVertical, Plus, Loader2 } from "lucide-react"
import Image from "next/image"
import ReactEasyCrop from "react-easy-crop"

interface PortfolioImageManagerProps {
  portfolioId: string
  currentImages: string[]
  onImagesUpdate: (images: string[]) => void
}

export function PortfolioImageManager({ portfolioId, currentImages, onImagesUpdate }: PortfolioImageManagerProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<string[]>(currentImages || [])
  const [uploading, setUploading] = useState(false)
  const [croppingImage, setCroppingImage] = useState<string | null>(null)
  const [cropAspectRatio, setCropAspectRatio] = useState(16 / 9)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    const newImages = [...images]

    for (const file of Array.from(files)) {
      try {
        const fileExt = file.name.split(".").pop()
        const fileName = `portfolio-${portfolioId}-${Date.now()}-${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("portfolio").upload(fileName, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("portfolio").getPublicUrl(fileName)

        newImages.push(publicUrl)
      } catch (error) {
        console.error("Upload error:", error)
      }
    }

    setImages(newImages)
    onImagesUpdate(newImages)
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function deleteImage(index: number) {
    const imageUrl = images[index]
    if (!imageUrl.includes("supabase")) return

    try {
      const path = imageUrl.split("/portfolio/")[1]
      if (path) {
        await supabase.storage.from("portfolio").remove([decodeURIComponent(path)])
      }

      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
      onImagesUpdate(newImages)
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  function handleDrop(dropIndex: number) {
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const newImages = [...images]
    const [draggedImage] = newImages.splice(draggedIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)

    setImages(newImages)
    onImagesUpdate(newImages)
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>

        <div className="flex gap-2 mb-4">
          <label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <Button asChild disabled={uploading} className="gap-2 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]">
              <span>
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Images
                  </>
                )}
              </span>
            </Button>
          </label>

          <div className="flex gap-1">
            {[
              { ratio: 16 / 9, label: "16:9" },
              { ratio: 4 / 3, label: "4:3" },
              { ratio: 1, label: "1:1" },
            ].map(({ ratio, label }) => (
              <Button
                key={label}
                size="sm"
                variant={cropAspectRatio === ratio ? "default" : "outline"}
                onClick={() => setCropAspectRatio(ratio)}
                className={cropAspectRatio === ratio ? "bg-[#C4D600] text-gray-900" : "bg-white text-gray-900"}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {croppingImage && (
          <Card className="p-4 mb-4 bg-black">
            <div className="relative w-full h-96 mb-4">
              <ReactEasyCrop
                image={croppingImage}
                crop={crop}
                zoom={zoom}
                aspect={cropAspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropAreaPixelsChange={setCroppedAreaPixels}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white">Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-[#C4D600] text-gray-900" onClick={() => setCroppingImage(null)}>
                Apply Crop
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCroppingImage(null)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`group relative aspect-square rounded-lg overflow-hidden border-2 cursor-grab active:cursor-grabbing ${
                  draggedIndex === index ? "border-[#C4D600] opacity-50" : "border-gray-200"
                }`}
              >
                <Image src={image || "/placeholder.svg"} alt={`Portfolio ${index + 1}`} fill className="object-cover" />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]"
                    onClick={() => setCroppingImage(image)}
                  >
                    <Crop2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteImage(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <GripVertical className="h-3 w-3" />
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No images yet. Upload your first image!</p>
          </div>
        )}
      </div>
    </div>
  )
}
