import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  Users,
  Calendar,
  FileText,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Gift,
} from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const isAdmin = user.user_metadata?.role === "admin" || user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect("/login")
  }

  // Fetch all stats in parallel
  const [
    servicesRes,
    portfolioRes,
    bookingsRes,
    packagesRes,
    clientsRes,
    invoicesRes,
    pendingPaymentsRes,
    recentBookingsRes,
    pendingBookingsRes,
  ] = await Promise.all([
    supabase.from("services").select("id", { count: "exact" }),
    supabase.from("portfolio").select("id", { count: "exact" }),
    supabase.from("bookings").select("id", { count: "exact" }),
    supabase.from("packages").select("id", { count: "exact" }),
    supabase.from("clients").select("id", { count: "exact" }),
    supabase.from("invoices").select("id, status", { count: "exact" }),
    supabase
      .from("wallet_transactions")
      .select("id", { count: "exact" })
      .eq("verification_status", "pending_verification"),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
    supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .in("status", ["pending", "pending_cancellation", "pending_reschedule"]),
  ])

  // Financial stats
  const { data: totalLiabilityData } = await supabase.from("clients").select("wallet_balance, points_balance")
  const { data: invoiceStats } = await supabase.from("invoices").select("total_amount, status")
  const { data: thisMonthBookings } = await supabase
    .from("bookings")
    .select("id", { count: "exact" })
    .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

  const totalWalletBalance = totalLiabilityData?.reduce((sum, client) => sum + (client.wallet_balance || 0), 0) || 0
  const totalPointsBalance = totalLiabilityData?.reduce((sum, client) => sum + (client.points_balance || 0), 0) || 0
  const totalPaidInvoices =
    invoiceStats?.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0
  const totalUnpaidInvoices =
    invoiceStats?.filter((i) => i.status !== "paid").reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0

  const statusColors: Record<string, string> = {
    pending: "text-yellow-500 bg-yellow-500/10",
    confirmed: "text-green-500 bg-green-500/10",
    cancelled: "text-red-500 bg-red-500/10",
    pending_cancellation: "text-orange-500 bg-orange-500/10",
    pending_reschedule: "text-blue-500 bg-blue-500/10",
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-300">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Alert Banner for Pending Actions */}
      {((pendingBookingsRes.count || 0) > 0 || (pendingPaymentsRes.count || 0) > 0) && (
        <div className="bg-[#C4D600]/10 border border-[#C4D600]/30 rounded-xl p-4 mb-6 flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-[#C4D600]" />
          <div className="flex-1">
            <p className="text-white font-medium">Action Required</p>
            <p className="text-sm text-gray-300">
              {pendingBookingsRes.count || 0} booking(s) and {pendingPaymentsRes.count || 0} payment(s) pending approval
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/bookings"
              className="px-4 py-2 bg-[#C4D600] text-black rounded-lg text-sm font-medium hover:bg-[#a8b800] transition-colors"
            >
              View Bookings
            </Link>
            <Link
              href="/admin/payments"
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              View Payments
            </Link>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{clientsRes.count || 0}</p>
          <p className="text-sm text-gray-300">Total Clients</p>
        </div>

        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />+{thisMonthBookings?.count || 0} this month
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{bookingsRes.count || 0}</p>
          <p className="text-sm text-gray-300">Total Bookings</p>
        </div>

        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">AED {totalPaidInvoices.toLocaleString()}</p>
          <p className="text-sm text-gray-300">Revenue (Paid)</p>
        </div>

        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">AED {totalUnpaidInvoices.toLocaleString()}</p>
          <p className="text-sm text-gray-300">Outstanding</p>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold text-white">Wallet Liability</h2>
            <p className="text-sm text-gray-300">Total funds held in client wallets</p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Wallet className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">AED {totalWalletBalance.toFixed(2)}</p>
                <p className="text-sm text-gray-300">Total wallet liability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold text-white">Points Liability</h2>
            <p className="text-sm text-gray-300">Unredeemed Creative Points</p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{totalPointsBalance.toLocaleString()}</p>
                <p className="text-sm text-gray-300">Points in circulation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent Bookings</h2>
              <p className="text-sm text-gray-300">Latest booking requests</p>
            </div>
            <Link href="/admin/bookings" className="text-sm text-[#C4D600] hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-white/10">
            {recentBookingsRes.data && recentBookingsRes.data.length > 0 ? (
              recentBookingsRes.data.map((booking) => (
                <div key={booking.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{booking.name}</p>
                    <p className="text-sm text-gray-300">
                      {booking.service_category
                        ? booking.service_category.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
                        : "Unknown Service"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || "text-gray-300 bg-gray-300/10"}`}
                    >
                      {booking.status?.replace(/_/g, " ")}
                    </span>
                    <p className="text-xs text-gray-300 mt-1">{new Date(booking.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Calendar className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300">No recent bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-[#141414] rounded-xl border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-yellow-500" />
              <h3 className="font-medium text-white">Pending Actions</h3>
            </div>
            <div className="space-y-3">
              <Link
                href="/admin/bookings"
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-sm text-gray-300">Pending Bookings</span>
                <span className="text-sm font-medium text-white">{pendingBookingsRes.count || 0}</span>
              </Link>
              <Link
                href="/admin/payments"
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-sm text-gray-300">Payment Verifications</span>
                <span className="text-sm font-medium text-white">{pendingPaymentsRes.count || 0}</span>
              </Link>
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h3 className="font-medium text-white">Content Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Services</span>
                <span className="text-sm font-medium text-white">{servicesRes.count || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Portfolio Items</span>
                <span className="text-sm font-medium text-white">{portfolioRes.count || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Packages</span>
                <span className="text-sm font-medium text-white">{packagesRes.count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
