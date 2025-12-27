"use client"

import { Globe } from "lucide-react"

const locations = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Europe",
  "USA",
  "Worldwide",
]

export function LocationsStrip() {
  return (
    <section className="py-6 bg-gradient-to-r from-[#1C1C1C] via-[#252525] to-[#1C1C1C] border-y border-[#C4D600]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#C4D600]" />
            <span className="text-sm font-semibold text-white">Serving:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {locations.map((location, index) => (
              <span key={location} className="text-sm text-white/80 flex items-center">
                {location}
                {index < locations.length - 1 && <span className="mx-2 text-[#C4D600]">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
