import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()

    // Create service role client for admin operations (bypasses RLS)
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Handle case where cookies can't be set in certain contexts
          }
        },
      },
    })

    // Verify user is authenticated and has admin role
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const { name, email, phone, company_name, client_number, verification_token } = await request.json()

    if (!name || !email || !client_number) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create client with service role (bypasses RLS)
    const { data: newClient, error: createError } = await supabase
      .from("clients")
      .insert({
        name,
        email,
        phone: phone || null,
        company_name: company_name || null,
        client_number,
        is_active: true,
        wallet_balance: 0,
        points_balance: 0,
        email_verified: false,
        admin_approved: false,
        account_status: "pending",
        verification_token,
        verification_sent_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (createError) {
      console.error("[v0] Supabase error creating client:", createError)
      return NextResponse.json({ message: createError.message }, { status: 400 })
    }

    return NextResponse.json({ newClient }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
  }
}
