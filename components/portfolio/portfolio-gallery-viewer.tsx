"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PortfolioGalleryViewerProps {
  images: string[]
  title: string
}

export function PortfolioGalleryViewer({ images, title }: PortfolioGalleryViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-square rounded-lg overflow-hidden"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentImage && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            {/* Image */}
            <div className="relative aspect-video">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={`${title} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
                  onClick={() => setSelectedIndex((selectedIndex - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
                  onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}

            {/* Close Button */}
            <Button
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
