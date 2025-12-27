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
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    pending_cancellation: "bg-orange-100 text-orange-800 border-orange-200",
    pending_reschedule: "bg-purple-100 text-purple-800 border-purple-200",
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
    upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    in_progress: "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/client/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-xl text-gray-900">My Bookings</h1>
              {clientData?.client_number && (
                <p className="text-sm text-gray-500">
                  Client ID: <span className="font-mono font-semibold">{clientData.client_number}</span>
                </p>
              )}
            </div>
          </div>
          <Link href="/client/book">
            <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
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
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#C4D600]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-7 w-7 text-[#C4D600]" />
                    </div>
                    <div>
                      <Badge variant="outline" className="font-mono text-xs mb-2">
                        <Hash className="h-3 w-3 mr-1" />
                        {booking.booking_number || "Loading..."}
                      </Badge>
                      <h3 className="font-bold text-lg text-gray-900">
                        {booking.service_category?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </h3>
                      <p className="text-gray-600">{booking.service_subcategory || "General Inquiry"}</p>
                      <p className="text-sm text-gray-500 mt-1">{booking.project_description?.slice(0, 100)}...</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
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
                        <p className="text-sm text-purple-600 mt-2">Requested new date: {booking.requested_date}</p>
                      )}
                      {booking.status === "pending_cancellation" && (
                        <p className="text-sm text-orange-600 mt-2">Cancellation requested - awaiting approval</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div>
                      <p className="text-xs text-gray-500 text-right mb-1">Booking Status</p>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${statusColors[booking.status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {statusIcons[booking.status]}
                        {statusLabels[booking.status] || booking.status}
                      </span>
                    </div>
                    {booking.status === "confirmed" && (
                      <div>
                        <p className="text-xs text-gray-500 text-right mb-1">Project Status</p>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium border ${projectStatusColors[booking.project_status || "upcoming"]}`}
                        >
                          {booking.project_status === "in_progress"
                            ? "Shooting"
                            : booking.project_status?.replace("_", " ") || "upcoming"}
                        </span>
                      </div>
                    )}
                    <Link href={`/client/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-xl text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
            <Link href="/client/book">
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
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
