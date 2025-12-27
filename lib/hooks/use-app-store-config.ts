"use client"

import { useEffect, useState, useCallback } from "react"

interface AppStoreConfig {
  id?: string
  ios_app_id: string
  ios_app_url: string
  android_package_name: string
  android_app_url: string
  is_active: boolean
  auto_redirect: boolean
  show_banner_on_mobile: boolean
  banner_text: string
  created_at?: string
  updated_at?: string
}

export function useAppStoreConfig() {
  const [config, setConfig] = useState<AppStoreConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch config on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/admin/app-store-config", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch app store config")
        }

        const data = await response.json()
        setConfig(data)
        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching app store config:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        // Set default config on error
        setConfig({
          ios_app_id: "",
          ios_app_url: "https://apps.apple.com/ae/app/creative-fusion/id",
          android_package_name: "",
          android_app_url: "https://play.google.com/store/apps/details?id=",
          is_active: false,
          auto_redirect: true,
          show_banner_on_mobile: true,
          banner_text: "Download Creative Fusion App",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  // Get full iOS App Store URL
  const getIOSLink = useCallback(() => {
    if (!config?.ios_app_id) return null
    return `${config.ios_app_url}${config.ios_app_id}`
  }, [config])

  // Get full Android Play Store URL
  const getAndroidLink = useCallback(() => {
    if (!config?.android_package_name) return null
    return `${config.android_app_url}${config.android_package_name}`
  }, [config])

  // Save config
  const saveConfig = useCallback(
    async (newConfig: Partial<AppStoreConfig>) => {
      try {
        const response = await fetch("/api/admin/app-store-config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...config,
            ...newConfig,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save app store config")
        }

        const data = await response.json()
        setConfig(data)
        return data
      } catch (err) {
        console.error("[v0] Error saving app store config:", err)
        throw err
      }
    },
    [config],
  )

  return {
    config,
    loading,
    error,
    getIOSLink,
    getAndroidLink,
    saveConfig,
  }
}
