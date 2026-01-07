"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Search, Mail, Phone, Building2, User, ShieldCheck, Ban } from "lucide-react"

export default function ClientApprovalsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [filteredClients, setFilteredClients] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    filterClients()
  }, [clients, searchQuery, statusFilter])

  async function fetchClients() {
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setClients(data)
    }
    setLoading(false)
  }

  function filterClients() {
    let filtered = clients

    if (statusFilter !== "all") {
      filtered = filtered.filter((client) => client.account_status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (client) =>
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.company_name?.toLowerCase().includes(query),
      )
    }

    setFilteredClients(filtered)
  }

  async function handleApprove(clientId: string, email: string, name: string) {
    const { error } = await supabase
      .from("clients")
      .update({
        admin_approved: true,
        account_status: "active",
      })
      .eq("id", clientId)

    if (!error) {
      try {
        await fetch("/api/send-approval-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
          }),
        })
      } catch (emailError) {
        console.error("[v0] Failed to send approval email:", emailError)
      }

      await supabase.from("security_logs").insert({
        event_type: "account_approved",
        metadata: { client_id: clientId, email, approved_by: "admin" },
      })

      fetchClients()
    }
  }

  async function handleReject(clientId: string, email: string) {
    const { error } = await supabase
      .from("clients")
      .update({
        admin_approved: false,
        account_status: "suspended",
      })
      .eq("id", clientId)

    if (!error) {
      await supabase.from("security_logs").insert({
        event_type: "account_rejected",
        metadata: { client_id: clientId, email, rejected_by: "admin" },
      })

      fetchClients()
    }
  }

  async function handleSuspend(clientId: string, email: string) {
    const { error } = await supabase
      .from("clients")
      .update({
        account_status: "suspended",
      })
      .eq("id", clientId)

    if (!error) {
      await supabase.from("security_logs").insert({
        event_type: "account_suspended",
        metadata: { client_id: clientId, email, suspended_by: "admin" },
      })

      fetchClients()
    }
  }

  async function handleBan(clientId: string, email: string) {
    const { error } = await supabase
      .from("clients")
      .update({
        account_status: "banned",
      })
      .eq("id", clientId)

    if (!error) {
      await supabase.from("security_logs").insert({
        event_type: "account_banned",
        metadata: { client_id: clientId, email, banned_by: "admin" },
      })

      fetchClients()
    }
  }

  const pendingCount = clients.filter((c) => c.account_status === "pending").length
  const activeCount = clients.filter((c) => c.account_status === "active").length
  const suspendedCount = clients.filter((c) => c.account_status === "suspended").length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Account Approvals</h1>
        <p className="text-gray-600 mt-1">Review and approve new client registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Accounts</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-red-600">{suspendedCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Loading clients...</p>
          </Card>
        ) : filteredClients.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No clients found matching your filters</p>
          </Card>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
                        <Badge
                          variant={
                            client.account_status === "active"
                              ? "default"
                              : client.account_status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {client.account_status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Registered: {new Date(client.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      {client.email}
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
                    )}
                    {client.company_name && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="h-4 w-4" />
                        {client.company_name}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      Client #{client.client_number || "N/A"}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <Badge variant={client.email_verified ? "default" : "secondary"}>
                      {client.email_verified ? "Email Verified" : "Email Not Verified"}
                    </Badge>
                    <Badge variant={client.admin_approved ? "default" : "secondary"}>
                      {client.admin_approved ? "Admin Approved" : "Pending Approval"}
                    </Badge>
                    {client.referred_by && <Badge variant="outline">Referred: {client.referred_by}</Badge>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col lg:w-48">
                  {client.account_status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApprove(client.id, client.email, client.name)}
                        className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(client.id, client.email)}
                        variant="outline"
                        className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}

                  {client.account_status === "active" && (
                    <Button
                      onClick={() => handleSuspend(client.id, client.email)}
                      variant="outline"
                      className="flex-1 lg:flex-none border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  )}

                  {(client.account_status === "suspended" || client.account_status === "active") && (
                    <Button
                      onClick={() => handleBan(client.id, client.email)}
                      variant="outline"
                      className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Ban
                    </Button>
                  )}

                  {client.account_status === "suspended" && (
                    <Button
                      onClick={() => handleApprove(client.id, client.email, client.name)}
                      className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Reactivate
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
