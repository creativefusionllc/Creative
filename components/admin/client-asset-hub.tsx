"use client"

import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClientSelector } from "@/components/admin/client-selector"
import { Globe, MapPin, Share2, Zap, CheckCircle2, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function ClientAssetHub() {
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null)
  const [assets, setAssets] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function loadClientAssets() {
    if (!selectedClient) return
    setLoading(true)

    const supabase = createClient()

    // Load all client assets in one query
    const [domains, hosting, social, campaigns] = await Promise.all([
      supabase.from("client_domains").select("*").eq("client_id", selectedClient.id),
      supabase.from("client_hosting").select("*, plan:hosting_plans(name)").eq("client_id", selectedClient.id),
      supabase.from("social_accounts").select("*").eq("client_id", selectedClient.id),
      supabase.from("marketing_campaigns").select("*").eq("client_id", selectedClient.id),
    ])

    setAssets({
      website: domains.data?.[0],
      hosting: hosting.data?.[0],
      social: social.data || [],
      gmb: null, // Placeholder for GMB integration
      campaigns: campaigns.data || [],
    })

    setLoading(false)
  }

  useEffect(() => {
    loadClientAssets()
  }, [selectedClient])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Client Asset Hub</h1>
        <p className="text-gray-400 mt-2">Unified view of all client digital assets</p>
      </div>

      <ClientSelector onClientChange={(client) => setSelectedClient(client)} />

      {selectedClient && !loading && assets && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Website Asset */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-lime-400" />
                <div>
                  <h3 className="font-semibold text-white">Website</h3>
                  <p className="text-sm text-gray-400">Domain & Hosting</p>
                </div>
              </div>
              {assets.website ? (
                <Badge className="bg-lime-500/20 text-lime-400">Connected</Badge>
              ) : (
                <Badge className="bg-gray-600 text-gray-300">Not Connected</Badge>
              )}
            </div>

            {assets.website ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Domain:</span>
                  <span className="text-white font-medium">{assets.website.domain_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-lime-400">{assets.website.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Expires:</span>
                  <span className="text-white">{new Date(assets.website.expiry_date).toLocaleDateString()}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                  <Zap className="w-4 h-4 mr-2" />
                  Enable AI Auto-Updates
                </Button>
              </div>
            ) : (
              <Button size="sm" className="w-full">
                Connect Website
              </Button>
            )}
          </Card>

          {/* GMB Asset */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-orange-400" />
                <div>
                  <h3 className="font-semibold text-white">Google Business</h3>
                  <p className="text-sm text-gray-400">Local SEO & Reviews</p>
                </div>
              </div>
              <Badge className="bg-gray-600 text-gray-300">Ready to Connect</Badge>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">Connect Google Business Profile for:</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  AI auto-reply to reviews
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  AI-generated posts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Review monitoring
                </li>
              </ul>
              <Button size="sm" className="w-full mt-4">
                Connect GMB
              </Button>
            </div>
          </Card>

          {/* Social Media Assets */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Share2 className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">Social Media</h3>
                  <p className="text-sm text-gray-400">{assets.social.length} Accounts</p>
                </div>
              </div>
              <Badge className="bg-lime-500/20 text-lime-400">
                {assets.social.filter((s: any) => s.is_active).length} Active
              </Badge>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {assets.social.map((account: any) => (
                <div key={account.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      {account.platform[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-white">{account.account_name}</p>
                      <p className="text-xs text-gray-400">{account.followers_count.toLocaleString()} followers</p>
                    </div>
                  </div>
                  {account.api_connected ? (
                    <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              ))}
            </div>

            {assets.social.length > 0 && (
              <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                <Zap className="w-4 h-4 mr-2" />
                Enable AI Auto-Posting
              </Button>
            )}
          </Card>
        </div>
      )}

      {selectedClient && assets && (
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">AI Action Feed</h3>
          <p className="text-gray-400 text-sm mb-4">See what AI has done for {selectedClient.name} today</p>

          <div className="space-y-3">
            {assets.campaigns?.slice(0, 5).map((campaign: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-lime-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-lime-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Campaign: {campaign.name}</p>
                  <p className="text-sm text-gray-400">
                    Generated {campaign.impressions?.toLocaleString() || 0} impressions,{" "}
                    {campaign.clicks?.toLocaleString() || 0} clicks
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(campaign.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}

            {(!assets.campaigns || assets.campaigns.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                <p>No AI actions yet. Launch a campaign to see AI in action!</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
