import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function SpecialOffersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Special Offers Management</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            Manage special offers by going to <strong>Pricing Packages</strong> and marking packages as "Special Offer".
          </p>
          <Link href="/admin/packages">
            <Button className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">Go to Pricing Packages</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
