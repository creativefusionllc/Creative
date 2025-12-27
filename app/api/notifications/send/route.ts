import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { type, title, message, description, clientId, actionUrl, actionLabel, metadata } = await request.json()

    if (!type || !title) {
      return NextResponse.json({ error: "Missing required fields: type, title" }, { status: 400 })
    }

    // Store notification in database
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        client_id: clientId || null,
        type,
        title,
        message: message || description,
        action_url: actionUrl,
        action_label: actionLabel,
        is_read: false,
        is_archived: false,
        metadata: metadata || {},
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, notification: data })
  } catch (error) {
    console.error("[v0] Notification error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
