"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, CheckCircle2, PlayCircle, StopCircle, Zap, Clock } from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AutomationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blogSchedule, setBlogSchedule] = useState("13") // 1 PM UTC (5 PM UAE)
  const [scheduleLoading, setScheduleLoading] = useState(false)

  useEffect(() => {
    // Load saved schedule from localStorage or API
    const saved = localStorage.getItem("blog-cron-hour")
    if (saved) {
      setBlogSchedule(saved)
    }
  }, [])

  const startAutomation = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/automation/start", {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        setIsRunning(true)
        toast.success("AI Automation Engine started!")
      } else {
        toast.error("Failed to start automation")
      }
    } catch (error) {
      toast.error("Error starting automation")
    } finally {
      setLoading(false)
    }
  }

  const updateBlogSchedule = async (hour: string) => {
    setScheduleLoading(true)
    try {
      const response = await fetch("/api/admin/blog-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hour: Number.parseInt(hour) }),
      })
      const data = await response.json()
      if (data.success) {
        setBlogSchedule(hour)
        localStorage.setItem("blog-cron-hour", hour)
        toast.success(`Blog schedule updated to ${hour}:00 UTC (${(Number.parseInt(hour) + 4) % 24}:00 UAE)`)
      } else {
        toast.error("Failed to update schedule")
      }
    } catch (error) {
      toast.error("Error updating schedule")
    } finally {
      setScheduleLoading(false)
    }
  }

  const uaeTime = (utcHour: number) => {
    return (utcHour + 4) % 24 // UAE is UTC+4
  }

  const features = [
    {
      title: "Website Monitoring",
      description: "24/7 uptime & performance monitoring with auto-alerts",
      icon: "🌐",
    },
    {
      title: "SEO Auto-Optimization",
      description: "AI generates and applies SEO improvements automatically",
      icon: "🔍",
    },
    {
      title: "GMB Auto-Reply",
      description: "Responds to Google Business reviews instantly",
      icon: "⭐",
    },
    {
      title: "Social Content AI",
      description: "Generates engaging posts for all platforms",
      icon: "📱",
    },
    {
      title: "Lead Scoring",
      description: "AI scores all leads and prioritizes hot prospects",
      icon: "🎯",
    },
    {
      title: "Lead Nurturing",
      description: "Sends personalized emails to warm leads automatically",
      icon: "💌",
    },
    {
      title: "Auto Publishing",
      description: "Publishes scheduled content at optimal times",
      icon: "📤",
    },
    {
      title: "AI Action Log",
      description: "Full transparency - see everything AI does",
      icon: "📋",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Automation Engine</h1>
            <p className="text-muted-foreground">Fully autonomous marketing, SEO & lead generation AI</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isRunning ? "default" : "secondary"} className="gap-2">
              {isRunning ? <CheckCircle2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              {isRunning ? "Running" : "Stopped"}
            </Badge>
            <Button onClick={startAutomation} disabled={loading || isRunning} size="lg">
              {isRunning ? (
                <>
                  <StopCircle className="mr-2 h-5 w-5" />
                  Stop Engine
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Automation
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400">100% Automated Operations</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click "Start Automation" to enable AI-powered 24/7 monitoring, content generation, lead scoring, and
                  auto-publishing across all clients. The AI will work autonomously and log all actions for
                  transparency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#C4D600]" />
                <div>
                  <CardTitle>Blog Publication Schedule</CardTitle>
                  <CardDescription>Set when AI-generated blog posts should be published daily</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Time (UTC)</label>
                <Select value={blogSchedule} onValueChange={updateBlogSchedule} disabled={scheduleLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}:00 UTC ({uaeTime(i).toString().padStart(2, "0")}:00 UAE)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Current Schedule</label>
                <div className="flex items-center gap-2 p-2 rounded border bg-muted">
                  <Clock className="h-4 w-4" />
                  <span>
                    {blogSchedule}:00 UTC → {uaeTime(Number.parseInt(blogSchedule)).toString().padStart(2, "0")}:00 UAE
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Change the time above to schedule when AI-generated blog posts publish. UAE time is automatically
              calculated (UTC+4).
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{feature.icon}</span>
                  {isRunning && <Badge variant="outline">Active</Badge>}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
