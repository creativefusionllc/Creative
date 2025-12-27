"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { createClient } from "@/lib/supabase/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

export function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [cmsSettings, setCmsSettings] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [declineDialog, setDeclineDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [declineReason, setDeclineReason] = useState("")
  const [deleteDialog, setDeleteDialog] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchBookings()
    fetchClients()
    fetchCMSSettings()
  }, [])

  async function fetchBookings() {
    try {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

      if (!error && data) {
        setBookings(data)
        console.log("[v0] Bookings fetched:", data.length)
      }
    } catch (error) {
      console.error("[v0] Error fetching bookings:", error)
    }
  }

  async function fetchClients() {
    try {
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

      if (!error && data) {
        setClients(data)
        console.log("[v0] Clients fetched:", data.length)
      }
    } catch (error) {
      console.error("[v0] Error fetching clients:", error)
    }
  }

  async function fetchCMSSettings() {
    try {
      const response = await fetch("/api/admin/cms-settings")
      if (response.ok) {
        const data = await response.json()
        setCmsSettings(data)
        console.log("[v0] CMS settings loaded")
      }
    } catch (error) {
      console.error("[v0] Failed to fetch CMS settings:", error)
    }
  }

  async function handleConfirmBooking(bookingId: string) {
    try {
      setSubmitting(true)
      const response = await fetch("/api/bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to confirm booking")
      }

      const result = await response.json()

      if (result.walletDeducted) {
        toast.success(`✓ Booking confirmed! Invoice ${result.invoice.invoice_number} created and paid from wallet`)
      } else {
        toast.warning(`✓ Booking confirmed! Invoice ${result.invoice.invoice_number} created (awaiting payment)`)
      }

      await fetchBookings()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to confirm booking")
      console.error("[v0] Error confirming booking:", error)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleCompleteBooking(bookingId: string) {
    try {
      setSubmitting(true)
      const response = await fetch("/api/bookings/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      })

      if (!response.ok) throw new Error("Failed to complete booking")

      const result = await response.json()
      toast.success(`✓ Booking completed! ${result.pointsEarned} points awarded to client`)

      await fetchBookings()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to complete booking")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeclineBooking() {
    if (!selectedBooking) return

    try {
      setSubmitting(true)
      const response = await fetch("/api/bookings/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          reason: declineReason,
        }),
      })

      if (!response.ok) throw new Error("Failed to decline booking")

      toast.success("✓ Booking declined. " + (selectedBooking.status === "confirmed" ? "Refund processed." : ""))

      setDeclineDialog(false)
      setDeclineReason("")
      setSelectedBooking(null)
      await fetchBookings()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to decline booking")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteBooking() {
    if (!selectedBooking) return

    try {
      setSubmitting(true)
      const response = await fetch("/api/bookings/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: selectedBooking.id }),
      })

      if (!response.ok) throw new Error("Failed to delete booking")

      toast.success("✓ Booking deleted permanently")

      setDeleteDialog(false)
      setSelectedBooking(null)
      await fetchBookings()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete booking")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Booking Management</h1>
        <p className="text-gray-400">Manage all client bookings and confirmations</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/10 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold text-[#C4D600]">{bookings.length}</p>
        </div>
        <div className="bg-[#141414] border border-white/10 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">{bookings.filter((b) => b.status === "pending").length}</p>
        </div>
        <div className="bg-[#141414] border border-white/10 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-green-500">{bookings.filter((b) => b.status === "confirmed").length}</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300">Client Name</th>
                <th className="px-4 py-3 text-left text-gray-300">Service</th>
                <th className="px-4 py-3 text-left text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-gray-300">Budget</th>
                <th className="px-4 py-3 text-left text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3 text-gray-300">{booking.name}</td>
                  <td className="px-4 py-3 text-gray-300">{booking.service_category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : booking.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : booking.status === "cancelled"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{booking.budget_range || "N/A"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            disabled={submitting}
                            className="px-3 py-1 bg-[#C4D600] text-black rounded text-xs font-semibold hover:bg-[#d4e600] disabled:opacity-50"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking)
                              setDeclineDialog(true)
                            }}
                            disabled={submitting}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <>
                          <button
                            onClick={() => handleCompleteBooking(booking.id)}
                            disabled={submitting}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking)
                              setDeclineDialog(true)
                            }}
                            disabled={submitting}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedBooking(booking)
                          setDeleteDialog(true)
                        }}
                        disabled={submitting}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-semibold hover:bg-gray-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={declineDialog} onOpenChange={setDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedBooking?.status === "confirmed"
                ? "Refund will be processed to client's wallet."
                : "Client will be notified about the decline."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Reason for declining (optional)"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            rows={3}
          />
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeclineBooking}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              Decline
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the booking. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBooking}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
