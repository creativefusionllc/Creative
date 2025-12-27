import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Singleton instance for browser client
let browserClient: SupabaseClient | null = null

export function createClient() {
  if (typeof window === "undefined") {
    // Server-side: always create new client (handled by server.ts)
    return createSupabaseBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  // Client-side: use singleton
  if (!browserClient) {
    browserClient = createSupabaseBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return browserClient
}

export const createBrowserClient = createClient

// For components that directly use createBrowserClient from @supabase/ssr
// This provides a singleton-wrapped version
export function getSupabaseClient() {
  return createClient()
}
