"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { XCircle, Loader2, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface CancelBookingButtonProps {
  bookingId: string
  clientId: string
  currentStatus?: string
  cancellationReason?: string
}

export function CancelBookingButton({
  bookingId,
  clientId,
  currentStatus,
  cancellationReason,
}: CancelBookingButtonProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [reason, setReason] = useState("")
  const router = useRouter()

  if (currentStatus === "pending_cancellation") {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <p className="font-medium text-orange-800">Cancellation Request Pending</p>
            <p className="text-sm text-orange-700">
              Your cancellation request is awaiting admin approval.
              {cancellationReason && <span className="block mt-1">Reason: {cancellationReason}</span>}
            </p>
          </div>
        </div>
      </div>
    )
  }

  async function handleRequestCancel() {
    if (!reason.trim()) {
      alert("Please provide a reason for cancellation")
      return
    }
    setCancelling(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("bookings")
      .update({
        status: "pending_cancellation",
        cancellation_reason: reason,
        modification_requested_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    if (error) {
      alert("Error submitting cancellation request: " + error.message)
    } else {
      alert("Cancellation request submitted! Waiting for admin approval.")
    }

    setCancelling(false)
    setShowDialog(false)
    router.refresh()
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setShowDialog(true)} className="gap-2">
        <XCircle className="h-4 w-4" />
        Request Cancellation
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Booking Cancellation</DialogTitle>
            <DialogDescription>
              Your cancellation request will be reviewed by admin. If approved and the booking was paid, the amount will
              be refunded to your wallet.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="cancel-reason">Reason for Cancellation *</Label>
            <Textarea
              id="cancel-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why you need to cancel this booking..."
              className="mt-2"
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} disabled={cancelling}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleRequestCancel} disabled={cancelling || !reason.trim()}>
              {cancelling ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Submit Cancellation Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
