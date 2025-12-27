import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">About Creative Fusion</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Full-Service Media Production & Advertising Agency
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Creative Fusion, we blend innovative strategy with cutting-edge technology to elevate your brand,
                boost visibility, and drive measurable business growth. From compelling visuals to powerful digital
                platforms, we craft solutions that make an impact.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We take full ownership of your brand's success by combining creativity, content, and code to digitalize
                your vision and accelerate growth.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Brand Identity Development",
                "Digital Marketing & Strategy",
                "Photography & Videography",
                "High-Impact Content Creation",
                "Social Media Management",
                "Website Development",
                "ERP & Software Solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <Check className="h-5 w-5 text-[#C4D600] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold gap-2" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/creative-team-brainstorming-modern-office.jpg"
                alt="Creative Fusion Team"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#C4D600] text-gray-900 p-6 rounded-xl shadow-lg max-w-[240px]">
              <div className="text-4xl font-bold mb-1">15+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
