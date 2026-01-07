import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { AdminHostingDashboard } from "@/components/admin/hosting/admin-hosting-dashboard"

export const metadata: Metadata = {
  title: "Hosting Management | Admin",
  description: "Manage domain and hosting services",
}

export default async function AdminHostingPage() {
  const supabase = await createClient()

  const [tlds, hostingPlans, sslCerts, emailPlans, recentOrders, stats] = await Promise.all([
    supabase.from("domain_tlds").select("*").order("sort_order"),
    supabase.from("hosting_plans").select("*").order("sort_order"),
    supabase.from("ssl_certificates").select("*").order("sort_order"),
    supabase.from("email_hosting_plans").select("*").order("sort_order"),
    supabase
      .from("hosting_orders")
      .select("*, client:clients(name, email)")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("client_domains").select("id", { count: "exact" }),
  ])

  return (
    <AdminHostingDashboard
      tlds={tlds.data || []}
      hostingPlans={hostingPlans.data || []}
      sslCerts={sslCerts.data || []}
      emailPlans={emailPlans.data || []}
      recentOrders={recentOrders.data || []}
      totalDomains={stats.count || 0}
    />
  )
}
