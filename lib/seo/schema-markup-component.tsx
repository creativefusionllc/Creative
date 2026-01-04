"use client"

import { useEffect } from "react"

interface SchemaMarkupProps {
  schema: any
}

export function SchemaMarkupComponent({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    // Create script tag with schema markup
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      // Cleanup: remove script when component unmounts
      document.head.removeChild(script)
    }
  }, [schema])

  return null // No visual output, just injects schema into head
}
