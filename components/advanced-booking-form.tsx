"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Loader2, X } from "lucide-react"

interface BookingService {
  name: string
  subcategories: {
    name: string
    subservices: string[]
    pricing: {
      min: number
      max: number
      default: number
    }
  }[]
}

const BOOKING_SERVICES: Record<string, BookingService> = {
  "Creative & Design": {
    name: "Creative & Design Services",
    subcategories: [
      {
        name: "Brand Identity",
        subservices: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Messaging"],
        pricing: { min: 1500, max: 5000, default: 2500 },
      },
      {
        name: "Graphic Design",
        subservices: ["Brochure Design", "Flyer Design", "Poster Design", "Social Graphics"],
        pricing: { min: 800, max: 3000, default: 1500 },
      },
      {
        name: "Photography",
        subservices: ["Product Photography", "Corporate Photography", "Event Photography", "Real Estate Photography"],
        pricing: { min: 1500, max: 5000, default: 2500 },
      },
      {
        name: "Videography",
        subservices: ["Corporate Videos", "TV Commercials", "Event Coverage", "Product Videos"],
        pricing: { min: 3500, max: 10000, default: 5500 },
      },
    ],
  },
  "Digital & Web": {
    name: "Digital & Web Development",
    subcategories: [
      {
        name: "Web Design",
        subservices: ["Corporate Website", "E-commerce Website", "Landing Pages", "Portfolio Website"],
        pricing: { min: 3500, max: 10000, default: 5500 },
      },
      {
        name: "Web Development",
        subservices: ["Full Stack Development", "Frontend Development", "Backend Development", "API Integration"],
        pricing: { min: 5000, max: 15000, default: 8000 },
      },
      {
        name: "Mobile Apps",
        subservices: ["iOS App", "Android App", "Cross-platform App", "PWA"],
        pricing: { min: 10000, max: 30000, default: 15000 },
      },
      {
        name: "Software Development",
        subservices: ["Business Software", "Custom Tools", "ERP Solutions", "CRM Systems"],
        pricing: { min: 15000, max: 50000, default: 25000 },
      },
    ],
  },
  Marketing: {
    name: "Marketing & Digital Marketing",
    subcategories: [
      {
        name: "Social Media Marketing",
        subservices: ["Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "TikTok Marketing"],
        pricing: { min: 2000, max: 8000, default: 3500 },
      },
      {
        name: "SEO Services",
        subservices: ["On-page SEO", "Off-page SEO", "Technical SEO", "Local SEO"],
        pricing: { min: 1500, max: 5000, default: 2500 },
      },
      {
        name: "PPC & Ads",
        subservices: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Display Ads"],
        pricing: { min: 2000, max: 10000, default: 4000 },
      },
      {
        name: "Content Marketing",
        subservices: ["Blog Writing", "Video Content", "Infographics", "Case Studies"],
        pricing: { min: 1000, max: 5000, default: 2500 },
      },
    ],
  },
  "Print & Exhibitions": {
    name: "Print & Exhibitions",
    subcategories: [
      {
        name: "Exhibition Stands",
        subservices: ["Custom Stands", "Modular Stands", "Shell Scheme", "Double-Decker Stands"],
        pricing: { min: 5000, max: 20000, default: 8000 },
      },
      {
        name: "Large Format Print",
        subservices: ["Billboards", "Banners", "Vehicle Branding", "Signage"],
        pricing: { min: 2000, max: 8000, default: 4000 },
      },
      {
        name: "Print Materials",
        subservices: ["Business Cards", "Letterheads", "Brochures", "Packaging"],
        pricing: { min: 500, max: 3000, default: 1500 },
      },
    ],
  },
  "Consulting & Specialty": {
    name: "Consulting & Specialty Services",
    subcategories: [
      {
        name: "Business Consulting",
        subservices: ["Brand Strategy", "Digital Strategy", "Marketing Strategy", "Business Planning"],
        pricing: { min: 3000, max: 15000, default: 5000 },
      },
      {
        name: "Gift Items",
        subservices: ["Corporate Gifts", "Branded Merchandise", "Promotional Items", "Executive Gifts"],
        pricing: { min: 1000, max: 5000, default: 2500 },
      },
      {
        name: "WhatsApp Marketing",
        subservices: ["Bulk Messaging", "Chatbot Setup", "Campaign Management", "Customer Support"],
        pricing: { min: 1500, max: 5000, default: 2500 },
      },
    ],
  },
}

interface BookingFormProps {
  onClose?: () => void
  isModal?: boolean
}

export default function AdvancedBookingForm({ onClose, isModal = false }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    service_category: "",
    service_subcategory: "",
    project_description: "",
    budget_range: "",
    timeline: "",
    scheduled_date: "", // changed from preferred_date to scheduled_date to match database
    scheduled_time: "", // added scheduled_time for database
    additional_info: "", // added for notes
  })

  const [selectedService, setSelectedService] = useState<BookingService | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState<{ min: number; max: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [agreeToTnC, setAgreeToTnC] = useState(false)
  const [serviceTnC, setServiceTnC] = useState<any>(null)

  const supabase = createClient()

  const serviceKeys = Object.keys(BOOKING_SERVICES)
  const subcategories = formData.service_category
    ? BOOKING_SERVICES[formData.service_category]?.subcategories || []
    : []

  const selectedSubcategory = subcategories.find((s) => s.name === formData.service_subcategory)
  const subservices = selectedSubcategory?.subservices || []

  useEffect(() => {
    if (selectedSubcategory) {
      setEstimatedPrice({
        min: selectedSubcategory.pricing.min,
        max: selectedSubcategory.pricing.max,
      })
    }
  }, [selectedSubcategory])

  useEffect(() => {
    if (formData.service_category) {
      fetchServiceTnC()
    }
  }, [formData.service_category])

  const fetchServiceTnC = async () => {
    const { data } = await supabase
      .from("terms_conditions")
      .select("*")
      .eq("service_category", formData.service_category)
      .eq("is_active", true)
      .single()

    setServiceTnC(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/bookings/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company_name,
          service_category: formData.service_category,
          service_subcategory: formData.service_subcategory,
          project_description: formData.project_description,
          budget_range: formData.budget_range,
          timeline: formData.timeline,
          notes: formData.additional_info || "", // mapping additional_info to notes
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking")
      }

      setSuccess(true)

      setTimeout(() => {
        if (data.whatsapp_url) {
          window.open(data.whatsapp_url, "_blank")
        } else {
          const message = `New Booking Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company_name}\nService: ${formData.service_category} - ${formData.service_subcategory}\nBudget: ${formData.budget_range}\nTimeline: ${formData.timeline}\nDetails: ${formData.project_description}`
          window.open(`https://wa.me/971581174911?text=${encodeURIComponent(message)}`, "_blank")
        }
        if (onClose) onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      console.log("[v0] Booking error:", err)
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Our Services</h3>
        <p className="text-sm text-gray-600">Select your service, and we'll provide pricing and availability details</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 pb-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Your Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+971581174911"
            />
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              placeholder="Your Company"
            />
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="space-y-4 pb-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Select Your Service</h4>

        {/* Main Service Category */}
        <div>
          <Label htmlFor="service_category">Service Category *</Label>
          <select
            id="service_category"
            required
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            value={formData.service_category}
            onChange={(e) => {
              setFormData({
                ...formData,
                service_category: e.target.value,
                service_subcategory: "",
              })
              setSelectedService(e.target.value ? BOOKING_SERVICES[e.target.value] : null)
            }}
          >
            <option value="">Select a service</option>
            {serviceKeys.map((key) => (
              <option key={key} value={key}>
                {BOOKING_SERVICES[key].name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {subcategories.length > 0 && (
          <div>
            <Label htmlFor="subcategory">Service Type *</Label>
            <select
              id="subcategory"
              required
              disabled={!formData.service_category}
              className="w-full h-10 px-3 rounded-md border border-input bg-background disabled:opacity-50"
              value={formData.service_subcategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  service_subcategory: e.target.value,
                })
              }
            >
              <option value="">Select a service type</option>
              {subcategories.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sub-service */}
        {subservices.length > 0 && (
          <div>
            <Label htmlFor="subservice">Specific Service</Label>
            <select
              id="subservice"
              disabled={!formData.service_subcategory}
              className="w-full h-10 px-3 rounded-md border border-input bg-background disabled:opacity-50"
              onChange={() => {}}
            >
              <option value="">Select specific service</option>
              {subservices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pricing Display */}
      {estimatedPrice && (
        <div className="bg-[#C4D600]/10 border border-[#C4D600]/30 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Estimated Price Range</p>
          <p className="text-2xl font-bold text-gray-900">
            AED {estimatedPrice.min.toLocaleString()} - AED {estimatedPrice.max.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Custom pricing available based on requirements</p>
        </div>
      )}

      {/* Project Details */}
      <div className="space-y-4 pb-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Project Details</h4>

        <div>
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            required
            rows={4}
            value={formData.project_description}
            onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
            placeholder="Tell us about your project, requirements, goals, and any specific details..."
          />
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="space-y-4 pb-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Timeline & Budget</h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timeline">Preferred Timeline *</Label>
            <select
              id="timeline"
              required
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            >
              <option value="">Select timeline</option>
              <option value="Urgent (< 2 weeks)">Urgent (Less than 2 weeks)</option>
              <option value="1 month">1 month</option>
              <option value="2-3 months">2-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
          <div>
            <Label htmlFor="date">Preferred Start Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.scheduled_date}
              onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <Checkbox
          id="tnc-advanced"
          checked={agreeToTnC}
          onCheckedChange={(checked) => setAgreeToTnC(checked as boolean)}
        />
        <label htmlFor="tnc-advanced" className="text-sm text-gray-700 cursor-pointer">
          I agree to the{" "}
          <button
            type="button"
            onClick={() => serviceTnC && alert(serviceTnC.content)}
            className="text-[#C4D600] hover:underline font-semibold"
          >
            Terms & Conditions
          </button>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading || !agreeToTnC}
        className="w-full bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold h-12"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get Quote & Availability"
        )}
      </Button>
    </form>
  )

  if (success) {
    return (
      <div className={isModal ? "p-8" : "bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto"}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#C4D600] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-gray-900" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Received!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your inquiry. We'll contact you shortly to discuss your project.
          </p>
          <p className="text-sm text-gray-500">Redirecting to WhatsApp...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={isModal ? "relative" : "bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto"}>
      {isModal && onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      )}
      {formContent}
    </div>
  )
}
