"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Send, CheckCircle, Clock, AlertCircle, Download, Search, X, Eye } from "lucide-react"

interface Invoice {
  id: string
  invoice_number: string
  client_id: string
  booking_id?: string
  amount: number
  tax_amount: number
  total_amount: number
  status: string
  due_date: string
  paid_date: string | null
  created_at: string
  items?: any[]
  notes?: string
}

interface Client {
  id: string
  name: string
  company_name: string
  email: string
  client_number: string
}

export function InvoicesAdminManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [form, setForm] = useState({
    client_id: "",
    amount: "",
    tax_rate: "0",
    due_date: "",
    notes: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [invoicesRes, clientsRes] = await Promise.all([
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, company_name, email, client_number"),
    ])

    if (invoicesRes.data) setInvoices(invoicesRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    setLoading(false)
  }

  async function handleCreate() {
    const amount = Number.parseFloat(form.amount)
    const taxRate = Number.parseFloat(form.tax_rate) / 100
    const taxAmount = amount * taxRate
    const processingFee = amount * 0.04
    const totalAmount = amount + taxAmount + processingFee

    // Generate invoice number
    const { data: existingInvoices } = await supabase
      .from("invoices")
      .select("invoice_number")
      .order("created_at", { ascending: false })
      .limit(1)

    const lastNum = existingInvoices?.[0]?.invoice_number || "INV-0000"
    const newNum = Number.parseInt(lastNum.split("-")[1]) + 1
    const invoiceNumber = `INV-${String(newNum).padStart(4, "0")}`

    const { error } = await supabase.from("invoices").insert({
      invoice_number: invoiceNumber,
      client_id: form.client_id,
      amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      due_date: form.due_date,
      status: "sent",
      notes: form.notes,
    })

    if (!error) {
      setShowCreate(false)
      setForm({ client_id: "", amount: "", tax_rate: "0", due_date: "", notes: "" })
      fetchData()
    } else {
      alert("Error creating invoice: " + error.message)
    }
  }

  async function handleStatusUpdate(id: string, status: string) {
    const updates: any = { status }
    if (status === "paid") {
      updates.paid_date = new Date().toISOString().split("T")[0]
    }

    await supabase.from("invoices").update(updates).eq("id", id)
    fetchData()
  }

  const getClient = (clientId: string) => {
    return clients.find((c) => c.id === clientId)
  }

  const filteredInvoices = invoices.filter((inv) => {
    const client = getClient(inv.client_id)
    const matchesSearch =
      inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || inv.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: invoices.length,
    pending: invoices
      .filter((i) => ["draft", "sent"].includes(i.status))
      .reduce((sum, i) => sum + (i.total_amount || 0), 0),
    overdue: invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + (i.total_amount || 0), 0),
    paid: invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total_amount || 0), 0),
  }

  const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    draft: { icon: <Clock className="h-3.5 w-3.5" />, color: "text-gray-400 bg-gray-500/10" },
    sent: { icon: <Send className="h-3.5 w-3.5" />, color: "text-blue-400 bg-blue-500/10" },
    paid: { icon: <CheckCircle className="h-3.5 w-3.5" />, color: "text-green-400 bg-green-500/10" },
    unpaid: { icon: <AlertCircle className="h-3.5 w-3.5" />, color: "text-yellow-400 bg-yellow-500/10" },
    overdue: { icon: <AlertCircle className="h-3.5 w-3.5" />, color: "text-red-400 bg-red-500/10" },
    cancelled: { icon: <X className="h-3.5 w-3.5" />, color: "text-gray-400 bg-gray-500/10" },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4D600]" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400">Create and manage client invoices</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-[#C4D600] hover:bg-[#a8b800] text-[#0a0a0a]">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-blue-400">AED {stats.pending.toLocaleString()}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-400">AED {stats.overdue.toLocaleString()}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-5 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-400">AED {stats.paid.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#141414] border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2">
          {["all", "sent", "paid", "unpaid", "overdue"].map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={`capitalize ${
                statusFilter === status
                  ? "bg-[#C4D600] text-[#0a0a0a] border-[#C4D600]"
                  : "bg-transparent text-gray-400 border-white/10 hover:bg-white/5"
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-gray-400 text-sm">Invoice #</th>
                <th className="text-left p-4 font-medium text-gray-400 text-sm">Client</th>
                <th className="text-left p-4 font-medium text-gray-400 text-sm">Amount</th>
                <th className="text-left p-4 font-medium text-gray-400 text-sm">Status</th>
                <th className="text-left p-4 font-medium text-gray-400 text-sm">Due Date</th>
                <th className="text-right p-4 font-medium text-gray-400 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredInvoices.map((invoice) => {
                const client = getClient(invoice.client_id)
                const status = statusConfig[invoice.status] || statusConfig.draft
                return (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className="font-medium text-white">{invoice.invoice_number}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white">{client?.company_name || client?.name || "Unknown"}</p>
                        <p className="text-xs text-gray-400">{client?.client_number}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-white">AED {(invoice.total_amount || 0).toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.icon}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingInvoice(invoice)}
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {invoice.status === "sent" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(invoice.id, "paid")}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {invoice.status === "unpaid" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(invoice.id, "paid")}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No invoices found</p>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Invoice</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Client *</Label>
                <select
                  className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  value={form.client_id}
                  onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                >
                  <option value="" className="bg-[#141414]">
                    Select client
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id} className="bg-[#141414]">
                      {client.company_name || client.name} ({client.client_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-gray-400">Amount (AED) *</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-400">Tax Rate (%)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.tax_rate}
                  onChange={(e) => setForm({ ...form, tax_rate: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-400">Due Date</Label>
                <Input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-400">Notes</Label>
                <Input
                  placeholder="Optional notes..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              {form.amount && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">AED {Number.parseFloat(form.amount || "0").toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Tax ({form.tax_rate}%):</span>
                    <span className="text-white">
                      AED{" "}
                      {((Number.parseFloat(form.amount || "0") * Number.parseFloat(form.tax_rate)) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Processing Fee (4%):</span>
                    <span className="text-white">AED {(Number.parseFloat(form.amount || "0") * 0.04).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-white/10 pt-2">
                    <span className="text-white">Total:</span>
                    <span className="text-[#C4D600]">
                      AED{" "}
                      {(
                        Number.parseFloat(form.amount || "0") +
                        (Number.parseFloat(form.amount || "0") * Number.parseFloat(form.tax_rate)) / 100 +
                        Number.parseFloat(form.amount || "0") * 0.04
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#C4D600] hover:bg-[#a8b800] text-[#0a0a0a]"
                  onClick={handleCreate}
                  disabled={!form.client_id || !form.amount}
                >
                  Create Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {viewingInvoice && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Invoice {viewingInvoice.invoice_number}</h2>
              <button onClick={() => setViewingInvoice(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[viewingInvoice.status]?.color || "text-gray-400 bg-gray-500/10"}`}
                >
                  {statusConfig[viewingInvoice.status]?.icon}
                  {viewingInvoice.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Client</span>
                <span className="text-white">
                  {getClient(viewingInvoice.client_id)?.company_name ||
                    getClient(viewingInvoice.client_id)?.name ||
                    "Unknown"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">AED {(viewingInvoice.amount || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">AED {(viewingInvoice.tax_amount || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold border-t border-white/10 pt-4">
                <span className="text-white">Total</span>
                <span className="text-[#C4D600]">AED {(viewingInvoice.total_amount || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Due Date</span>
                <span className="text-white">
                  {viewingInvoice.due_date ? new Date(viewingInvoice.due_date).toLocaleDateString() : "-"}
                </span>
              </div>

              {viewingInvoice.paid_date && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid Date</span>
                  <span className="text-green-400">{new Date(viewingInvoice.paid_date).toLocaleDateString()}</span>
                </div>
              )}

              {viewingInvoice.notes && (
                <div className="pt-4 border-t border-white/10">
                  <span className="text-gray-400 text-sm">Notes</span>
                  <p className="text-white mt-1">{viewingInvoice.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {viewingInvoice.status !== "paid" && viewingInvoice.status !== "cancelled" && (
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      handleStatusUpdate(viewingInvoice.id, "paid")
                      setViewingInvoice(null)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </Button>
                )}
                <Button variant="outline" className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
