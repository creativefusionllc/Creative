import { AdminLayout } from "@/components/admin/admin-layout"
import { TechnicalSeoAudit } from "@/components/admin/marketing/technical-seo-audit"

export const metadata = {
  title: "Technical SEO Audit | Admin",
  description: "Comprehensive technical SEO audit for crawlability, security, and performance",
}

export default function TechnicalAuditPage() {
  return (
    <AdminLayout>
      <TechnicalSeoAudit />
    </AdminLayout>
  )
}
