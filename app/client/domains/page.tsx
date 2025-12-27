import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientDomainsPage } from "@/components/client/domains/client-domains-page"

export const metadata: Metadata = {
  title: "My Domains | Creative Fusion",
  description: "Manage your domain names, DNS settings, and renewals",
}

export default async function DomainsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: client } = await supabase.from("clients").select("id").eq("user_id", user.id).single()

  if (!client) redirect("/login")

  const { data: domains } = await supabase
    .from("client_domains")
    .select(`
      *,
      tld:domain_tlds(extension, renewal_price)
    `)
    .eq("client_id", client.id)
    .order("expiry_date", { ascending: true })

  return <ClientDomainsPage domains={domains || []} clientId={client.id} />
}
