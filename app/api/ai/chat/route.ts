import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, agent, context } = body

    const systemPrompt = `You are ${agent.name}, a ${agent.role} at Creative Fusion LLC. 
${agent.system_prompt || ""}

Your expertise includes: ${agent.expertise?.join(", ") || "design, branding, creative direction"}

Current design context:
- Canvas size: ${context.canvasWidth}x${context.canvasHeight}
- Elements on canvas: ${context.elements}
${context.brandKit ? `- Brand kit: ${context.brandKit.name}` : ""}

Provide helpful, professional design advice. Be concise but thorough.`

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json({
      message: "I'm here to help with your design. What would you like to create?",
    })
  }
}
