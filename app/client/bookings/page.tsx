import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, ArrowLeft, Eye, Hash, CheckCircle, AlertCircle, XCircle, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function ClientBookingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client/login")
  }

  const { data: clientData } = await supabase
    .from("clients")
    .select("client_number, referral_code")
    .eq("user_id", user.id)
    .single()

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .or(`user_id.eq.${user.id},email.eq.${user.email}`)
    .order("scheduled_date", { ascending: false })

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500 text-white",
    confirmed: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
    pending_cancellation: "bg-orange-500 text-white",
    pending_reschedule: "bg-purple-500 text-white",
  }

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <AlertCircle className="h-3 w-3" />,
    confirmed: <CheckCircle className="h-3 w-3" />,
    cancelled: <XCircle className="h-3 w-3" />,
    pending_cancellation: <XCircle className="h-3 w-3" />,
    pending_reschedule: <RefreshCw className="h-3 w-3" />,
  }

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    pending_cancellation: "Cancellation Pending",
    pending_reschedule: "Reschedule Pending",
  }

  const projectStatusColors: Record<string, string> = {
    upcoming: "bg-blue-500 text-white",
    in_progress: "bg-indigo-500 text-white",
    completed: "bg-gray-600 text-white",
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/client/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-xl text-white">My Bookings</h1>
              {clientData?.client_number && (
                <p className="text-sm text-gray-400">
                  Client ID: <span className="font-mono font-semibold text-[#C4D600]">{clientData.client_number}</span>
                </p>
              )}
            </div>
          </div>
          <Link href="/client/book">
            <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings && bookings.length > 0 ? (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#141414] rounded-xl border border-white/10 p-6 hover:border-[#C4D600]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#C4D600]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#C4D600]/20">
                      <Calendar className="h-7 w-7 text-[#C4D600]" />
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs mb-2 bg-white/5 border-white/10 text-[#C4D600]"
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {booking.booking_number || "Loading..."}
                      </Badge>
                      <h3 className="font-bold text-lg text-white">
                        {booking.service_category?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </h3>
                      <p className="text-gray-300">{booking.service_subcategory || "General Inquiry"}</p>
                      <p className="text-sm text-gray-400 mt-1">{booking.project_description?.slice(0, 100)}...</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Created: {new Date(booking.created_at).toLocaleDateString()}
                        </span>
                        {booking.scheduled_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Scheduled: {booking.scheduled_date}
                          </span>
                        )}
                      </div>
                      {booking.status === "pending_reschedule" && booking.requested_date && (
                        <p className="text-sm text-purple-400 mt-2">Requested new date: {booking.requested_date}</p>
                      )}
                      {booking.status === "pending_cancellation" && (
                        <p className="text-sm text-orange-400 mt-2">Cancellation requested - awaiting approval</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div>
                      <p className="text-xs text-gray-400 text-right mb-1">Booking Status</p>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[booking.status] || "bg-gray-600 text-white"}`}
                      >
                        {statusIcons[booking.status]}
                        {statusLabels[booking.status] || booking.status}
                      </span>
                    </div>
                    {booking.status === "confirmed" && (
                      <div>
                        <p className="text-xs text-gray-400 text-right mb-1">Project Status</p>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${projectStatusColors[booking.project_status || "upcoming"]}`}
                        >
                          {booking.project_status === "in_progress"
                            ? "Shooting"
                            : booking.project_status?.replace("_", " ") || "upcoming"}
                        </span>
                      </div>
                    )}
                    <Link href={`/client/bookings/${booking.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141414] rounded-xl border border-white/10 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl text-white mb-2">No bookings found</h3>
            <p className="text-gray-400 mb-6">You haven't made any bookings yet.</p>
            <Link href="/client/book">
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Booking
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
