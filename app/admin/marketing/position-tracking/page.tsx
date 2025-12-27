import type { Metadata } from "next"
import { PositionTrackingDashboard } from "@/components/admin/marketing/position-tracking"

export const metadata: Metadata = {
  title: "Position Tracking | Marketing Hub",
  description: "Track keyword rankings and monitor position changes daily",
}

export default function PositionTrackingPage() {
  return <PositionTrackingDashboard />
}
