import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    })

    // Delete duplicate capitalized packages
    const { error } = await supabase
      .from("packages")
      .delete()
      .in("name", ["Photography", "Digital Marketing", "Videography"])

    if (error) {
      return NextResponse.json({ error: error.message, success: false }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Duplicate packages removed successfully. You can now deploy.",
    })
  } catch (error) {
    return NextResponse.json({ error: String(error), success: false }, { status: 500 })
  }
}
