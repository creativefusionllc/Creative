"use client"

import { useState } from "react"
import InquiryForm from "@/components/inquiry-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MessageCircle } from "lucide-react"

interface StrategicCTASectionProps {
  serviceName: string
  serviceCategory: string
  description?: string
}

export function StrategicCTASection({
  serviceName,
  serviceCategory,
  description = "Ready to get started with our services?",
}: StrategicCTASectionProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false)

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-[#1C1C1C] to-[#252525] border-t border-[#C4D600]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CTA Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Heading and Description */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for {serviceName}?</h2>
              <p className="text-lg text-gray-300 mb-6">{description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowInquiryForm(true)}
                  className="bg-[#C4D600] hover:bg-[#B8C900] text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600]/10 py-3 px-6 bg-transparent"
                >
                  <a href="https://wa.me/971XXXXXXXXX?text=Hi, I'm interested in your services!">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Benefit Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/5 border-[#C4D600]/20 p-4">
                <div className="text-[#C4D600] font-bold text-2xl mb-2">100%</div>
                <p className="text-sm text-gray-300">Satisfaction Guaranteed</p>
              </Card>

              <Card className="bg-white/5 border-[#C4D600]/20 p-4">
                <div className="text-[#C4D600] font-bold text-2xl mb-2">24/7</div>
                <p className="text-sm text-gray-300">Expert Support</p>
              </Card>

              <Card className="bg-white/5 border-[#C4D600]/20 p-4">
                <div className="text-[#C4D600] font-bold text-2xl mb-2">5+</div>
                <p className="text-sm text-gray-300">Years Experience</p>
              </Card>

              <Card className="bg-white/5 border-[#C4D600]/20 p-4">
                <div className="text-[#C4D600] font-bold text-2xl mb-2">500+</div>
                <p className="text-sm text-gray-300">Happy Clients</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1C] border border-[#C4D600]/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Get {serviceName} Quote</h3>
                <button onClick={() => setShowInquiryForm(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              {/* Pass service info to form */}
              <InquiryForm
                defaultService={serviceCategory}
                onSuccess={() => {
                  setShowInquiryForm(false)
                  alert("Thank you! We'll contact you soon.")
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
