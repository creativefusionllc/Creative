"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Home, Calendar, Wallet, Gift, FileText, User, LogOut, Menu, X, Settings, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NotificationCenter } from "./notification-center"

interface ClientLayoutProps {
  children: React.ReactNode
  user?: {
    email: string
    name?: string
    id?: string
  }
  walletBalance?: number
  pointsBalance?: number
}

const navItems = [
  { href: "/client/dashboard", label: "Dashboard", icon: Home },
  { href: "/client/bookings", label: "My Bookings", icon: Calendar },
  { href: "/client/wallet", label: "Wallet", icon: Wallet },
  { href: "/client/points", label: "Points & Rewards", icon: Gift },
  { href: "/client/invoices", label: "Invoices", icon: FileText },
  { href: "/client/social-media", label: "Social Media", icon: Share2 },
  { href: "/client/banners", label: "My Banners", icon: Plus }, // New banners menu item
]

export function ClientLayout({ children, user, walletBalance = 0, pointsBalance = 0 }: ClientLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)
  const [loading, setLoading] = useState(!user)
  const [clientId, setClientId] = useState("")

  useEffect(() => {
    if (!user) {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data: { user: authUser } }) => {
        if (authUser) {
          setCurrentUser({
            email: authUser.email || "",
            name: authUser.user_metadata?.full_name || authUser.user_metadata?.company_name,
            id: authUser.id,
          })
          fetchClientId(authUser.id)
        }
        setLoading(false)
      })
    } else if (user?.id) {
      fetchClientId(user.id)
    }
  }, [user])

  async function fetchClientId(userId: string) {
    const supabase = createClient()
    const { data } = await supabase.from("clients").select("id").eq("user_id", userId).single()
    if (data) {
      setClientId(data.id)
    }
  }

  const displayUser = currentUser || { email: "", name: "Client" }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#141414] border-b border-white/10 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-white">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="font-bold text-lg text-white">
            Creative Fusion
          </Link>
          <NotificationCenter clientId={clientId} />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#141414] overflow-y-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-white">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Mobile Wallet/Points */}
            <div className="p-4 border-b border-white/10">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-300">Wallet</p>
                  <p className="font-bold text-[#C4D600]">AED {walletBalance.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-300">Points</p>
                  <p className="font-bold text-[#C4D600]">{pointsBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-[#C4D600] text-[#0a0a0a] font-medium"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/client/profile"
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname === "/client/profile"
                    ? "bg-[#C4D600] text-[#0a0a0a] font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5",
                )}
              >
                <Settings className="h-5 w-5" />
                Profile Settings
              </Link>
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-[#141414] border-r border-white/10">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C4D600] rounded-lg flex items-center justify-center">
                <span className="font-bold text-black">CF</span>
              </div>
              <span className="font-bold text-xl text-white">Creative Fusion</span>
            </Link>
          </div>

          {/* User Info with Wallet & Points */}
          <div className="p-4 border-b border-white/10">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C4D600] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{displayUser.name || "Client"}</p>
                  <p className="text-xs text-gray-300 truncate">{displayUser.email}</p>
                </div>
                <NotificationCenter clientId={clientId} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-300">Wallet</p>
                  <p className="font-bold text-[#C4D600]">AED {walletBalance.toFixed(2)}</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-300">Points</p>
                  <p className="font-bold text-[#C4D600]">{pointsBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="p-4 border-b border-white/10">
            <Link
              href="/client/book"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#C4D600] text-[#0a0a0a] font-medium rounded-lg hover:bg-[#a8b800] transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Booking
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-[#C4D600] text-[#0a0a0a] font-medium"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Profile & Sign Out */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/client/profile"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                pathname === "/client/profile"
                  ? "bg-[#C4D600] text-[#0a0a0a] font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5",
              )}
            >
              <Settings className="h-5 w-5" />
              Profile Settings
            </Link>
            <form action="/api/auth/signout" method="post">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/5"
                type="submit"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">{children}</main>
      </div>
    </div>
  )
}
