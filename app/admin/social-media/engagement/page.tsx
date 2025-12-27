import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "../../admin-layout"
import { AIEngagement } from "@/components/admin/social-media/ai-engagement"

export default async function AIEngagementPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <AIEngagement />
    </AdminLayout>
  )
}
