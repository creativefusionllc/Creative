import { generateText } from "ai"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category_id: string
  tags: string[]
  meta_title: string
  meta_description: string
  meta_keywords: string[]
  read_time: number
}

// Creative Fusion service topics for SEO ranking
const SERVICE_TOPICS = [
  "Brand Identity Design Dubai",
  "Logo Design Services UAE",
  "Professional Photography Dubai",
  "Corporate Video Production",
  "Digital Marketing Strategy UAE",
  "SEO Services Dubai",
  "Social Media Marketing",
  "Website Development Dubai",
  "E-commerce Solutions UAE",
  "Content Marketing Strategy",
  "Google Ads Management Dubai",
  "Graphic Design Services",
  "Business Consulting UAE",
  "Exhibition Stand Design",
  "WhatsApp Marketing Campaigns",
  "Email Marketing Services",
  "Product Photography Dubai",
  "360 Virtual Tours UAE",
  "Brand Guidelines Development",
  "Marketing PR Services Dubai",
]

export async function generateDailyBlogPost(): Promise<BlogPost | null> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Select random topic from Creative Fusion services
    const topic = SERVICE_TOPICS[Math.floor(Math.random() * SERVICE_TOPICS.length)]

    console.log("[v0] Generating daily blog post for topic:", topic)

    // Generate human-like SEO-optimized content
    const { text: content } = await generateText({
      model: "openai/gpt-4o",
      prompt: `You are a professional content writer for Creative Fusion, a leading digital agency in Dubai, UAE.

Write a comprehensive, SEO-optimized blog post about: "${topic}"

CRITICAL REQUIREMENTS - MUST FOLLOW:
1. Write in a natural, conversational human tone (not robotic AI)
2. Use storytelling and real-world examples
3. Include personal insights and expert opinions
4. Add actionable tips and practical advice
5. Use transition words naturally: however, therefore, moreover, additionally
6. Vary sentence length: mix short punchy sentences with longer explanatory ones
7. Include rhetorical questions to engage readers
8. Add Dubai/UAE local context and examples
9. Write 1800-2200 words (comprehensive but readable)

STRUCTURE:
- Compelling title with target keyword
- Meta description (150-160 chars, includes keyword + call-to-action)
- Introduction (hook + problem + solution preview)
- 5-7 H2 sections with practical content
- Include statistics, trends, and expert insights
- Real-world case studies or examples
- Common mistakes to avoid section
- Actionable tips/checklist
- Conclusion with strong CTA to Creative Fusion services

SEO OPTIMIZATION:
- Target keyword: "${topic}"
- Use keyword naturally in: title, first paragraph, H2 headings, throughout (1.5% density)
- Add related keywords: digital agency, Dubai marketing, UAE branding, etc.
- Include semantic keywords naturally
- Add internal linking opportunities to Creative Fusion services

TONE: Professional yet approachable, authoritative but friendly, helpful not salesy

FORMAT IN MARKDOWN with proper H2 (##) and H3 (###) headings.

Start with the meta description on the first line, then the full article.`,
      maxOutputTokens: 4000,
    })

    // Extract meta description and content
    const lines = content.split("\n")
    const metaDescription = lines[0].replace(/^(meta description:|description:)/i, "").trim()
    const fullContent = lines.slice(1).join("\n").trim()

    // Generate title from content
    const titleMatch = fullContent.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : topic

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)

    // Generate excerpt from first paragraph
    const firstParagraph = fullContent.split("\n\n").find((p) => p.trim() && !p.startsWith("#"))
    const excerpt = firstParagraph ? firstParagraph.substring(0, 200) + "..." : metaDescription

    // Calculate read time
    const wordCount = fullContent.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    // Extract keywords
    const keywords = [topic.toLowerCase(), "creative fusion", "dubai", "uae", "digital agency", "marketing services"]

    // Get relevant Envato image
    const envatoImage = await searchEnvatoImage(topic)

    // Get appropriate category
    const category = await getOrCreateBlogCategory(supabase, topic)

    // Extract tags from content
    const tags = extractTags(fullContent, topic)

    const blogPost: BlogPost = {
      title,
      slug,
      excerpt,
      content: fullContent,
      featured_image: envatoImage,
      category_id: category.id,
      tags,
      meta_title: `${title} | Creative Fusion Dubai`,
      meta_description: metaDescription,
      meta_keywords: keywords,
      read_time: readTime,
    }

    return blogPost
  } catch (error) {
    console.error("[v0] Error generating blog post:", error)
    return null
  }
}

async function searchEnvatoImage(topic: string): Promise<string> {
  try {
    // Search for relevant image from Envato
    const searchQuery = topic.split(" ").slice(0, 3).join(" ") // Use first 3 words
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/envato/search?q=${encodeURIComponent(searchQuery)}&type=photo&per_page=10`,
    )

    if (response.ok) {
      const data = await response.json()
      if (data.assets && data.assets.length > 0) {
        // Return first high-quality image
        return data.assets[0].preview_url || data.assets[0].thumbnail_url
      }
    }
  } catch (error) {
    console.error("[v0] Error searching Envato:", error)
  }

  // Fallback to placeholder
  return `/placeholder.svg?height=800&width=1600&text=${encodeURIComponent(topic)}`
}

async function getOrCreateBlogCategory(supabase: any, topic: string) {
  // Map topic to appropriate category
  const categoryMap: Record<string, string> = {
    brand: "Branding",
    logo: "Branding",
    design: "Design",
    photo: "Photography",
    video: "Video Production",
    marketing: "Digital Marketing",
    seo: "SEO",
    social: "Social Media",
    website: "Web Development",
    development: "Web Development",
    consulting: "Business Consulting",
  }

  const categoryName =
    Object.entries(categoryMap).find(([key]) => topic.toLowerCase().includes(key))?.[1] || "Digital Marketing"

  // Check if category exists
  let { data: category } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("name", categoryName)
    .eq("is_active", true)
    .single()

  // Create if doesn't exist
  if (!category) {
    const { data: newCategory } = await supabase
      .from("blog_categories")
      .insert({
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        description: `Expert insights on ${categoryName} from Creative Fusion Dubai`,
        color: "#C4D600",
        is_active: true,
      })
      .select()
      .single()

    category = newCategory
  }

  return category
}

function extractTags(content: string, topic: string): string[] {
  const tags = new Set<string>()

  // Add main topic
  tags.add(topic.toLowerCase())

  // Extract common marketing/business terms
  const commonTags = [
    "digital marketing",
    "branding",
    "seo",
    "social media",
    "content marketing",
    "dubai business",
    "uae marketing",
    "brand strategy",
    "design tips",
    "marketing strategy",
  ]

  commonTags.forEach((tag) => {
    if (content.toLowerCase().includes(tag)) {
      tags.add(tag)
    }
  })

  return Array.from(tags).slice(0, 8) // Return max 8 tags
}

export async function publishDailyBlog(): Promise<boolean> {
  try {
    console.log("[v0] Starting daily blog generation...")

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Check if we already published today
    const today = new Date().toISOString().split("T")[0]
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id")
      .gte("published_at", `${today}T00:00:00Z`)
      .lte("published_at", `${today}T23:59:59Z`)
      .single()

    if (existingPost) {
      console.log("[v0] Blog post already published today")
      return false
    }

    // Generate new blog post
    const blogPost = await generateDailyBlogPost()

    if (!blogPost) {
      console.error("[v0] Failed to generate blog post")
      return false
    }

    // Save to database
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        ...blogPost,
        status: "published",
        published_at: new Date().toISOString(),
        is_featured: false,
        view_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error saving blog post:", error)
      return false
    }

    console.log("[v0] Successfully published blog post:", data.title)

    // Track in AI action log
    await supabase.from("ai_action_log").insert({
      client_id: null, // System action
      action_type: "blog_published",
      action_description: `AI generated and published blog post: "${data.title}"`,
      platform: "website",
      results: {
        post_id: data.id,
        title: data.title,
        word_count: data.content.split(/\s+/).length,
        read_time: data.read_time,
      },
      status: "success",
      visible_to_client: true,
    })

    // Auto-post to social media
    await shareOnSocialMedia(data)

    return true
  } catch (error) {
    console.error("[v0] Error in publishDailyBlog:", error)
    return false
  }
}

async function shareOnSocialMedia(post: any) {
  try {
    // Generate social media post
    const socialContent = `🚀 New Blog Post!\n\n${post.title}\n\n${post.excerpt}\n\nRead more: ${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}\n\n#CreativeFusion #DubaiMarketing #DigitalAgency #UAE`

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Schedule social media post
    await supabase.from("social_media_posts").insert({
      content: socialContent,
      platform: "all",
      status: "scheduled",
      scheduled_for: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      media_urls: [post.featured_image],
      post_type: "blog_promotion",
    })

    console.log("[v0] Scheduled social media promotion for blog post")
  } catch (error) {
    console.error("[v0] Error sharing on social media:", error)
  }
}
