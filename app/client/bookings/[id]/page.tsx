import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Building2, Mail, Phone, FileText, Edit, Hash } from "lucide-react"
import { RescheduleForm } from "@/components/client/reschedule-form"
import { CancelBookingButton } from "@/components/client/cancel-booking-button"
import { getOrCreateClient } from "@/lib/client-helpers"

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client/login")
  }

  const { data: booking } = await supabase.from("bookings").select("*").eq("id", id).single()

  if (!booking) {
    notFound()
  }

  if (booking.user_id !== user.id && booking.email !== user.email) {
    redirect("/client/dashboard")
  }

  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500 text-white",
    confirmed: "bg-green-500 text-white",
    "in-progress": "bg-blue-500 text-white",
    completed: "bg-gray-600 text-white",
    cancelled: "bg-red-500 text-white",
    pending_cancellation: "bg-orange-500 text-white",
    pending_reschedule: "bg-purple-500 text-white",
  }

  const statusLabels: Record<string, string> = {
    pending: "PENDING",
    confirmed: "CONFIRMED",
    "in-progress": "IN PROGRESS",
    completed: "COMPLETED",
    cancelled: "CANCELLED",
    pending_cancellation: "CANCELLATION PENDING",
    pending_reschedule: "RESCHEDULE PENDING",
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/client/bookings">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#141414] rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#C4D600] p-6 text-black">
            <div className="flex items-center justify-between">
              <div>
                {booking.booking_number && (
                  <p className="text-sm font-mono opacity-70 flex items-center gap-1 mb-1">
                    <Hash className="h-3 w-3" />
                    {booking.booking_number}
                  </p>
                )}
                <h1 className="text-2xl font-bold">
                  {booking.service_category?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </h1>
                <p className="opacity-70">{booking.service_subcategory || "General Inquiry"}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-black/20`}>
                {statusLabels[booking.status] || booking.status?.toUpperCase()}
              </span>
            </div>
          </div>

          {(booking.status === "pending_cancellation" || booking.status === "pending_reschedule") && (
            <div
              className={`p-4 ${booking.status === "pending_cancellation" ? "bg-orange-500/10 border-b border-orange-500/30" : "bg-purple-500/10 border-b border-purple-500/30"}`}
            >
              <p
                className={`font-medium ${booking.status === "pending_cancellation" ? "text-orange-300" : "text-purple-300"}`}
              >
                {booking.status === "pending_cancellation"
                  ? "Cancellation request submitted - awaiting admin approval"
                  : `Reschedule request to ${booking.requested_date} - awaiting admin approval`}
              </p>
              {booking.cancellation_reason && (
                <p
                  className={`text-sm mt-1 ${booking.status === "pending_cancellation" ? "text-orange-200" : "text-purple-200"}`}
                >
                  Reason: {booking.cancellation_reason}
                </p>
              )}
              <p className="text-xs mt-2 text-gray-400">
                Requested: {new Date(booking.modification_requested_at).toLocaleString()}
              </p>
            </div>
          )}

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#C4D600]" />
                  Project Details
                </h3>
                <p className="text-gray-300">{booking.project_description || "No description provided"}</p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                    Budget: {booking.budget_range || "Not specified"}
                  </span>
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                    Timeline: {booking.timeline || "Flexible"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#C4D600]" />
                  Schedule
                </h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-2 border border-white/10">
                  <p className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4" />
                    Created: {new Date(booking.created_at).toLocaleString()}
                  </p>
                  {booking.scheduled_date && (
                    <p className="flex items-center gap-2 text-white font-medium">
                      <Calendar className="h-4 w-4" />
                      Scheduled: {booking.scheduled_date} {booking.scheduled_time && `at ${booking.scheduled_time}`}
                    </p>
                  )}
                  {booking.status === "pending_reschedule" && booking.original_date && (
                    <p className="flex items-center gap-2 text-purple-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      Original Date: {booking.original_date}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-bold text-white mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-[#C4D600]" />
                  {booking.email}
                </div>
                {booking.phone && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-5 w-5 text-[#C4D600]" />
                    {booking.phone}
                  </div>
                )}
                {booking.company_name && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Building2 className="h-5 w-5 text-[#C4D600]" />
                    {booking.company_name}
                  </div>
                )}
              </div>
            </div>

            {booking.status !== "completed" &&
              booking.status !== "cancelled" &&
              booking.status !== "pending_cancellation" && (
                <>
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                      <Edit className="h-5 w-5 text-[#C4D600]" />
                      Reschedule Appointment
                    </h3>
                    <RescheduleForm
                      bookingId={booking.id}
                      currentDate={booking.scheduled_date}
                      currentTime={booking.scheduled_time}
                      currentStatus={booking.status}
                      requestedDate={booking.requested_date}
                    />
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="font-bold text-white mb-4">Cancel Booking</h3>
                    <p className="text-gray-300 mb-4">
                      Need to cancel this booking? Submit a cancellation request for admin approval. If approved and
                      you've already paid, your money will be refunded to your wallet balance.
                    </p>
                    <CancelBookingButton
                      bookingId={booking.id}
                      clientId={client?.id || ""}
                      currentStatus={booking.status}
                      cancellationReason={booking.cancellation_reason}
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </main>
    </div>
  )
}
