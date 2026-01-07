import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("[v0] Admin auth error:", error.message)
      return Response.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (!data.user) {
      return Response.json({ error: "Authentication failed" }, { status: 401 })
    }

    const { data: userRole, error: roleError } = await supabase
      .from("user_roles")
      .select("role, is_active")
      .eq("user_id", data.user.id)
      .in("role", ["admin", "super_admin"])
      .eq("is_active", true)
      .maybeSingle()

    if (!userRole) {
      console.log("[v0] Admin access denied - not an admin/super_admin:", email)
      return Response.json({ error: "Admin access denied. You do not have admin privileges." }, { status: 403 })
    }

    console.log("[v0] Admin login successful:", email, "role:", userRole.role)

    return Response.json(
      {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: userRole.role,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.log("[v0] Admin login error:", error)
    return Response.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
