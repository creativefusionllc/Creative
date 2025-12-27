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

  // Verify ownership
  if (booking.user_id !== user.id && booking.email !== user.email) {
    redirect("/client/dashboard")
  }

  // Get client ID for cancel booking
  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
    pending_cancellation: "bg-orange-100 text-orange-800",
    pending_reschedule: "bg-purple-100 text-purple-800",
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/client/bookings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C4D600] to-[#a8b800] p-6 text-black">
            <div className="flex items-center justify-between">
              <div>
                {booking.booking_number && (
                  <p className="text-sm font-mono opacity-80 flex items-center gap-1 mb-1">
                    <Hash className="h-3 w-3" />
                    {booking.booking_number}
                  </p>
                )}
                <h1 className="text-2xl font-bold">
                  {booking.service_category?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </h1>
                <p className="opacity-80">{booking.service_subcategory || "General Inquiry"}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${statusColors[booking.status]}`}>
                {statusLabels[booking.status] || booking.status?.toUpperCase()}
              </span>
            </div>
          </div>

          {(booking.status === "pending_cancellation" || booking.status === "pending_reschedule") && (
            <div
              className={`p-4 ${booking.status === "pending_cancellation" ? "bg-orange-50 border-b border-orange-200" : "bg-purple-50 border-b border-purple-200"}`}
            >
              <p
                className={`font-medium ${booking.status === "pending_cancellation" ? "text-orange-800" : "text-purple-800"}`}
              >
                {booking.status === "pending_cancellation"
                  ? "Cancellation request submitted - awaiting admin approval"
                  : `Reschedule request to ${booking.requested_date} - awaiting admin approval`}
              </p>
              {booking.cancellation_reason && (
                <p
                  className={`text-sm mt-1 ${booking.status === "pending_cancellation" ? "text-orange-700" : "text-purple-700"}`}
                >
                  Reason: {booking.cancellation_reason}
                </p>
              )}
              <p className="text-xs mt-2 opacity-70">
                Requested: {new Date(booking.modification_requested_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Booking Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#C4D600]" />
                  Project Details
                </h3>
                <p className="text-gray-600">{booking.project_description || "No description provided"}</p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    Budget: {booking.budget_range || "Not specified"}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">Timeline: {booking.timeline || "Flexible"}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#C4D600]" />
                  Schedule
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    Created: {new Date(booking.created_at).toLocaleString()}
                  </p>
                  {booking.scheduled_date && (
                    <p className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="h-4 w-4" />
                      Scheduled: {booking.scheduled_date} {booking.scheduled_time && `at ${booking.scheduled_time}`}
                    </p>
                  )}
                  {booking.status === "pending_reschedule" && booking.original_date && (
                    <p className="flex items-center gap-2 text-purple-700 text-sm">
                      <Calendar className="h-4 w-4" />
                      Original Date: {booking.original_date}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-[#C4D600]" />
                  {booking.email}
                </div>
                {booking.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-5 w-5 text-[#C4D600]" />
                    {booking.phone}
                  </div>
                )}
                {booking.company_name && (
                  <div className="flex items-center gap-3 text-gray-600">
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
                  <div className="border-t pt-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
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

                  <div className="border-t pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Cancel Booking</h3>
                    <p className="text-gray-600 mb-4">
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
