import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "../../admin-layout"
import { AIScheduler } from "@/components/admin/social-media/ai-scheduler"

export default async function AISchedulerPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <AdminLayout>
      <AIScheduler />
    </AdminLayout>
  )
}
