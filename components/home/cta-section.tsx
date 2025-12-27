"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Phone, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-[#C4D600]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#1C1C1C]/70 font-medium tracking-widest uppercase text-sm mb-4">Let's Get Started</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1C1C1C] leading-tight">
              We're Delivering the Best Customer Experience
            </h2>
            <p className="text-[#1C1C1C]/70 leading-relaxed mb-8">
              Whether you need cinematic content, a stunning website, or a complete digital strategy, we're here to
              bring your vision to life. Let's grow together.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="gap-2 bg-[#1C1C1C] text-white hover:bg-[#2C2C2C] h-14 px-8" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[#1C1C1C]/30 text-[#1C1C1C] hover:bg-[#1C1C1C]/10 bg-transparent h-14 px-8"
                asChild
              >
                <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-[#1C1C1C]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#1C1C1C]/20 hover:bg-[#1C1C1C]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#C4D600]" />
                </div>
                <div>
                  <p className="text-[#1C1C1C]/60 text-sm">Call Us Directly</p>
                  <a href="tel:+971581174911" className="text-xl font-bold text-[#1C1C1C] hover:underline">
                    +971 58 117 4911
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1C1C]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#1C1C1C]/20 hover:bg-[#1C1C1C]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#C4D600]" />
                </div>
                <div>
                  <p className="text-[#1C1C1C]/60 text-sm">Email Us</p>
                  <a href="mailto:info@creativefusion.ae" className="text-xl font-bold text-[#1C1C1C] hover:underline">
                    info@creativefusion.ae
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1C1C]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#1C1C1C]/20 hover:bg-[#1C1C1C]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#C4D600]" />
                </div>
                <div>
                  <p className="text-[#1C1C1C]/60 text-sm">WhatsApp</p>
                  <a
                    href="https://wa.me/971581174911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-[#1C1C1C] hover:underline"
                  >
                    Chat with Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
