"use client"

import { useEffect } from "react"
import { realtimeManager } from "@/lib/realtime/realtime-updates"

export function useRealtimeUpdates(table: string, onUpdate: (data: any) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    realtimeManager.subscribe(table, onUpdate)

    return () => {
      realtimeManager.unsubscribe(table, onUpdate)
    }
  }, [table, onUpdate, enabled])
}
