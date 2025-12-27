"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Plus, Upload, Building2, Banknote, AlertCircle } from "lucide-react"

interface AddFundsDialogProps {
  clientId: string
  onSuccess?: () => void
}

export function AddFundsDialog({ clientId, onSuccess }: AddFundsDialogProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cash">("bank_transfer")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (paymentMethod === "bank_transfer" && !paymentProof) {
      setError("Please upload payment proof for bank transfer")
      return
    }

    setSubmitting(true)

    try {
      let proofUrl = ""

      // Upload payment proof if provided
      if (paymentProof) {
        const fileExt = paymentProof.name.split(".").pop()
        const fileName = `${clientId}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("payment-proofs").upload(fileName, paymentProof)

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`)
        }

        const { data: urlData } = supabase.storage.from("payment-proofs").getPublicUrl(fileName)

        proofUrl = urlData.publicUrl
      }

      // Insert transaction with pending verification status
      const { error: insertError } = await supabase.from("wallet_transactions").insert({
        client_id: clientId,
        amount: Number.parseFloat(amount),
        type: "credit",
        description: notes || `${paymentMethod === "bank_transfer" ? "Bank Transfer" : "Cash"} deposit`,
        payment_method: paymentMethod,
        payment_proof_url: proofUrl || null,
        verification_status: "pending_verification",
        balance_after: 0, // Will be updated when admin verifies
      })

      if (insertError) {
        throw new Error(insertError.message)
      }

      alert("Funds request submitted! Your payment is pending admin verification.")
      setOpen(false)
      setAmount("")
      setPaymentProof(null)
      setNotes("")
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to submit payment")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
          <Plus className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <Label>Amount (AED)</Label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v: any) => setPaymentMethod(v)}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Upload payment slip</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Banknote className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Cash Payment</p>
                    <p className="text-xs text-gray-500">Requires admin verification</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "bank_transfer" && (
            <div>
              <Label>Payment Proof *</Label>
              <div className="mt-1.5">
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {paymentProof ? paymentProof.name : "Click to upload payment slip"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={2}
              className="mt-1.5"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Your payment will be verified by our admin team. Funds will be added to your wallet
              once approved.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1 bg-[#C4D600] hover:bg-[#a8b800] text-black">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
