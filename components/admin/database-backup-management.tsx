"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Database, Download, RefreshCw, HardDrive, Clock, CheckCircle, AlertCircle, FileJson } from "lucide-react"

interface BackupLog {
  id: string
  backup_type: string
  backup_name: string
  tables_included: string[]
  file_size: string | null
  status: string
  notes: string | null
  created_at: string
}

const allTables = [
  "clients",
  "companies",
  "bookings",
  "invoices",
  "wallet_transactions",
  "leads",
  "lead_activities",
  "lead_sources",
  "shop_products",
  "shop_orders",
  "shop_categories",
  "shop_coupons",
  "subscription_plans",
  "client_subscriptions",
  "social_media_accounts",
  "social_media_reports",
  "promo_codes",
  "seo_keywords",
  "seo_pages",
  "seo_ai_content",
  "marketing_campaigns",
]

export function DatabaseBackupManagement() {
  const supabase = createClient()
  const [backupLogs, setBackupLogs] = useState<BackupLog[]>([])
  const [loading, setLoading] = useState(true)
  const [backing, setBacking] = useState(false)
  const [selectedTables, setSelectedTables] = useState<string[]>(allTables)

  async function fetchData() {
    const { data } = await supabase.from("backup_logs").select("*").order("created_at", { ascending: false }).limit(20)

    if (data) setBackupLogs(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function toggleTable(table: string) {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((t) => t !== table))
    } else {
      setSelectedTables([...selectedTables, table])
    }
  }

  function selectAll() {
    setSelectedTables(allTables)
  }

  function deselectAll() {
    setSelectedTables([])
  }

  async function createBackup() {
    if (selectedTables.length === 0) {
      toast.error("Please select at least one table to backup")
      return
    }

    setBacking(true)

    const backupData: Record<string, any[]> = {}

    for (const table of selectedTables) {
      const { data, error } = await supabase.from(table).select("*")
      if (!error && data) {
        backupData[table] = data
      }
    }

    // Create JSON file
    const jsonString = JSON.stringify(backupData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const fileSize = `${(blob.size / 1024).toFixed(2)} KB`

    // Download file
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `backup_${new Date().toISOString().split("T")[0]}_${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Log backup
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("backup_logs").insert([
      {
        backup_type: selectedTables.length === allTables.length ? "full" : "partial",
        backup_name: `Backup ${new Date().toLocaleDateString()}`,
        tables_included: selectedTables,
        file_size: fileSize,
        status: "completed",
        notes: `Exported ${selectedTables.length} tables`,
        created_by: user?.id,
      },
    ])

    setBacking(false)
    toast.success("Backup created and downloaded successfully!")
    fetchData()
  }

  async function exportTableAsCSV(tableName: string) {
    const { data, error } = await supabase.from(tableName).select("*")

    if (error || !data || data.length === 0) {
      toast.error(`No data found in ${tableName}`)
      return
    }

    // Convert to CSV
    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            if (value === null) return ""
            if (typeof value === "object") return `"${JSON.stringify(value).replace(/"/g, '""')}"`
            if (typeof value === "string" && value.includes(",")) return `"${value}"`
            return value
          })
          .join(","),
      ),
    ]

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv" })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${tableName}_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`${tableName} exported as CSV`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Database Backup</h1>
          <p className="text-gray-400">Export and backup your database tables</p>
        </div>
      </div>

      {/* Backup Creation */}
      <Card className="bg-[#141414] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-[#C4D600]" />
            Create New Backup
          </CardTitle>
          <CardDescription className="text-gray-400">Select tables to include in your backup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
              className="border-white/20 text-gray-300 bg-transparent"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={deselectAll}
              className="border-white/20 text-gray-300 bg-transparent"
            >
              Deselect All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allTables.map((table) => (
              <div
                key={table}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedTables.includes(table)
                    ? "bg-[#C4D600]/20 border border-[#C4D600]/50"
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
                onClick={() => toggleTable(table)}
              >
                <Checkbox checked={selectedTables.includes(table)} onCheckedChange={() => toggleTable(table)} />
                <span className="text-sm text-white">{table}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              {selectedTables.length} of {allTables.length} tables selected
            </p>
            <Button
              onClick={createBackup}
              disabled={backing || selectedTables.length === 0}
              className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
            >
              {backing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Create & Download Backup
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Individual Tables */}
      <Card className="bg-[#141414] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileJson className="h-5 w-5 text-blue-400" />
            Export Individual Tables (CSV)
          </CardTitle>
          <CardDescription className="text-gray-400">Download individual tables as CSV files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allTables.map((table) => (
              <Button
                key={table}
                variant="outline"
                size="sm"
                onClick={() => exportTableAsCSV(table)}
                className="border-white/20 text-gray-300 hover:bg-white/10 justify-start"
              >
                <Download className="h-3 w-3 mr-2" />
                {table}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card className="bg-[#141414] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-400" />
            Backup History
          </CardTitle>
          <CardDescription className="text-gray-400">Recent backup operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#C4D600]/20 rounded-full flex items-center justify-center">
                    {log.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{log.backup_name}</p>
                    <p className="text-sm text-gray-400">
                      {log.tables_included?.length || 0} tables · {log.file_size || "Unknown size"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      log.backup_type === "full" ? "bg-[#C4D600]/20 text-[#C4D600]" : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {log.backup_type}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{new Date(log.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {backupLogs.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <HardDrive className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                <p>No backup history yet</p>
                <p className="text-sm text-gray-500">Create your first backup above</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
