"use client"

export type ImageOrientation = "landscape" | "portrait" | "square"

export function getImageOrientation(width: number, height: number): ImageOrientation {
  const ratio = width / height

  if (ratio > 1.2) return "landscape"
  if (ratio < 0.8) return "portrait"
  return "square"
}

export function getGridSpan(orientation: ImageOrientation): string {
  switch (orientation) {
    case "landscape":
      return "col-span-2 row-span-1"
    case "portrait":
      return "col-span-1 row-span-2"
    case "square":
      return "col-span-1 row-span-1"
  }
}

interface PortfolioImage {
  id: string
  image_url: string
  alt_text?: string
  orientation?: ImageOrientation
  width?: number
  height?: number
}

export function ImageOrientationDetector({ images }: { images: PortfolioImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
      {images.map((image) => {
        const orientation = image.orientation || "square"
        const span = getGridSpan(orientation)

        return (
          <div
            key={image.id}
            className={`${span} overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group cursor-pointer`}
          >
            <img
              src={image.image_url || "/placeholder.svg"}
              alt={image.alt_text || "Portfolio image"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </div>
        )
      })}
    </div>
  )
}
