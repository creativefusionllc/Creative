"use client"

import { useState, useEffect } from "react"
import { ClientLayout } from "@/components/client/client-layout"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function ClientBannersPage() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchBanners()
  }, [])

  async function fetchBanners() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("promo_banners")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setBanners(data)
      }
    } finally {
      setLoading(false)
    }
  }

  async function toggleBannerStatus(id: string, isActive: boolean) {
    const { error } = await supabase.from("promo_banners").update({ is_active: !isActive }).eq("id", id)

    if (!error) {
      setBanners(banners.map((b) => (b.id === id ? { ...b, is_active: !b.is_active } : b)))
    }
  }

  async function deleteBanner(id: string) {
    if (confirm("Are you sure you want to delete this banner?")) {
      const { error } = await supabase.from("promo_banners").delete().eq("id", id)

      if (!error) {
        setBanners(banners.filter((b) => b.id !== id))
      }
    }
  }

  return (
    <ClientLayout>
      <div className="p-6 bg-gradient-to-b from-[#0a0a0a] to-[#141414] min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Promotional Banners</h1>
            <p className="text-gray-300">Manage and track your promotional campaigns</p>
          </div>
          <Link href="/client/banners/new">
            <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
              <Plus className="mr-2 h-5 w-5" />
              Create Banner
            </Button>
          </Link>
        </div>

        {/* Banners Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-300">Loading banners...</p>
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-[#141414] border border-white/10 rounded-xl p-12 text-center">
            <p className="text-gray-300 mb-4">No banners yet</p>
            <Link href="/client/banners/new">
              <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">Create Your First Banner</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden hover:border-[#C4D600]/50 transition-colors"
              >
                {/* Banner Preview */}
                <div
                  className="h-32 bg-cover bg-center"
                  style={{
                    backgroundColor: banner.background_color || "#C4D600",
                    backgroundImage: banner.image_url ? `url(${banner.image_url})` : undefined,
                  }}
                />

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{banner.title}</h3>
                      <p className="text-sm text-gray-300 line-clamp-2">{banner.subtitle}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        banner.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {banner.is_active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-t border-b border-white/5">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Impressions</p>
                      <p className="font-bold text-[#C4D600]">{banner.impressions || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Clicks</p>
                      <p className="font-bold text-[#C4D600]">{banner.clicks || 0}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBannerStatus(banner.id, banner.is_active)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition-colors"
                    >
                      {banner.is_active ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show
                        </>
                      )}
                    </button>
                    <Link href={`/client/banners/${banner.id}/edit`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-2 py-2 rounded bg-[#C4D600]/10 hover:bg-[#C4D600]/20 text-[#C4D600] text-sm transition-colors">
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  )
}
