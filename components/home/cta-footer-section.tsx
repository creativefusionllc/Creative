import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTAFooterSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Scale Your Business?</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Let us help you transform your digital presence and drive measurable results. Get in touch today for a free
          consultation.
        </p>
        <Button
          size="lg"
          className="gap-2 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold h-14 px-10 text-lg"
          asChild
        >
          <Link href="/contact">
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
