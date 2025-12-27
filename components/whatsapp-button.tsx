"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971581174911"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
      style={{ boxShadow: "0 0 20px rgba(37, 211, 102, 0.4)" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
