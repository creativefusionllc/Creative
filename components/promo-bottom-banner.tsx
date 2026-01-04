"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"

interface PromoBanner {
  id: string
  title: string
  subtitle: string
  description: string
  cta_text: string
  cta_link: string
  background_color: string
  text_color: string
  is_active: boolean
  show_form: boolean
  form_type: "inquiry" | "consultation" | "booking"
}

export function PromoBottomBanner() {
  const [banner, setBanner] = useState<PromoBanner | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { data, error } = await supabase
          .from("promo_banners")
          .select("*")
          .eq("is_active", true)
          .eq("position", "bottom")
          .limit(1)

        if (!error && data && data.length > 0) {
          setBanner(data[0])
        }
      } catch (err) {
        console.error("[v0] Error fetching banner:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanner()
  }, [])

  if (!isVisible || !banner || isLoading) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 w-full animate-in slide-in-from-bottom-5"
      style={{
        backgroundColor: banner.background_color || "#C4D600",
        color: banner.text_color || "#1f2937",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex-1 space-y-2">
            {banner.title && <h3 className="text-lg sm:text-xl font-bold">{banner.title}</h3>}
            {banner.subtitle && <p className="text-sm sm:text-base font-semibold opacity-90">{banner.subtitle}</p>}
            {banner.description && <p className="text-xs sm:text-sm opacity-80">{banner.description}</p>}
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">
            <Button
              onClick={() => {
                if (banner.cta_link) {
                  window.location.href = banner.cta_link
                }
              }}
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold whitespace-nowrap"
            >
              {banner.cta_text || "Learn More"}
            </Button>

            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-black/10 rounded-lg transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
