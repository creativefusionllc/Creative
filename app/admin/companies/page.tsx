import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CompaniesManagement } from "@/components/admin/companies-management"

export default async function CompaniesManagementPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <CompaniesManagement />
    </AdminLayout>
  )
}
