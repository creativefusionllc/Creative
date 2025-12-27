import type { Metadata } from "next"
import { MarketingHub } from "@/components/admin/marketing/marketing-hub"

export const metadata: Metadata = {
  title: "Marketing Hub | Admin",
  description: "Complete marketing toolkit with SEO, content, social media, and analytics",
}

export default function MarketingPage() {
  return <MarketingHub />
}
