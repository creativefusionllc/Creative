import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { accounts, dailyStats, clientName } = body

    const accountSummary =
      accounts
        ?.map(
          (a: any) =>
            `${a.platform}: @${a.account_handle} - ${a.followers_count?.toLocaleString() || 0} followers, ${a.following_count?.toLocaleString() || 0} following, ${a.posts_count || 0} posts`,
        )
        .join("\n") || "No accounts connected"

    const recentStats = dailyStats?.slice(-7) || []
    const statsSummary =
      recentStats.length > 0
        ? recentStats
            .map(
              (s: any) =>
                `${s.date}: ${s.likes_count || 0} likes, ${s.comments_count || 0} comments, ${s.views_count || 0} views`,
            )
            .join("\n")
        : "No daily statistics available"

    const totalFollowers = accounts?.reduce((sum: number, a: any) => sum + (a.followers_count || 0), 0) || 0
    const totalPosts = accounts?.reduce((sum: number, a: any) => sum + (a.posts_count || 0), 0) || 0

    // Try AI generation
    try {
      const { text } = await generateText({
        model: "anthropic/claude-sonnet-4-20250514",
        prompt: `Analyze this social media data and provide insights in JSON format.

Client: ${clientName || "Unknown"}

Connected Accounts:
${accountSummary}

Recent Daily Stats (Last 7 days):
${statsSummary}

Total Followers: ${totalFollowers}
Total Posts: ${totalPosts}

Return ONLY a valid JSON object (no markdown, no code blocks) with:
{
  "overallScore": [0-100 performance score based on data],
  "growthTrend": "increasing" | "stable" | "decreasing",
  "topPerformingPlatform": "[platform name or 'None']",
  "engagementHealth": "excellent" | "good" | "average" | "needs_improvement",
  "keyInsights": ["[insight 1]", "[insight 2]", "[insight 3]"],
  "recommendations": ["[recommendation 1]", "[recommendation 2]", "[recommendation 3]"],
  "bestPostingTimes": "[times for UAE market]",
  "contentSuggestions": ["[suggestion 1]", "[suggestion 2]"]
}

Base analysis on actual data provided. If no data, return lower scores.`,
        maxTokens: 800,
      })

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const analytics = JSON.parse(jsonMatch[0])
        return NextResponse.json(analytics)
      }
    } catch (aiError) {
      console.error("AI Error:", aiError)
    }

    // Fallback: Generate based on actual data
    const score = Math.min(100, Math.floor((totalFollowers / 1000) * 10 + (totalPosts / 10) * 5))
    const topPlatform =
      accounts?.reduce((top: any, a: any) => ((a.followers_count || 0) > (top?.followers_count || 0) ? a : top), null)
        ?.platform || "None"

    return NextResponse.json({
      overallScore: score,
      growthTrend: totalFollowers > 1000 ? "increasing" : "stable",
      topPerformingPlatform: topPlatform,
      engagementHealth: totalFollowers > 5000 ? "good" : totalFollowers > 1000 ? "average" : "needs_improvement",
      keyInsights:
        accounts?.length > 0
          ? [
              `${accounts.length} social account(s) connected`,
              `Total reach of ${totalFollowers.toLocaleString()} followers`,
              `${totalPosts} posts published across platforms`,
            ]
          : ["No social accounts connected yet", "Add accounts to start tracking", "Connect via Social Accounts page"],
      recommendations:
        totalFollowers > 0
          ? [
              "Maintain consistent posting schedule",
              "Engage with followers through comments",
              "Cross-promote content across platforms",
            ]
          : ["Add social media accounts first", "Connect API for real-time sync", "Start with Instagram or Facebook"],
      bestPostingTimes: "9AM-12PM, 6PM-9PM UAE time",
      contentSuggestions:
        totalPosts > 0
          ? ["Video content for higher engagement", "Behind-the-scenes posts"]
          : ["Start with brand introduction posts", "Share company updates"],
    })
  } catch (error) {
    console.error("Social Analytics Error:", error)
    return NextResponse.json({
      overallScore: 0,
      growthTrend: "stable",
      topPerformingPlatform: "None",
      engagementHealth: "needs_improvement",
      keyInsights: ["Error generating insights", "Please try again"],
      recommendations: ["Check connected accounts", "Refresh and retry"],
      bestPostingTimes: "9AM-12PM UAE time",
      contentSuggestions: ["Add social accounts to begin"],
    })
  }
}
