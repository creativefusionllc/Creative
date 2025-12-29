// Layout wrapper for all service pages to add canonical URLs

import type { ReactNode } from "react"

export default async function ServiceSubcategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ category: string; subcategory: string }>
}) {
  await params

  // Canonical URL is added via metadata in each page.tsx
  return <>{children}</>
}

// Metadata will be added to each individual page.tsx file
