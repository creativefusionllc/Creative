// AI Automation Engine - 24/7 Monitoring & Auto-Execution System
import { createClient } from "@supabase/supabase-js"
import { generateText } from "ai"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export class AutomationEngine {
  private isRunning = false
  private checkInterval = 60000 // Check every 1 minute

  // Start the automation engine
  async start() {
    if (this.isRunning) return
    this.isRunning = true
    console.log("[v0] 🤖 AI Automation Engine Started")
    this.runAutomationLoop()
  }

  // Main automation loop
  private async runAutomationLoop() {
    while (this.isRunning) {
      try {
        await Promise.all([
          this.monitorWebsites(),
          this.generateSEOTasks(),
          this.monitorGMBReviews(),
          this.generateSocialContent(),
          this.scoreLeads(),
          this.nurtureLeads(),
          this.publishScheduledPosts(),
        ])
      } catch (error) {
        console.error("[v0] Automation loop error:", error)
      }

      // Wait before next check
      await new Promise((resolve) => setTimeout(resolve, this.checkInterval))
    }
  }

  // Monitor websites 24/7 for performance issues
  private async monitorWebsites() {
    const { data: websites } = await supabase.from("website_monitoring").select("*").eq("alert_enabled", true)

    if (!websites) return

    for (const site of websites) {
      try {
        const startTime = Date.now()
        const response = await fetch(site.website_url, { method: "HEAD" })
        const responseTime = Date.now() - startTime

        const isUp = response.ok
        const issues = []

        if (!isUp) issues.push({ type: "DOWN", message: "Website is not responding" })
        if (responseTime > 3000) issues.push({ type: "SLOW", message: `Response time: ${responseTime}ms` })

        // Generate AI suggestions if issues found
        let aiSuggestions = null
        if (issues.length > 0) {
          const { text } = await generateText({
            model: "openai/gpt-4o-mini",
            prompt: `Website ${site.website_url} has issues: ${JSON.stringify(issues)}. Provide 3 actionable solutions.`,
          })
          aiSuggestions = text
        }

        // Update monitoring record
        await supabase
          .from("website_monitoring")
          .update({
            status: isUp ? "up" : "down",
            response_time_ms: responseTime,
            last_check_at: new Date().toISOString(),
            issues_detected: issues,
            ai_suggestions: aiSuggestions,
          })
          .eq("id", site.id)

        // Log AI action
        if (issues.length > 0) {
          await this.logAIAction(
            site.client_id,
            "website_monitoring",
            `Detected ${issues.length} issues on ${site.website_url}`,
            {
              issues,
              suggestions: aiSuggestions,
            },
          )
        }
      } catch (error) {
        console.error(`[v0] Error monitoring ${site.website_url}:`, error)
      }
    }
  }

  // Auto-generate SEO tasks and execute fixes
  private async generateSEOTasks() {
    const { data: pages } = await supabase.from("seo_pages").select("*, clients(*)").lt("seo_score", 80).limit(10)

    if (!pages) return

    for (const page of pages) {
      try {
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `Analyze SEO for page: ${page.url}
Current Score: ${page.seo_score}/100
Title: ${page.title}
Meta Description: ${page.meta_description}
Issues: ${JSON.stringify(page.issues)}

Generate JSON with:
1. newTitle (optimized SEO title)
2. newMetaDescription (compelling meta description)
3. keywords (array of target keywords)
4. recommendations (array of actionable fixes)`,
        })

        const seoOptimization = JSON.parse(text)

        // Update SEO page with AI recommendations
        await supabase
          .from("seo_pages")
          .update({
            recommendations: seoOptimization.recommendations,
            status: "optimization_ready",
          })
          .eq("id", page.id)

        // Log AI action
        await this.logAIAction(page.client_id, "seo_optimization", `Generated SEO improvements for ${page.url}`, {
          oldScore: page.seo_score,
          improvements: seoOptimization,
        })
      } catch (error) {
        console.error(`[v0] Error generating SEO tasks for ${page.url}:`, error)
      }
    }
  }

  // Monitor GMB reviews and auto-reply
  private async monitorGMBReviews() {
    const { data: reviews } = await supabase
      .from("gmb_reviews")
      .select("*, gmb_profiles(*)")
      .is("ai_reply_text", null)
      .gte("rating", 1)
      .limit(10)

    if (!reviews) return

    for (const review of reviews) {
      try {
        // Generate AI reply based on rating and sentiment
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `Generate a professional reply to this Google Business review:
Rating: ${review.rating}/5
Review: "${review.review_text}"
Business: ${review.gmb_profiles?.business_name}

Reply should be:
- Professional and friendly
- Thank the reviewer
- ${review.rating >= 4 ? "Express gratitude" : "Address concerns empathetically"}
- Keep it under 100 words`,
        })

        // Store AI reply
        await supabase
          .from("gmb_reviews")
          .update({
            ai_reply_text: text,
            sentiment: review.rating >= 4 ? "positive" : review.rating === 3 ? "neutral" : "negative",
          })
          .eq("id", review.id)

        // If auto-reply enabled, post the reply (would need GMB API)
        if (review.gmb_profiles?.auto_reply_enabled) {
          await this.logAIAction(review.client_id, "gmb_auto_reply", `Auto-replied to ${review.rating}-star review`, {
            review: review.review_text,
            reply: text,
          })
        }
      } catch (error) {
        console.error(`[v0] Error replying to review ${review.id}:`, error)
      }
    }
  }

  // Auto-generate social media content
  private async generateSocialContent() {
    const { data: accounts } = await supabase
      .from("social_accounts")
      .select("*, clients(*)")
      .eq("is_active", true)
      .limit(20)

    if (!accounts) return

    for (const account of accounts) {
      try {
        // Check if account needs content (no posts in last 24h)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        const { data: recentPosts } = await supabase
          .from("social_media_posts")
          .select("id")
          .eq("account_id", account.id)
          .gte("posted_at", oneDayAgo)

        if (recentPosts && recentPosts.length > 0) continue // Already posted recently

        // Generate content idea
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `Generate a ${account.platform} post for:
Business: ${account.clients?.company_name}
Industry: ${account.clients?.industry || "General"}
Platform: ${account.platform}

Create JSON with:
1. content (engaging post text)
2. hashtags (array of 3-5 relevant hashtags)
3. bestTime (recommended time to post: morning/afternoon/evening)
4. contentType (promotional/educational/entertainment)`,
        })

        const contentIdea = JSON.parse(text)

        // Create draft content in calendar
        await supabase.from("content_calendar").insert({
          client_id: account.client_id,
          social_account_id: account.id,
          title: `AI Generated - ${contentIdea.contentType}`,
          content_type: "post",
          caption: contentIdea.content,
          hashtags: contentIdea.hashtags,
          scheduled_date: new Date().toISOString().split("T")[0],
          status: "draft",
          notes: `Auto-generated by AI. Best time: ${contentIdea.bestTime}`,
        })

        await this.logAIAction(
          account.client_id,
          "social_content_generation",
          `Generated content idea for ${account.platform}`,
          contentIdea,
        )
      } catch (error) {
        console.error(`[v0] Error generating content for account ${account.id}:`, error)
      }
    }
  }

  // Auto-score leads with AI
  private async scoreLeads() {
    const { data: leads } = await supabase.from("leads").select("*").is("lead_score", null).limit(20)

    if (!leads) return

    for (const lead of leads) {
      try {
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `Score this lead from 0-100:
Name: ${lead.first_name} ${lead.last_name}
Company: ${lead.company || "N/A"}
Email: ${lead.email}
Phone: ${lead.phone || "N/A"}
Source: ${lead.source}
Service Interest: ${lead.service_interest?.join(", ") || "Not specified"}
Budget: ${lead.budget_range || "Not specified"}

Provide JSON with:
1. score (0-100)
2. priority (hot/warm/cold)
3. reason (why this score)`,
        })

        const scoring = JSON.parse(text)

        await supabase
          .from("leads")
          .update({
            lead_score: scoring.score,
            priority: scoring.priority,
            notes: `AI Score: ${scoring.reason}`,
          })
          .eq("id", lead.id)

        await this.logAIAction(
          null,
          "lead_scoring",
          `Scored lead: ${lead.first_name} ${lead.last_name} - ${scoring.score}/100`,
          scoring,
        )
      } catch (error) {
        console.error(`[v0] Error scoring lead ${lead.id}:`, error)
      }
    }
  }

  // Auto-nurture leads with email campaigns
  private async nurtureLeads() {
    const { data: leads } = await supabase.from("leads").select("*").eq("status", "new").gte("lead_score", 60).limit(10)

    if (!leads) return

    for (const lead of leads) {
      try {
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `Create a personalized nurture email for:
Name: ${lead.first_name}
Company: ${lead.company || "their business"}
Interests: ${lead.service_interest?.join(", ") || "our services"}

Email should:
- Be professional and friendly
- Reference their specific interests
- Offer value (insight/tip/resource)
- Include soft CTA
- Max 150 words

Return JSON with:
1. subject (compelling subject line)
2. body (email content)`,
        })

        const email = JSON.parse(text)

        // Create activity log
        await supabase.from("lead_activities").insert({
          lead_id: lead.id,
          activity_type: "email",
          title: "AI Nurture Email Sent",
          description: `Subject: ${email.subject}\n\n${email.body}`,
          outcome: "sent",
        })

        await this.logAIAction(
          null,
          "lead_nurturing",
          `Sent nurture email to ${lead.first_name} ${lead.last_name}`,
          email,
        )
      } catch (error) {
        console.error(`[v0] Error nurturing lead ${lead.id}:`, error)
      }
    }
  }

  // Publish scheduled posts automatically
  private async publishScheduledPosts() {
    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5)

    const { data: scheduled } = await supabase
      .from("content_calendar")
      .select("*, social_accounts(*)")
      .eq("status", "scheduled")
      .eq("scheduled_date", currentDate)
      .lte("scheduled_time", currentTime)
      .limit(10)

    if (!scheduled) return

    for (const content of scheduled) {
      try {
        // Call the social post API to actually publish
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/social/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content_id: content.id,
            platform: content.social_accounts?.platform,
            account_id: content.social_account_id,
          }),
        })

        if (response.ok) {
          await this.logAIAction(
            content.client_id,
            "auto_publish",
            `Published post to ${content.social_accounts?.platform}`,
            {
              title: content.title,
              platform: content.social_accounts?.platform,
            },
          )
        }
      } catch (error) {
        console.error(`[v0] Error publishing content ${content.id}:`, error)
      }
    }
  }

  // Log all AI actions for transparency
  private async logAIAction(clientId: string | null, actionType: string, description: string, results: any) {
    try {
      await supabase.from("ai_action_log").insert({
        client_id: clientId,
        action_type: actionType,
        action_description: description,
        platform: "automation_engine",
        results,
        status: "success",
        visible_to_client: true,
      })
    } catch (error) {
      console.error("[v0] Error logging AI action:", error)
    }
  }

  // Stop the automation engine
  stop() {
    this.isRunning = false
    console.log("[v0] 🛑 AI Automation Engine Stopped")
  }
}

// Singleton instance
export const automationEngine = new AutomationEngine()
