"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProtectedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
}

export function ProtectedImage({ src, alt, width, height, className, fill }: ProtectedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("")

  useEffect(() => {
    // Load image as blob to prevent direct URL access
    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setImageSrc(url)
      })
      .catch(() => {
        setImageSrc(src) // Fallback to original
      })

    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc)
      }
    }
  }, [src])

  if (!imageSrc) {
    return <div className={className} style={{ width, height, background: "#f3f4f6" }} />
  }

  if (fill) {
    return (
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className={className}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
    )
  }

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width || 100}
      height={height || 100}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
  )
}
