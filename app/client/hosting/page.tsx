import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientHostingPage } from "@/components/client/hosting/client-hosting-page"

export const metadata: Metadata = {
  title: "My Hosting | Creative Fusion",
  description: "Manage your web hosting, servers, and SSL certificates",
}

export default async function HostingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: client } = await supabase.from("clients").select("id").eq("user_id", user.id).single()

  if (!client) redirect("/login")

  const [hostingResult, sslResult, emailResult] = await Promise.all([
    supabase
      .from("client_hosting")
      .select(`*, plan:hosting_plans(name, category), domain:client_domains(domain_name)`)
      .eq("client_id", client.id),
    supabase
      .from("client_ssl")
      .select(`*, certificate:ssl_certificates(name, provider), domain:client_domains(domain_name)`)
      .eq("client_id", client.id),
    supabase
      .from("client_email_hosting")
      .select(`*, plan:email_hosting_plans(name, provider), domain:client_domains(domain_name)`)
      .eq("client_id", client.id),
  ])

  return (
    <ClientHostingPage
      hosting={hostingResult.data || []}
      ssl={sslResult.data || []}
      email={emailResult.data || []}
      clientId={client.id}
    />
  )
}
