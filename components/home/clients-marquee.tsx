"use client"

const clients = [
  { name: "Al Zaki Engineering", initials: "AZ" },
  { name: "Rose Holdings", initials: "RH" },
  { name: "Gulf Properties", initials: "GP" },
  { name: "Premium Care Clinic", initials: "PC" },
  { name: "Rashid Trading", initials: "RT" },
  { name: "Emirates Group", initials: "EG" },
  { name: "Dubai Investments", initials: "DI" },
  { name: "Sharjah Media", initials: "SM" },
]

export function ClientsMarquee() {
  return (
    <section className="py-8 bg-[#1C1C1C] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap font-medium">Trusted By</p>

          <div className="flex-1 overflow-hidden relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1C1C1C] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1C1C1C] to-transparent z-10" />

            {/* Marquee Animation */}
            <div className="flex animate-marquee gap-12">
              {[...clients, ...clients].map((client, idx) => (
                <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#C4D600]">{client.initials}</span>
                  </div>
                  <span className="text-sm text-gray-400 font-medium">{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
