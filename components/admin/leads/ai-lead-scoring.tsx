"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Users, Sparkles, ArrowUpRight, Mail, DollarSign, Activity, Zap, Star } from "lucide-react"

export function AILeadScoringDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [scoredLeads, setScoredLeads] = useState<any[]>([])

  const handleAIScoring = async () => {
    setIsAnalyzing(true)
    // Simulate AI scoring
    setTimeout(() => {
      setScoredLeads([
        {
          id: 1,
          name: "Tech Solutions LLC",
          contact: "John Doe",
          email: "john@techsolutions.com",
          score: 92,
          potential: "$50,000",
          reasons: ["High engagement", "Budget approved", "Decision maker contact"],
          status: "hot",
        },
        {
          id: 2,
          name: "Digital Marketing Pro",
          contact: "Sarah Smith",
          email: "sarah@digitalmarketing.com",
          score: 78,
          potential: "$25,000",
          reasons: ["Multiple touchpoints", "Service match", "Timeline confirmed"],
          status: "warm",
        },
        {
          id: 3,
          name: "Creative Agency",
          contact: "Mike Johnson",
          email: "mike@creativeagency.com",
          score: 45,
          potential: "$10,000",
          reasons: ["Initial interest", "Needs nurturing"],
          status: "cold",
        },
      ])
      setIsAnalyzing(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-orange-600 bg-orange-50"
    return "text-gray-600 bg-gray-50"
  }

  const getStatusColor = (status: string) => {
    if (status === "hot") return "bg-red-500"
    if (status === "warm") return "bg-orange-500"
    return "bg-blue-500"
  }

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            AI Lead Scoring
          </h1>
          <p className="text-gray-600 mt-2">Automatically score and prioritize leads with AI</p>
        </div>
        <Button
          onClick={handleAIScoring}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isAnalyzing ? (
            <>
              <Activity className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Leads...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Score All Leads with AI
            </>
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hot Leads</p>
              <p className="text-3xl font-bold text-green-600 mt-1">12</p>
              <p className="text-xs text-green-600 mt-1">Score 80+</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warm Leads</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">24</p>
              <p className="text-xs text-orange-600 mt-1">Score 60-79</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cold Leads</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">45</p>
              <p className="text-xs text-blue-600 mt-1">Score below 60</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">$2.5M</p>
              <p className="text-xs text-purple-600 mt-1">Potential revenue</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* AI Scoring Factors */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          AI Scoring Factors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border">
            <h3 className="font-semibold mb-2">Engagement Level</h3>
            <p className="text-sm text-gray-600">Email opens, website visits, content downloads</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border">
            <h3 className="font-semibold mb-2">Budget & Timeline</h3>
            <p className="text-sm text-gray-600">Project budget, decision timeline, authority</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border">
            <h3 className="font-semibold mb-2">Company Fit</h3>
            <p className="text-sm text-gray-600">Industry match, company size, service needs</p>
          </div>
        </div>
      </Card>

      {/* Scored Leads */}
      {scoredLeads.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">AI Scored Leads</h2>
          <div className="space-y-4">
            {scoredLeads.map((lead) => (
              <div key={lead.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(lead.status)}`} />
                      <h3 className="font-bold text-lg">{lead.name}</h3>
                      <Badge className={`${getScoreColor(lead.score)} font-bold`}>Score: {lead.score}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {lead.contact}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        Potential: {lead.potential}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lead.reasons.map((reason: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                    Contact Lead
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
