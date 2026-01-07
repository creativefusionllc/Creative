import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ReportsAnalyticsDashboard } from "@/components/admin/reports-analytics-dashboard"

export default async function ReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get date ranges
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

  // Fetch all analytics data in parallel
  const [
    // Client stats
    thisMonthClients,
    lastMonthClients,
    totalClients,
    companiesByCountry,
    // Booking stats
    thisMonthBookings,
    lastMonthBookings,
    bookingsByStatus,
    bookingsByCategory,
    // Invoice/Revenue stats
    thisMonthInvoices,
    lastMonthInvoices,
    allPaidInvoices,
    // Lead stats
    allLeads,
    thisMonthLeads,
    lastMonthLeads,
    leadsBySource,
    leadsByCountry,
    leadsByStatus,
    // Subscription stats
    activeSubscriptions,
    subscriptionPlans,
    // SEO stats
    seoKeywords,
    seoContent,
    seoBacklinks,
    // Marketing campaigns
    campaigns,
    // Recent transactions
    recentTransactions,
    // Shop and Order stats
    thisMonthShopOrders,
    totalShopOrders,
    totalShopProducts,
  ] = await Promise.all([
    // Clients
    supabase
      .from("clients")
      .select("id", { count: "exact" })
      .gte("created_at", startOfMonth),
    supabase
      .from("clients")
      .select("id", { count: "exact" })
      .gte("created_at", startOfLastMonth)
      .lt("created_at", endOfLastMonth),
    supabase.from("clients").select("id, created_at"),
    supabase.from("companies").select("country"),
    // Bookings
    supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .gte("created_at", startOfMonth),
    supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .gte("created_at", startOfLastMonth)
      .lt("created_at", endOfLastMonth),
    supabase.from("bookings").select("status"),
    supabase.from("bookings").select("service_category"),
    // Invoices
    supabase
      .from("invoices")
      .select("total_amount")
      .gte("created_at", startOfMonth)
      .eq("status", "paid"),
    supabase
      .from("invoices")
      .select("total_amount")
      .gte("created_at", startOfLastMonth)
      .lt("created_at", endOfLastMonth)
      .eq("status", "paid"),
    supabase.from("invoices").select("total_amount, status, created_at"),
    // Leads
    supabase
      .from("leads")
      .select("*"),
    supabase.from("leads").select("id", { count: "exact" }).gte("created_at", startOfMonth),
    supabase
      .from("leads")
      .select("id", { count: "exact" })
      .gte("created_at", startOfLastMonth)
      .lt("created_at", endOfLastMonth),
    supabase.from("leads").select("source"),
    supabase.from("leads").select("country"),
    supabase.from("leads").select("status"),
    // Subscriptions
    supabase
      .from("client_subscriptions")
      .select("*, subscription_plans(*)")
      .eq("status", "active"),
    supabase.from("subscription_plans").select("*").eq("is_active", true),
    // SEO
    supabase
      .from("seo_keywords")
      .select("*"),
    supabase.from("seo_ai_content").select("status"),
    supabase.from("seo_backlinks").select("id", { count: "exact" }),
    // Marketing
    supabase
      .from("marketing_campaigns")
      .select("*"),
    // Transactions
    supabase
      .from("wallet_transactions")
      .select("*, clients(name, company_name)")
      .order("created_at", { ascending: false })
      .limit(10),
    // Shop and Order stats
    supabase
      .from("shop_orders")
      .select("total_amount")
      .gte("created_at", startOfMonth),
    supabase.from("shop_orders").select("id", { count: "exact" }),
    supabase.from("shop_products").select("id", { count: "exact" }),
  ])

  // Calculate metrics
  const thisMonthRevenue = thisMonthInvoices.data?.reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0
  const lastMonthRevenue = lastMonthInvoices.data?.reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0
  const totalRevenue =
    allPaidInvoices.data?.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0

  const thisMonthShopRevenue = thisMonthShopOrders.data?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

  // Percentage changes
  const clientsChange = lastMonthClients.count
    ? (((thisMonthClients.count || 0) - lastMonthClients.count) / lastMonthClients.count) * 100
    : 0
  const bookingsChange = lastMonthBookings.count
    ? (((thisMonthBookings.count || 0) - lastMonthBookings.count) / lastMonthBookings.count) * 100
    : 0
  const revenueChange = lastMonthRevenue ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0
  const leadsChange = lastMonthLeads.count
    ? (((thisMonthLeads.count || 0) - lastMonthLeads.count) / lastMonthLeads.count) * 100
    : 0

  // Status distributions
  const bookingStatusCounts =
    bookingsByStatus.data?.reduce(
      (acc, b) => {
        acc[b.status] = (acc[b.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const leadStatusCounts =
    leadsByStatus.data?.reduce(
      (acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const leadSourceCounts =
    leadsBySource.data?.reduce(
      (acc, l) => {
        acc[l.source || "unknown"] = (acc[l.source || "unknown"] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const clientCountryCounts =
    companiesByCountry.data?.reduce(
      (acc, c) => {
        acc[c.country || "Unknown"] = (acc[c.country || "Unknown"] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const leadCountryCounts =
    leadsByCountry.data?.reduce(
      (acc, l) => {
        acc[l.country || "Unknown"] = (acc[l.country || "Unknown"] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const categoryData =
    bookingsByCategory.data?.reduce(
      (acc, b) => {
        const cat = b.service_category || "Other"
        if (!acc[cat]) acc[cat] = { count: 0, revenue: 0 }
        acc[cat].count += 1
        return acc
      },
      {} as Record<string, { count: number; revenue: number }>,
    ) || {}

  // SEO metrics
  const topKeywords =
    seoKeywords.data
      ?.filter((k) => k.current_position)
      .sort((a, b) => (a.current_position || 100) - (b.current_position || 100))
      .slice(0, 5) || []
  const contentStats =
    seoContent.data?.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Subscription revenue
  const monthlySubscriptionRevenue =
    activeSubscriptions.data?.reduce((sum, sub: any) => {
      const plan = sub.subscription_plans
      if (plan && sub.billing_cycle === "monthly") return sum + (plan.price_monthly || 0)
      if (plan && sub.billing_cycle === "yearly") return sum + (plan.price_yearly || 0) / 12
      return sum
    }, 0) || 0

  // Campaign metrics
  const campaignStats =
    campaigns.data?.reduce(
      (acc, c: any) => {
        acc.totalBudget += c.budget || 0
        acc.totalSpent += c.spent || 0
        acc.totalImpressions += c.impressions || 0
        acc.totalClicks += c.clicks || 0
        acc.totalConversions += c.conversions || 0
        return acc
      },
      { totalBudget: 0, totalSpent: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0 },
    ) || {}

  // Lead conversion rate
  const convertedLeads = allLeads.data?.filter((l: any) => l.status === "converted").length || 0
  const totalLeadsCount = allLeads.data?.length || 0
  const conversionRate = totalLeadsCount > 0 ? (convertedLeads / totalLeadsCount) * 100 : 0

  const analyticsData = {
    // Overview
    thisMonthClients: thisMonthClients.count || 0,
    totalClients: totalClients.data?.length || 0,
    clientsChange,
    thisMonthBookings: thisMonthBookings.count || 0,
    bookingsChange,
    thisMonthRevenue,
    totalRevenue,
    revenueChange,
    // Leads
    thisMonthLeads: thisMonthLeads.count || 0,
    totalLeads: totalLeadsCount,
    leadsChange,
    conversionRate,
    leadStatusCounts,
    leadSourceCounts,
    leadCountryCounts,
    // Shop and Order stats
    shopRevenue: thisMonthShopRevenue,
    thisMonthShopRevenue: thisMonthShopRevenue,
    totalOrders: totalShopOrders.count || 0,
    totalProducts: totalShopProducts.count || 0,
    // Subscriptions
    activeSubscriptions: activeSubscriptions.data?.length || 0,
    monthlySubscriptionRevenue,
    totalPlans: subscriptionPlans.data?.length || 0,
    // SEO
    totalKeywords: seoKeywords.data?.length || 0,
    topKeywords,
    totalBacklinks: seoBacklinks.count || 0,
    contentStats,
    // Marketing
    totalCampaigns: campaigns.data?.length || 0,
    campaignStats,
    // Distributions
    bookingStatusCounts,
    categoryData,
    clientCountryCounts,
    // Recent
    recentTransactions: recentTransactions.data || [],
  }

  return (
    <AdminLayout>
      <ReportsAnalyticsDashboard data={analyticsData} />
    </AdminLayout>
  )
}
