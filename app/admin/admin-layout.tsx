"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  Share2,
  FileText,
  Wallet,
  Settings,
  Building,
  TrendingUp,
  Search,
  Zap,
  BarChart3,
  Palette,
  Globe,
  ChevronDown,
  ChevronRight,
  Shield,
  Bot,
  Target,
  Megaphone,
  FileBarChart,
  Edit,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Operation",
    items: [
      { href: "/admin/bookings", label: "Bookings", icon: Calendar },
      { href: "/admin/clients", label: "Clients", icon: Users },
      { href: "/admin/companies", label: "Companies", icon: Building },
      { href: "/admin/services", label: "Services", icon: Briefcase },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin/invoices", label: "Invoices", icon: FileText },
      { href: "/admin/payments", label: "Payments", icon: Wallet },
      { href: "/admin/wallet", label: "Wallet Management", icon: Wallet },
    ],
  },
  {
    label: "Lead Generation & CRM",
    aiPowered: true,
    items: [
      { href: "/admin/leads", label: "AI Lead Manager", icon: Target, badge: "AI" },
      { href: "/admin/leads/scoring", label: "AI Lead Scoring", icon: Sparkles, badge: "AI" },
      { href: "/admin/leads/nurturing", label: "Auto Nurturing", icon: Bot, badge: "AI" },
      { href: "/admin/campaigns", label: "AI Campaigns", icon: Megaphone, badge: "AI" },
    ],
  },
  {
    label: "Social Media",
    aiPowered: true,
    items: [
      { href: "/admin/social-media", label: "AI Content Creator", icon: Share2, badge: "AI" },
      { href: "/admin/social-media/scheduler", label: "Auto Scheduler", icon: Calendar, badge: "AI" },
      { href: "/admin/social-analytics", label: "AI Analytics", icon: BarChart3, badge: "AI" },
    ],
  },
  {
    label: "Marketing & SEO",
    aiPowered: true,
    items: [
      { href: "/admin/marketing", label: "AI Marketing Hub", icon: TrendingUp, badge: "AI" },
      { href: "/admin/seo", label: "AI SEO Optimizer", icon: Search, badge: "AI" },
      { href: "/admin/auto-seo", label: "Auto SEO", icon: Zap, badge: "AI" },
      { href: "/admin/marketing/content-ai", label: "AI Content Writer", icon: Edit, badge: "AI" },
    ],
  },
  {
    label: "Brand & Reports",
    aiPowered: true,
    items: [
      { href: "/admin/brand-reports", label: "AI Brand Reports", icon: FileBarChart, badge: "AI" },
      { href: "/admin/reports", label: "AI Analytics", icon: BarChart3, badge: "AI" },
    ],
  },
  {
    label: "Creative Studio",
    aiPowered: true,
    items: [
      { href: "/admin/creative-studio", label: "AI Studio", icon: Palette, badge: "AI" },
      { href: "/admin/creative-studio/ai-design", label: "AI Designer", icon: Sparkles, badge: "AI" },
      { href: "/admin/creative-studio/projects", label: "Projects", icon: Briefcase },
    ],
  },
  {
    label: "Content Management",
    aiPowered: true,
    items: [
      { href: "/admin/website-cms", label: "Website CMS", icon: Globe },
      { href: "/admin/cms/sitemap", label: "Sitemap", icon: Globe },
      { href: "/admin/cms/pages", label: "Pages & Templates", icon: Edit },
      { href: "/admin/cms/roles", label: "Role Configuration", icon: Shield },
      { href: "/admin/content-calendar", label: "AI Content Calendar", icon: Calendar, badge: "AI" },
      { href: "/admin/blog", label: "Blog Manager", icon: Edit },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/user-management", label: "User Management", icon: Shield },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  const renderNavItems = (isMobile = false) => {
    return navItems.map((item) => {
      // Single item (Dashboard)
      if ("href" in item) {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-[#C4D600] text-black shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      }

      // Section with subitems
      const isExpanded = expandedSections.includes(item.label)
      const hasActiveChild = item.items?.some((subItem) => pathname.startsWith(subItem.href))
      const aiPowered = "aiPowered" in item && item.aiPowered

      return (
        <div key={item.label} className="space-y-1">
          <button
            onClick={() => toggleSection(item.label)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-sm",
              hasActiveChild
                ? "bg-[#C4D600]/10 text-gray-900 font-medium border border-[#C4D600]/30"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <div className="flex items-center gap-2">
              <span>{item.label}</span>
              {aiPowered && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded">
                  AI
                </span>
              )}
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isExpanded && item.items && (
            <div className="ml-4 space-y-1">
              {item.items.map((subItem) => {
                const Icon = subItem.icon
                const isActive = pathname === subItem.href
                const hasBadge = "badge" in subItem && subItem.badge
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                      isActive
                        ? "bg-[#C4D600] text-black shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {subItem.label}
                    </div>
                    {hasBadge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded">
                        {subItem.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Mobile Header */}
      <header className="lg:hidden bg-gray-900 shadow-lg border-b border-[#C4D600]/20 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="h-6 w-6 text-[#C4D600]" />
          </button>
          <span className="font-bold text-white">Creative Fusion Admin</span>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-gray-900 overflow-y-auto border-r border-[#C4D600]/20">
            <div className="p-4 border-b border-[#C4D600]/20 flex items-center justify-between">
              <span className="font-bold text-white">Admin Menu</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-[#C4D600]" />
              </button>
            </div>
            <nav className="p-4 space-y-1">{renderNavItems(true)}</nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 border-r border-[#C4D600]/20">
          {/* Logo */}
          <div className="p-6 border-b border-[#C4D600]/30">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#C4D600] rounded-lg flex items-center justify-center font-bold text-black shadow-lg group-hover:shadow-xl transition-shadow">
                CF
              </div>
              <div>
                <span className="font-bold text-lg block text-white">Creative Fusion</span>
                <span className="text-xs text-[#C4D600]/70">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">{renderNavItems(false)}</nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#C4D600]/20 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-[#C4D600] transition-colors font-medium"
            >
              <span>View Website</span>
            </Link>
            <form action="/auth/signout" method="post">
              <Button
                variant="outline"
                className="w-full justify-start text-sm bg-transparent text-white border-[#C4D600]/30 hover:bg-[#C4D600]/10 hover:text-[#C4D600] hover:border-[#C4D600]/50"
                type="submit"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 bg-gray-950">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
