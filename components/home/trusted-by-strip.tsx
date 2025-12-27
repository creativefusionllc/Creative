import Image from "next/image"

const trustedClients = [
  { name: "Al Zaki Engineering", logo: "/al-zaki-engineering-logo.jpg" },
  { name: "Rose Holdings", logo: "/rose-holdings-logo.jpg" },
  { name: "Gulf Properties", logo: "/gulf-properties-logo.jpg" },
  { name: "Emirates Tech", logo: "/emirates-tech-logo.jpg" },
  { name: "Dubai Ventures", logo: "/dubai-ventures-logo.jpg" },
  { name: "Arabian Solutions", logo: "/arabian-solutions-logo.jpg" },
]

export function TrustedByStrip() {
  return (
    <section className="py-12 bg-gray-100 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 font-semibold mb-8">TRUSTED BY</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {trustedClients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
