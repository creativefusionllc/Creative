"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, Clock } from "lucide-react"

interface RescheduleFormProps {
  bookingId: string
  currentDate?: string
  currentTime?: string
  currentStatus?: string
  requestedDate?: string
}

export function RescheduleForm({
  bookingId,
  currentDate,
  currentTime,
  currentStatus,
  requestedDate,
}: RescheduleFormProps) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  if (currentStatus === "pending_reschedule") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Reschedule Request Pending</p>
            <p className="text-sm text-yellow-700">
              Your request to reschedule to {requestedDate} is awaiting admin approval.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      setError("Please select a new date")
      return
    }
    setLoading(true)
    setError("")

    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        status: "pending_reschedule",
        original_date: currentDate,
        requested_date: date,
        cancellation_reason:
          reason ||
          `Reschedule requested: ${currentTime ? `${currentDate} ${currentTime}` : currentDate} → ${date} ${time || ""}`,
        modification_requested_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        router.refresh()
        setSuccess(false)
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span className="text-green-700">Reschedule request submitted! Waiting for admin approval.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm">
        <strong>Note:</strong> Reschedule requests require admin approval. Your current date ({currentDate || "Not set"}
        ) will remain until approved.
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">New Preferred Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="time">New Preferred Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason for Reschedule (Optional)</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please let us know why you need to reschedule..."
          className="mt-1"
          rows={2}
        />
      </div>

      <Button type="submit" disabled={loading || !date} className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting Request...
          </>
        ) : (
          "Request Reschedule"
        )}
      </Button>
    </form>
  )
}
