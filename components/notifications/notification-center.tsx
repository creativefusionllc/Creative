"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Bell, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  action_url?: string
  is_read: boolean
  created_at: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchNotifications()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          fetchNotifications()
        },
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  async function fetchNotifications() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .limit(10)

    if (data) {
      setNotifications(data)
      setUnreadCount(data.filter((n) => !n.is_read).length)
    }
  }

  async function markAsRead(notificationId: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

    fetchNotifications()
  }

  async function deleteNotification(notificationId: string) {
    await supabase.from("notifications").update({ is_archived: true }).eq("id", notificationId)

    fetchNotifications()
    toast.success("Notification archived")
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="relative border-white/20 text-white hover:bg-white/10 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#141414] border border-white/10 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No notifications</div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!notif.is_read ? "bg-white/5" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-white">{notif.title}</p>
                      {notif.message && <p className="text-sm text-gray-400 mt-1">{notif.message}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => deleteNotification(notif.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{new Date(notif.created_at).toLocaleString()}</span>
                    {!notif.is_read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs text-[#C4D600] hover:bg-[#C4D600]/10"
                        onClick={() => markAsRead(notif.id)}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
