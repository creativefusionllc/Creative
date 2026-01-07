import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PackagesManagement } from "@/components/admin/packages-management"

export default async function PackagesManagementPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pricing Packages</h1>
        <p className="text-gray-600 mt-2">Create and manage pricing packages for each service category.</p>
      </div>
      <PackagesManagement />
    </AdminLayout>
  )
}
