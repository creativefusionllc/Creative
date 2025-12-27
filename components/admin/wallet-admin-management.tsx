"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Loader2,
  CreditCard,
  Building2,
  Banknote,
  ExternalLink,
  X,
  RefreshCw,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Transaction {
  id: string
  client_id: string
  type: string
  amount: number
  balance_after: number
  description: string
  payment_method?: string
  payment_proof_url?: string | null
  verification_status: string
  created_at: string
}

interface Client {
  id: string
  name: string
  email: string
  company_name: string
  wallet_balance: number
}

export function WalletAdminManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all")
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentType, setPaymentType] = useState<"credit" | "debit">("credit")
  const [paymentDescription, setPaymentDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const supabase = createClient()

  useEffect(() => {
    fetchData()

    const channel = supabase
      .channel("wallet-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "wallet_transactions" }, () => {
        fetchData()
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        fetchData()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchData() {
    if (!loading) setRefreshing(true)
    else setLoading(true)

    const [txRes, clientsRes] = await Promise.all([
      supabase.from("wallet_transactions").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, email, company_name, wallet_balance"),
    ])

    if (txRes.data) setTransactions(txRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    setLoading(false)
    setRefreshing(false)
  }

  async function handleApprove(tx: Transaction) {
    setSubmitting(true)
    const client = clients.find((c) => c.id === tx.client_id)
    if (!client) {
      setSubmitting(false)
      return
    }

    const newBalance = (client.wallet_balance || 0) + tx.amount

    await Promise.all([
      supabase
        .from("wallet_transactions")
        .update({
          verification_status: "verified",
          balance_after: newBalance,
          verified_at: new Date().toISOString(),
        })
        .eq("id", tx.id),
      supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", tx.client_id),
    ])

    setViewingTransaction(null)
    setSubmitting(false)
    fetchData()
  }

  async function handleReject(tx: Transaction) {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }

    setSubmitting(true)
    await supabase
      .from("wallet_transactions")
      .update({
        verification_status: "rejected",
        rejection_reason: rejectionReason,
        verified_at: new Date().toISOString(),
      })
      .eq("id", tx.id)

    setViewingTransaction(null)
    setRejectionReason("")
    setSubmitting(false)
    fetchData()
  }

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedClientId || !paymentAmount) return

    setSubmitting(true)
    const client = clients.find((c) => c.id === selectedClientId)
    if (!client) {
      setSubmitting(false)
      return
    }

    const amount = Number.parseFloat(paymentAmount)
    const currentBalance = client.wallet_balance || 0
    const newBalance = paymentType === "credit" ? currentBalance + amount : currentBalance - amount

    // Admin payments are auto-verified - no approval needed
    await supabase.from("wallet_transactions").insert({
      client_id: selectedClientId,
      amount: amount,
      type: paymentType,
      description: paymentDescription || (paymentType === "credit" ? "Admin credit" : "Admin debit"),
      balance_after: newBalance,
      verification_status: "verified", // Auto-verified for admin
      payment_method: "admin_credit",
      verified_at: new Date().toISOString(),
    })

    // Directly update client wallet balance
    await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", selectedClientId)

    setShowAddPayment(false)
    setSelectedClientId("")
    setPaymentAmount("")
    setPaymentDescription("")
    setSubmitting(false)
    fetchData()
  }

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    return client?.name || client?.company_name || "Unknown"
  }

  const getClient = (clientId: string) => {
    return clients.find((c) => c.id === clientId)
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true
    if (filter === "pending") return t.verification_status === "pending_verification"
    if (filter === "verified") return t.verification_status === "verified"
    if (filter === "rejected") return t.verification_status === "rejected"
    return true
  })

  const pendingCount = transactions.filter((t) => t.verification_status === "pending_verification").length

  const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    pending_verification: {
      icon: <Clock className="h-4 w-4" />,
      color: "bg-yellow-500/20 text-yellow-400",
      label: "Pending",
    },
    verified: { icon: <CheckCircle className="h-4 w-4" />, color: "bg-green-500/20 text-green-400", label: "Approved" },
    rejected: { icon: <XCircle className="h-4 w-4" />, color: "bg-red-500/20 text-red-400", label: "Rejected" },
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "bank_transfer":
        return <Building2 className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: "Credit Card",
      card: "Credit Card",
      bank_transfer: "Bank Transfer",
      cash: "Cash",
      admin_credit: "Admin",
    }
    return labels[method] || method
  }

  const totalWalletBalance = clients.reduce((sum, c) => sum + (c.wallet_balance || 0), 0)

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet & Payments</h1>
          <p className="text-gray-400">Manage wallet transactions and approve client payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => fetchData()} disabled={refreshing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowAddPayment(true)} className="bg-[#C4D600] text-black hover:bg-[#a8b800] gap-2">
            <Plus className="h-4 w-4" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141414] rounded-xl p-6 shadow-sm border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Total Client Balances</p>
          <p className="text-3xl font-bold text-white">AED {totalWalletBalance.toFixed(2)}</p>
        </div>
        <div
          className={`rounded-xl p-6 shadow-sm border ${pendingCount > 0 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-[#141414] border-white/10"}`}
        >
          <p className="text-sm text-gray-400 mb-1">Pending Approvals</p>
          <p className={`text-3xl font-bold ${pendingCount > 0 ? "text-yellow-400" : "text-gray-400"}`}>
            {pendingCount}
          </p>
          {pendingCount > 0 && <p className="text-xs text-yellow-400 mt-1">Requires action</p>}
        </div>
        <div className="bg-[#141414] rounded-xl p-6 shadow-sm border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-400">{transactions.length}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-6 shadow-sm border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Active Clients</p>
          <p className="text-3xl font-bold text-green-400">
            {clients.filter((c) => (c.wallet_balance || 0) > 0).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "bg-[#C4D600] text-black hover:bg-[#a8b800]"
              : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
          }
        >
          All ({transactions.length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
          className={
            filter === "pending"
              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30"
              : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
          }
        >
          <Clock className="h-3 w-3 mr-1" />
          Pending ({pendingCount})
        </Button>
        <Button
          variant={filter === "verified" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("verified")}
          className={
            filter === "verified"
              ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
              : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
          }
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("rejected")}
          className={
            filter === "rejected"
              ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
              : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
          }
        >
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#141414] rounded-xl shadow-sm border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-gray-400">Client</th>
                <th className="text-left p-4 font-medium text-gray-400">Type</th>
                <th className="text-left p-4 font-medium text-gray-400">Amount</th>
                <th className="text-left p-4 font-medium text-gray-400">Method</th>
                <th className="text-left p-4 font-medium text-gray-400">Description</th>
                <th className="text-left p-4 font-medium text-gray-400">Status</th>
                <th className="text-left p-4 font-medium text-gray-400">Date</th>
                <th className="text-right p-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTransactions.map((tx) => {
                const status = statusConfig[tx.verification_status] || statusConfig.pending_verification
                return (
                  <tr
                    key={tx.id}
                    className={`hover:bg-white/5 transition-colors ${tx.verification_status === "pending_verification" ? "bg-yellow-500/5" : ""}`}
                  >
                    <td className="p-4 font-medium text-white">{getClientName(tx.client_id)}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-2 text-gray-300">
                        {tx.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-400" />
                        )}
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium">
                      <span className={tx.type === "credit" ? "text-green-400" : "text-red-400"}>
                        {tx.type === "credit" ? "+" : "-"}AED {tx.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2 text-gray-400">
                        {getPaymentMethodIcon(tx.payment_method || "")}
                        {getPaymentMethodLabel(tx.payment_method || "")}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 max-w-[200px] truncate">{tx.description || "-"}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          tx.verification_status === "pending_verification"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : tx.verification_status === "verified"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{new Date(tx.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {tx.verification_status === "pending_verification" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setViewingTransaction(tx)}
                            className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <Wallet className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent className="bg-[#141414] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Add Payment to Client</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-sm text-green-400 border border-green-500/30">
              <p className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Admin payments are auto-verified
              </p>
              <p className="mt-1 text-green-400/80">Funds will be added/deducted immediately.</p>
            </div>

            <div>
              <Label className="text-gray-300">Select Client *</Label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full mt-1 border border-white/10 rounded-md p-2 bg-white/5 text-white"
                required
              >
                <option value="" className="bg-[#141414]">
                  Choose a client...
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id} className="bg-[#141414]">
                    {client.name} - {client.email} (Balance: AED {(client.wallet_balance || 0).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-gray-300">Transaction Type</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  variant={paymentType === "credit" ? "default" : "outline"}
                  onClick={() => setPaymentType("credit")}
                  className={
                    paymentType === "credit"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
                  }
                >
                  Credit (Add Funds)
                </Button>
                <Button
                  type="button"
                  variant={paymentType === "debit" ? "default" : "outline"}
                  onClick={() => setPaymentType("debit")}
                  className={
                    paymentType === "debit"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
                  }
                >
                  Debit (Charge)
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Amount (AED) *</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={paymentDescription}
                onChange={(e) => setPaymentDescription(e.target.value)}
                placeholder="Payment description (optional)"
                rows={2}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddPayment(false)}
                className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Add Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Transaction Modal */}
      {viewingTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Review Payment</h2>
              <button onClick={() => setViewingTransaction(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-sm">Client</Label>
                  <p className="font-semibold text-white">{getClient(viewingTransaction.client_id)?.name}</p>
                  <p className="text-sm text-gray-400">{getClient(viewingTransaction.client_id)?.email}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Amount</Label>
                  <p className="font-bold text-2xl text-green-400">AED {viewingTransaction.amount.toFixed(2)}</p>
                </div>
              </div>

              {viewingTransaction.description && (
                <div>
                  <Label className="text-gray-500 text-sm">Notes</Label>
                  <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg mt-1 border border-white/10">
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
                  disabled={submitting || !rejectionReason.trim()}
                  className="flex-1 bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(viewingTransaction)}
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Approve & Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
