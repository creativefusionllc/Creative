"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Check,
  Loader2,
  X,
  ArrowRight,
  MessageCircle,
  Mail,
  CheckCircle,
  User,
  Briefcase,
  Phone,
  Calendar,
} from "lucide-react"

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

// These are replaced by CMS data
// const BOOKING_SERVICES: Record<string, BookingService> = {
//   "Creative & Design": {
//     name: "Creative & Design Services",
//     subcategories: [
//       {
//         name: "Brand Identity",
//         subservices: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Messaging"],
//         pricing: { min: 1500, max: 5000, default: 2500 },
//       },
//       {
//         name: "Graphic Design",
//         subservices: ["Brochure Design", "Flyer Design", "Poster Design", "Social Graphics"],
//         pricing: { min: 800, max: 3000, default: 1500 },
//       },
//       {
//         name: "Photography",
//         subservices: ["Product Photography", "Corporate Photography", "Event Photography", "Real Estate Photography"],
//         pricing: { min: 1500, max: 5000, default: 2500 },
//       },
//       {
//         name: "Videography",
//         subservices: ["Corporate Videos", "TV Commercials", "Event Coverage", "Product Videos"],
//         pricing: { min: 3500, max: 10000, default: 5500 },
//       },
//     ],
//   },
//   "Digital & Web": {
//     name: "Digital & Web Development",
//     subcategories: [
//       {
//         name: "Web Design",
//         subservices: ["Corporate Website", "E-commerce Website", "Landing Pages", "Portfolio Website"],
//         pricing: { min: 3500, max: 10000, default: 5500 },
//       },
//       {
//         name: "Web Development",
//         subservices: ["Full Stack Development", "Frontend Development", "Backend Development", "API Integration"],
//         pricing: { min: 5000, max: 15000, default: 8000 },
//       },
//       {
//         name: "Mobile Apps",
//         subservices: ["iOS App", "Android App", "Cross-platform App", "PWA"],
//         pricing: { min: 10000, max: 30000, default: 15000 },
//       },
//       {
//         name: "Software Development",
//         subservices: ["Business Software", "Custom Tools", "ERP Solutions", "CRM Systems"],
//         pricing: { min: 15000, max: 50000, default: 25000 },
//       },
//     ],
//   },
//   Marketing: {
//     name: "Marketing & Digital Marketing",
//     subcategories: [
//       {
//         name: "Social Media Marketing",
//         subservices: ["Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "TikTok Marketing"],
//         pricing: { min: 2000, max: 8000, default: 3500 },
//       },
//       {
//         name: "SEO Services",
//         subservices: ["On-page SEO", "Off-page SEO", "Technical SEO", "Local SEO"],
//         pricing: { min: 1500, max: 5000, default: 2500 },
//       },
//       {
//         name: "PPC & Ads",
//         subservices: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Display Ads"],
//         pricing: { min: 2000, max: 10000, default: 4000 },
//       },
//       {
//         name: "Content Marketing",
//         subservices: ["Blog Writing", "Video Content", "Infographics", "Case Studies"],
//         pricing: { min: 1000, max: 5000, default: 2500 },
//       },
//     ],
//   },
//   "Print & Exhibitions": {
//     name: "Print & Exhibitions",
//     subcategories: [
//       {
//         name: "Exhibition Stands",
//         subservices: ["Custom Stands", "Modular Stands", "Shell Scheme", "Double-Decker Stands"],
//         pricing: { min: 5000, max: 20000, default: 8000 },
//       },
//       {
//         name: "Large Format Print",
//         subservices: ["Billboards", "Banners", "Vehicle Branding", "Signage"],
//         pricing: { min: 2000, max: 8000, default: 4000 },
//       },
//       {
//         name: "Print Materials",
//         subservices: ["Business Cards", "Letterheads", "Brochures", "Packaging"],
//         pricing: { min: 500, max: 3000, default: 1500 },
//       },
//     ],
//   },
//   "Consulting & Specialty": {
//     name: "Consulting & Specialty Services",
//     subcategories: [
//       {
//         name: "Business Consulting",
//         subservices: ["Brand Strategy", "Digital Strategy", "Marketing Strategy", "Business Planning"],
//         pricing: { min: 3000, max: 15000, default: 5000 },
//       },
//       {
//         name: "Gift Items",
//         subservices: ["Corporate Gifts", "Branded Merchandise", "Promotional Items", "Executive Gifts"],
//         pricing: { min: 1000, max: 5000, default: 2500 },
//       },
//       {
//         name: "WhatsApp Marketing",
//         subservices: ["Bulk Messaging", "Chatbot Setup", "Campaign Management", "Customer Support"],
//         pricing: { min: 1500, max: 5000, default: 2500 },
//       },
//     ],
//   },
// }

interface BookingFormProps {
  onClose: () => void
  isModal?: boolean
}

interface CMSService {
  id: string
  title: string
  slug: string
}

interface CMSSubService {
  id: string
  title: string
  service_id: string
}

interface CMSPricing {
  id: string
  name: string
  price: string
  service_id: string
  sub_service_id: string | null
}

export default function AdvancedBookingForm({ onClose, isModal = false }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    service_id: "", // Changed from service_category
    sub_service_id: "", // Changed from service_subcategory
    project_description: "",
    budget_range: "",
    timeline: "",
    scheduled_date: "", // changed from preferred_date to scheduled_date to match database
    scheduled_time: "", // added scheduled_time for database
    additional_info: "", // added for notes
  })

  const [services, setServices] = useState<CMSService[]>([])
  const [subServices, setSubServices] = useState<CMSSubService[]>([])
  const [pricing, setPricing] = useState<CMSPricing[]>([])
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [agreeToTnC, setAgreeToTnC] = useState(false)
  const [serviceTnC, setServiceTnC] = useState<any>(null)
  const [emailVerified, setEmailVerified] = useState(false) // Kept from original
  const [whatsappVerified, setWhatsAppVerified] = useState(false) // Kept from original
  const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(false) // Kept from original
  const [isLoadingEmail, setIsLoadingEmail] = useState(false) // Kept from original
  const [isLoading, setIsLoading] = useState(false) // Kept from original

  const supabase = createClient()

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("cms_services")
        .select("id, title, slug")
        .eq("is_active", true)
        .order("display_order")

      if (data) {
        console.log("[v0] Loaded services from CMS:", data)
        setServices(data)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    if (!formData.service_id) {
      setSubServices([])
      setPricing([])
      setEstimatedPrice(null) // Reset estimated price as well
      return
    }

    const fetchSubServices = async () => {
      const { data } = await supabase
        .from("cms_sub_services")
        .select("id, title, service_id")
        .eq("service_id", formData.service_id)
        .eq("is_active", true)
        .order("display_order")

      if (data) {
        console.log("[v0] Loaded sub-services:", data)
        setSubServices(data)
      }
    }

    fetchSubServices()
  }, [formData.service_id])

  useEffect(() => {
    if (!formData.service_id) {
      setPricing([])
      setEstimatedPrice(null)
      return
    }

    const fetchPricing = async () => {
      let query = supabase
        .from("cms_service_pricing")
        .select("id, name, price, service_id, sub_service_id")
        .eq("is_active", true)

      if (formData.sub_service_id) {
        query = query.eq("sub_service_id", formData.sub_service_id)
      } else {
        // Fallback to service_id if no sub_service_id is selected
        query = query.eq("service_id", formData.service_id).is("sub_service_id", null)
      }

      const { data } = await query.order("display_order")

      if (data && data.length > 0) {
        console.log("[v0] Loaded pricing:", data)
        setPricing(data)
        // Set the first price as the estimated price, or a default if available
        setEstimatedPrice(data[0].price)
      } else {
        setPricing([])
        setEstimatedPrice(null) // Clear if no pricing is found
      }
    }

    fetchPricing()
  }, [formData.service_id, formData.sub_service_id])

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [isModal])

  const fetchServiceTnC = async () => {
    // This part is likely to be removed or adapted if T&C are also in CMS
    const { data } = await supabase
      .from("terms_conditions")
      .select("*")
      .eq("service_category", formData.service_id) // Assuming service_id maps to a category in terms_conditions
      .eq("is_active", true)
      .single()

    setServiceTnC(data)
  }

  const handleSubmitBooking = async () => {
    // This function is now replaced by handleSubmit in the updates
    // Keeping it for now in case it's called elsewhere, but will likely be removed.
    // It seems the main submission logic is now within the updated handleSubmit.

    if (!agreeToTnC) {
      setError("Please agree to the Terms & Conditions")
      return
    }

    setIsLoading(true) // Using the generic isLoading from original state
    setError("")

    try {
      const selectedService = services.find((s) => s.id === formData.service_id)
      const selectedSubService = subServices.find((s) => s.id === formData.sub_service_id)

      const response = await fetch("/api/bookings", {
        // Assuming this API endpoint is updated or created
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          company_name: formData.company_name,
          service: selectedService?.title,
          sub_service: selectedSubService?.title || null,
          project_description: formData.project_description,
          budget_range: formData.budget_range || estimatedPrice, // Use form value if provided, else estimated
          timeline: formData.timeline,
          scheduled_date: formData.scheduled_date,
          scheduled_time: formData.scheduled_time,
          status: "pending", // Default status
          notes: formData.additional_info,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit booking")
      }

      const data = await response.json() // Assuming response might contain data for redirection

      setSuccess(true)

      // Redirect logic from original, adapted for new success state
      setTimeout(() => {
        if (data.whatsapp_url) {
          window.open(data.whatsapp_url, "_blank")
        } else {
          // Fallback to direct WhatsApp message if no URL provided
          const message = `New Booking Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company_name}\nService: ${selectedService?.title || "N/A"} - ${selectedSubService?.title || "N/A"}\nBudget: ${formData.budget_range || estimatedPrice}\nTimeline: ${formData.timeline}\nDetails: ${formData.project_description}`
          window.open(`https://wa.me/971581174911?text=${encodeURIComponent(message)}`, "_blank")
        }
        if (onClose) onClose()
      }, 2000) // Slightly longer delay before closing modal to allow WhatsApp to open
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      console.log("[v0] Booking error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyWhatsApp = async () => {
    setIsLoadingWhatsApp(true)
    try {
      // Simulate WhatsApp verification
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setWhatsAppVerified(true)
    } catch (err) {
      console.error("WhatsApp verification failed:", err)
      setError("WhatsApp verification failed. Please try again.")
    } finally {
      setIsLoadingWhatsApp(false)
    }
  }

  const handleVerifyEmail = async () => {
    setIsLoadingEmail(true)
    try {
      // Simulate Email verification
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEmailVerified(true)
    } catch (err) {
      console.error("Email verification failed:", err)
      setError("Email verification failed. Please try again.")
    } finally {
      setIsLoadingEmail(false)
    }
  }

  // Refactored handleSubmit to use new CMS data and API endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeToTnC) {
      setError("Please agree to the Terms & Conditions")
      return
    }
    if (!emailVerified) {
      setError("Please verify your email address.")
      return
    }
    if (!whatsappVerified) {
      setError("Please verify your WhatsApp number.")
      return
    }

    setSubmitting(true) // Using the submitting state from original code for button disabled state
    setError("")

    try {
      const selectedService = services.find((s) => s.id === formData.service_id)
      const selectedSubService = subServices.find((s) => s.id === formData.sub_service_id)

      const response = await fetch("/api/bookings", {
        // New API endpoint for booking submissions
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          company_name: formData.company_name,
          service: selectedService?.title, // Use title from fetched CMS data
          sub_service: selectedSubService?.title || null, // Use title from fetched CMS data
          project_description: formData.project_description,
          budget_range: formData.budget_range || estimatedPrice, // Use form value if provided, else estimated from CMS
          timeline: formData.timeline,
          scheduled_date: formData.scheduled_date,
          scheduled_time: formData.scheduled_time,
          status: "pending", // Default status for new bookings
          notes: formData.additional_info,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit booking")
      }

      // Assuming the API returns a success message or data upon successful submission
      const data = await response.json()

      setSuccess(true)
      // Removed the immediate redirect here, letting the success state handle it or a delayed modal close.
      // The original code had a 3-second timeout to close the modal.
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      console.error("Booking error:", err)
      setError("Failed to submit booking. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Success message display adapted to new success state
  if (success) {
    return (
      <div className={isModal ? "p-12" : "bg-white rounded-xl shadow-lg p-12 max-w-2xl mx-auto"}>
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C4D600] to-[#a8b800] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="h-10 w-10 text-gray-900 font-bold" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Booking Received!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Thank you for your inquiry. Our expert team will contact you shortly to discuss your project.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">⏳ Redirecting...</p>
          {/* The original code had a redirect to WhatsApp. This success message can serve as a placeholder. */}
        </div>
      </div>
    )
  }

  // This is the main form content rendering. The updates modify parts of this.
  const formContent = (
    <form className="space-y-0" onSubmit={handleSubmit}>
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-8 py-10 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C4D600] via-gray-900 to-gray-700 dark:from-[#C4D600] dark:via-white dark:to-gray-300 bg-clip-text text-transparent mb-3 leading-tight">
            Book Your Appointment Now
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
            Connect with our expert team for a free consultation tailored to your needs. We're available 24/7.
          </p>
        </div>
      </div>

      {/* Main form content with proper scrolling for modal */}
      <div className="px-8 py-8 space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Information</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971581174911"
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Company Name
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="company"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Your Company (Optional)"
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-[#C4D600] focus:ring-2 focus:ring-[#C4D600]/20 transition-all font-medium pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select Your Service</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="service_id" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Service Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="service_id"
                required
                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#C4D600] focus:ring-2 focus:ring-[#C4D600]/20 transition-all font-medium"
                value={formData.service_id}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    service_id: e.target.value,
                    sub_service_id: "", // Reset sub-service when service changes
                  })
                  // No need to setSelectedService here, state is managed by fetch logic
                }}
              >
                <option value="">Select a service category</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            {subServices.length > 0 && (
              <div>
                <Label htmlFor="sub_service_id" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Service Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="sub_service_id"
                  required // Making sub_service required, adjust if optional
                  disabled={!formData.service_id}
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#C4D600] focus:ring-2 focus:ring-[#C4D600]/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.sub_service_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sub_service_id: e.target.value,
                    })
                  }
                >
                  <option value="">Select a service type</option>
                  {subServices.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {estimatedPrice && (
            <div className="bg-gradient-to-br from-[#C4D600]/15 to-[#C4D600]/5 border border-[#C4D600]/30 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Estimated Price
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#C4D600] to-[#a8b800] bg-clip-text text-transparent mb-1">
                {estimatedPrice}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                *Custom pricing available based on your specific requirements
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Details</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Project Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
              placeholder="Tell us about your project, requirements, goals, timeline, and any specific details..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#C4D600] focus:ring-2 focus:ring-[#C4D600]/20 transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              4
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Timeline & Budget</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Preferred Timeline <span className="text-red-500">*</span>
              </Label>
              <select
                id="timeline"
                required
                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#C4D600] focus:ring-2 focus:ring-[#C4D600]/20 transition-all font-medium"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              >
                <option value="">Select timeline</option>
                <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                <option value="Standard (3-4 weeks)">Standard (3-4 weeks)</option>
                <option value="Flexible (1-2 months)">Flexible (1-2 months)</option>
                <option value="Long-term (3+ months)">Long-term (3+ months)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="scheduled_date" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Preferred Start Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#C4D600]/50 transition-colors">
          <input
            type="checkbox"
            id="tnc-advanced"
            checked={agreeToTnC}
            onChange={(e) => setAgreeToTnC(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C4D600] focus:ring-[#C4D600]"
          />
          <label
            htmlFor="tnc-advanced"
            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-relaxed"
          >
            I have read and agree to the{" "}
            <button
              type="button"
              onClick={() => serviceTnC && alert(serviceTnC.content)} // Assumes serviceTnC has a 'content' property
              className="text-[#C4D600] hover:underline font-bold transition-colors"
            >
              Terms & Conditions
            </button>
          </label>
        </div>

        {/* WhatsApp & Email Verification - Parallel Layout */}
        <div className="grid grid-cols-2 gap-4">
          {!whatsappVerified && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">Verify WhatsApp</p>
              <Button
                type="button"
                onClick={handleVerifyWhatsApp}
                disabled={isLoadingWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold h-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm disabled:opacity-50"
              >
                {isLoadingWhatsApp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          )}

          {!emailVerified && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">Verify Email</p>
              <Button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isLoadingEmail}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold h-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm disabled:opacity-50"
              >
                {isLoadingEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent px-8 py-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <Button
          type="submit" // Changed to type="submit" to trigger form submission
          disabled={submitting || !agreeToTnC || !emailVerified || !whatsappVerified}
          className="w-full bg-gradient-to-r from-[#C4D600] to-[#a8b800] hover:from-[#b0c200] hover:to-[#98a300] text-gray-900 font-bold h-13 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Your Request...
            </>
          ) : (
            <>
              Get Quote & Check Availability
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          💬 Our team will contact you within 2 hours via WhatsApp or Email
        </p>
      </div>
    </form>
  )

  // Success state rendering removed as it's now handled within the main modal structure or as a separate component
  // if (success) {
  //   return (
  //     <div className={isModal ? "p-12" : "bg-white rounded-xl shadow-lg p-12 max-w-2xl mx-auto"}>
  //       <div className="text-center py-12">
  //         <div className="w-20 h-20 bg-gradient-to-br from-[#C4D600] to-[#a8b800] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
  //           <Check className="h-10 w-10 text-gray-900 font-bold" />
  //         </div>
  //         <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Booking Received!</h3>
  //         <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
  //           Thank you for your inquiry. Our expert team will contact you shortly to discuss your project.
  //         </p>
  //         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">⏳ Redirecting to WhatsApp...</p>
  //       </div>
  //     </div>
  //   )
  // }

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header - sticky to modal, not page */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#C4D600] to-[#a8b800] bg-clip-text text-transparent">
                Book Your Appointment
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Free consultation - no commitment needed</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close booking form"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {/* Render the formContent here */}
            {formContent}
          </div>

          {/* Modal footer with action buttons */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-8 py-6">
            <div className="space-y-4">
              {/* WhatsApp & Email verification buttons - SIDE BY SIDE */}
              <div className="grid grid-cols-2 gap-4">
                {/* Conditional rendering based on verification status */}
                {!whatsappVerified && (
                  <button
                    onClick={handleVerifyWhatsApp}
                    disabled={isLoadingWhatsApp || !formData.phone} // Disable if phone not entered or already verified
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingWhatsApp ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        Verify WhatsApp
                      </>
                    )}
                  </button>
                )}

                {!emailVerified && (
                  <button
                    onClick={handleVerifyEmail}
                    disabled={isLoadingEmail || !formData.email} // Disable if email not entered or already verified
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingEmail ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        Verify Email
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Main submit button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !agreeToTnC || !emailVerified || !whatsappVerified || submitting} // Disable if any verification failed, T&C not agreed, or already submitting
                className="w-full py-4 bg-gradient-to-r from-[#C4D600] to-[#a8b800] hover:from-[#a8b800] hover:to-[#8a9600] text-gray-900 font-bold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {isLoading || submitting ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    Get Quote & Check Availability
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                💬 Our team will contact you within 2 hours via WhatsApp or Email
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Non-modal rendering
  return (
    <div
      className={
        isModal
          ? "relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-h-screen flex flex-col"
          : "bg-white rounded-xl shadow-lg max-w-2xl mx-auto"
      }
    >
      {formContent}
    </div>
  )
}

export { AdvancedBookingForm }
