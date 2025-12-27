import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientLayout } from "@/components/client/client-layout"
import { InvoicesManagement } from "@/components/client/invoices-management"
import { getOrCreateClient } from "@/lib/client-helpers"

export const metadata = {
  title: "Invoices | Creative Fusion",
  description: "View and download your invoices",
}

export default async function InvoicesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)
  const clientId = client?.id

  const { data: invoices } = clientId
    ? await supabase.from("invoices").select("*").eq("client_id", clientId).order("created_at", { ascending: false })
    : { data: [] }

  return (
    <ClientLayout
      user={{ email: user.email || "", name: client?.company_name }}
      walletBalance={client?.wallet_balance || 0}
      pointsBalance={client?.points_balance || 0}
    >
      <InvoicesManagement invoices={invoices || []} />
    </ClientLayout>
  )
}
