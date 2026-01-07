import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ClientsManagement } from "@/components/admin/clients-management"

export default async function AdminClientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <ClientsManagement />
    </AdminLayout>
  )
}
