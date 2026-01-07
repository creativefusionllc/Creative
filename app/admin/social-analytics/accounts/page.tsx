import { AdminLayout } from "@/components/admin/admin-layout"
import { ClientSocialAccountsManagement } from "@/components/admin/social-analytics/client-accounts-management"

export default function ClientAccountsPage() {
  return (
    <AdminLayout>
      <ClientSocialAccountsManagement />
    </AdminLayout>
  )
}
