"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Wallet,
  CreditCard,
  Settings,
  FolderOpen,
  DollarSign,
  Tag,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
  BarChart3,
  Share2,
  Gift,
  Globe,
  UserPlus,
  ShoppingBag,
  Package,
  Crown,
  Database,
  TicketPercent,
  LineChart,
  Megaphone,
  PenTool,
  Target,
  Palette,
  Sparkles,
  ImageIcon,
  Bot,
  BookOpen,
  Zap,
  TrendingUp,
  MapPin,
  Link2,
  FileEdit,
  BarChart2,
  MessageSquare,
  Users2,
  Shield,
  Award,
  Printer,
  Presentation,
  Code,
  Layout,
  SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navSections = [
  // 1. Dashboard
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "from-blue-500 to-cyan-500",
    aiPowered: true,
    items: [
      { href: "/admin", label: "AI Overview", icon: LayoutDashboard, badge: "AI" },
      { href: "/admin/reports", label: "AI Reports & Analytics", icon: BarChart3, badge: "AI" },
    ],
  },
  // 2. Operation
  {
    title: "Operation",
    icon: Calendar,
    color: "from-slate-500 to-gray-500",
    aiPowered: true,
    items: [
      { href: "/admin/bookings", label: "AI Bookings", icon: Calendar, badge: "AI" },
      { href: "/admin/invoices", label: "AI Invoices", icon: FileText, badge: "AI" },
      { href: "/admin/clients", label: "AI Client Manager", icon: Users, badge: "AI" },
      { href: "/admin/companies", label: "AI Company Manager", icon: Building2, badge: "AI" },
    ],
  },
  // 3. Finance
  {
    title: "Finance",
    icon: Wallet,
    color: "from-emerald-500 to-green-500",
    aiPowered: true,
    items: [
      { href: "/admin/wallet", label: "AI Wallet", icon: Wallet, badge: "AI" },
      { href: "/admin/payments", label: "AI Payment Processor", icon: CreditCard, badge: "AI" },
      { href: "/admin/subscriptions", label: "AI Subscriptions", icon: Crown, badge: "AI" },
      { href: "/admin/promo-codes", label: "AI Promo Codes", icon: TicketPercent, badge: "AI" },
    ],
  },
  // 4. Lead Generation & CRM (AI Powered)
  {
    title: "Lead Generation & CRM",
    icon: Target,
    color: "from-red-500 to-rose-500",
    aiPowered: true,
    items: [
      { href: "/admin/auto-seo", label: "AI SEO Lead Engine", icon: Zap, badge: "AI" },
      { href: "/admin/leads", label: "AI Lead Manager", icon: UserPlus, badge: "AI" },
      { href: "/admin/leads/scoring", label: "AI Lead Scoring", icon: BarChart3, badge: "AI" },
      { href: "/admin/leads/nurturing", label: "AI Auto Nurturing", icon: Bot, badge: "AI" },
      { href: "/admin/leads/sources", label: "AI Lead Sources", icon: Target, badge: "AI" },
      { href: "/admin/leads/social", label: "AI Social Leads", icon: Share2, badge: "AI" },
      { href: "/admin/campaigns", label: "AI Campaigns", icon: Megaphone, badge: "AI" },
    ],
  },
  // 5. Social Media (AI Powered)
  {
    title: "Social Media",
    icon: Share2,
    color: "from-pink-500 to-fuchsia-500",
    aiPowered: true,
    items: [
      { href: "/admin/social-analytics", label: "AI Analytics Dashboard", icon: LineChart, badge: "AI" },
      { href: "/admin/social-analytics/accounts", label: "AI Social Accounts", icon: Share2, badge: "AI" },
      { href: "/admin/social-analytics/reports", label: "AI Social Reports", icon: FileText, badge: "AI" },
      { href: "/admin/social-media", label: "AI Content Creator", icon: Share2, badge: "AI" },
      { href: "/admin/social-media/scheduler", label: "AI Auto Scheduler", icon: Calendar, badge: "AI" },
      { href: "/admin/social-media/engagement", label: "AI Auto Engagement", icon: Bot, badge: "AI" },
      { href: "/admin/social-calendar", label: "AI Social Calendar", icon: Calendar, badge: "AI" },
      { href: "/admin/content-calendar", label: "AI Content Calendar", icon: Calendar, badge: "AI" },
    ],
  },
  // 6. Marketing & SEO (AI Powered)
  {
    title: "Marketing & SEO",
    icon: Megaphone,
    color: "from-indigo-500 to-violet-500",
    aiPowered: true,
    items: [
      { href: "/admin/marketing", label: "AI Marketing Hub", icon: Megaphone, badge: "AI" },
      { href: "/admin/marketing/seo-presentation", label: "AI SEO Presentation", icon: Presentation, badge: "AI" },
      { href: "/admin/marketing/technical-audit", label: "AI Technical Audit", icon: Shield, badge: "AI" },
      { href: "/admin/marketing/schema-generator", label: "AI Schema Generator", icon: Code, badge: "AI" },
      { href: "/admin/seo-toolkit", label: "AI SEO Toolkit", icon: Search, badge: "AI" },
      { href: "/admin/marketing/position-tracking", label: "AI Position Tracking", icon: TrendingUp, badge: "AI" },
      { href: "/admin/marketing/brand-monitoring", label: "AI Brand Monitoring", icon: SearchIcon, badge: "AI" },
      { href: "/admin/marketing/local-seo", label: "AI Local SEO", icon: MapPin, badge: "AI" },
      { href: "/admin/marketing/link-building", label: "AI Link Building", icon: Link2, badge: "AI" },
      { href: "/admin/marketing/content-optimizer", label: "AI Content Optimizer", icon: FileEdit, badge: "AI" },
      { href: "/admin/marketing/keyword-gap", label: "AI Keyword Gap", icon: BarChart2, badge: "AI" },
      { href: "/admin/marketing/topic-research", label: "AI Topic Research", icon: MessageSquare, badge: "AI" },
      { href: "/admin/marketing/influencer-finder", label: "AI Influencer Finder", icon: Users2, badge: "AI" },
      { href: "/admin/marketing/seo-writing", label: "AI SEO Writing", icon: PenTool, badge: "AI" },
      { href: "/admin/marketing/traffic-analytics", label: "AI Traffic Analytics", icon: LineChart, badge: "AI" },
      { href: "/admin/marketing/content-ai", label: "AI Content Writer", icon: Sparkles, badge: "AI" },
    ],
  },
  // 7. Brand & Reports (AI Powered)
  {
    title: "Brand & Reports",
    icon: Award,
    color: "from-orange-500 to-amber-500",
    aiPowered: true,
    items: [
      { href: "/admin/brand-reports", label: "AI Brand Reports", icon: Award, badge: "AI" },
      { href: "/admin/brand-reports/create", label: "AI Report Creator", icon: PenTool, badge: "AI" },
      { href: "/admin/brand-reports/templates", label: "AI Report Templates", icon: FileText, badge: "AI" },
      { href: "/admin/printable-reports", label: "AI Printable Reports", icon: Printer, badge: "AI" },
    ],
  },
  // 8. Creative Studio (AI Powered)
  {
    title: "Creative Studio",
    icon: Palette,
    color: "from-cyan-500 to-teal-500",
    aiPowered: true,
    items: [
      { href: "/admin/creative-studio", label: "AI Studio Dashboard", icon: Palette, badge: "AI" },
      { href: "/admin/creative-studio/editor", label: "AI Design Editor", icon: PenTool, badge: "AI" },
      { href: "/admin/creative-studio/projects", label: "AI Projects", icon: FolderOpen, badge: "AI" },
      { href: "/admin/creative-studio/brand-kits", label: "AI Brand Kits", icon: Sparkles, badge: "AI" },
      { href: "/admin/creative-studio/brand-books", label: "AI Creative Brand Book", icon: BookOpen, badge: "AI" },
      { href: "/admin/creative-studio/assets", label: "AI Asset Library", icon: ImageIcon, badge: "AI" },
      { href: "/admin/creative-studio/ai-team", label: "CFI AI Team", icon: Bot, badge: "AI" },
    ],
  },
  // 9. E-commerce (NO AI - User managed)
  {
    title: "E-Commerce",
    icon: ShoppingBag,
    color: "from-yellow-500 to-orange-500",
    aiPowered: false,
    items: [
      { href: "/admin/shop/products", label: "Products", icon: ShoppingBag },
      { href: "/admin/shop/orders", label: "Orders", icon: Package },
      { href: "/admin/shop/coupons", label: "Coupons", icon: Tag },
    ],
  },
  // 10. Content Management (AI Powered)
  {
    title: "Content Management",
    icon: Globe,
    color: "from-blue-500 to-indigo-500",
    aiPowered: true,
    items: [
      { href: "/admin/website-cms", label: "AI Website CMS", icon: Layout, badge: "AI" },
      { href: "/admin/seo", label: "AI SEO & CMS", icon: Globe, badge: "AI" },
      { href: "/admin/services", label: "AI Services", icon: Settings, badge: "AI" },
      { href: "/admin/portfolio", label: "AI Portfolio", icon: FolderOpen, badge: "AI" },
      { href: "/admin/packages", label: "AI Packages", icon: DollarSign, badge: "AI" },
      { href: "/admin/offers", label: "AI Offers", icon: Gift, badge: "AI" },
      { href: "/admin/blog", label: "AI Blog Manager", icon: FileEdit, badge: "AI" },
    ],
  },
  // 11. System
  {
    title: "System",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
    aiPowered: true,
    items: [
      { href: "/admin/backup", label: "AI Backup", icon: Database, badge: "AI" },
      { href: "/admin/user-management", label: "AI User Management", icon: Shield, badge: "AI" },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
  // 12. Website & SEO
  {
    title: "Website & SEO",
    icon: Code,
    color: "from-orange-500 to-amber-500",
    aiPowered: true,
    items: [
      { href: "/admin/website-cms", label: "AI Website CMS", icon: Code, badge: "AI" },
      { href: "/admin/seo", label: "AI SEO Manager", icon: Search, badge: "AI" },
      { href: "/admin/blog", label: "AI Blog Manager", icon: FileText, badge: "AI" },
      { href: "/admin/link-checker", label: "Link Validator", icon: Link2, badge: "NEW" },
    ],
  },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Dashboard", "Operation"])
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false)

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const notifications = [
    { id: 1, type: "booking", message: "New booking from BKMJ7OEU67", time: "5 minutes ago" },
    { id: 2, type: "client", message: "New client added: Acme Corp", time: "1 hour ago" },
    { id: 3, type: "payment", message: "Payment received: AED 5,000", time: "2 hours ago" },
    { id: 4, type: "invoice", message: "Invoice INV-2024-001 created", time: "3 hours ago" },
    { id: 5, type: "system", message: "Database backup completed", time: "4 hours ago" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const notificationButton = document.getElementById("notification-button")
      const notificationPanel = document.getElementById("notification-panel")

      if (
        notificationPanelOpen &&
        notificationPanel &&
        !notificationPanel.contains(event.target as Node) &&
        !notificationButton?.contains(event.target as Node)
      ) {
        setNotificationPanelOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [notificationPanelOpen])

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar - Hide on mobile, show on desktop */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative w-64 bg-[#0a0a0a] border-r border-white/10 transition-transform duration-300 z-50 h-full overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-[#8fa600] rounded-xl flex items-center justify-center shadow-lg shadow-[#C4D600]/20">
              <span className="text-sm font-bold text-black">CF</span>
            </div>
            <div>
              <span className="font-bold text-white block">Creative Fusion</span>
              <span className="text-[10px] text-gray-500">ERP & Management</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          {navSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title)
            const SectionIcon = section.icon
            const hasActiveItem = section.items.some(
              (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
            )

            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    hasActiveItem ? "bg-white/5" : "hover:bg-white/5",
                  )}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
                  >
                    <SectionIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium text-white">{section.title}</span>
                  <ChevronRight
                    className={cn("h-4 w-4 text-gray-500 transition-transform", isExpanded && "rotate-90")}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-white/10 pl-4">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm",
                            isActive
                              ? "bg-[#C4D600] text-[#0a0a0a] font-medium"
                              : "text-gray-400 hover:text-white hover:bg-white/5",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="flex-1 truncate">{item.label}</span>
                          {/* @ts-ignore */}
                          {item.badge && (
                            <span
                              className={cn(
                                "px-1.5 py-0.5 text-[10px] font-bold rounded",
                                isActive ? "bg-black/20 text-[#0a0a0a]" : "bg-[#C4D600]/20 text-[#C4D600]",
                              )}
                            >
                              {/* @ts-ignore */}
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full text-sm",
              )}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Responsive */}
        <header className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Notification Bell Button */}
            <div className="relative">
              <Button
                id="notification-button"
                variant="ghost"
                size="icon"
                className="relative text-gray-400 hover:text-white rounded-xl"
                onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {notifications.length}
                </span>
              </Button>

              {/* Notification Dropdown Panel */}
              {notificationPanelOpen && (
                <div
                  id="notification-panel"
                  className="fixed right-4 top-16 w-96 max-w-[calc(100vw-2rem)] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-[9999] max-h-[80vh] overflow-y-auto"
                >
                  <div className="p-4 border-b border-white/10 sticky top-0 bg-[#1a1a1a]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNotificationPanelOpen(false)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        ×
                      </Button>
                    </div>
                  </div>

                  {notifications.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C4D600] mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white break-words">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}

                  <div className="p-3 border-t border-white/10 text-center sticky bottom-0 bg-[#1a1a1a]">
                    <button className="text-xs text-[#C4D600] hover:text-[#b0c200] font-medium">View All →</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C4D600] to-[#8fa600] rounded-xl flex items-center justify-center shadow-lg shadow-[#C4D600]/20">
                <span className="text-sm font-bold text-black">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Responsive padding */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
