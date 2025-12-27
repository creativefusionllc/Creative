"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, X, CheckCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  type: "info" | "success" | "warning" | "error"
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Booking Request",
    message: "John Doe submitted a booking for Web Design service",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    type: "info",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment of AED 5,000 received from Creative Studio LLC",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    type: "success",
  },
  {
    id: "3",
    title: "Project Deadline",
    message: "Logo design project is due in 2 days",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    type: "warning",
  },
  {
    id: "4",
    title: "New Client Registration",
    message: "Sarah Smith registered and is awaiting approval",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    type: "info",
  },
  {
    id: "5",
    title: "Invoice Overdue",
    message: "Invoice #INV-1234 is 3 days overdue",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    type: "error",
  },
]

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "error":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    }
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button ref={buttonRef} variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-[380px] max-w-[calc(100vw-2rem)] z-[9999]"
          >
            <Card className="overflow-hidden shadow-lg border">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <div>
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <p className="text-xs text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7 px-2">
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <motion.div layout className="divide-y">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer group relative ${
                          !notification.isRead ? "bg-primary/5" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          {/* Unread Indicator */}
                          {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium text-sm leading-tight">{notification.title}</h4>
                              <Badge
                                variant="secondary"
                                className={`text-[10px] px-1.5 py-0 h-5 ${getTypeColor(notification.type)}`}
                              >
                                {notification.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{notification.message}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t bg-muted/30">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View all notifications
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
