import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PricingCMSBuilder } from "@/components/admin/pricing-cms-builder"

export default async function PricingCMSPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pricing & Packages CMS</h1>
        <p className="text-gray-600 mt-2">
          Advanced form builder for pricing tiers with customizable fields and dropdown/radio/checkbox options.
        </p>
      </div>
      <PricingCMSBuilder />
    </AdminLayout>
  )
}
