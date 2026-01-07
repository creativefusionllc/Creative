import type { Metadata } from "next"
import { SitemapViewer } from "@/components/admin/cms/sitemap-viewer"

export const metadata: Metadata = {
  title: "Sitemap | CMS",
  description: "View all pages, routes, and templates in your website",
}

export default function SitemapPage() {
  return (
    <div className="p-8">
      <SitemapViewer />
    </div>
  )
}
