import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required in query params" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // No email verification needed
    })

    if (error) {
      console.error("[v0] Create user error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[v0] User created:", data.user?.id)

    return NextResponse.json({
      success: true,
      message: `User ${email} created successfully`,
      userId: data.user?.id,
      loginUrl: "/login",
    })
  } catch (err: any) {
    console.error("[v0] Create user error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
