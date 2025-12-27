import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PortfolioManagement } from "@/components/admin/portfolio-management"

export default async function AdminPortfolioPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your portfolio projects with multiple image uploads. Support for Photography, Product Shoot, and
          Perfume categories.
        </p>
      </div>
      <PortfolioManagement />
    </AdminLayout>
  )
}
