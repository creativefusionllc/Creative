import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientLayout } from "@/components/client/client-layout"
import { PointsManagement } from "@/components/client/points-management"
import { getOrCreateClient } from "@/lib/client-helpers"

export const metadata = {
  title: "Points & Rewards | Creative Fusion",
  description: "View and redeem your loyalty points",
}

export default async function PointsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)
  const clientId = client?.id

  const { data: transactions } = clientId
    ? await supabase
        .from("points_transactions")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
    : { data: [] }

  return (
    <ClientLayout
      user={{ email: user.email || "", name: client?.company_name }}
      walletBalance={client?.wallet_balance || 0}
      pointsBalance={client?.points_balance || 0}
    >
      <PointsManagement clientId={clientId} balance={client?.points_balance || 0} transactions={transactions || []} />
    </ClientLayout>
  )
}
