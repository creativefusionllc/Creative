"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface InlineInquiryBannerProps {
  serviceName: string
  message?: string
}

export function InlineInquiryBanner({
  serviceName,
  message = "Limited time offer: Get 20% off on consultation",
}: InlineInquiryBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="bg-gradient-to-r from-[#C4D600] to-[#B8C900] text-black py-4 px-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <p className="font-bold text-sm md:text-base">{message}</p>
          <p className="text-sm opacity-90">Book your free consultation for {serviceName} today!</p>
        </div>
        <button onClick={() => setIsDismissed(true)} className="flex-shrink-0 ml-4 hover:opacity-80">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
