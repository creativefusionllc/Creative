import { PricingPackagesDisplay } from "@/components/pricing-packages-display"

export function SpecialOffersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1F2937] to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C4D600] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C4D600]/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Special Offers</h2>
          <p className="text-xl text-gray-300">Limited time deals on our most popular packages</p>
        </div>
        <PricingPackagesDisplay showAll={true} limit={6} />
      </div>
    </section>
  )
}
