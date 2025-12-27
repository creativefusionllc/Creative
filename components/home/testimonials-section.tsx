"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface Testimonial {
  quote: string
  author: string
  role: string
  image: string
  rating: number
  source?: string
}

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    try {
      const supabase = createClient()

      // Fetch real Google reviews for Creative Fusion
      const { data: reviews } = await supabase
        .from("gmb_reviews")
        .select("*, gmb_profiles!inner(business_name)")
        .eq("gmb_profiles.business_name", "Creative Fusion")
        .eq("sentiment", "positive")
        .gte("rating", 4)
        .order("review_date", { ascending: false })
        .limit(10)

      const googleTestimonials: Testimonial[] = (reviews || []).map((review: any) => ({
        quote: review.review_text,
        author: review.reviewer_name,
        role: "Google Business Review",
        image: "/professional-businessman.png", // Default avatar
        rating: review.rating,
        source: "google",
      }))

      // Fallback testimonials if no Google reviews yet
      const fallbackTestimonials: Testimonial[] = [
        {
          quote:
            "Creative Fusion LLC masterfully rebranded Al Zaki Engineering, our 40-year-old company. Their work is exceptional; they're now our official media partner.",
          author: "Muhammed Raza",
          role: "CEO, Al Zaki Engineering",
          image: "/professional-businessman.png",
          rating: 5,
        },
        {
          quote:
            "Their work goes beyond expectations, combining exceptional skill, creativity, dedication, and timely delivery in every project, ensuring excellent results.",
          author: "Sarah Rose",
          role: "Managing Director, Rose Holdings",
          image: "/professional-businesswoman.png",
          rating: 5,
        },
        {
          quote:
            "Creative Fusion LLC transformed our digital presence. Their expertise in web, branding, and digital marketing delivered outstanding results for our real estate business.",
          author: "Shahid Madni",
          role: "Marketing Director, Gulf Properties",
          image: "/professional-businessman.png",
          rating: 5,
        },
      ]

      setTestimonials(googleTestimonials.length > 0 ? googleTestimonials : fallbackTestimonials)
    } catch (error) {
      console.error("[v0] Error loading testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (testimonials.length === 0) return

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3))
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const next = () => setStartIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3))
  const prev = () => setStartIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3))

  if (loading || testimonials.length === 0) {
    return null
  }

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3)

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C4D600]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">
            {testimonials[startIndex]?.source === "google" ? "Google Business Reviews" : "Testimonials"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={startIndex + index}
              className="relative bg-gray-50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-[#C4D600]/20" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C4D600] text-[#C4D600]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm md:text-base text-gray-900 leading-relaxed mb-6 min-h-[120px]">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C4D600] flex-shrink-0">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="h-12 w-12 rounded-full border-gray-300 text-gray-900 hover:bg-[#C4D600] hover:border-[#C4D600] hover:text-[#1C1C1C] bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index * 3)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(startIndex / 3) === index ? "w-8 bg-[#C4D600]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonials page ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="h-12 w-12 rounded-full border-gray-300 text-gray-900 hover:bg-[#C4D600] hover:border-[#C4D600] hover:text-[#1C1C1C] bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
