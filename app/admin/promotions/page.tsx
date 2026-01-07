import { AdminLayout } from "@/components/admin/admin-layout"
import { PromotionsManagement } from "@/components/admin/promotions-management"

export const metadata = {
  title: "Promotions | Admin",
  description: "Manage promotions and discount codes",
}

export default function PromotionsPage() {
  return (
    <AdminLayout>
      <PromotionsManagement />
    </AdminLayout>
  )
}
