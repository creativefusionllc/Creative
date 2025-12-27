"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  Search,
  Mail,
  Phone,
  Building2,
  Calendar,
  Eye,
  Wallet,
  Star,
  CreditCard,
  Smartphone,
  PhoneCall,
  MessageCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ManualAdjustmentDialog } from "./manual-adjustment-dialog"

export function ClientsManagement() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingClient, setViewingClient] = useState<any>(null)
  const [clientBookings, setClientBookings] = useState<any[]>([])
  const [addPaymentClient, setAddPaymentClient] = useState<any>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDescription, setPaymentDescription] = useState("")
  const [paymentType, setPaymentType] = useState<"credit" | "debit">("credit")
  const [submitting, setSubmitting] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    setLoading(true)
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false })
    setClients(data || [])
    setLoading(false)
  }

  async function viewClientDetails(client: any) {
    setViewingClient(client)
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .or(`user_id.eq.${client.user_id},email.eq.${client.email}`)
      .order("created_at", { ascending: false })
    setClientBookings(data || [])
  }

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!addPaymentClient || !paymentAmount) return

    setSubmitting(true)
    try {
      const amount = Number.parseFloat(paymentAmount)
      const currentBalance = addPaymentClient.wallet_balance || 0
      const newBalance = paymentType === "credit" ? currentBalance + amount : currentBalance - amount

      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error: transactionError } = await supabase.from("wallet_transactions").insert({
        client_id: addPaymentClient.id,
        amount: amount,
        type: paymentType,
        description: paymentDescription || (paymentType === "credit" ? "Admin credit" : "Admin debit"),
        balance_after: newBalance,
        created_by: user?.id,
        payment_method: "admin_credit",
        verification_status: "verified",
        verified_by: user?.id,
        verified_at: new Date().toISOString(),
      })

      if (transactionError) {
        console.error("[v0] Error inserting transaction:", transactionError.message)
        alert(`Error creating transaction: ${transactionError.message}`)
        setSubmitting(false)
        return
      }

      const { error: updateError } = await supabase
        .from("clients")
        .update({ wallet_balance: newBalance })
        .eq("id", addPaymentClient.id)

      if (updateError) {
        console.error("[v0] Error updating wallet:", updateError.message)
        alert(`Error updating wallet: ${updateError.message}`)
        setSubmitting(false)
        return
      }

      let confirmedBookings = 0
      if (paymentType === "credit" && amount > 0) {
        const { data: pendingBookings } = await supabase
          .from("bookings")
          .select("id")
          .eq("user_id", addPaymentClient.user_id)
          .eq("status", "pending")

        if (pendingBookings && pendingBookings.length > 0) {
          const { error: confirmError } = await supabase
            .from("bookings")
            .update({ status: "confirmed" })
            .eq("user_id", addPaymentClient.user_id)
            .eq("status", "pending")

          if (!confirmError) {
            confirmedBookings = pendingBookings.length
          }
        }
      }

      setPaymentAmount("")
      setPaymentDescription("")
      setPaymentType("credit")
      setAddPaymentClient(null)
      setSubmitting(false)

      await fetchClients()

      if (confirmedBookings > 0) {
        alert(
          `Payment added successfully! New balance: AED ${newBalance.toFixed(2)}. ${confirmedBookings} pending booking(s) auto-confirmed.`,
        )
      } else {
        alert(
          `Payment ${paymentType === "credit" ? "added" : "deducted"} successfully! New balance: AED ${newBalance.toFixed(2)}`,
        )
      }
    } catch (error: any) {
      console.error("[v0] Payment error:", error)
      alert(`An error occurred: ${error.message || "Unknown error"}`)
      setSubmitting(false)
    }
  }

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">{clients.length} registered clients</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg">
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#C4D600] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {client.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${client.is_active !== false ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {client.is_active !== false ? "Active" : "Inactive"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{client.name}</h3>
              {client.client_number && (
                <p className="text-xs font-mono text-gray-500 mb-2">ID: {client.client_number}</p>
              )}

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </p>
                {client.mobile && (
                  <p className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-xs text-gray-400">Mobile:</span> {client.mobile}
                  </p>
                )}
                {client.office_phone && (
                  <p className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    <span className="text-xs text-gray-400">Office:</span> {client.office_phone}
                  </p>
                )}
                {client.whatsapp && (
                  <p className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-400">WhatsApp:</span> {client.whatsapp}
                  </p>
                )}
                {client.phone && !client.mobile && !client.office_phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {client.phone}
                  </p>
                )}
                {client.company_name && (
                  <p className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {client.company_name}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(client.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <Wallet className="h-4 w-4" />
                    <span className="font-bold">AED {(client.wallet_balance || 0).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Wallet</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-600">
                    <Star className="h-4 w-4" />
                    <span className="font-bold">{client.points_balance || 0}</span>
                  </div>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => viewClientDetails(client)} className="flex-1 gap-1">
                  <Eye className="h-3 w-3" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAddPaymentClient(client)}
                  className="flex-1 gap-1"
                >
                  <CreditCard className="h-3 w-3" />
                  Payment
                </Button>
                <ManualAdjustmentDialog clientId={client.id} onSuccess={fetchClients} triggerClassName="flex-1" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Client Dialog */}
      <Dialog open={!!viewingClient} onOpenChange={() => setViewingClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {viewingClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Name</Label>
                  <p className="font-semibold">{viewingClient.name}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Client ID</Label>
                  <p className="font-semibold font-mono">{viewingClient.client_number || "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <p className="font-semibold">{viewingClient.email}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Mobile</Label>
                  <p className="font-semibold">{viewingClient.mobile || viewingClient.phone || "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Office Phone</Label>
                  <p className="font-semibold">{viewingClient.office_phone || "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-500">WhatsApp</Label>
                  <p className="font-semibold">{viewingClient.whatsapp || "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Company</Label>
                  <p className="font-semibold">{viewingClient.company_name || "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Wallet Balance</Label>
                  <p className="font-semibold text-green-600">AED {(viewingClient.wallet_balance || 0).toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Points Balance</Label>
                  <p className="font-semibold text-amber-600">{viewingClient.points_balance || 0} pts</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-500">Bookings ({clientBookings.length})</Label>
                {clientBookings.length > 0 ? (
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {clientBookings.map((booking) => (
                      <div key={booking.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{booking.service_category?.replace(/-/g, " ")}</p>
                          <p className="text-sm text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">No bookings yet</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!addPaymentClient} onOpenChange={() => setAddPaymentClient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment - {addPaymentClient?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div>
              <Label>Current Balance</Label>
              <p className="text-lg font-bold text-green-600">
                AED {(addPaymentClient?.wallet_balance || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <Label>Transaction Type</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  variant={paymentType === "credit" ? "default" : "outline"}
                  onClick={() => setPaymentType("credit")}
                  className={paymentType === "credit" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Credit (Add)
                </Button>
                <Button
                  type="button"
                  variant={paymentType === "debit" ? "default" : "outline"}
                  onClick={() => setPaymentType("debit")}
                  className={paymentType === "debit" ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  Debit (Subtract)
                </Button>
              </div>
            </div>
            <div>
              <Label>Amount (AED)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={paymentDescription}
                onChange={(e) => setPaymentDescription(e.target.value)}
                placeholder="Payment description (optional)"
                rows={2}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddPaymentClient(null)}>
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
    </div>
  )
}
