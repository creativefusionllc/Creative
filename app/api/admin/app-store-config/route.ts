import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch the most recent app store config
    const { data, error } = await supabase
      .from("app_store_config")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is ok
      throw error
    }

    if (!data) {
      return NextResponse.json({
        ios_app_id: "",
        android_package_name: "",
        is_active: false,
        auto_redirect: true,
        show_banner_on_mobile: true,
        banner_text: "Download Creative Fusion App",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching app store config:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const {
      ios_app_id,
      ios_app_url,
      android_package_name,
      android_app_url,
      is_active,
      auto_redirect,
      show_banner_on_mobile,
      banner_text,
    } = body

    // Validate required fields
    if (!ios_app_id || !android_package_name) {
      return NextResponse.json({ error: "iOS App ID and Android package name are required" }, { status: 400 })
    }

    // Check if config exists
    const { data: existingConfig, error: fetchError } = await supabase
      .from("app_store_config")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError
    }

    let result

    if (existingConfig) {
      // Update existing config
      const { data, error } = await supabase
        .from("app_store_config")
        .update({
          ios_app_id,
          ios_app_url: ios_app_url || "https://apps.apple.com/ae/app/creative-fusion/id",
          android_package_name,
          android_app_url: android_app_url || "https://play.google.com/store/apps/details?id=",
          is_active: is_active !== undefined ? is_active : true,
          auto_redirect: auto_redirect !== undefined ? auto_redirect : true,
          show_banner_on_mobile: show_banner_on_mobile !== undefined ? show_banner_on_mobile : true,
          banner_text: banner_text || "Download Creative Fusion App",
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingConfig.id)
        .select()
        .single()

      if (error) throw error
      result = data
    } else {
      // Create new config
      const { data, error } = await supabase
        .from("app_store_config")
        .insert({
          ios_app_id,
          ios_app_url: ios_app_url || "https://apps.apple.com/ae/app/creative-fusion/id",
          android_package_name,
          android_app_url: android_app_url || "https://play.google.com/store/apps/details?id=",
          is_active: is_active !== undefined ? is_active : true,
          auto_redirect: auto_redirect !== undefined ? auto_redirect : true,
          show_banner_on_mobile: show_banner_on_mobile !== undefined ? show_banner_on_mobile : true,
          banner_text: banner_text || "Download Creative Fusion App",
        })
        .select()
        .single()

      if (error) throw error
      result = data
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error saving app store config:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
