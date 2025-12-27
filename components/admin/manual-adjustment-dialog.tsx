"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

export function ManualAdjustmentDialog({
  clientId,
  onSuccess,
  triggerClassName,
}: { clientId: string; onSuccess?: () => void; triggerClassName?: string }) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    adjustmentType: "credit",
    target: "wallet",
    amount: "",
    reason: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    const supabase = createClient()
    const amount = Number.parseFloat(formData.amount)

    // Get current balances
    const { data: client } = await supabase
      .from("clients")
      .select("wallet_balance, points_balance")
      .eq("id", clientId)
      .single()

    if (!client) {
      setSubmitting(false)
      return
    }

    if (formData.target === "wallet") {
      // Adjust wallet
      const currentBalance = client.wallet_balance || 0
      const adjustment = formData.adjustmentType === "credit" ? amount : -amount
      const newBalance = currentBalance + adjustment

      await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", clientId)

      await supabase.from("wallet_transactions").insert({
        client_id: clientId,
        amount: adjustment,
        type: formData.adjustmentType,
        description: `Manual Adjustment: ${formData.reason}`,
        balance_after: newBalance,
      })
    } else {
      // Adjust points
      const currentPoints = client.points_balance || 0
      const adjustment = formData.adjustmentType === "credit" ? Math.floor(amount) : -Math.floor(amount)
      const newPoints = Math.max(0, currentPoints + adjustment)

      await supabase.from("clients").update({ points_balance: newPoints }).eq("id", clientId)

      await supabase.from("points_transactions").insert({
        client_id: clientId,
        points: adjustment,
        type: formData.adjustmentType === "credit" ? "earned" : "redeemed",
        description: `Manual Adjustment: ${formData.reason}`,
        balance_after: newPoints,
      })
    }

    setSubmitting(false)
    setOpen(false)
    setFormData({ adjustmentType: "credit", target: "wallet", amount: "", reason: "" })
    if (onSuccess) onSuccess()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="sm" className={`gap-1 ${triggerClassName || ""}`}>
        <Wrench className="h-3 w-3" />
        Adjust
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Adjustment</DialogTitle>
            <DialogDescription>
              Make manual adjustments to client wallet or points balance. This action will be recorded in the audit
              trail.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Adjustment Type *</Label>
              <select
                value={formData.adjustmentType}
                onChange={(e) => setFormData({ ...formData, adjustmentType: e.target.value })}
                className="w-full mt-1 border rounded-md p-2"
                required
              >
                <option value="credit">Credit (Add)</option>
                <option value="debit">Debit (Subtract)</option>
              </select>
            </div>
            <div>
              <Label>Target *</Label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full mt-1 border rounded-md p-2"
                required
              >
                <option value="wallet">Wallet Balance</option>
                <option value="points">Creative Points</option>
              </select>
            </div>
            <div>
              <Label>Amount *</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder={formData.target === "wallet" ? "0.00" : "100"}
                required
              />
            </div>
            <div>
              <Label>Reason (Mandatory for audit) *</Label>
              <Textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Explain why this adjustment is being made..."
                rows={3}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Apply Adjustment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
