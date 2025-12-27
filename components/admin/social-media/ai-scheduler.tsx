"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Sparkles, Instagram, Facebook, Twitter, Linkedin, TrendingUp, Zap } from "lucide-react"

export function AIScheduler() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Excited to announce our new AI-powered design tools!",
      platform: ["instagram", "facebook", "linkedin"],
      scheduledTime: "2025-01-15 10:00 AM",
      status: "scheduled",
      engagement: "high",
    },
    {
      id: 2,
      content: "Check out our latest portfolio project for Tech Solutions LLC",
      platform: ["instagram", "twitter"],
      scheduledTime: "2025-01-15 2:00 PM",
      status: "scheduled",
      engagement: "medium",
    },
  ])

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            AI Auto Scheduler
          </h1>
          <p className="text-gray-600 mt-2">AI optimizes posting times for maximum engagement</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Weekly Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Posts Scheduled</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">48</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Time Found</p>
              <p className="text-3xl font-bold text-green-600 mt-1">10AM</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">+42%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Saved</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">120h</p>
            </div>
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <Clock className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-bold mb-2">Smart Timing</h3>
          <p className="text-sm text-gray-600">
            AI analyzes when your audience is most active and schedules posts automatically
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-bold mb-2">Content Optimization</h3>
          <p className="text-sm text-gray-600">
            Automatically optimizes hashtags, captions, and image sizing for each platform
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-bold mb-2">Performance Learning</h3>
          <p className="text-sm text-gray-600">Continuously improves scheduling based on engagement patterns</p>
        </Card>
      </div>

      {/* Scheduled Posts */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Upcoming Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium mb-2">{post.content}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.scheduledTime}
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">{post.status}</Badge>
                    <Badge
                      className={
                        post.engagement === "high" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {post.engagement} predicted engagement
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {post.platform.includes("instagram") && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Instagram className="h-4 w-4 text-white" />
                  </div>
                )}
                {post.platform.includes("facebook") && (
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Facebook className="h-4 w-4 text-white" />
                  </div>
                )}
                {post.platform.includes("twitter") && (
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <Twitter className="h-4 w-4 text-white" />
                  </div>
                )}
                {post.platform.includes("linkedin") && (
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
