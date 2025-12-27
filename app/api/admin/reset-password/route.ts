import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const newPassword = searchParams.get("password")

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get the user by email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 400 })
    }

    const user = users.users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
      email: email,
      newPassword: newPassword,
      loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://creativefusion.llc"}/admin`,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to reset password" }, { status: 500 })
  }
}
