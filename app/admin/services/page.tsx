import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ServicesManagement } from "@/components/admin/services-management"

export default async function AdminServicesPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
        <p className="text-gray-600 mt-2">
          Add, edit, or delete service categories. All changes sync with your website.
        </p>
      </div>
      <ServicesManagement />
    </AdminLayout>
  )
}
