import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message, agent, context } = await request.json()

    const systemPrompt = `${agent.prompt_template}

Current design context:
- Canvas size: ${context.canvasSize.width}x${context.canvasSize.height}px
- Brand kit: ${context.brandKit ? `Using "${context.brandKit.name}" with colors: ${context.brandKit.primary_color}, ${context.brandKit.secondary_color}` : "No brand kit selected"}
- Current elements: ${context.elements.length} elements on canvas

Provide specific, actionable creative advice based on your expertise. Be concise but helpful.`

    try {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system: systemPrompt,
        prompt: message,
      })

      return NextResponse.json({ response: text })
    } catch (aiError) {
      // Fallback to template-based responses
      const responses: Record<string, string[]> = {
        "Creative Director": [
          `For this ${context.canvasSize.width}x${context.canvasSize.height} canvas, I recommend focusing on visual hierarchy. Start with your main message prominently placed, then support it with secondary elements.`,
          `Consider the rule of thirds for your layout. Place key elements along these intersection points for a more dynamic composition.`,
          `Brand consistency is key. Make sure your color palette and typography align with your brand guidelines throughout the design.`,
        ],
        "Content Strategist": [
          `For maximum engagement, keep your headline under 10 words and use action-oriented language.`,
          `Consider your audience's pain points. What problem does your design solve? Lead with that.`,
          `Use the AIDA framework: Attention (headline), Interest (subtext), Desire (benefits), Action (CTA).`,
        ],
        "Graphic Designer": [
          `For visual balance, try adding a shape element behind your text to create contrast and improve readability.`,
          `Consider using your brand's accent color for the most important element to draw attention.`,
          `White space is your friend! Don't feel the need to fill every pixel - breathing room improves comprehension.`,
        ],
        "Art Director": [
          `The composition could benefit from stronger visual anchors. Try adding a bold graphic element in the corners.`,
          `Consider the emotional impact of your imagery. Does it align with the message you want to convey?`,
          `Pay attention to visual flow - guide the viewer's eye from the most important element to your call-to-action.`,
        ],
        "Social Media Specialist": [
          `For Instagram, square posts (1:1) get 1.43x more engagement. For stories, use 9:16 for full-screen impact.`,
          `Add your brand handle or website in a consistent position across all posts for brand recognition.`,
          `Use contrasting colors from your feed to make this post stand out in the scroll.`,
        ],
        "Digital Marketing Expert": [
          `A/B test this design against a variant with different headline placement to optimize conversions.`,
          `Ensure your CTA button has at least 44x44px touch target for mobile users.`,
          `Track this design's performance with UTM parameters to measure ROI accurately.`,
        ],
      }

      const agentResponses = responses[agent.role] || responses["Creative Director"]
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]

      return NextResponse.json({ response: randomResponse })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
