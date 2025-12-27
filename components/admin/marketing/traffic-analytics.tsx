"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  TrendingUp,
  Users,
  Globe,
  Clock,
  MousePointer,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Share2,
  Mail,
  ExternalLink,
} from "lucide-react"

const TRAFFIC_DATA = {
  overview: {
    totalVisits: 45892,
    uniqueVisitors: 32456,
    pageViews: 128456,
    avgSessionDuration: "3:24",
    bounceRate: 42.3,
    pagesPerSession: 2.8,
  },
  sources: [
    { name: "Organic Search", visits: 18456, percentage: 40.2, change: 12.5, icon: Search },
    { name: "Direct", visits: 12890, percentage: 28.1, change: 5.2, icon: Globe },
    { name: "Social Media", visits: 8234, percentage: 17.9, change: 23.8, icon: Share2 },
    { name: "Referral", visits: 4567, percentage: 10.0, change: -3.2, icon: ExternalLink },
    { name: "Email", visits: 1745, percentage: 3.8, change: 8.9, icon: Mail },
  ],
  devices: [
    { name: "Desktop", percentage: 52, icon: Monitor },
    { name: "Mobile", percentage: 41, icon: Smartphone },
    { name: "Tablet", percentage: 7, icon: Tablet },
  ],
  topPages: [
    { page: "/services/digital-marketing", views: 12456, avgTime: "4:12", bounceRate: 35 },
    { page: "/services/web-design", views: 9876, avgTime: "3:45", bounceRate: 38 },
    { page: "/about", views: 8234, avgTime: "2:30", bounceRate: 45 },
    { page: "/contact", views: 7654, avgTime: "1:45", bounceRate: 52 },
    { page: "/portfolio", views: 6543, avgTime: "3:20", bounceRate: 40 },
  ],
  countries: [
    { country: "United Arab Emirates", flag: "🇦🇪", visits: 15234, percentage: 33.2 },
    { country: "Saudi Arabia", flag: "🇸🇦", visits: 8765, percentage: 19.1 },
    { country: "United States", flag: "🇺🇸", visits: 6543, percentage: 14.3 },
    { country: "United Kingdom", flag: "🇬🇧", visits: 4321, percentage: 9.4 },
    { country: "India", flag: "🇮🇳", visits: 3456, percentage: 7.5 },
  ],
}

export function TrafficAnalytics() {
  const [dateRange, setDateRange] = useState("30d")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Traffic Analytics
          </h1>
          <p className="text-gray-400 mt-1">
            Deep traffic sources breakdown & user behavior powered by Creative Fusion
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10">
              <SelectItem value="7d" className="text-white">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="text-white">
                Last 30 days
              </SelectItem>
              <SelectItem value="90d" className="text-white">
                Last 90 days
              </SelectItem>
              <SelectItem value="1y" className="text-white">
                Last year
              </SelectItem>
            </SelectContent>
          </Select>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Live Data</Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Visits</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.totalVisits.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Unique Visitors</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.uniqueVisitors.toLocaleString()}</p>
              </div>
              <Users className="h-5 w-5 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Page Views</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.pageViews.toLocaleString()}</p>
              </div>
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Avg Session</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.avgSessionDuration}</p>
              </div>
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Bounce Rate</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.bounceRate}%</p>
              </div>
              <MousePointer className="h-5 w-5 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Pages/Session</p>
                <p className="text-xl font-bold text-white">{TRAFFIC_DATA.overview.pagesPerSession}</p>
              </div>
              <FileText className="h-5 w-5 text-teal-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <Card className="bg-[#141414] border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TRAFFIC_DATA.sources.map((source) => (
                <div key={source.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <source.icon className="h-4 w-4 text-[#C4D600]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{source.name}</p>
                        <p className="text-xs text-gray-500">{source.visits.toLocaleString()} visits</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{source.percentage}%</span>
                      <Badge
                        className={source.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
                      >
                        {source.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(source.change)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Devices</CardTitle>
            <CardDescription>Traffic by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TRAFFIC_DATA.devices.map((device) => (
                <div key={device.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-5 w-5 text-[#C4D600]" />
                    <span className="text-white">{device.name}</span>
                  </div>
                  <span className="text-white font-bold">{device.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TRAFFIC_DATA.topPages.map((page, i) => (
                <div key={page.page} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-[#C4D600]/20 text-[#C4D600] flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">{page.page}</p>
                      <p className="text-xs text-gray-500">
                        {page.views.toLocaleString()} views · {page.avgTime} avg
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      page.bounceRate < 40
                        ? "bg-green-500/20 text-green-400"
                        : page.bounceRate < 50
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }
                  >
                    {page.bounceRate}% bounce
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Countries</CardTitle>
            <CardDescription>Traffic by geography</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TRAFFIC_DATA.countries.map((country, i) => (
                <div key={country.country} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{country.country}</p>
                      <p className="text-xs text-gray-500">{country.visits.toLocaleString()} visits</p>
                    </div>
                  </div>
                  <span className="text-[#C4D600] font-bold">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
