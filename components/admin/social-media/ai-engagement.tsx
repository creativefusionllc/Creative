"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Heart, Reply, TrendingUp, Zap, Users, Target } from "lucide-react"

export function AIEngagement() {
  const [interactions, setInteractions] = useState([
    {
      id: 1,
      user: "@techenthu",
      message: "Love your design work! Can you share more about your process?",
      platform: "Instagram",
      sentiment: "positive",
      aiResponse:
        "Thank you so much! We'd love to share. Our design process focuses on understanding client needs first...",
      status: "pending",
    },
    {
      id: 2,
      user: "@sarahdesigns",
      message: "What tools do you use for branding projects?",
      platform: "LinkedIn",
      sentiment: "neutral",
      aiResponse: "Great question! We use a combination of Adobe Creative Suite, Figma, and custom AI tools...",
      status: "approved",
    },
  ])

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            AI Auto Engagement
          </h1>
          <p className="text-gray-600 mt-2">AI responds to comments and messages automatically</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Zap className="h-4 w-4 mr-2" />
          Enable Auto-Reply
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Replies Today</p>
              <p className="text-3xl font-bold text-green-600 mt-1">142</p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Time</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">2min</p>
            </div>
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">96%</p>
            </div>
            <Heart className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Engagement Up</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">+58%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* AI Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <MessageCircle className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-bold mb-2">Smart Replies</h3>
          <p className="text-sm text-gray-600">AI generates contextual, brand-aligned responses to comments and DMs</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <Target className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-bold mb-2">Sentiment Analysis</h3>
          <p className="text-sm text-gray-600">
            Automatically detects tone and prioritizes urgent or negative feedback
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <Users className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-bold mb-2">Lead Capture</h3>
          <p className="text-sm text-gray-600">Identifies potential leads and automatically adds them to CRM</p>
        </Card>
      </div>

      {/* Pending Interactions */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Pending AI Responses</h2>
        <div className="space-y-4">
          {interactions.map((interaction) => (
            <div key={interaction.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold">{interaction.user}</span>
                    <Badge variant="outline">{interaction.platform}</Badge>
                    <Badge
                      className={
                        interaction.sentiment === "positive"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {interaction.sentiment}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{interaction.message}</p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">AI Suggested Response:</p>
                    <p className="text-sm text-gray-700">{interaction.aiResponse}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Reply className="h-4 w-4 mr-1" />
                  Approve & Send
                </Button>
                <Button size="sm" variant="outline">
                  Edit Response
                </Button>
                <Button size="sm" variant="outline">
                  Skip
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
