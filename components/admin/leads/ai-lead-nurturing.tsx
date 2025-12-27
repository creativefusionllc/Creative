"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Mail, Calendar, TrendingUp, Zap, Play, Pause, Settings, CheckCircle } from "lucide-react"

export function AILeadNurturing() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "New Lead Welcome Series",
      status: "active",
      leads: 45,
      emails: 3,
      conversion: 18,
      performance: "excellent",
    },
    {
      id: 2,
      name: "Service Interest Follow-up",
      status: "active",
      leads: 32,
      emails: 5,
      conversion: 25,
      performance: "good",
    },
    {
      id: 3,
      name: "Re-engagement Campaign",
      status: "paused",
      leads: 78,
      emails: 4,
      conversion: 12,
      performance: "average",
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateCampaign = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      alert("AI Campaign Generated! Check your campaigns list.")
    }, 2000)
  }

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            AI Lead Nurturing
          </h1>
          <p className="text-gray-600 mt-2">Automated email sequences powered by AI</p>
        </div>
        <Button
          onClick={handleGenerateCampaign}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          {isGenerating ? (
            <>
              <Zap className="h-4 w-4 mr-2 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Bot className="h-4 w-4 mr-2" />
              Create AI Campaign
            </>
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">8</p>
            </div>
            <Play className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Sent Today</p>
              <p className="text-3xl font-bold text-green-600 mt-1">342</p>
            </div>
            <Mail className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Open Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">42%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">64</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Nurturing Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">{campaign.leads} leads enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }
                  >
                    {campaign.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {campaign.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Email Sequence</p>
                  <p className="font-semibold">{campaign.emails} emails</p>
                </div>
                <div>
                  <p className="text-gray-600">Conversion Rate</p>
                  <p className="font-semibold text-green-600">{campaign.conversion}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Performance</p>
                  <Badge
                    variant="outline"
                    className={
                      campaign.performance === "excellent"
                        ? "text-green-600"
                        : campaign.performance === "good"
                          ? "text-blue-600"
                          : "text-gray-600"
                    }
                  >
                    {campaign.performance}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <Mail className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-bold mb-2">AI Email Writer</h3>
          <p className="text-sm text-gray-600">
            Automatically generates personalized emails based on lead behavior and interests
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <Calendar className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-bold mb-2">Smart Timing</h3>
          <p className="text-sm text-gray-600">AI analyzes best send times for each lead to maximize open rates</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-bold mb-2">Performance Optimization</h3>
          <p className="text-sm text-gray-600">Continuously learns and improves campaign performance automatically</p>
        </Card>
      </div>
    </div>
  )
}
