import { createBrowserClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

class RealtimeUpdateManager {
  private channels: Map<string, RealtimeChannel> = new Map()
  private listeners: Map<string, Set<(data: any) => void>> = new Map()

  async subscribe(table: string, onUpdate: (data: any) => void) {
    const supabase = createBrowserClient()

    if (!this.listeners.has(table)) {
      this.listeners.set(table, new Set())
    }

    this.listeners.get(table)?.add(onUpdate)

    if (!this.channels.has(table)) {
      const channel = supabase
        .channel(`public:${table}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
          console.log("[v0] Real-time update from", table, payload)
          this.listeners.get(table)?.forEach((listener) => listener(payload))
        })
        .subscribe()

      this.channels.set(table, channel)
    }
  }

  unsubscribe(table: string, onUpdate: (data: any) => void) {
    this.listeners.get(table)?.delete(onUpdate)

    if (this.listeners.get(table)?.size === 0) {
      this.channels.get(table)?.unsubscribe()
      this.channels.delete(table)
    }
  }

  async notifyChanges(table: string) {
    // Trigger cache revalidation on Vercel
    try {
      await fetch(`/api/revalidate?tag=${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    } catch (err) {
      console.error("[v0] Revalidation failed:", err)
    }
  }
}

export const realtimeManager = new RealtimeUpdateManager()
