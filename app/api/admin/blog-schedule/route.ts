import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { hour } = await request.json()

    // Validate hour is between 0-23
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
      return NextResponse.json({ error: "Invalid hour" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          },
        },
      },
    )

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Store blog schedule in app_settings table
    const { error } = await supabase.from("app_settings").upsert(
      {
        key: "blog_publish_hour",
        value: hour.toString(),
        updated_at: new Date(),
      },
      {
        onConflict: "key",
      },
    )

    if (error) {
      console.error("Failed to save blog schedule:", error)
      return NextResponse.json({ error: "Failed to save schedule" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Blog schedule updated to ${hour}:00 UTC`,
      hour,
    })
  } catch (error) {
    console.error("Blog schedule error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
