// Advanced lead quality scoring system
// Scores leads from 0-100 based on multiple factors

interface LeadScoringFactors {
  // Engagement signals
  formFieldsFilled?: number // 0-20 points: completeness of form
  serviceSelected?: boolean // 5 points: selected specific service
  messageLength?: number // 0-15 points: detailed inquiry (100+ chars = max)
  multipleServices?: number // 0-10 points: selected multiple services

  // Budget/Value signals
  budgetMentioned?: boolean // 10 points: budget specified
  timelineMentioned?: boolean // 5 points: timeline specified
  companySize?: string // 0-10 points: enterprise > mid-market > startup

  // Source quality
  sourceQuality?: number // 0-15 points: direct > referral > paid > organic > dark traffic
  pageDepth?: number // 0-10 points: pages visited (more pages = more interested)

  // Contact quality
  professionalEmail?: boolean // 5 points: company email vs gmail/yahoo
  phoneProvided?: boolean // 5 points: phone number provided
  linkedInProfile?: boolean // 5 points: LinkedIn provided
  countryMatch?: boolean // 5 points: local market (UAE/GCC)

  // Behavioral signals
  previousVisits?: number // 0-10 points: repeat visitor scores higher
  timeOnSite?: number // 0-5 points: minutes on site
  deviceType?: string // 2 points: mobile visitor from office area
  conversationStarted?: boolean // 3 points: engaged in chat
}

export class LeadQualityScorer {
  static score(factors: LeadScoringFactors): {
    score: number
    status: "hot" | "warm" | "cold"
    breakdown: Record<string, number>
  } {
    const breakdown: Record<string, number> = {}

    // Engagement scoring (max 50 points)
    breakdown.engagement = 0
    if (factors.formFieldsFilled) breakdown.engagement += Math.min(factors.formFieldsFilled * 2, 20)
    if (factors.serviceSelected) breakdown.engagement += 5
    if (factors.messageLength) breakdown.engagement += Math.min(Math.floor(factors.messageLength / 10), 15)
    if (factors.multipleServices) breakdown.engagement += factors.multipleServices * 2

    // Budget/Value scoring (max 25 points)
    breakdown.value = 0
    if (factors.budgetMentioned) breakdown.value += 10
    if (factors.timelineMentioned) breakdown.value += 5
    if (factors.companySize === "enterprise") breakdown.value += 10
    else if (factors.companySize === "mid-market") breakdown.value += 5

    // Source quality scoring (max 20 points)
    breakdown.sourceQuality = 0
    if (factors.sourceQuality) breakdown.sourceQuality += factors.sourceQuality
    if (factors.pageDepth) breakdown.sourceQuality += Math.min(factors.pageDepth, 10)

    // Contact quality scoring (max 25 points)
    breakdown.contactQuality = 0
    if (factors.professionalEmail) breakdown.contactQuality += 5
    if (factors.phoneProvided) breakdown.contactQuality += 5
    if (factors.linkedInProfile) breakdown.contactQuality += 5
    if (factors.countryMatch) breakdown.contactQuality += 5
    if (factors.previousVisits && factors.previousVisits > 1) breakdown.contactQuality += 5

    // Behavioral scoring (max 15 points)
    breakdown.behavior = 0
    if (factors.timeOnSite) breakdown.behavior += Math.min(factors.timeOnSite, 5)
    if (factors.deviceType === "mobile-office") breakdown.behavior += 2
    if (factors.conversationStarted) breakdown.behavior += 3
    if (factors.previousVisits) breakdown.behavior += Math.min(factors.previousVisits, 5)

    // Calculate total score (capped at 100)
    const totalScore = Math.min(
      breakdown.engagement + breakdown.value + breakdown.sourceQuality + breakdown.contactQuality + breakdown.behavior,
      100,
    )

    // Determine lead status based on score
    let status: "hot" | "warm" | "cold"
    if (totalScore >= 75) status = "hot"
    else if (totalScore >= 50) status = "warm"
    else status = "cold"

    return {
      score: totalScore,
      status,
      breakdown,
    }
  }

  // Quick scoring for inquiry form submissions
  static scoreInquiry(data: {
    name: string
    email: string
    phone?: string
    message: string
    services: string[]
    budget?: string
    timeline?: string
    country?: string
  }): { score: number; status: "hot" | "warm" | "cold" } {
    const factors: LeadScoringFactors = {
      formFieldsFilled: [data.name, data.email, data.phone, data.message].filter(Boolean).length,
      serviceSelected: data.services?.length > 0,
      messageLength: data.message?.length || 0,
      multipleServices: Math.min((data.services?.length || 0) - 1, 3),
      budgetMentioned: !!data.budget,
      timelineMentioned: !!data.timeline,
      professionalEmail: !data.email.includes("@gmail.com") && !data.email.includes("@yahoo.com"),
      phoneProvided: !!data.phone,
      countryMatch: data.country === "AE" || data.country?.includes("Dubai"),
    }

    const result = this.score(factors)
    return { score: result.score, status: result.status }
  }
}

export default LeadQualityScorer
