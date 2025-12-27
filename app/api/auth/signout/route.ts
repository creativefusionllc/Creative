import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()

    return NextResponse.redirect(new URL("/", request.url), { status: 303 })
  } catch (error) {
    console.error("[v0] Signout error:", error)
    return NextResponse.json({ error: "Signout failed" }, { status: 500 })
  }
}
