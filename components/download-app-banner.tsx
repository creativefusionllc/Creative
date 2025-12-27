"use client"

import { useState, useEffect } from "react"
import { X, Apple, Smartphone } from "lucide-react"
import { useAppStoreConfig } from "@/lib/hooks/use-app-store-config"

export function DownloadAppBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [userPlatform, setUserPlatform] = useState<"ios" | "android" | null>(null)
  const { config, getIOSLink, getAndroidLink } = useAppStoreConfig()

  useEffect(() => {
    // Detect user's platform
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipot/.test(ua)) {
      setUserPlatform("ios")
      if (config?.auto_redirect && config?.is_active) {
        const iosLink = getIOSLink()
        if (iosLink) {
          window.location.href = iosLink
        }
      }
    } else if (/android/.test(ua)) {
      setUserPlatform("android")
      if (config?.auto_redirect && config?.is_active) {
        const androidLink = getAndroidLink()
        if (androidLink) {
          window.location.href = androidLink
        }
      }
    }
  }, [config, getIOSLink, getAndroidLink])

  if (!isVisible || !config?.is_active) return null
  if (config?.show_banner_on_mobile && !userPlatform) return null

  const iosLink = getIOSLink()
  const androidLink = getAndroidLink()

  if (!iosLink || !androidLink) return null

  return (
    <div className="bg-gradient-to-r from-[#C4D600] to-[#a8b800] py-3 px-4 lg:py-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.5),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base flex items-center gap-2">
            <span>📱 {config?.banner_text || "Download our app"}:</span>
            {userPlatform && (
              <span className="text-gray-800 text-xs font-normal italic">
                ({userPlatform === "ios" ? "Get iOS app" : "Get Android app"})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={iosLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all hover:shadow-lg font-medium text-xs sm:text-sm"
            aria-label="Download Creative Fusion on iOS App Store"
          >
            <Apple className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">iOS</span>
          </a>

          <a
            href={androidLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all hover:shadow-lg font-medium text-xs sm:text-sm"
            aria-label="Download Creative Fusion on Google Play Store"
          >
            <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Android</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-900 hover:text-gray-700 transition-colors p-1"
            aria-label="Close download banner"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
