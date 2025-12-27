"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react"
import { toast } from "sonner"

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "#E4405F",
    envVars: ["INSTAGRAM_CLIENT_ID", "INSTAGRAM_CLIENT_SECRET"],
    setupUrl: "https://developers.facebook.com/apps/",
    docs: "https://developers.facebook.com/docs/instagram-platform/",
    scopes: ["instagram_business_basic", "instagram_business_content_publish"],
    requirements: [
      "Facebook Developer Account",
      "Meta App with Instagram Basic Display or Instagram Graph API",
      "Instagram Business or Creator Account",
    ],
    steps: [
      "Go to Facebook Developers and create a new app",
      "Add 'Instagram Basic Display' or 'Instagram Graph API' product",
      "Configure OAuth redirect URI",
      "Get your Client ID and Client Secret",
      "Add credentials to your environment variables",
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    envVars: ["FACEBOOK_APP_ID", "FACEBOOK_APP_SECRET"],
    setupUrl: "https://developers.facebook.com/apps/",
    docs: "https://developers.facebook.com/docs/pages/",
    scopes: ["pages_manage_posts", "pages_read_engagement"],
    requirements: ["Facebook Developer Account", "Meta App with Pages API access", "Facebook Page to manage"],
    steps: [
      "Go to Facebook Developers and create a new app",
      "Add 'Facebook Login' product",
      "Configure OAuth settings and redirect URIs",
      "Request necessary permissions (pages_manage_posts)",
      "Submit for App Review for production access",
    ],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: Twitter,
    color: "#000000",
    envVars: ["TWITTER_CLIENT_ID", "TWITTER_CLIENT_SECRET"],
    setupUrl: "https://developer.twitter.com/en/portal/dashboard",
    docs: "https://developer.twitter.com/en/docs/twitter-api",
    scopes: ["tweet.read", "tweet.write", "users.read"],
    requirements: [
      "Twitter Developer Account",
      "Twitter App with OAuth 2.0 enabled",
      "Elevated or higher access level",
    ],
    steps: [
      "Apply for Twitter Developer account",
      "Create a new Project and App",
      "Enable OAuth 2.0 in User authentication settings",
      "Set callback URL to your domain/api/social/callback/twitter",
      "Copy Client ID and Client Secret",
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    envVars: ["LINKEDIN_CLIENT_ID", "LINKEDIN_CLIENT_SECRET"],
    setupUrl: "https://www.linkedin.com/developers/apps",
    docs: "https://learn.microsoft.com/en-us/linkedin/",
    scopes: ["w_member_social", "r_liteprofile"],
    requirements: [
      "LinkedIn Developer Account",
      "LinkedIn App with Marketing Developer Platform access",
      "Company Page admin access",
    ],
    steps: [
      "Go to LinkedIn Developers and create app",
      "Request access to Marketing Developer Platform",
      "Add OAuth 2.0 redirect URLs",
      "Verify your app with your LinkedIn Page",
      "Copy Client ID and Client Secret",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    color: "#000000",
    envVars: ["TIKTOK_CLIENT_KEY", "TIKTOK_CLIENT_SECRET"],
    setupUrl: "https://developers.tiktok.com/",
    docs: "https://developers.tiktok.com/doc/content-posting-api-get-started",
    scopes: ["user.info.basic", "video.publish"],
    requirements: [
      "TikTok Developer Account",
      "TikTok App with Content Posting API enabled",
      "App audit approval for public posting",
    ],
    steps: [
      "Register at TikTok for Developers",
      "Create a new app",
      "Enable Content Posting API product",
      "Configure redirect URI",
      "Submit app for audit (required for public posting)",
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "#FF0000",
    envVars: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
    setupUrl: "https://console.cloud.google.com/",
    docs: "https://developers.google.com/youtube/v3",
    scopes: ["youtube.upload", "youtube.readonly"],
    requirements: ["Google Cloud Console account", "YouTube Data API v3 enabled", "OAuth 2.0 credentials"],
    steps: [
      "Go to Google Cloud Console",
      "Create a new project or select existing",
      "Enable YouTube Data API v3",
      "Create OAuth 2.0 credentials",
      "Configure consent screen and redirect URIs",
    ],
  },
]

export default function SocialMediaSetupPage() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null)

  const copyToClipboard = (text: string, varName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedVar(varName)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopiedVar(null), 2000)
  }

  const callbackUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/social/callback/[PLATFORM]`
      : "https://yourdomain.com/api/social/callback/[PLATFORM]"

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Social Media API Setup</h1>
          <p className="text-zinc-400 mt-1">Configure OAuth credentials to enable direct posting and analytics</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#C4D600]/10 rounded-lg">
                  <Shield className="h-6 w-6 text-[#C4D600]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">OAuth 2.0</p>
                  <p className="text-zinc-400 text-sm">Secure Authentication</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Direct Post</p>
                  <p className="text-zinc-400 text-sm">Auto-publish content</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Globe className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6 Platforms</p>
                  <p className="text-zinc-400 text-sm">Supported integrations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Callback URL Info */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">OAuth Callback URL</CardTitle>
            <CardDescription className="text-zinc-400">
              Use this URL pattern when configuring OAuth redirect URIs in each platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg">
              <code className="text-[#C4D600] flex-1 text-sm">{callbackUrl}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(callbackUrl, "callback")}>
                {copiedVar === "callback" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-zinc-500 text-sm mt-2">
              Replace [PLATFORM] with: instagram, facebook, twitter, linkedin, tiktok, or youtube
            </p>
          </CardContent>
        </Card>

        {/* Platform Setup Tabs */}
        <Tabs defaultValue="instagram" className="space-y-4">
          <TabsList className="bg-[#141414] border border-white/10 flex-wrap h-auto p-1">
            {PLATFORMS.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a] gap-2"
              >
                <platform.icon className="h-4 w-4" />
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {PLATFORMS.map((platform) => (
            <TabsContent key={platform.id} value={platform.id}>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${platform.color}20` }}>
                        <platform.icon className="h-6 w-6" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-white">{platform.name} Setup</CardTitle>
                        <CardDescription className="text-zinc-400">
                          Configure OAuth 2.0 credentials for {platform.name}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 bg-transparent"
                        onClick={() => window.open(platform.docs, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Docs
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
                        onClick={() => window.open(platform.setupUrl, "_blank")}
                      >
                        Open Developer Portal
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {platform.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Setup Steps */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Setup Steps</h4>
                    <ol className="space-y-3">
                      {platform.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#C4D600] text-black text-sm font-medium">
                            {i + 1}
                          </span>
                          <span className="text-zinc-300 pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Environment Variables */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Environment Variables Required</h4>
                    <div className="space-y-2">
                      {platform.envVars.map((envVar) => (
                        <div key={envVar} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                          <code className="text-[#C4D600]">{envVar}</code>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(envVar, envVar)}>
                            {copiedVar === envVar ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scopes */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Required Scopes/Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.scopes.map((scope) => (
                        <Badge key={scope} variant="outline" className="border-zinc-700 text-zinc-300">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Callback URL for this platform */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Redirect URI for {platform.name}</h4>
                    <div className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg">
                      <code className="text-[#C4D600] flex-1 text-sm">
                        {callbackUrl.replace("[PLATFORM]", platform.id)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(callbackUrl.replace("[PLATFORM]", platform.id), `callback-${platform.id}`)
                        }
                      >
                        {copiedVar === `callback-${platform.id}` ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Alternative: Late.dev */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Alternative: Use a Unified API</CardTitle>
            <CardDescription className="text-zinc-400">
              Instead of configuring each platform individually, you can use a unified social media API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium">Late.dev API</h4>
                  <p className="text-zinc-400 text-sm">One API key for all platforms</p>
                </div>
                <Button
                  variant="outline"
                  className="border-zinc-700 bg-transparent"
                  onClick={() => window.open("https://getlate.dev", "_blank")}
                >
                  Learn More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                  Single API for Twitter, Instagram, TikTok, LinkedIn, Facebook, YouTube
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                  Built-in OAuth handling - users connect once through their dashboard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                  Unified analytics across all platforms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C4D600]" />
                  No need to apply for each platform's API access
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
