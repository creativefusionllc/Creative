import type { Metadata } from "next"
import { LocalSeoDashboard } from "@/components/admin/marketing/local-seo"

export const metadata: Metadata = {
  title: "Local SEO | Marketing Hub",
  description: "Manage Google Business Profile and local search rankings",
}

export default function LocalSeoPage() {
  return <LocalSeoDashboard />
}
