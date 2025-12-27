"use client"

import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema() {
  const pathname = usePathname()
  const baseUrl = "https://creativefusion.llc"

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbItems: BreadcrumbItem[] = [{ name: "Home", url: baseUrl }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    breadcrumbItems.push({ name, url: `${baseUrl}${currentPath}` })
  })

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
