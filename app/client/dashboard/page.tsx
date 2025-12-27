import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ClientLayout } from "@/components/client/client-layout"
import { Calendar, Plus, Wallet, Gift, FileText, ArrowRight, CalendarDays, Clock } from "lucide-react"
import { getOrCreateClient } from "@/lib/client-helpers"

export default async function ClientDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)
  const clientId = client?.id

  // Fetch client's bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .or(`user_id.eq.${user.id},email.eq.${user.email}`)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: invoices } = clientId
    ? await supabase.from("invoices").select("*").eq("client_id", clientId).in("status", ["sent", "overdue"]).limit(3)
    : { data: [] }

  const { data: calendarItems } = clientId
    ? await supabase
        .from("social_media_calendar")
        .select("*")
        .eq("client_id", clientId)
        .eq("is_visible_to_client", true)
        .gte("scheduled_date", new Date().toISOString().split("T")[0])
        .order("scheduled_date", { ascending: true })
        .limit(3)
    : { data: [] }

  // Pending payments
  const { data: pendingPayments } = clientId
    ? await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("client_id", clientId)
        .eq("verification_status", "pending_verification")
    : { data: [] }

  const statusColors: Record<string, string> = {
    pending: "text-yellow-500 bg-yellow-500/10",
    confirmed: "text-green-500 bg-green-500/10",
    "in-progress": "text-blue-500 bg-blue-500/10",
    completed: "text-gray-400 bg-gray-400/10",
    cancelled: "text-red-500 bg-red-500/10",
    pending_cancellation: "text-orange-500 bg-orange-500/10",
    pending_reschedule: "text-purple-500 bg-purple-500/10",
  }

  const walletBalance = client?.wallet_balance || 0
  const pointsBalance = client?.points_balance || 0
  const activeBookings = bookings?.filter((b) => ["pending", "confirmed", "in-progress"].includes(b.status)).length || 0

  return (
    <ClientLayout
      user={{ email: user.email || "", name: client?.company_name }}
      walletBalance={walletBalance}
      pointsBalance={pointsBalance}
    >
      <div className="p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Welcome back, {client?.company_name || client?.name || "Client"}!
          </h1>
          <p className="text-gray-300">Here's an overview of your account activity.</p>
        </div>

        {/* Pending Payments Alert */}
        {pendingPayments && pendingPayments.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center gap-4">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <p className="text-white font-medium">Pending Payment Verification</p>
              <p className="text-sm text-gray-300">{pendingPayments.length} payment(s) waiting for admin approval</p>
            </div>
            <Link
              href="/client/wallet"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
            >
              View Details
            </Link>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">Wallet Balance</p>
            <p className="text-2xl font-bold text-white">AED {Number(walletBalance).toFixed(2)}</p>
          </div>

          <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Gift className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">Points Balance</p>
            <p className="text-2xl font-bold text-white">{Number(pointsBalance).toLocaleString()}</p>
          </div>

          <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">Active Bookings</p>
            <p className="text-2xl font-bold text-white">{activeBookings}</p>
          </div>

          <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">Pending Invoices</p>
            <p className="text-2xl font-bold text-white">{invoices?.length || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/client/book"
            className="bg-[#C4D600] hover:bg-[#a8b800] text-[#0a0a0a] p-6 rounded-xl transition-colors flex items-center justify-between group"
          >
            <div>
              <Plus className="h-8 w-8 mb-3" />
              <h3 className="font-bold text-lg">New Booking</h3>
              <p className="text-sm opacity-80">Book a service</p>
            </div>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/client/wallet"
            className="bg-[#141414] hover:bg-white/10 border border-white/10 p-6 rounded-xl transition-colors flex items-center justify-between group"
          >
            <div>
              <Wallet className="h-8 w-8 mb-3 text-[#C4D600]" />
              <h3 className="font-bold text-lg text-white">Add Funds</h3>
              <p className="text-sm text-gray-300">Top up wallet</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/client/points"
            className="bg-[#141414] hover:bg-white/10 border border-white/10 p-6 rounded-xl transition-colors flex items-center justify-between group"
          >
            <div>
              <Gift className="h-8 w-8 mb-3 text-[#C4D600]" />
              <h3 className="font-bold text-lg text-white">Redeem Points</h3>
              <p className="text-sm text-gray-300">{pointsBalance} pts available</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold text-white">Recent Bookings</h2>
              <Link href="/client/bookings" className="text-sm text-[#C4D600] hover:underline">
                View All
              </Link>
            </div>

            {bookings && bookings.length > 0 ? (
              <div className="divide-y divide-white/10">
                {bookings.slice(0, 3).map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/client/bookings/${booking.id}`}
                    className="p-4 hover:bg-white/5 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-sm">
                          {booking.service_category
                            ?.replace(/-/g, " ")
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </h3>
                        <p className="text-xs text-gray-300">{new Date(booking.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                      {booking.status?.replace(/_/g, " ")}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Calendar className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">No bookings yet</p>
              </div>
            )}
          </div>

          {/* Upcoming Social Media Posts */}
          <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold text-white">Upcoming Posts</h2>
              <Link href="/client/calendar" className="text-sm text-[#C4D600] hover:underline">
                View Calendar
              </Link>
            </div>

            {calendarItems && calendarItems.length > 0 ? (
              <div className="divide-y divide-white/10">
                {calendarItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <CalendarDays className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-300">
                        {item.platform} • {new Date(item.scheduled_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full">
                      {item.content_type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <CalendarDays className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">No upcoming posts scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
