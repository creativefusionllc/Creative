import type { Metadata } from "next"
import { BrandMonitoringDashboard } from "@/components/admin/marketing/brand-monitoring"

export const metadata: Metadata = {
  title: "Brand Monitoring | Marketing Hub",
  description: "Track brand mentions, sentiment, and online reputation",
}

export default function BrandMonitoringPage() {
  return <BrandMonitoringDashboard />
}
