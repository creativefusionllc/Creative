"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, CheckCircle, XCircle, Loader2, ImageIcon, Download, TrendingUp } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { EnvatoAssetPicker } from "@/components/envato/envato-asset-picker"

export default function EnvatoSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    api_token: "",
    account_email: "",
    auto_sync_enabled: true,
    sync_frequency_hours: 24,
    is_active: true,
  })
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalDownloads: 0,
    clientUsage: 0,
  })
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    loadSettings()
    loadStats()
  }, [])

  async function loadSettings() {
    setLoading(true)
    try {
      const { data } = await supabase.from("envato_settings").select("*").eq("is_active", true).single()

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setLoading(false)
    }
  }

  async function loadStats() {
    try {
      const { count: assetsCount } = await supabase.from("envato_assets").select("*", { count: "exact", head: true })

      const { count: usageCount } = await supabase
        .from("envato_client_usage")
        .select("*", { count: "exact", head: true })

      const { data: downloads } = await supabase.from("envato_assets").select("downloads_count")

      const totalDownloads = downloads?.reduce((sum, item) => sum + (item.downloads_count || 0), 0) || 0

      setStats({
        totalAssets: assetsCount || 0,
        totalDownloads,
        clientUsage: usageCount || 0,
      })
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  async function testConnection() {
    setTestStatus("testing")
    try {
      const response = await fetch(`/api/envato/search?q=business&type=photo`)
      if (response.ok) {
        setTestStatus("success")
        setTimeout(() => setTestStatus("idle"), 3000)
      } else {
        setTestStatus("error")
      }
    } catch (error) {
      setTestStatus("error")
    }
  }

  async function saveSettings() {
    setSaving(true)
    try {
      const { error } = await supabase.from("envato_settings").upsert(settings)

      if (!error) {
        alert("Settings saved successfully!")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Envato Elements Integration</h1>
        <p className="text-muted-foreground">Connect your Envato subscription to access unlimited stock assets</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available in library</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total asset downloads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clientUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Assets used by clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Form */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Configure your Envato Elements API token for automatic asset access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api_token">Envato API Token</Label>
            <Input
              id="api_token"
              type="password"
              value={settings.api_token}
              onChange={(e) => setSettings({ ...settings, api_token: e.target.value })}
              placeholder="Enter your Envato Elements API token"
            />
            <p className="text-xs text-muted-foreground">Get your token from Envato Elements → Settings → API</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account_email">Account Email</Label>
            <Input
              id="account_email"
              type="email"
              value={settings.account_email}
              onChange={(e) => setSettings({ ...settings, account_email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically sync new assets from Envato</p>
            </div>
            <Switch
              checked={settings.auto_sync_enabled}
              onCheckedChange={(checked) => setSettings({ ...settings, auto_sync_enabled: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sync_frequency">Sync Frequency (hours)</Label>
            <Input
              id="sync_frequency"
              type="number"
              min="1"
              max="168"
              value={settings.sync_frequency_hours}
              onChange={(e) => setSettings({ ...settings, sync_frequency_hours: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Integration Active</Label>
              <p className="text-sm text-muted-foreground">Enable or disable Envato integration</p>
            </div>
            <Switch
              checked={settings.is_active}
              onCheckedChange={(checked) => setSettings({ ...settings, is_active: checked })}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>

            <Button variant="outline" onClick={testConnection} disabled={testStatus === "testing"}>
              {testStatus === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {testStatus === "success" && <CheckCircle className="mr-2 h-4 w-4 text-green-500" />}
              {testStatus === "error" && <XCircle className="mr-2 h-4 w-4 text-red-500" />}
              {testStatus === "idle" && "Test Connection"}
              {testStatus === "testing" && "Testing..."}
              {testStatus === "success" && "Connected!"}
              {testStatus === "error" && "Failed"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Asset Browser Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Browse Assets</CardTitle>
          <CardDescription>Test the Envato asset browser</CardDescription>
        </CardHeader>
        <CardContent>
          <EnvatoAssetPicker
            onSelect={(asset) => {
              /* Production - logging removed */
            }}
            assetType="photo"
          />
        </CardContent>
      </Card>
    </div>
  )
}
