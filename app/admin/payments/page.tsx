import { PaymentVerifications } from "@/components/admin/payment-verifications"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminPaymentsPage() {
  return (
    <AdminLayout>
      <PaymentVerifications />
    </AdminLayout>
  )
}
