"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Client {
  id: string
  name: string
  email: string
  company_name: string
  status: string
}

interface ClientSelectorProps {
  onClientSelect: (clientId: string, clientName: string) => void
  selectedClientId: string
}

export function ClientSelector({ onClientSelect, selectedClientId }: ClientSelectorProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, email, company_name, status")
        .eq("status", "active")
        .order("company_name")

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error("Error fetching clients:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Building2 className="h-5 w-5" />
            <span className="font-semibold">Select Client:</span>
          </div>

          <Select
            value={selectedClientId || ""}
            onValueChange={(value) => {
              const client = clients.find((c) => c.id === value)
              if (client) {
                onClientSelect(value, client.company_name || client.name)
              }
            }}
            disabled={loading}
          >
            <SelectTrigger className="w-[300px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={loading ? "Loading clients..." : "Select a client to manage"} />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div className="flex flex-col">
                    <span className="font-semibold">{client.company_name || client.name}</span>
                    <span className="text-xs text-muted-foreground">{client.email}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedClientId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClientSelect("", "")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear Selection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientSelector
