"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Target,
  ShoppingCart,
  CreditCard,
  Globe,
  Search,
  BarChart3,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Package,
  Layers,
  Eye,
  MousePointer,
  CheckCircle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsData {
  thisMonthClients: number
  totalClients: number
  clientsChange: number
  thisMonthBookings: number
  bookingsChange: number
  thisMonthRevenue: number
  totalRevenue: number
  revenueChange: number
  thisMonthLeads: number
  totalLeads: number
  leadsChange: number
  conversionRate: number
  leadStatusCounts: Record<string, number>
  leadSourceCounts: Record<string, number>
  leadCountryCounts: Record<string, number>
  shopRevenue: number
  thisMonthShopRevenue: number
  totalOrders: number
  totalProducts: number
  activeSubscriptions: number
  monthlySubscriptionRevenue: number
  totalPlans: number
  totalKeywords: number
  topKeywords: any[]
  totalBacklinks: number
  contentStats: Record<string, number>
  totalCampaigns: number
  campaignStats: {
    totalBudget: number
    totalSpent: number
    totalImpressions: number
    totalClicks: number
    totalConversions: number
  }
  bookingStatusCounts: Record<string, number>
  categoryData: Record<string, { count: number; revenue: number }>
  clientCountryCounts: Record<string, number>
  recentTransactions: any[]
}

const COLORS = ["#C4D600", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#EC4899", "#6366F1"]

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
  iconBg = "bg-blue-500/10",
  iconColor = "text-blue-500",
}: {
  title: string
  value: number | string
  change?: number
  icon: any
  prefix?: string
  suffix?: string
  iconBg?: string
  iconColor?: string
}) {
  return (
    <Card className="bg-[#141414] border-white/10">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          {change !== undefined && (
            <span className={`flex items-center gap-1 text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change).toFixed(0)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-white">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
        <p className="text-sm text-gray-400">{title}</p>
      </CardContent>
    </Card>
  )
}

export function ReportsAnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Prepare chart data
  const leadSourceData = Object.entries(data.leadSourceCounts).map(([name, value]) => ({ name, value }))
  const leadStatusData = Object.entries(data.leadStatusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))
  const bookingStatusData = Object.entries(data.bookingStatusCounts).map(([name, value]) => ({
    name: name.replace(/_/g, " ").charAt(0).toUpperCase() + name.replace(/_/g, " ").slice(1),
    value,
  }))
  const categoryChartData = Object.entries(data.categoryData)
    .map(([name, d]) => ({ name: name.replace(/-/g, " "), bookings: d.count, revenue: d.revenue }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 6)
  const countryData = Object.entries(data.clientCountryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
  const leadCountryData = Object.entries(data.leadCountryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
  const contentStatusData = Object.entries(data.contentStats).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  // Calculate combined revenue
  const totalCombinedRevenue = data.totalRevenue + data.shopRevenue + data.monthlySubscriptionRevenue * 12

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-gray-400">Comprehensive business intelligence and performance metrics</p>
        </div>
        <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#a8b800]">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1a1a1a] border border-white/10 p-1">
          <TabsTrigger
            value="overview"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Target className="h-4 w-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Search className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Megaphone className="h-4 w-4 mr-2" />
            Marketing
          </TabsTrigger>
          <TabsTrigger
            value="geography"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Globe className="h-4 w-4 mr-2" />
            Geography
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={totalCombinedRevenue}
              prefix="AED "
              icon={DollarSign}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <StatCard
              title="Total Clients"
              value={data.totalClients}
              change={data.clientsChange}
              icon={Users}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Total Leads"
              value={data.totalLeads}
              change={data.leadsChange}
              icon={Target}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Conversion Rate"
              value={data.conversionRate.toFixed(1)}
              suffix="%"
              icon={CheckCircle}
              iconBg="bg-[#C4D600]/10"
              iconColor="text-[#C4D600]"
            />
          </div>

          {/* This Month Performance */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Revenue (This Month)"
              value={data.thisMonthRevenue}
              change={data.revenueChange}
              prefix="AED "
              icon={TrendingUp}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <StatCard
              title="New Clients (This Month)"
              value={data.thisMonthClients}
              change={data.clientsChange}
              icon={UserPlus}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Bookings (This Month)"
              value={data.thisMonthBookings}
              change={data.bookingsChange}
              icon={Calendar}
              iconBg="bg-orange-500/10"
              iconColor="text-orange-500"
            />
            <StatCard
              title="New Leads (This Month)"
              value={data.thisMonthLeads}
              change={data.leadsChange}
              icon={Target}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Service Categories */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Service Performance</CardTitle>
                <CardDescription>Bookings by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#666" />
                      <YAxis dataKey="name" type="category" stroke="#666" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="bookings" fill="#C4D600" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Booking Status */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Booking Status Distribution</CardTitle>
                <CardDescription>Current booking statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={bookingStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingStatusData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription>Latest wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentTransactions.length > 0 ? (
                  data.recentTransactions.map((tx: any) => (
                    <div key={tx.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-500/10" : "bg-red-500/10"}`}
                      >
                        {tx.type === "credit" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {tx.clients?.company_name || tx.clients?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-400">{tx.description}</p>
                      </div>
                      <span className={`font-semibold ${tx.type === "credit" ? "text-green-500" : "text-red-500"}`}>
                        {tx.type === "credit" ? "+" : "-"}AED {tx.amount?.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">No recent transactions</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Leads"
              value={data.totalLeads}
              icon={Target}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <StatCard
              title="New Leads (This Month)"
              value={data.thisMonthLeads}
              change={data.leadsChange}
              icon={UserPlus}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Conversion Rate"
              value={data.conversionRate.toFixed(1)}
              suffix="%"
              icon={CheckCircle}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <StatCard
              title="Converted Leads"
              value={data.leadStatusCounts["converted"] || 0}
              icon={Users}
              iconBg="bg-[#C4D600]/10"
              iconColor="text-[#C4D600]"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lead Sources */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Lead Sources</CardTitle>
                <CardDescription>Where your leads come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadSourceData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Lead Status */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Lead Status Funnel</CardTitle>
                <CardDescription>Lead progression through pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadStatusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Countries */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Leads by Country</CardTitle>
              <CardDescription>Geographic distribution of leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadCountryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                    />
                    <Bar dataKey="value" fill="#C4D600" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Service Revenue"
              value={data.totalRevenue}
              prefix="AED "
              icon={DollarSign}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <StatCard
              title="Shop Revenue"
              value={data.shopRevenue}
              prefix="AED "
              icon={ShoppingCart}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Subscription MRR"
              value={data.monthlySubscriptionRevenue}
              prefix="AED "
              icon={CreditCard}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Total Orders"
              value={data.totalOrders}
              icon={Package}
              iconBg="bg-orange-500/10"
              iconColor="text-orange-500"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                <CardDescription>By revenue stream</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#C4D600] rounded-full" />
                      <span className="text-white">Services</span>
                    </div>
                    <span className="text-white font-semibold">AED {data.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-white">Shop</span>
                    </div>
                    <span className="text-white font-semibold">AED {data.shopRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span className="text-white">Subscriptions (Annual)</span>
                    </div>
                    <span className="text-white font-semibold">
                      AED {(data.monthlySubscriptionRevenue * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Subscription Stats</CardTitle>
                <CardDescription>Active subscription metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-3xl font-bold text-[#C4D600]">{data.activeSubscriptions}</p>
                    <p className="text-sm text-gray-400">Active Subscriptions</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-xl font-bold text-white">{data.totalPlans}</p>
                      <p className="text-xs text-gray-400">Plans Available</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-xl font-bold text-white">
                        AED {data.monthlySubscriptionRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">MRR</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Shop Stats</CardTitle>
                <CardDescription>E-commerce performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-3xl font-bold text-blue-500">{data.totalOrders}</p>
                    <p className="text-sm text-gray-400">Total Orders</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-xl font-bold text-white">{data.totalProducts}</p>
                      <p className="text-xs text-gray-400">Products</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-xl font-bold text-white">AED {data.thisMonthShopRevenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">This Month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Keywords"
              value={data.totalKeywords}
              icon={Search}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Total Backlinks"
              value={data.totalBacklinks}
              icon={Layers}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Content Pieces"
              value={Object.values(data.contentStats).reduce((a, b) => a + b, 0)}
              icon={FileText}
              iconBg="bg-orange-500/10"
              iconColor="text-orange-500"
            />
            <StatCard
              title="Published Content"
              value={data.contentStats["published"] || 0}
              icon={CheckCircle}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Keywords */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Top Ranking Keywords</CardTitle>
                <CardDescription>Best performing keywords by position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topKeywords.length > 0 ? (
                    data.topKeywords.map((kw: any, i: number) => (
                      <div key={kw.id || i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#C4D600]/10 rounded-lg flex items-center justify-center">
                            <span className="text-[#C4D600] font-bold text-sm">#{kw.current_position}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{kw.keyword}</p>
                            <p className="text-xs text-gray-400">
                              {kw.search_volume?.toLocaleString() || 0} searches/mo
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            kw.current_position <= 3
                              ? "bg-green-500/10 text-green-500"
                              : kw.current_position <= 10
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-orange-500/10 text-orange-500"
                          }
                        >
                          {kw.difficulty || "Medium"}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">No keywords tracked yet</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Status */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Status</CardTitle>
                <CardDescription>AI-generated content breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {contentStatusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={contentStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {contentStatusData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">No content data</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Marketing Tab */}
        <TabsContent value="marketing" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Campaigns"
              value={data.totalCampaigns}
              icon={Megaphone}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Total Budget"
              value={data.campaignStats.totalBudget}
              prefix="AED "
              icon={DollarSign}
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <StatCard
              title="Total Impressions"
              value={data.campaignStats.totalImpressions}
              icon={Eye}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Total Conversions"
              value={data.campaignStats.totalConversions}
              icon={CheckCircle}
              iconBg="bg-[#C4D600]/10"
              iconColor="text-[#C4D600]"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Campaign Performance</CardTitle>
                <CardDescription>Key marketing metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <span className="text-white">Impressions</span>
                    </div>
                    <span className="text-white font-semibold">
                      {data.campaignStats.totalImpressions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MousePointer className="h-5 w-5 text-purple-500" />
                      <span className="text-white">Clicks</span>
                    </div>
                    <span className="text-white font-semibold">{data.campaignStats.totalClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-white">Conversions</span>
                    </div>
                    <span className="text-white font-semibold">
                      {data.campaignStats.totalConversions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-[#C4D600]" />
                      <span className="text-white">CTR</span>
                    </div>
                    <span className="text-white font-semibold">
                      {data.campaignStats.totalImpressions > 0
                        ? ((data.campaignStats.totalClicks / data.campaignStats.totalImpressions) * 100).toFixed(2)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Budget Analysis</CardTitle>
                <CardDescription>Campaign spending overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-3xl font-bold text-[#C4D600]">
                      AED {data.campaignStats.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">Total Spent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget Used</span>
                      <span className="text-white">
                        {data.campaignStats.totalBudget > 0
                          ? ((data.campaignStats.totalSpent / data.campaignStats.totalBudget) * 100).toFixed(0)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-[#C4D600] h-2 rounded-full transition-all"
                        style={{
                          width: `${data.campaignStats.totalBudget > 0 ? (data.campaignStats.totalSpent / data.campaignStats.totalBudget) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-lg font-bold text-white">
                        AED {data.campaignStats.totalBudget.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Total Budget</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-lg font-bold text-white">
                        AED {(data.campaignStats.totalBudget - data.campaignStats.totalSpent).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geography Tab */}
        <TabsContent value="geography" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Clients by Country */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Clients by Country</CardTitle>
                <CardDescription>Geographic distribution of your client base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {countryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={countryData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" stroke="#666" />
                        <YAxis dataKey="name" type="category" stroke="#666" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="value" fill="#C4D600" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No country data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Leads by Country */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Leads by Country</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {leadCountryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leadCountryData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" stroke="#666" />
                        <YAxis dataKey="name" type="category" stroke="#666" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No lead country data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Country Summary */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Geographic Summary</CardTitle>
              <CardDescription>Top markets by client count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countryData.slice(0, 4).map((country, i) => (
                  <div key={country.name} className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="w-12 h-12 bg-[#C4D600]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-[#C4D600]" />
                    </div>
                    <p className="text-2xl font-bold text-white">{country.value}</p>
                    <p className="text-sm text-gray-400">{country.name}</p>
                    <Badge className="mt-2 bg-white/10 text-gray-300">#{i + 1} Market</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
