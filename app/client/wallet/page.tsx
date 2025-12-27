import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientLayout } from "@/components/client/client-layout"
import { WalletManagement } from "@/components/client/wallet-management"
import { getOrCreateClient } from "@/lib/client-helpers"

export const metadata = {
  title: "Wallet | Creative Fusion",
  description: "Manage your wallet balance and transactions",
}

export default async function WalletPage() {
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
        .from("wallet_transactions")
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
      <WalletManagement clientId={clientId} balance={client?.wallet_balance || 0} transactions={transactions || []} />
    </ClientLayout>
  )
}
