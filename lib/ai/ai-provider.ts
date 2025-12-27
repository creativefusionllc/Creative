// Smart AI Provider System with automatic fallback
// Priority: 1. Vercel AI Gateway (free built-in) -> 2. Hugging Face -> 3. Google Gemini -> 4. Template Fallback

export type AIProvider = "auto" | "vercel" | "huggingface" | "google" | "template"

export interface AIProviderConfig {
  provider: AIProvider
  name: string
  description: string
  isFree: boolean
  requiresKey: boolean
  performance: "fast" | "medium" | "slow"
  quality: "high" | "medium" | "basic"
}

export const AI_PROVIDERS: AIProviderConfig[] = [
  {
    provider: "vercel",
    name: "Vercel AI Gateway (Free)",
    description: "Built-in, free - Best option",
    isFree: true,
    requiresKey: false,
    performance: "fast",
    quality: "high",
  },
  {
    provider: "huggingface",
    name: "Hugging Face",
    description: "Free tier available - Add HUGGINGFACE_API_KEY",
    isFree: true,
    requiresKey: true,
    performance: "medium",
    quality: "medium",
  },
  {
    provider: "google",
    name: "Google Gemini",
    description: "High quality - Add GOOGLE_GENERATIVE_AI_API_KEY",
    isFree: false,
    requiresKey: true,
    performance: "fast",
    quality: "high",
  },
  {
    provider: "template",
    name: "Smart Templates",
    description: "No AI - Uses intelligent templates",
    isFree: true,
    requiresKey: false,
    performance: "instant",
    quality: "basic",
  },
]

// Template-based content generation (no AI needed)
export function generateTemplateContent(topic: string, type: string): string {
  const templates: Record<string, (topic: string) => string> = {
    blog: (t) => `# ${t}

## Introduction

In today's rapidly evolving digital landscape, understanding ${t.toLowerCase()} has become essential for businesses and individuals alike. This comprehensive guide will explore the key aspects and best practices.

## What is ${t}?

${t} represents a crucial component in modern strategy. Whether you're a beginner or an experienced professional, grasping these fundamentals will help you achieve better results.

## Key Benefits

- **Improved Performance**: Implementing ${t.toLowerCase()} strategies can significantly boost your outcomes
- **Cost Efficiency**: Smart approaches lead to better resource utilization
- **Competitive Advantage**: Stay ahead by mastering these concepts
- **Scalability**: Build foundations that grow with your needs

## Best Practices

### 1. Start with Clear Goals
Define what you want to achieve before diving into implementation.

### 2. Measure and Analyze
Track your progress with relevant metrics and KPIs.

### 3. Iterate and Improve
Continuously refine your approach based on data and feedback.

## Conclusion

Understanding ${t.toLowerCase()} is key to success in today's competitive environment. By following these guidelines, you'll be well-positioned to achieve your goals.

---
*This content was generated using smart templates. For AI-powered content, configure your AI provider in settings.*`,

    seo: (t) => ({
      title: `${t} - Complete Guide & Best Practices | Your Site`,
      description: `Discover everything about ${t.toLowerCase()}. Our comprehensive guide covers key strategies, benefits, and expert tips to help you succeed.`,
    }),
  }

  if (type === "seo") {
    const result = templates.seo(topic) as { title: string; description: string }
    return JSON.stringify(result)
  }

  return templates.blog?.(topic) || `Content about ${topic}`
}

export function generateTemplateMetaTags(url: string): { title: string; description: string } {
  // Extract meaningful parts from URL
  const urlParts = url
    .replace(/https?:\/\//, "")
    .split("/")
    .filter(Boolean)
  const pageName = urlParts[urlParts.length - 1] || "Home"
  const formattedName = pageName
    .replace(/[-_]/g, " ")
    .replace(/\.(html?|php|aspx?)$/i, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedName} | Professional Solutions & Services`,
    description: `Explore our ${formattedName.toLowerCase()} page. Discover professional solutions, expert insights, and comprehensive resources to help you succeed.`,
  }
}

export function generateTemplateSocialReport(data: {
  clientName: string
  totalFollowers: number
  totalPosts: number
  platforms: string[]
}): string {
  const { clientName, totalFollowers, totalPosts, platforms } = data

  return `## Social Media Analytics Report for ${clientName}

### Executive Summary
${clientName} currently maintains a social media presence across ${platforms.length || 0} platform(s) with a combined following of ${totalFollowers.toLocaleString()} followers and ${totalPosts.toLocaleString()} posts.

### Key Performance Highlights
- **Total Reach**: ${totalFollowers.toLocaleString()} followers across all platforms
- **Content Volume**: ${totalPosts.toLocaleString()} posts published
- **Platform Presence**: Active on ${platforms.join(", ") || "No platforms connected"}
- **Engagement Potential**: Growing audience base ready for engagement

### Growth Opportunities
1. **Content Consistency**: Maintain regular posting schedule across all platforms
2. **Cross-Platform Promotion**: Leverage strongest platform to grow others
3. **Engagement Focus**: Increase interaction with followers through comments and stories

### Strategic Recommendations
1. Analyze top-performing content types and replicate success
2. Implement a content calendar for consistent posting
3. Explore paid promotion for high-value content
4. Monitor competitor strategies for inspiration

---
*Report generated using smart templates. Connect AI provider for deeper insights.*`
}
