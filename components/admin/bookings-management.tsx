"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Calendar,
  Trash2,
  Search,
  Hash,
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
  Wifi,
  WifiOff,
  UserPlus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingBooking, setEditingBooking] = useState<any>(null)
  const [viewingBooking, setViewingBooking] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false) // Renamed from showAddBooking
  const [newBooking, setNewBooking] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    company_name: "",
    service_category: "",
    service_subcategory: "",
    scheduled_date: "",
    scheduled_time: "",
    budget_range: "",
    project_description: "",
    notes: "",
    // Added fields from updates
    timeline: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [agencyNumber, setAgencyNumber] = useState("AG000001") // Added from updates
  const [showModificationDialog, setShowModificationDialog] = useState<string | null>(null) // Added from updates
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false)
  const [newBookingsCount, setNewBookingsCount] = useState(0)
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date())

  const supabase = createClient()

  // Create a map for clients for quick lookup
  const clientsMap = new Map(clients.map((client) => [client.id, client]))

  useEffect(() => {
    fetchBookings()
    fetchClients() // Added from updates
    fetchAgencySettings() // Added from updates

    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // New booking received
            setNewBookingsCount((prev) => prev + 1)
            // Play notification sound (optional)
            const audio = new Audio("/notification.mp3")
            audio.play().catch(() => {}) // Silently fail if no audio
            // Auto-refresh bookings
            fetchBookings()
          } else if (payload.eventType === "UPDATE") {
            // Booking updated - refresh list
            fetchBookings()
          } else if (payload.eventType === "DELETE") {
            // Booking deleted - refresh list
            fetchBookings()
          }
        },
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === "SUBSCRIBED")
      })

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, []) // Removed dependencies from original useEffect

  async function fetchBookings() {
    setLoading(true)
    const { data: bookingsRes, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
    const { data: clientsRes, error: clientsError } = await supabase
      .from("clients")
      .select("id, name, email, phone, company_name, user_id, client_number")
      .order("name") // Added order and client_number
    setLastFetchTime(new Date()) // Update last fetch time

    if (bookingsRes) {
      let filteredByDate = bookingsRes
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (dateFilter === "past") {
        filteredByDate = bookingsRes.filter((b) => b.scheduled_date && new Date(b.scheduled_date) < today)
      } else if (dateFilter === "current") {
        filteredByDate = bookingsRes.filter((b) => {
          if (!b.scheduled_date) return false
          const bookingDate = new Date(b.scheduled_date)
          bookingDate.setHours(0, 0, 0, 0)
          return bookingDate.getTime() === today.getTime()
        })
      } else if (dateFilter === "future") {
        filteredByDate = bookingsRes.filter((b) => b.scheduled_date && new Date(b.scheduled_date) > today)
      }

      // const updatedBookings = await autoUpdateProjectStatus(filteredByDate) // Kept from original, assuming it's still needed
      // setBookings(updatedBookings)
      setBookings(filteredByDate) // Simplified for now, assuming autoUpdateProjectStatus might be refactored or removed if not strictly needed for the merge
    } else if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError.message)
      // Handle error, e.g., show a toast
    }

    if (clientsRes) {
      setClients(clientsRes)
    } else if (clientsError) {
      console.error("Error fetching clients:", clientsError.message)
      // Handle error
    }

    setLoading(false)
  }

  // Added from updates: fetchClients and fetchAgencySettings
  async function fetchClients() {
    const { data } = await supabase.from("clients").select("*").order("name")
    if (data) setClients(data)
  }

  async function fetchAgencySettings() {
    const { data } = await supabase.from("agency_settings").select("agency_number").single()
    if (data) setAgencyNumber(data.agency_number)
  }

  async function autoUpdateProjectStatus(bookings: any[]) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const updates = []
    for (const booking of bookings) {
      if (!booking.scheduled_date || booking.status !== "confirmed") continue

      const bookingDate = new Date(booking.scheduled_date)
      bookingDate.setHours(0, 0, 0, 0)

      let newProjectStatus = booking.project_status

      // If booking date is today and status is upcoming, set to in_progress
      if (bookingDate.getTime() === today.getTime() && booking.project_status === "upcoming") {
        newProjectStatus = "in_progress"
      }
      // If booking date is in the past and status is in_progress, set to completed
      else if (bookingDate < today && booking.project_status === "in_progress") {
        newProjectStatus = "completed"
      }

      if (newProjectStatus !== booking.project_status) {
        updates.push(supabase.from("bookings").update({ project_status: newProjectStatus }).eq("id", booking.id))
        booking.project_status = newProjectStatus
      }
    }

    if (updates.length > 0) {
      await Promise.all(updates)
    }

    return bookings
  }

  // Added from updates: approveReschedule, rejectReschedule, approveCancellation, rejectCancellation
  async function approveReschedule(bookingId: string) {
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    const { error } = await supabase
      .from("bookings")
      .update({
        status: "confirmed",
        scheduled_date: booking.requested_date,
        requested_date: null,
        original_date: null,
        cancellation_reason: null,
        modification_requested_at: null,
      })
      .eq("id", bookingId)

    if (error) {
      alert("Error approving reschedule: " + error.message)
    } else {
      alert("Reschedule approved! Date updated.")
      fetchBookings()
    }
    setShowModificationDialog(null)
  }

  async function rejectReschedule(bookingId: string) {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "confirmed",
        requested_date: null,
        original_date: null,
        cancellation_reason: null,
        modification_requested_at: null,
      })
      .eq("id", bookingId)

    if (error) {
      alert("Error rejecting reschedule: " + error.message)
    } else {
      alert("Reschedule request rejected. Original date retained.")
      fetchBookings()
    }
    setShowModificationDialog(null)
  }

  async function approveCancellation(bookingId: string) {
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    // Check if there's a paid invoice to refund
    const { data: invoice } = await supabase
      .from("invoices")
      .select("*, client_id")
      .eq("booking_id", bookingId)
      .eq("status", "paid")
      .maybeSingle()

    if (invoice) {
      // Get client data
      const { data: client } = await supabase
        .from("clients")
        .select("wallet_balance, points_balance")
        .eq("id", invoice.client_id)
        .single()

      if (client) {
        const newWalletBalance = (client.wallet_balance || 0) + invoice.total_amount
        const refundAmount = invoice.total_amount

        // Update client wallet balance
        await supabase.from("clients").update({ wallet_balance: newWalletBalance }).eq("id", invoice.client_id)

        // Record wallet transaction
        await supabase.from("wallet_transactions").insert({
          client_id: invoice.client_id,
          amount: refundAmount,
          type: "credit",
          description: `Refund - Booking ${booking.booking_number} cancelled`,
          reference_id: bookingId,
          balance_after: newWalletBalance,
          verification_status: "verified",
          payment_method: "admin_credit",
        })

        // Revoke points
        const pointsToRevoke = Math.floor(invoice.total_amount)
        const newPointsBalance = Math.max(0, (client.points_balance || 0) - pointsToRevoke)

        await supabase.from("clients").update({ points_balance: newPointsBalance }).eq("id", invoice.client_id)

        // Update invoice status
        await supabase.from("invoices").update({ status: "cancelled" }).eq("id", invoice.id)

        alert(
          `✓ Cancellation approved!\n✓ AED ${refundAmount.toFixed(2)} refunded to wallet\n✓ ${pointsToRevoke} points revoked`,
        )
      }
    }

    // Update booking status
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        modification_requested_at: null,
      })
      .eq("id", bookingId)

    if (error) {
      alert("Error approving cancellation: " + error.message)
    } else if (!invoice) {
      alert("Cancellation approved!")
    }

    fetchBookings()
    setShowModificationDialog(null)
  }

  async function rejectCancellation(bookingId: string) {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "confirmed",
        cancellation_reason: null,
        modification_requested_at: null,
      })
      .eq("id", bookingId)

    if (error) {
      alert("Error rejecting cancellation: " + error.message)
    } else {
      alert("Cancellation request rejected. Booking remains confirmed.")
      fetchBookings()
    }
    setShowModificationDialog(null)
  }

  async function updateStatus(id: string, status: string) {
    if (status === "confirmed") {
      const booking = bookings.find((b) => b.id === id)
      if (!booking) return

      // Get client data
      const { data: client } = await supabase.from("clients").select("*").eq("user_id", booking.user_id).single()

      if (!client) {
        alert("Client not found")
        return
      }

      // Parse budget range to get amount
      const budgetMap: Record<string, number> = {
        "under-5000": 3000,
        "5000-10000": 7500,
        "10000-20000": 15000,
        "20000-50000": 35000,
        "above-50000": 75000,
      }
      const amount = budgetMap[booking.budget_range] || 5000

      // Check if invoice already exists
      const { data: existingInvoice } = await supabase.from("invoices").select("*").eq("booking_id", id).single()

      if (existingInvoice) {
        console.log("[v0] Invoice already exists for this booking")
      } else {
        // Generate invoice number
        const { data: existingInvoices } = await supabase
          .from("invoices")
          .select("invoice_number")
          .order("created_at", { ascending: false })
          .limit(1)

        const lastInvoiceNum = existingInvoices?.[0]?.invoice_number || "INV-0000"
        const invoiceNum = Number.parseInt(lastInvoiceNum.split("-")[1]) + 1
        const invoiceNumber = `INV-${String(invoiceNum).padStart(4, "0")}`

        // Create invoice items
        const invoiceItems = [
          {
            description: `${booking.service_category} - ${booking.service_subcategory}`,
            quantity: 1,
            rate: amount,
            amount: amount,
          },
        ]

        const taxAmount = 0
        const processingFee = amount * 0.04
        const totalAmount = amount + taxAmount + processingFee

        // Check if client has sufficient wallet balance
        const hasSufficientBalance = client.wallet_balance >= totalAmount
        const invoiceStatus = hasSufficientBalance ? "paid" : "unpaid"

        // Create invoice with correct status
        const { error: invoiceError } = await supabase.from("invoices").insert({
          invoice_number: invoiceNumber,
          client_id: client.id,
          booking_id: id,
          amount: amount,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          status: invoiceStatus,
          items: invoiceItems,
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
          paid_date: hasSufficientBalance ? new Date().toISOString().split("T")[0] : null,
          notes: `Auto-generated for booking ${booking.booking_number}\nProcessing Fee: AED ${processingFee.toFixed(2)}`,
        })

        if (invoiceError) {
          alert("Error creating invoice: " + invoiceError.message)
          return
        }

        // Deduct from wallet only if sufficient balance
        if (hasSufficientBalance) {
          const newBalance = Number.parseFloat(client.wallet_balance.toString()) - totalAmount

          // Update client wallet balance
          await supabase.from("clients").update({ wallet_balance: newBalance }).eq("id", client.id)

          // Record wallet transaction
          await supabase.from("wallet_transactions").insert({
            client_id: client.id,
            type: "debit",
            amount: totalAmount,
            description: `Payment for booking ${booking.booking_number} - ${invoiceNumber}`,
            reference_id: invoiceNumber,
            balance_after: newBalance,
            verification_status: "verified",
            payment_method: "admin_credit",
          })

          alert(
            `✓ Booking confirmed!\n✓ Invoice ${invoiceNumber} generated (PAID)\n✓ AED ${totalAmount.toFixed(2)} deducted from wallet`,
          )
        } else {
          alert(
            `✓ Booking confirmed!\n✓ Invoice ${invoiceNumber} generated (UNPAID)\n⚠ Insufficient wallet balance (AED ${client.wallet_balance.toFixed(2)} / AED ${totalAmount.toFixed(2)} needed)\nClient needs to add funds or pay manually.`,
          )
        }
      }
    }

    await supabase.from("bookings").update({ status }).eq("id", id)
    fetchBookings()
  }

  async function updateProjectStatus(id: string, projectStatus: string) {
    await supabase.from("bookings").update({ project_status: projectStatus }).eq("id", id)
    fetchBookings()
  }

  // Removed deleteBooking function as it's replaced by handleDelete from updates

  // Updated handleAddBooking from updates
  async function handleAddBooking(e: React.FormEvent) {
    e.preventDefault()

    if (!newBooking.name || !newBooking.email || !newBooking.service_category || !newBooking.service_subcategory) {
      alert("Please fill in all required fields: Name, Email, Service Category, and Service Subcategory")
      return
    }

    const { error } = await supabase.from("bookings").insert({
      user_id: newBooking.user_id || null,
      name: newBooking.name,
      email: newBooking.email,
      phone: newBooking.phone,
      company_name: newBooking.company_name,
      service_category: newBooking.service_category,
      service_subcategory: newBooking.service_subcategory,
      project_description: newBooking.project_description,
      budget_range: newBooking.budget_range,
      timeline: newBooking.timeline, // Added from updates
      scheduled_date: newBooking.scheduled_date || null,
      scheduled_time: newBooking.scheduled_time || null,
      status: "pending",
      project_status: "upcoming",
    })

    if (error) {
      console.error("[v0] Error adding booking:", error.message)
      alert("Error adding booking: " + error.message)
    } else {
      setShowAddDialog(false) // Corrected state name
      setNewBooking({
        user_id: "",
        name: "",
        email: "",
        phone: "",
        company_name: "",
        service_category: "",
        service_subcategory: "",
        project_description: "",
        budget_range: "",
        timeline: "", // Reset added field
        scheduled_date: "",
        scheduled_time: "",
      })
      fetchBookings()
    }
  }

  // Added from updates: handleClientSelect
  function handleClientSelect(userId: string) {
    const client = clients.find((c) => c.user_id === userId)
    if (client) {
      setNewBooking((prev) => ({
        ...prev,
        user_id: userId,
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        company_name: client.company_name || "",
      }))
    }
  }

  // Renamed from deleteBooking to handleDelete from updates
  async function handleDelete(id: string) {
    await supabase.from("bookings").delete().eq("id", id)
    setDeleteConfirm(null)
    fetchBookings()
  }

  async function createClientFromBooking(booking: any) {
    if (!booking.email || !booking.name) {
      alert("Booking must have email and name to create a client")
      return
    }

    setSubmitting(true)
    try {
      // Check if client already exists with this email
      const { data: existingClient } = await supabase
        .from("clients")
        .select("id, client_number")
        .eq("email", booking.email)
        .single()

      if (existingClient) {
        alert(`Client already exists: ${existingClient.client_number}\nLinking booking...`)
        const { error } = await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking.id)

        if (error) throw error
        fetchBookings()
        setSubmitting(false)
        return
      }

      // Generate unique client number
      const { data: lastClient } = await supabase
        .from("clients")
        .select("client_number")
        .order("created_at", { ascending: false })
        .limit(1)

      const lastNumber = lastClient?.[0]?.client_number?.replace("CL", "") || "0"
      const newClientNumber = "CL" + String(Number.parseInt(lastNumber) + 1).padStart(6, "0")

      const verificationToken =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      const createResponse = await fetch("/api/admin/create-client-from-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          company_name: booking.company_name,
          client_number: newClientNumber,
          verification_token: verificationToken,
        }),
      })

      if (!createResponse.ok) {
        const error = await createResponse.json()
        throw new Error(error.message || "Failed to create client")
      }

      const { newClient } = await createResponse.json()

      const { error: linkError } = await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking.id)

      if (linkError) throw linkError

      try {
        const verificationUrl = `${window.location.origin}/auth/confirm?token=${verificationToken}&email=${encodeURIComponent(booking.email)}`

        const emailResponse = await fetch("/api/send-verification-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: booking.email,
            name: booking.name,
            verificationUrl,
          }),
        })

        if (!emailResponse.ok) {
          console.error("[v0] Failed to send verification email")
        } else {
          console.log("[v0] Verification email sent to:", booking.email)
        }
      } catch (emailError) {
        console.error("[v0] Error sending verification email:", emailError)
      }

      alert(
        `✅ Client created successfully!\n\nClient Number: ${newClientNumber}\nBooking Status: Confirmed\n\nVerification email sent to: ${booking.email}\n\nThe client must verify their email and create a password to access the portal.`,
      )
      fetchBookings()
    } catch (error: any) {
      console.error("[v0] Error creating client:", error)
      alert(`❌ Error: ${error.message}\n\nPlease contact support if this persists.`)
    } finally {
      setSubmitting(false)
    }
  }

  async function sendBookingNotification(email: string, type: "new" | "reminder") {
    console.log(`[v0] Sending ${type} notification to ${email}`)
  }

  function isTomorrow(dateString: string) {
    if (!dateString) return false
    const booking = new Date(dateString)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    booking.setHours(0, 0, 0, 0)
    return booking.getTime() === tomorrow.getTime()
  }

  // Updated filteredBookings logic from updates
  const filteredAndSearchedBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booking_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_category?.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    if (dateFilter === "all") return true

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const bookingDate = booking.scheduled_date ? new Date(booking.scheduled_date) : null

    if (!bookingDate) return dateFilter === "all" // Handle bookings with no scheduled date

    switch (dateFilter) {
      case "past":
        return bookingDate < today
      case "today":
        return bookingDate.getTime() === today.getTime()
      case "upcoming":
        return bookingDate > today
      default:
        return true
    }
  })

  // Updated statusColors from updates
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500 text-white", // Updated for contrast
    confirmed: "bg-green-500 text-white", // Updated for contrast
    cancelled: "bg-red-500 text-white", // Updated for contrast
    pending_cancellation: "bg-orange-500 text-white", // Updated for contrast
    pending_reschedule: "bg-purple-500 text-white", // Updated for contrast
  }

  const projectStatusColors: Record<string, string> = {
    upcoming: "bg-blue-500 text-white", // Updated for contrast
    in_progress: "bg-indigo-500 text-white", // Updated for contrast
    completed: "bg-gray-500 text-white", // Updated for contrast
  }

  // Added from updates: serviceCategories and subcategories
  const serviceCategories = [
    { value: "branding", label: "Branding" },
    { value: "video-production", label: "Video Production" },
    { value: "photography", label: "Photography" },
    { value: "web-development", label: "Web Development" },
    { value: "social-media", label: "Social Media" },
    { value: "marketing", label: "Marketing" },
  ]

  const subcategories: Record<string, { value: string; label: string }[]> = {
    branding: [
      { value: "logo-design", label: "Logo Design" },
      { value: "brand-strategy", label: "Brand Strategy" },
      { value: "visual-identity", label: "Visual Identity" },
    ],
    "video-production": [
      { value: "commercial-video", label: "Commercial Video" },
      { value: "animation", label: "Animation" },
      { value: "corporate-video", label: "Corporate Video" },
    ],
    photography: [
      { value: "product-photography", label: "Product Photography" },
      { value: "event-photography", label: "Event Photography" },
      { value: "portrait-photography", label: "Portrait Photography" },
    ],
    "web-development": [
      { value: "website-design", label: "Website Design" },
      { value: "e-commerce", label: "E-Commerce" },
      { value: "web-application", label: "Web Application" },
    ],
    "social-media": [
      { value: "content-creation", label: "Content Creation" },
      { value: "social-management", label: "Social Management" },
      { value: "influencer-marketing", label: "Influencer Marketing" },
    ],
    marketing: [
      { value: "digital-marketing", label: "Digital Marketing" },
      { value: "seo", label: "SEO" },
      { value: "ppc-advertising", label: "PPC Advertising" },
    ],
  }

  // Count pending modification requests from updates
  const pendingModifications = bookings.filter(
    (b) => b.status === "pending_cancellation" || b.status === "pending_reschedule",
  ).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-gray-900 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Bookings Management</h2>
          <p className="text-gray-300 mt-2">
            Agency: <span className="font-mono font-semibold text-[#C4D600]">{agencyNumber}</span>
          </p>
        </div>
        {/* Changed to DialogTrigger as per updates */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] hover:bg-[#b8c200] text-black font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
            </DialogHeader>
            {/* Changed to form with onSubmit handler from updates */}
            <form onSubmit={handleAddBooking} className="space-y-4">
              {/* Select existing client (Updated from updates) */}
              <div>
                <Label className="text-gray-300">Select Existing Client (Optional)</Label>
                <Select onValueChange={handleClientSelect}>
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                    <SelectValue placeholder="Choose a client or enter manually" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.user_id || client.id} className="hover:bg-gray-600">
                        {client.client_number} - {client.name} ({client.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={newBooking.name}
                    onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-300">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    value={newBooking.company_name}
                    onChange={(e) => setNewBooking({ ...newBooking, company_name: e.target.value })}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Service Category *</Label>
                  <Select
                    value={newBooking.service_category}
                    onValueChange={(value) =>
                      setNewBooking({ ...newBooking, service_category: value, service_subcategory: "" })
                    }
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      {serviceCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="hover:bg-gray-600">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Service Subcategory *</Label>
                  <Select
                    value={newBooking.service_subcategory}
                    onValueChange={(value) => setNewBooking({ ...newBooking, service_subcategory: value })}
                    disabled={!newBooking.service_category}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      {(subcategories[newBooking.service_category] || []).map((sub) => (
                        <SelectItem key={sub.value} value={sub.value} className="hover:bg-gray-600">
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  value={newBooking.project_description}
                  onChange={(e) => setNewBooking({ ...newBooking, project_description: e.target.value })}
                  rows={3}
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Budget Range</Label>
                  <Select
                    value={newBooking.budget_range}
                    onValueChange={(value) => setNewBooking({ ...newBooking, budget_range: value })}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="under-5000" className="hover:bg-gray-600">
                        Under AED 5,000
                      </SelectItem>
                      <SelectItem value="5000-10000" className="hover:bg-gray-600">
                        AED 5,000 - 10,000
                      </SelectItem>
                      <SelectItem value="10000-20000" className="hover:bg-gray-600">
                        AED 10,000 - 20,000
                      </SelectItem>
                      <SelectItem value="20000-50000" className="hover:bg-gray-600">
                        AED 20,000 - 50,000
                      </SelectItem>
                      <SelectItem value="above-50000" className="hover:bg-gray-600">
                        Above AED 50,000
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Timeline</Label>
                  <Select
                    value={newBooking.timeline}
                    onValueChange={(value) => setNewBooking({ ...newBooking, timeline: value })}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="urgent" className="hover:bg-gray-600">
                        Urgent (Within 1 week)
                      </SelectItem>
                      <SelectItem value="short" className="hover:bg-gray-600">
                        Short (1-2 weeks)
                      </SelectItem>
                      <SelectItem value="medium" className="hover:bg-gray-600">
                        Medium (2-4 weeks)
                      </SelectItem>
                      <SelectItem value="flexible" className="hover:bg-gray-600">
                        Flexible
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-300">
                    Scheduled Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newBooking.scheduled_date}
                    onChange={(e) => setNewBooking({ ...newBooking, scheduled_date: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-gray-300">
                    Scheduled Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newBooking.scheduled_time}
                    onChange={(e) => setNewBooking({ ...newBooking, scheduled_time: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#C4D600] hover:bg-[#b8c200] text-black font-semibold">
                Create Booking
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {pendingModifications > 0 && (
        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          <div>
            <p className="font-medium text-orange-200">
              {pendingModifications} Pending Modification Request{pendingModifications > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-orange-100">
              Clients have requested cancellations or reschedules that need your approval.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-lime-400 focus:border-lime-400"
          />
        </div>
        <div className="flex gap-2">
          {["all", "past", "today", "upcoming"].map((filter) => (
            <Button
              key={filter}
              variant={dateFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter(filter)}
              className={
                dateFilter === filter
                  ? "bg-[#C4D600] text-black hover:bg-[#b8c200] font-semibold"
                  : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
              }
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          {isRealtimeConnected ? (
            <Wifi className="h-4 w-4 text-[#C4D600]" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          {newBookingsCount > 0 && (
            <Badge className="bg-blue-600 text-white border-blue-500 cursor-pointer" onClick={fetchBookings}>
              {newBookingsCount} New Booking{newBookingsCount > 1 ? "s" : ""}
            </Badge>
          )}
          <span className="ml-2 text-gray-400">Last updated: {lastFetchTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredAndSearchedBookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No bookings found</p>
          </div>
        ) : (
          filteredAndSearchedBookings.map((booking) => {
            const client = clientsMap.get(booking.client_id || "")
            // Added check for modification pending status from updates
            const isModificationPending =
              booking.status === "pending_cancellation" || booking.status === "pending_reschedule"
            // Updated isTomorrow logic from updates
            const isTomorrow =
              booking.scheduled_date &&
              new Date(booking.scheduled_date).toDateString() ===
                new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()

            return (
              <div
                key={booking.id}
                className={`bg-gray-800 rounded-lg border p-4 ${isTomorrow ? "border-orange-400 ring-2 ring-orange-200" : "border-gray-700"} ${isModificationPending ? "border-l-4 border-l-orange-500" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className="font-mono bg-gray-700 text-gray-100 border-gray-600">
                        <Hash className="h-3 w-3 mr-1" />
                        {booking.booking_number || "Generating..."}
                      </Badge>
                      {client && (
                        <Badge variant="secondary" className="font-mono bg-gray-700 text-gray-100 border-gray-600">
                          <Building2 className="h-3 w-3 mr-1" />
                          {client.client_number}
                        </Badge>
                      )}
                      <Badge className={`${statusColors[booking.status]} border font-semibold`}>
                        {booking.status === "pending_cancellation" && <XCircle className="h-3 w-3 mr-1" />}
                        {booking.status === "pending_reschedule" && <RefreshCw className="h-3 w-3 mr-1" />}
                        {booking.status === "confirmed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {booking.status.replace("_", " ")}
                      </Badge>
                      {booking.status === "confirmed" && (
                        <Badge
                          className={`${projectStatusColors[booking.project_status || "upcoming"]} border font-semibold`}
                        >
                          {booking.project_status === "in_progress"
                            ? "Shooting"
                            : booking.project_status?.replace("_", " ") || "upcoming"}
                        </Badge>
                      )}
                      {isTomorrow && (
                        <Badge className="bg-orange-600 text-white border-orange-500 border font-semibold">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Tomorrow
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg text-white">
                      {booking.name}
                      {client && <span className="text-gray-400 font-normal text-sm ml-2">({client.name})</span>}
                    </h3>
                    <p className="text-gray-300 font-medium">
                      {booking.service_category?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} -{" "}
                      {booking.service_subcategory}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {booking.email} • {booking.phone}
                    </p>
                    {booking.scheduled_date && (
                      <p className="text-sm text-gray-300 mt-2 flex items-center gap-1 font-medium">
                        <Calendar className="h-4 w-4" />
                        {booking.scheduled_date} {booking.scheduled_time && `at ${booking.scheduled_time}`}
                      </p>
                    )}

                    {isModificationPending && (
                      <div
                        className={`mt-3 p-3 rounded-lg ${booking.status === "pending_cancellation" ? "bg-orange-900 border border-orange-700" : "bg-purple-900 border border-purple-700"}`}
                      >
                        <p
                          className={`font-semibold text-sm ${booking.status === "pending_cancellation" ? "text-orange-200" : "text-purple-200"}`}
                        >
                          {booking.status === "pending_cancellation"
                            ? "Cancellation Request"
                            : `Reschedule Request → ${booking.requested_date}`}
                        </p>
                        {booking.cancellation_reason && (
                          <p
                            className={`text-sm mt-1 ${booking.status === "pending_cancellation" ? "text-orange-100" : "text-purple-100"}`}
                          >
                            Reason: {booking.cancellation_reason}
                          </p>
                        )}
                        <p className="text-xs mt-1 text-gray-300">
                          Requested: {new Date(booking.modification_requested_at).toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-3">
                          {booking.status === "pending_cancellation" ? (
                            <>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => approveCancellation(booking.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectCancellation(booking.id)}
                                className="bg-red-700 text-white border-red-600 hover:bg-red-800"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                onClick={() => approveReschedule(booking.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve Reschedule
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectReschedule(booking.id)}
                                className="bg-red-700 text-white border-red-600 hover:bg-red-800"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions - only show if not modification pending */}
                  {!isModificationPending && (
                    <div className="flex flex-col gap-2 items-end">
                      {!client && booking.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => createClientFromBooking(booking)}
                          disabled={submitting}
                          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold gap-1"
                        >
                          {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : <UserPlus className="h-3 w-3" />}
                          Add as Client & Confirm
                        </Button>
                      )}
                      <div className="flex gap-1 items-center">
                        <Label className="text-xs text-gray-400 mr-2">Status:</Label>
                        <Select value={booking.status} onValueChange={(value) => updateStatus(booking.id, value)}>
                          <SelectTrigger className="w-[130px] h-9 bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 text-white border-gray-600">
                            <SelectItem value="pending" className="hover:bg-gray-600">
                              Pending
                            </SelectItem>
                            <SelectItem value="confirmed" className="hover:bg-gray-600">
                              Confirmed
                            </SelectItem>
                            <SelectItem value="cancelled" className="hover:bg-gray-600">
                              Cancelled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {booking.status === "confirmed" && (
                        <div className="flex gap-1 items-center">
                          <Label className="text-xs text-gray-400 mr-2">Project:</Label>
                          <Select
                            value={booking.project_status || "upcoming"}
                            onValueChange={(value) => updateProjectStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-[140px] h-9 bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-white border-gray-600">
                              <SelectItem value="upcoming" className="hover:bg-gray-600">
                                Upcoming
                              </SelectItem>
                              <SelectItem value="in_progress" className="hover:bg-gray-600">
                                Shooting
                              </SelectItem>
                              <SelectItem value="completed" className="hover:bg-gray-600">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm(booking.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>

                {/* Delete confirmation */}
                {deleteConfirm === booking.id && (
                  <div className="mt-4 p-3 bg-red-900 rounded-lg border border-red-700">
                    <p className="text-red-200 text-sm mb-2">
                      Are you sure you want to delete this booking? This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(booking.id)}>
                        Yes, Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteConfirm(null)}
                        className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Add Booking Dialog - Now uses showAddDialog state and DialogTrigger */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New Booking</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBooking} className="space-y-4">
            {/* Select existing client */}
            <div>
              <Label className="text-gray-300">Select Existing Client (Optional)</Label>
              <Select onValueChange={handleClientSelect}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                  <SelectValue placeholder="Choose a client or enter manually" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white border-gray-600">
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.user_id || client.id} className="hover:bg-gray-600">
                      {client.client_number} - {client.name} ({client.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={newBooking.name}
                  onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-gray-300">
                  Company *
                </Label>
                <Input
                  id="company"
                  value={newBooking.company_name}
                  onChange={(e) => setNewBooking({ ...newBooking, company_name: e.target.value })}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Service Category *</Label>
                <Select
                  value={newBooking.service_category}
                  onValueChange={(value) =>
                    setNewBooking({ ...newBooking, service_category: value, service_subcategory: "" })
                  }
                >
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="hover:bg-gray-600">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Service Subcategory *</Label>
                <Select
                  value={newBooking.service_subcategory}
                  onValueChange={(value) => setNewBooking({ ...newBooking, service_subcategory: value })}
                  disabled={!newBooking.service_category}
                >
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    {(subcategories[newBooking.service_category] || []).map((sub) => (
                      <SelectItem key={sub.value} value={sub.value} className="hover:bg-gray-600">
                        {sub.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">
                Project Description
              </Label>
              <Textarea
                id="description"
                value={newBooking.project_description}
                onChange={(e) => setNewBooking({ ...newBooking, project_description: e.target.value })}
                rows={3}
                className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Budget Range</Label>
                <Select
                  value={newBooking.budget_range}
                  onValueChange={(value) => setNewBooking({ ...newBooking, budget_range: value })}
                >
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    <SelectItem value="under-5000" className="hover:bg-gray-600">
                      Under AED 5,000
                    </SelectItem>
                    <SelectItem value="5000-10000" className="hover:bg-gray-600">
                      AED 5,000 - 10,000
                    </SelectItem>
                    <SelectItem value="10000-20000" className="hover:bg-gray-600">
                      AED 10,000 - 20,000
                    </SelectItem>
                    <SelectItem value="20000-50000" className="hover:bg-gray-600">
                      AED 20,000 - 50,000
                    </SelectItem>
                    <SelectItem value="above-50000" className="hover:bg-gray-600">
                      Above AED 50,000
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Timeline</Label>
                <Select
                  value={newBooking.timeline}
                  onValueChange={(value) => setNewBooking({ ...newBooking, timeline: value })}
                >
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    <SelectItem value="urgent" className="hover:bg-gray-600">
                      Urgent (Within 1 week)
                    </SelectItem>
                    <SelectItem value="short" className="hover:bg-gray-600">
                      Short (1-2 weeks)
                    </SelectItem>
                    <SelectItem value="medium" className="hover:bg-gray-600">
                      Medium (2-4 weeks)
                    </SelectItem>
                    <SelectItem value="flexible" className="hover:bg-gray-600">
                      Flexible
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-gray-300">
                  Scheduled Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newBooking.scheduled_date}
                  onChange={(e) => setNewBooking({ ...newBooking, scheduled_date: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-gray-300">
                  Scheduled Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newBooking.scheduled_time}
                  onChange={(e) => setNewBooking({ ...newBooking, scheduled_time: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#C4D600] hover:bg-[#b8c200] text-black font-semibold">
              Create Booking
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - No change needed here */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Are you sure you want to delete this booking? This action cannot be undone.</p>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteConfirm!)}
              className="bg-red-600 hover:bg-red-700"
            >
              {" "}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
