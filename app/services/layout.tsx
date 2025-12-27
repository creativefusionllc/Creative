import type React from "react"
export const dynamic = "force-dynamic"
export const revalidate = 3600 // Revalidate every hour

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
