import { AdminLayout } from "@/components/admin/admin-layout"
import { InvoicesAdminManagement } from "@/components/admin/invoices-admin-management"

export const metadata = {
  title: "Invoices | Admin",
  description: "Manage client invoices",
}

export default function InvoicesAdminPage() {
  return (
    <AdminLayout>
      <InvoicesAdminManagement />
    </AdminLayout>
  )
}
