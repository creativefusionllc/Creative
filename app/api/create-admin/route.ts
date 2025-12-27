import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required as query parameters" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        is_admin: true,
      },
    })

    if (error) {
      console.error("[v0] Admin create user error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[v0] Admin user created successfully:", data.user?.id)

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      userId: data.user?.id,
      email: email,
      password: password,
    })
  } catch (err: any) {
    console.error("[v0] Create admin error:", err)
    return NextResponse.json({ error: err.message || "Failed to create admin user" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        is_admin: true,
      },
    })

    if (error) {
      console.error("[v0] Admin create user error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[v0] Admin user created successfully:", data.user?.id)

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      userId: data.user?.id,
    })
  } catch (err: any) {
    console.error("[v0] Create admin error:", err)
    return NextResponse.json({ error: err.message || "Failed to create admin user" }, { status: 500 })
  }
}
