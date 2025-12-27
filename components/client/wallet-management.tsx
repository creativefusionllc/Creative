"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Wallet,
  Plus,
  Upload,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Wrench,
  Gift,
  Banknote,
  Building2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { PayPalPaymentForm } from "./paypal-payment-form"
import { getPayPalClientId } from "@/lib/paypal/paypal-client"

interface Transaction {
  id: string
  type: string
  amount: number
  balance_after: number
  description: string
  payment_method: string
  verification_status: string
  created_at: string
}

interface WalletManagementProps {
  clientId: string
  balance: number
  transactions: Transaction[]
}

export function WalletManagement({ clientId, balance, transactions }: WalletManagementProps) {
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_transfer" | "cash">("card")
  const [bankSlip, setBankSlip] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [paypalClientId] = useState(() => getPayPalClientId())
  const router = useRouter()
  const [showPayPalForm, setShowPayPalForm] = useState(false)

  const handleAddFunds = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setLoading(true)
    const supabase = createClient()

    try {
      if (paymentMethod === "card") {
        const newBalance = balance + Number.parseFloat(amount)

        await supabase.from("wallet_transactions").insert({
          client_id: clientId,
          type: "credit",
          amount: Number.parseFloat(amount),
          balance_after: newBalance,
          description: "Wallet top-up via credit card",
          payment_method: "credit_card",
          verification_status: "verified",
        })

        await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", clientId)

        alert("Payment successful! Funds added to your wallet.")
      } else if (paymentMethod === "bank_transfer") {
        let slipUrl = ""
        if (bankSlip) {
          const { data } = await supabase.storage
            .from("bank-slips")
            .upload(`${clientId}/${Date.now()}-${bankSlip.name}`, bankSlip)

          if (data) {
            slipUrl = data.path
          }
        }

        await supabase.from("wallet_transactions").insert({
          client_id: clientId,
          type: "credit",
          amount: Number.parseFloat(amount),
          balance_after: balance,
          description: notes || "Wallet top-up via bank transfer",
          payment_method: "bank_transfer",
          payment_proof_url: slipUrl,
          verification_status: "pending_verification",
        })

        alert("Bank transfer submitted! Your payment will be verified by admin within 24 hours.")
      } else if (paymentMethod === "cash") {
        await supabase.from("wallet_transactions").insert({
          client_id: clientId,
          type: "credit",
          amount: Number.parseFloat(amount),
          balance_after: balance,
          description: notes || "Cash payment at office",
          payment_method: "cash",
          verification_status: "pending_verification",
        })

        alert(
          "Cash payment recorded! Please visit our office to complete the payment. Admin will verify once received.",
        )
      }

      setShowAddFunds(false)
      setAmount("")
      setBankSlip(null)
      setNotes("")
      router.refresh()
    } catch (error) {
      console.error("Error adding funds:", error)
      alert("Failed to process payment")
    } finally {
      setLoading(false)
    }
  }

  const handleCardPayment = async (amount: string) => {
    setShowPayPalForm(true)
  }

  const handlePayPalSuccess = async () => {
    setShowAddFunds(false)
    setAmount("")
    setShowPayPalForm(false)
    router.refresh()
  }

  const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
    pending_verification: {
      icon: <Clock className="h-3 w-3" />,
      color: "text-yellow-800",
      bg: "bg-yellow-100",
      label: "Pending Approval",
    },
    verified: {
      icon: <CheckCircle className="h-3 w-3" />,
      color: "text-green-800",
      bg: "bg-green-100",
      label: "Approved",
    },
    rejected: {
      icon: <XCircle className="h-3 w-3" />,
      color: "text-red-800",
      bg: "bg-red-100",
      label: "Rejected",
    },
  }

  const getTransactionIcon = (tx: Transaction) => {
    if (tx.description?.toLowerCase().includes("manual adjustment")) {
      return <Wrench className="h-5 w-5 text-purple-600" />
    }
    if (tx.description?.toLowerCase().includes("points revoked")) {
      return <Gift className="h-5 w-5 text-orange-600" />
    }
    return tx.type === "credit" ? (
      <ArrowDownLeft className="h-5 w-5 text-green-600" />
    ) : (
      <ArrowUpRight className="h-5 w-5 text-red-600" />
    )
  }

  const getTransactionBg = (tx: Transaction) => {
    if (tx.description?.toLowerCase().includes("manual adjustment")) {
      return "bg-purple-100"
    }
    if (tx.description?.toLowerCase().includes("points revoked")) {
      return "bg-orange-100"
    }
    return tx.type === "credit" ? "bg-green-100" : "bg-red-100"
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: "Credit Card",
      bank_transfer: "Bank Transfer",
      cash: "Cash",
      admin_credit: "Admin",
    }
    return labels[method] || method
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600">Manage your wallet balance and view transaction history.</p>
      </div>

      <div className="bg-gradient-to-br from-[#C4D600] to-[#a8b800] rounded-2xl p-8 text-black mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80 mb-1">Available Balance</p>
            <p className="text-4xl font-bold">AED {balance.toFixed(2)}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={() => setShowAddFunds(true)} className="bg-black text-white hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </div>

      {transactions.filter((t) => t.verification_status === "pending_verification").length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">
                You have {transactions.filter((t) => t.verification_status === "pending_verification").length} pending
                payment(s)
              </p>
              <p className="text-sm text-yellow-600">
                Cash and bank transfers require admin approval before funds are added.
              </p>
            </div>
          </div>
        </div>
      )}

      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">Add Funds to Wallet</h2>

            <div className="space-y-4">
              <div>
                <Label>Amount (AED)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>

              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <button
                    onClick={() => {
                      setPaymentMethod("card")
                      setShowPayPalForm(false)
                    }}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#C4D600] bg-[#C4D600]/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xs font-medium">Credit Card</p>
                    <p className="text-[10px] text-green-600 mt-1">Instant</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === "bank_transfer"
                        ? "border-[#C4D600] bg-[#C4D600]/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xs font-medium">Bank Transfer</p>
                    <p className="text-[10px] text-yellow-600 mt-1">Needs Approval</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === "cash"
                        ? "border-[#C4D600] bg-[#C4D600]/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Banknote className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xs font-medium">Cash</p>
                    <p className="text-[10px] text-yellow-600 mt-1">Needs Approval</p>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && !showPayPalForm && (
                <div className="p-3 bg-green-50 rounded-lg text-sm text-green-800 border border-green-200">
                  <p className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Instant Processing
                  </p>
                  <p className="mt-1 text-green-600">Your funds will be added immediately after successful payment.</p>
                </div>
              )}

              {paymentMethod === "card" && showPayPalForm && amount && (
                <PayPalPaymentForm
                  clientId={paypalClientId}
                  amount={Number.parseFloat(amount)}
                  onSuccess={handlePayPalSuccess}
                  onError={(error) => {
                    console.error("Payment error:", error)
                  }}
                />
              )}

              {paymentMethod === "card" && !showPayPalForm && amount && (
                <Button
                  className="w-full bg-[#C4D600] hover:bg-[#a8b800] text-black"
                  onClick={() => handleCardPayment(amount)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Continue to Payment
                </Button>
              )}

              {paymentMethod === "bank_transfer" && (
                <>
                  <div>
                    <Label>Upload Bank Slip / Transfer Receipt</Label>
                    <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setBankSlip(e.target.files?.[0] || null)}
                        className="hidden"
                        id="bank-slip"
                      />
                      <label htmlFor="bank-slip" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {bankSlip ? bankSlip.name : "Click to upload bank slip"}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    <p className="font-medium">Bank Details:</p>
                    <p>Bank: Emirates NBD</p>
                    <p>Account: Creative Fusion LLC</p>
                    <p>IBAN: AE12 3456 7890 1234 5678 901</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                    <p className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Requires Admin Approval
                    </p>
                    <p className="mt-1 text-yellow-600">Your payment will be verified within 24 hours.</p>
                  </div>
                </>
              )}

              {paymentMethod === "cash" && (
                <>
                  <div>
                    <Label>Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add any reference or notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                    <p className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Requires Admin Approval
                    </p>
                    <p className="mt-1 text-yellow-600">
                      Visit our office to pay. Admin will verify and add funds to your wallet.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-800">
                    <p className="font-medium">Office Location:</p>
                    <p>Creative Fusion LLC</p>
                    <p>Dubai, UAE</p>
                    <p>Working Hours: 9 AM - 6 PM (Sun-Thu)</p>
                  </div>
                </>
              )}

              {paymentMethod !== "card" && (
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddFunds(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[#C4D600] hover:bg-[#a8b800] text-black"
                    onClick={handleAddFunds}
                    disabled={loading || !amount || (paymentMethod === "bank_transfer" && !bankSlip)}
                  >
                    {loading ? "Processing..." : paymentMethod === "card" ? "Pay Now" : "Submit"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-900">Transaction History</h2>
        </div>

        {transactions.length > 0 ? (
          <div className="divide-y">
            {transactions.map((tx) => {
              const status = statusConfig[tx.verification_status] || statusConfig.pending_verification
              return (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionBg(tx)}`}>
                      {getTransactionIcon(tx)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.created_at).toLocaleDateString()} • {getPaymentMethodLabel(tx.payment_method)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "credit" ? "+" : "-"}AED {Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${status.bg} ${status.color} mt-1`}
                    >
                      {status.icon}
                      <span>{status.label}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
