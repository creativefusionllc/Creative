"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { SeoCmsManagement } from "@/components/admin/seo-cms-management"

export default function SeoPage() {
  return (
    <AdminLayout>
      <SeoCmsManagement />
    </AdminLayout>
  )
}
