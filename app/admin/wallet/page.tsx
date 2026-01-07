import { AdminLayout } from "@/components/admin/admin-layout"
import { WalletAdminManagement } from "@/components/admin/wallet-admin-management"

export const metadata = {
  title: "Wallet & Payments | Admin",
  description: "Manage wallet transactions and payments",
}

export default function WalletAdminPage() {
  return (
    <AdminLayout>
      <WalletAdminManagement />
    </AdminLayout>
  )
}
