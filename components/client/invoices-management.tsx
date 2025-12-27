"use client"

import type React from "react"

import { FileText, Download, Clock, CheckCircle, AlertCircle, XCircle, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Invoice {
  id: string
  invoice_number: string
  amount: number
  tax_amount: number
  total_amount: number
  status: string
  due_date: string
  paid_date: string | null
  created_at: string
  items: any
}

interface InvoicesManagementProps {
  invoices: Invoice[]
}

export function InvoicesManagement({ invoices }: InvoicesManagementProps) {
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)

  const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
    draft: { icon: <Clock className="h-3 w-3" />, color: "text-gray-800", bg: "bg-gray-100", label: "Draft" },
    sent: { icon: <FileText className="h-3 w-3" />, color: "text-blue-800", bg: "bg-blue-100", label: "Sent" },
    paid: { icon: <CheckCircle className="h-3 w-3" />, color: "text-green-800", bg: "bg-green-100", label: "Paid" },
    overdue: {
      icon: <AlertCircle className="h-3 w-3" />,
      color: "text-red-800",
      bg: "bg-red-100",
      label: "Overdue",
    },
    cancelled: {
      icon: <XCircle className="h-3 w-3" />,
      color: "text-gray-800",
      bg: "bg-gray-100",
      label: "Refunded",
    },
  }

  const totalPending = invoices
    .filter((inv) => ["sent", "overdue"].includes(inv.status))
    .reduce((sum, inv) => sum + inv.total_amount, 0)

  const totalPaid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.total_amount, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
        <p className="text-gray-600">View and download your invoices.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500 mb-1">Total Invoices</p>
          <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500 mb-1">Pending Amount</p>
          <p className="text-3xl font-bold text-orange-600">AED {totalPending.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500 mb-1">Total Paid</p>
          <p className="text-3xl font-bold text-green-600">AED {totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-900">All Invoices</h2>
        </div>

        {invoices.length > 0 ? (
          <div className="divide-y">
            {invoices.map((invoice) => {
              const status = statusConfig[invoice.status] || statusConfig.draft
              return (
                <div key={invoice.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status.bg}`}>
                      <FileText className={`h-5 w-5 ${status.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.invoice_number}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(invoice.created_at).toLocaleDateString()}
                        {invoice.due_date && ` • Due: ${new Date(invoice.due_date).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">AED {invoice.total_amount.toFixed(2)}</p>
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${status.bg} ${status.color}`}
                      >
                        {status.icon}
                        <span>{status.label}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setViewingInvoice(invoice)}>
                      <Download className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No invoices yet</p>
          </div>
        )}
      </div>

      <Dialog open={!!viewingInvoice} onOpenChange={() => setViewingInvoice(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto invoice-print">
          <style jsx global>{`
            @media print {
              .invoice-print * {
                visibility: hidden;
              }
              .invoice-content,
              .invoice-content * {
                visibility: visible;
              }
              .invoice-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .print-hide {
                display: none !important;
              }
            }
          `}</style>
          <DialogHeader className="print-hide">
            <DialogTitle className="flex items-center justify-between">
              <span>Invoice Details</span>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </DialogTitle>
          </DialogHeader>
          {viewingInvoice && (
            <div className="invoice-content space-y-6 p-6">
              <div className="flex justify-between items-start border-b pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Creative Fusion LLC</h2>
                  <p className="text-gray-600">Sharjah Media City (SHAMS), UAE</p>
                  <p className="text-gray-600">info@creativefusion.llc</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Invoice</p>
                  <p className="text-xl font-bold">{viewingInvoice.invoice_number}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(viewingInvoice.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Amount</p>
                  <p className="font-semibold">AED {viewingInvoice.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tax</p>
                  <p className="font-semibold">AED 0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Due Date</p>
                  <p className="font-semibold">
                    {viewingInvoice.due_date ? new Date(viewingInvoice.due_date).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <p className="font-semibold capitalize">{viewingInvoice.status}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Total Amount</p>
                  <p className="text-2xl font-bold text-[#C4D600]">AED {viewingInvoice.total_amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
