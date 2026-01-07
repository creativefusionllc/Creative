import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "../../admin-layout"
import { AILeadNurturing } from "@/components/admin/leads/ai-lead-nurturing"

export default async function AILeadNurturingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <AILeadNurturing />
    </AdminLayout>
  )
}
