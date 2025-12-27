"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  TrendingUp,
  RefreshCw,
  Heart,
  MessageSquare,
  ExternalLink,
  Star,
  CheckCircle,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

interface Influencer {
  id: string
  name: string
  handle: string
  avatar: string
  platform: string
  followers: number
  engagementRate: number
  avgLikes: number
  avgComments: number
  niche: string[]
  location: string
  verified: boolean
  priceRange: string
  recentGrowth: number
}

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
}

const platformColors: Record<string, string> = {
  instagram: "text-pink-400",
  youtube: "text-red-400",
  twitter: "text-blue-400",
  linkedin: "text-blue-500",
}

export function InfluencerFinderTool() {
  const [searchNiche, setSearchNiche] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [minFollowers, setMinFollowers] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [savedInfluencers, setSavedInfluencers] = useState<string[]>([])

  async function handleSearch() {
    if (!searchNiche) {
      toast.error("Please enter a niche or topic")
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch("/api/ai/brand-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: searchNiche,
          type: "influencer-search",
          platform: selectedPlatform,
          minFollowers: minFollowers ? Number.parseInt(minFollowers) : undefined,
        }),
      })

      if (!response.ok) throw new Error("Failed to search")

      const data = await response.json()

      if (data.influencers) {
        setInfluencers(data.influencers)
      }

      setSearched(true)
      toast.success("AI found influencers!")
    } catch (error) {
      console.error("Search error:", error)
      toast.error("Failed to find influencers. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  function toggleSaveInfluencer(id: string) {
    setSavedInfluencers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
    toast.success(savedInfluencers.includes(id) ? "Removed from list" : "Added to your list!")
  }

  function formatFollowers(count: number) {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-[#C4D600]" />
              AI Influencer Finder
            </h1>
            <p className="text-gray-400 mt-1">AI-powered influencer discovery for your campaigns</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Filters */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Niche / Topic</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="e.g., Marketing, Design"
                    value={searchNiche}
                    onChange={(e) => setSearchNiche(e.target.value)}
                    className="bg-[#141414] border-[#2a2a2a] text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Min Followers</label>
                <Select value={minFollowers} onValueChange={setMinFollowers}>
                  <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="10000">10K+</SelectItem>
                    <SelectItem value="50000">50K+</SelectItem>
                    <SelectItem value="100000">100K+</SelectItem>
                    <SelectItem value="500000">500K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI Searching...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Find Influencers
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Found {influencers.length} Influencers</h2>
              {savedInfluencers.length > 0 && (
                <Badge className="bg-[#C4D600]/20 text-[#C4D600]">{savedInfluencers.length} saved</Badge>
              )}
            </div>

            {influencers.length === 0 ? (
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-8 text-center text-gray-500">
                  No influencers found yet. Try a different niche or adjust your filters.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {influencers.map((influencer) => {
                  const PlatformIcon = platformIcons[influencer.platform] || Users
                  const isSaved = savedInfluencers.includes(influencer.id)

                  return (
                    <Card key={influencer.id} className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#2a2a2a] text-white">
                              {influencer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-semibold text-lg">{influencer.name}</h3>
                              {influencer.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                              <PlatformIcon className={`h-4 w-4 ${platformColors[influencer.platform]}`} />
                            </div>
                            <p className="text-gray-400 text-sm">{influencer.handle}</p>

                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-white font-semibold">
                                {formatFollowers(influencer.followers)} followers
                              </span>
                              <span className="text-green-400 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />+{influencer.recentGrowth}%
                              </span>
                              <span className="text-gray-400 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {influencer.location}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {influencer.niche.map((n, i) => (
                                <Badge key={i} variant="secondary" className="bg-[#2a2a2a] text-gray-300 text-xs">
                                  {n}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-right space-y-2">
                            <div className="text-sm">
                              <p className="text-gray-400">Engagement Rate</p>
                              <p className="text-[#C4D600] font-semibold text-lg">{influencer.engagementRate}%</p>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {formatFollowers(influencer.avgLikes)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {influencer.avgComments}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{influencer.priceRange}/post</p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              variant={isSaved ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleSaveInfluencer(influencer.id)}
                              className={isSaved ? "bg-[#C4D600] text-[#0a0a0a]" : "border-[#2a2a2a] text-gray-400"}
                            >
                              <Star className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#2a2a2a] text-gray-400 bg-transparent"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Influencers Yet</h3>
              <p className="text-gray-400 mb-6">
                Enter a niche or topic and click "Find Influencers" to discover relevant creators.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
