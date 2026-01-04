"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface InquiryFormProps {
  onClose: () => void
  isModal?: boolean
}

interface Service {
  id: string
  title: string
}

interface SubService {
  id: string
  title: string
}

interface Pricing {
  id: string
  name: string
  price: string
}

export default function InquiryForm({ onClose, isModal = false }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    service_id: "",
    sub_service_id: "",
    project_description: "",
    preferred_timeline: "",
    preferred_start_date: "",
    terms_agreed: false,
  })

  const [services, setServices] = useState<Service[]>([])
  const [subServices, setSubServices] = useState<SubService[]>([])
  const [pricing, setPricing] = useState<Pricing[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("[v0] Fetching services from cms_services table...")
        const { data, error } = await supabase
          .from("cms_services")
          .select("id, title")
          .eq("is_active", true)
          .order("display_order")

        console.log("[v0] Services fetched:", data, error)
        if (data) setServices(data)
      } catch (err) {
        console.error("Error fetching services:", err)
      }
    }

    fetchServices()
  }, [supabase])

  // Fetch sub-services when service changes
  useEffect(() => {
    if (!formData.service_id) {
      setSubServices([])
      setPricing([])
      return
    }

    const fetchSubServices = async () => {
      try {
        console.log("[v0] Fetching sub-services for service:", formData.service_id)
        const { data, error } = await supabase
          .from("cms_sub_services")
          .select("id, title")
          .eq("service_id", formData.service_id)
          .eq("is_active", true)
          .order("display_order")

        console.log("[v0] Sub-services fetched:", data, error)
        if (data) setSubServices(data)
      } catch (err) {
        console.error("Error fetching sub-services:", err)
      }
    }

    fetchSubServices()
  }, [formData.service_id, supabase])

  // Fetch pricing when service/sub-service changes
  useEffect(() => {
    if (!formData.service_id) {
      setPricing([])
      return
    }

    const fetchPricing = async () => {
      try {
        let query = supabase.from("cms_service_pricing").select("id, name, price").eq("is_active", true)

        if (formData.sub_service_id) {
          query = query.eq("sub_service_id", formData.sub_service_id)
        } else {
          query = query.eq("service_id", formData.service_id)
        }

        const { data } = await query.order("display_order")

        if (data) setPricing(data)
      } catch (err) {
        console.error("Error fetching pricing:", err)
      }
    }

    fetchPricing()
  }, [formData.service_id, formData.sub_service_id, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.full_name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields")
      return
    }

    if (!formData.terms_agreed) {
      setError("Please agree to Terms & Conditions")
      return
    }

    setIsLoading(true)

    try {
      // Submit inquiry to API
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit inquiry")

      const data = await response.json()

      // Generate and send verification code via WhatsApp
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setVerificationCode(code)

      // Send via Twilio
      const twilioResponse = await fetch("/api/send-whatsapp-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          code: code,
        }),
      })

      if (twilioResponse.ok) {
        // Wait for delivery confirmation
        let delivered = false
        for (let i = 0; i < 30; i++) {
          const checkResponse = await fetch(`/api/check-message-delivery?phone=${formData.phone}`)
          const checkData = await checkResponse.json()

          if (checkData.delivered) {
            delivered = true
            break
          }

          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        setShowCode(true)
      }

      setSubmitted(true)
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to submit inquiry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted && showCode) {
    return (
      <div className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Verification Code Sent!</h3>
        <p className="text-gray-600 mb-4">Check your WhatsApp for the verification code</p>
        <div className="bg-gray-900 text-[#C4D600] font-bold text-3xl py-4 px-6 rounded-lg inline-block mb-4">
          {verificationCode}
        </div>
        <p className="text-gray-500 text-sm">This code was delivered to {formData.phone}</p>
        <Button onClick={onClose} className="mt-6 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 font-semibold">
          Close
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Book Our Solutions</h2>
          <p className="text-gray-600 text-sm mt-1">
            Select your solution, and we'll provide pricing and availability details
          </p>
        </div>
        {isModal && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Your Information */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <Input
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971581174911"
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your Company"
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Select Your Solution */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Your Solution</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Solution Category *</label>
            <Select
              value={formData.service_id}
              onValueChange={(val) => setFormData({ ...formData, service_id: val, sub_service_id: "" })}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select a solution" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {subServices.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sub-Solution</label>
              <Select
                value={formData.sub_service_id}
                onValueChange={(val) => setFormData({ ...formData, sub_service_id: val })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a sub-solution" />
                </SelectTrigger>
                <SelectContent>
                  {subServices.map((subService) => (
                    <SelectItem key={subService.id} value={subService.id}>
                      {subService.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {pricing.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Price</label>
              <div className="space-y-2">
                {pricing.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPrice(pkg.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPrice === pkg.id
                        ? "border-[#C4D600] bg-[#C4D600]/5"
                        : "border-gray-200 hover:border-[#C4D600]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{pkg.name}</span>
                      <span className="text-[#C4D600] font-bold">{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description *</label>
            <Textarea
              required
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
              placeholder="Tell us about your project, requirements, goals, and any specific details..."
              className="min-h-24"
            />
          </div>
        </div>

        {/* Timeline & Budget */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline & Budget</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Timeline *</label>
              <Select
                value={formData.preferred_timeline}
                onValueChange={(val) => setFormData({ ...formData, preferred_timeline: val })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="2-3-months">2-3 Months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Start Date</label>
              <Input
                type="date"
                value={formData.preferred_start_date}
                onChange={(e) => setFormData({ ...formData, preferred_start_date: e.target.value })}
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.terms_agreed}
              onChange={(e) => setFormData({ ...formData, terms_agreed: e.target.checked })}
              className="mt-1"
            />
            <span className="text-sm text-gray-600">
              I agree to the <span className="text-[#C4D600] font-semibold">Terms & Conditions</span>
            </span>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 font-bold text-lg py-6 rounded-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Submitting & Sending Code...
            </>
          ) : (
            "Get Quote & Availability"
          )}
        </Button>
      </form>
    </div>
  )
}
