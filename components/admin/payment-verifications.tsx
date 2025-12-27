"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Eye,
  Calendar,
  User,
  CreditCard,
  FileText,
  ExternalLink,
  X,
} from "lucide-react"

export function PaymentVerifications() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingTransaction, setViewingTransaction] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [processing, setProcessing] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchPendingTransactions()
  }, [])

  async function fetchPendingTransactions() {
    setLoading(true)
    const { data } = await supabase
      .from("wallet_transactions")
      .select(`
        *,
        clients:client_id (
          id,
          name,
          email,
          client_number,
          wallet_balance,
          user_id
        )
      `)
      .eq("verification_status", "pending_verification")
      .order("created_at", { ascending: false })

    setTransactions(data || [])
    setLoading(false)
  }

  async function handleVerify(transaction: any) {
    setProcessing(true)
    try {
      const client = transaction.clients
      const newBalance = (client.wallet_balance || 0) + transaction.amount

      const { error: walletError } = await supabase
        .from("clients")
        .update({ wallet_balance: newBalance })
        .eq("id", client.id)

      if (walletError) throw walletError

      const { error: txError } = await supabase
        .from("wallet_transactions")
        .update({
          verification_status: "verified",
          verified_by: (await supabase.auth.getUser()).data.user?.id,
          verified_at: new Date().toISOString(),
          balance_after: newBalance,
        })
        .eq("id", transaction.id)

      if (txError) throw txError

      if (client.user_id) {
        await supabase
          .from("bookings")
          .update({ status: "confirmed" })
          .eq("user_id", client.user_id)
          .eq("status", "pending")
      }

      toast.success(`Payment verified! AED ${transaction.amount.toFixed(2)} added to ${client.name}'s wallet.`)
      setViewingTransaction(null)
      await fetchPendingTransactions()
    } catch (error: any) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  async function handleReject(transaction: any) {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason")
      return
    }

    setProcessing(true)
    try {
      const { error } = await supabase
        .from("wallet_transactions")
        .update({
          verification_status: "rejected",
          verified_by: (await supabase.auth.getUser()).data.user?.id,
          verified_at: new Date().toISOString(),
          rejection_reason: rejectionReason,
        })
        .eq("id", transaction.id)

      if (error) throw error

      toast.success("Payment rejected")
      setViewingTransaction(null)
      setRejectionReason("")
      await fetchPendingTransactions()
    } catch (error: any) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Payment Verifications</h1>
        <p className="text-gray-400">Review and approve client payment submissions</p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-20 bg-[#141414] rounded-xl border border-white/10">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">No pending payment verifications</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-400">{transactions.length} payment(s) pending verification</p>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-[#141414] rounded-xl border border-white/10 p-5 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-white">{tx.clients?.name}</h3>
                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {tx.clients?.client_number}
                    </span>
                    <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">
                      Pending
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CreditCard className="h-4 w-4" />
                      <span className="font-bold text-green-400">AED {tx.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FileText className="h-4 w-4" />
                      <span className="capitalize">{tx.payment_method?.replace(/_/g, " ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(tx.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="h-4 w-4" />
                      <span>{tx.clients?.email}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setViewingTransaction(tx)}
                  className="ml-4 bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Review Modal */}
      {viewingTransaction && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Verify Payment</h2>
              <button onClick={() => setViewingTransaction(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-sm">Client</Label>
                  <p className="font-semibold text-white">{viewingTransaction.clients?.name}</p>
                  <p className="text-sm text-gray-400">{viewingTransaction.clients?.email}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Amount</Label>
                  <p className="font-bold text-2xl text-green-400">AED {viewingTransaction.amount.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Payment Method</Label>
                  <p className="font-semibold text-white capitalize">
                    {viewingTransaction.payment_method?.replace(/_/g, " ")}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Current Wallet</Label>
                  <p className="font-semibold text-white">
                    AED {(viewingTransaction.clients?.wallet_balance || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              {viewingTransaction.description && (
                <div>
                  <Label className="text-gray-500 text-sm">Notes</Label>
                  <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg mt-1">
                    {viewingTransaction.description}
                  </p>
                </div>
              )}

              {viewingTransaction.payment_proof_url && (
                <div>
                  <Label className="text-gray-500 text-sm">Payment Proof</Label>
                  <a
                    href={viewingTransaction.payment_proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#C4D600] hover:underline mt-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Payment Slip
                  </a>
                </div>
              )}

              <div>
                <Label className="text-gray-500 text-sm">Rejection Reason (if rejecting)</Label>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  rows={2}
                  className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleReject(viewingTransaction)}
                  disabled={processing || !rejectionReason.trim()}
                  className="flex-1 bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  onClick={() => handleVerify(viewingTransaction)}
                  disabled={processing}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  Verify & Add Funds
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
