"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Building2, Bell, Shield, Palette, Smartphone } from "lucide-react"

export function SystemSettings() {
  const [saving, setSaving] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Creative Fusion LLC",
    email: "info@creativefusion.llc",
    phone: "+971 58 117 4911",
    address: "Sharjah Media City (SHAMS), UAE",
    website: "https://creativefusion.llc",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newLeadAlert: true,
    newOrderAlert: true,
    paymentAlert: true,
    weeklyReport: true,
  })

  const [appStoreConfig, setAppStoreConfig] = useState({
    ios_app_id: "",
    ios_app_url: "https://apps.apple.com/ae/app/creative-fusion/id",
    android_package_name: "",
    android_app_url: "https://play.google.com/store/apps/details?id=",
    is_active: true,
    auto_redirect: true,
    show_banner_on_mobile: true,
    banner_text: "Download Creative Fusion App",
  })

  useEffect(() => {
    fetchAppStoreConfig()
  }, [])

  async function fetchAppStoreConfig() {
    try {
      const response = await fetch("/api/admin/app-store-config")
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setAppStoreConfig(data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch app store config:", error)
    }
  }

  async function handleSave() {
    setSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    toast.success("Settings saved successfully")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-gray-400">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#141414] border border-white/10">
          <TabsTrigger
            value="general"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="mobile-apps"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Mobile Apps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#C4D600]" />
                Company Information
              </CardTitle>
              <CardDescription className="text-gray-400">Basic company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={generalSettings.website}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#C4D600]" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-gray-400">Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">New Lead Alerts</p>
                  <p className="text-sm text-gray-400">Get notified when new leads come in</p>
                </div>
                <Switch
                  checked={notificationSettings.newLeadAlert}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, newLeadAlert: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">New Order Alerts</p>
                  <p className="text-sm text-gray-400">Get notified for new shop orders</p>
                </div>
                <Switch
                  checked={notificationSettings.newOrderAlert}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, newOrderAlert: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Payment Alerts</p>
                  <p className="text-sm text-gray-400">Get notified for payment verifications</p>
                </div>
                <Switch
                  checked={notificationSettings.paymentAlert}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, paymentAlert: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Weekly Reports</p>
                  <p className="text-sm text-gray-400">Receive weekly summary reports</p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReport}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, weeklyReport: checked })
                  }
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#C4D600]" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium text-white mb-2">Change Password</h4>
                <div className="space-y-3">
                  <Input type="password" placeholder="Current Password" className="bg-white/5 border-white/10" />
                  <Input type="password" placeholder="New Password" className="bg-white/5 border-white/10" />
                  <Input type="password" placeholder="Confirm New Password" className="bg-white/5 border-white/10" />
                </div>
                <Button className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]">Update Password</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" className="border-white/20 bg-transparent">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#C4D600]" />
                Appearance Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Dark Mode</p>
                  <p className="text-sm text-gray-400">Use dark theme (currently active)</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Compact Mode</p>
                  <p className="text-sm text-gray-400">Use smaller spacing and fonts</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-3">
                  {["#C4D600", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"].map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-lg border-2 ${color === "#C4D600" ? "border-white" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile-apps">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-[#C4D600]" />
                Mobile App Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure iOS and Android app store links for downloads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* iOS Configuration */}
              <div className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">🍎</span>
                  iOS App Store
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">App Store ID</Label>
                    <Input
                      placeholder="e.g., 6736254891"
                      value={appStoreConfig.ios_app_id}
                      onChange={(e) => setAppStoreConfig({ ...appStoreConfig, ios_app_id: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Find this in the URL: apps.apple.com/app/name/id{"{APP_ID}"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">App Store URL Preview</Label>
                    <Input
                      disabled
                      value={`${appStoreConfig.ios_app_url}${appStoreConfig.ios_app_id}`}
                      className="bg-white/5 border-white/10 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Android Configuration */}
              <div className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  Google Play Store
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Package Name</Label>
                    <Input
                      placeholder="e.g., com.creativefusion.app"
                      value={appStoreConfig.android_package_name}
                      onChange={(e) =>
                        setAppStoreConfig({
                          ...appStoreConfig,
                          android_package_name: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-400">Find in Google Play Console under App Information</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Google Play URL Preview</Label>
                    <Input
                      disabled
                      value={`${appStoreConfig.android_app_url}${appStoreConfig.android_package_name}`}
                      className="bg-white/5 border-white/10 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Download Banner Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Download Banner Settings</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Enable Download Banner</p>
                    <p className="text-sm text-gray-400">Show download banner on mobile devices</p>
                  </div>
                  <Switch
                    checked={appStoreConfig.is_active}
                    onCheckedChange={(checked) => setAppStoreConfig({ ...appStoreConfig, is_active: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Auto-Redirect</p>
                    <p className="text-sm text-gray-400">Automatically redirect mobile users to their app store</p>
                  </div>
                  <Switch
                    checked={appStoreConfig.auto_redirect}
                    onCheckedChange={(checked) => setAppStoreConfig({ ...appStoreConfig, auto_redirect: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Show On Mobile</p>
                    <p className="text-sm text-gray-400">Display banner only on mobile devices</p>
                  </div>
                  <Switch
                    checked={appStoreConfig.show_banner_on_mobile}
                    onCheckedChange={(checked) =>
                      setAppStoreConfig({
                        ...appStoreConfig,
                        show_banner_on_mobile: checked,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Banner Text</Label>
                  <Input
                    value={appStoreConfig.banner_text}
                    onChange={(e) => setAppStoreConfig({ ...appStoreConfig, banner_text: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                {saving ? "Saving..." : "Save App Store Configuration"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
