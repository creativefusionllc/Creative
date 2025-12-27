import { AdminLayout } from "@/components/admin/admin-layout"
import { SchemaGenerator } from "@/components/admin/marketing/schema-generator"

export const metadata = {
  title: "Schema Generator | Admin",
  description: "Generate structured data markup for better search visibility",
}

export default function SchemaGeneratorPage() {
  return (
    <AdminLayout>
      <SchemaGenerator />
    </AdminLayout>
  )
}
