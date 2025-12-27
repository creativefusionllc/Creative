"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  created_at: string
  read: boolean
}

export function NotificationCenter({ clientId }: { clientId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (clientId && clientId !== "") {
      fetchNotifications()
    }
  }, [clientId])

  async function fetchNotifications() {
    if (!clientId || clientId === "") {
      console.log("[v0] NotificationCenter: clientId is empty, skipping fetch")
      return
    }

    const supabase = createClient()
    const notifications: Notification[] = []

    // Check wallet transactions
    const { data: walletTxns } = await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(5)

    walletTxns?.forEach((txn) => {
      notifications.push({
        id: txn.id,
        type: txn.type === "credit" ? "success" : "info",
        title: txn.type === "credit" ? "Payment Approved" : "Payment Processed",
        message: txn.description || `${txn.type === "credit" ? "+" : "-"}AED ${Math.abs(txn.amount)}`,
        created_at: txn.created_at,
        read: false,
      })
    })

    // Check points expiring soon (mock)
    const { data: client } = await supabase.from("clients").select("points_balance").eq("id", clientId).single()

    if (client && client.points_balance > 100) {
      notifications.push({
        id: "points-expiry",
        type: "warning",
        title: "Points Expiring Soon",
        message: `${Math.floor(client.points_balance * 0.2)} Creative Points expire in 7 days.`,
        created_at: new Date().toISOString(),
        read: false,
      })
    }

    // Check confirmed bookings
    const { data: bookings } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .order("created_at", { ascending: false })
      .limit(3)

    bookings?.forEach((booking) => {
      notifications.push({
        id: `booking-${booking.id}`,
        type: "success",
        title: "Booking Confirmed",
        message: `Your booking for ${booking.service_category} has been confirmed.`,
        created_at: booking.created_at,
        read: false,
      })
    })

    setNotifications(notifications.slice(0, 10))
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }

  const iconMap = {
    success: CheckCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colorMap = {
    success: "text-green-600 bg-green-50",
    warning: "text-orange-600 bg-orange-50",
    info: "text-blue-600 bg-blue-50",
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type]
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colorMap[notification.type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
