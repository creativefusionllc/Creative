import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "../../admin-layout"
import { AILeadScoringDashboard } from "@/components/admin/leads/ai-lead-scoring"

export default async function AILeadScoringPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <AILeadScoringDashboard />
    </AdminLayout>
  )
}
