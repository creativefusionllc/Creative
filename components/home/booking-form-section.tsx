"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TermsConditionsModal } from "@/components/terms-conditions-modal"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  Clock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  User,
  Building2,
} from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import {
  getServiceRequirements,
  getDefaultRequirements,
  type ServiceRequirement,
} from "@/lib/booking/service-requirements"

interface Service {
  id: string
  title: string
  category: string
  subservices: string[]
}

export function BookingFormSection() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingNumber, setBookingNumber] = useState("")
  const [services, setServices] = useState<Service[]>([])
  const [serviceReqs, setServiceReqs] = useState<ServiceRequirement | null>(null)
  const [additionalData, setAdditionalData] = useState<Record<string, any>>({})
  const [agreeToTnC, setAgreeToTnC] = useState(false)
  const [showTnCModal, setShowTnCModal] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    service_category: "",
    service_subcategory: "",
    budget_range: "",
    timeline: "",
    project_description: "",
    scheduled_date: "",
    scheduled_time: "",
    additional_info: "", // Added new field
    user_id: "", // Added new field
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("id, title, category, subservices")
      .eq("is_active", true)
      .order("display_order")

    if (data) setServices(data)
  }

  useEffect(() => {
    if (formData.service_category) {
      const reqs = getServiceRequirements(formData.service_category) || getDefaultRequirements()
      setServiceReqs(reqs)
      setAdditionalData({})
    } else {
      setServiceReqs(null)
    }
  }, [formData.service_category])

  const selectedService = services.find((s) => s.category === formData.service_category)
  const availableSubcategories = selectedService?.subservices || []

  const handleSubmit = async () => {
    setIsSubmitting(true)

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
          notes: formData.additional_info || "",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking")
      }

      setBookingNumber(`BK${Date.now().toString(36).toUpperCase()}`)
      setIsSuccess(true)

      setTimeout(() => {
        if (data.whatsapp_url) {
          window.open(data.whatsapp_url, "_blank")
        }
      }, 1500)
    } catch (err) {
      console.error("Booking error:", err)
      const message = `New Booking Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company_name}\nService: ${formData.service_category} - ${formData.service_subcategory}\nBudget: ${formData.budget_range}\nTimeline: ${formData.timeline}\nDetails: ${formData.project_description}`
      window.open(`https://wa.me/971581174911?text=${encodeURIComponent(message)}`, "_blank")
      setBookingNumber(`BK${Date.now().toString(36).toUpperCase()}`)
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (isSuccess) {
    return (
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1C1C1C] mb-4">Booking Submitted Successfully!</h2>
            <p className="text-gray-600 mb-2">Your booking number is:</p>
            <p className="text-2xl font-bold text-[#C4D600] mb-6 bg-[#1C1C1C] inline-block px-6 py-2 rounded-full">
              {bookingNumber}
            </p>
            <p className="text-gray-500 mb-8">
              We've received your inquiry and will contact you within 24 hours. A confirmation has been sent to your
              email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSuccess(false)
                  setStep(1)
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company_name: "",
                    service_category: "",
                    service_subcategory: "",
                    budget_range: "",
                    timeline: "",
                    project_description: "",
                    scheduled_date: "",
                    scheduled_time: "",
                    additional_info: "",
                    user_id: "",
                  })
                }}
                className="bg-[#1C1C1C] text-white hover:bg-[#2C2C2C] h-12 px-6"
              >
                Submit Another Request
              </Button>
              <Button variant="outline" asChild className="border-[#1C1C1C] text-[#1C1C1C] bg-transparent h-12 px-6">
                <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-3">LET'S GET STARTED</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-4 leading-tight">
                We're Delivering
                <br />
                the Best
              </h2>
              <p className="text-gray-600 text-lg">
                Transform your vision into reality with our comprehensive creative solutions.
              </p>
            </div>

            {/* Service highlights with black boxes and yellow checkmarks */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#C4D600]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1C1C] mb-1">15+ Years Experience</h3>
                  <p className="text-gray-600">Trusted expertise across multiple industries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#C4D600]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1C1C] mb-1">500+ Projects Delivered</h3>
                  <p className="text-gray-600">Successful campaigns for global brands</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#C4D600]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1C1C] mb-1">24-Hour Response</h3>
                  <p className="text-gray-600">Quick turnaround on all inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#C4D600]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1C1C] mb-1">100% Client Satisfaction</h3>
                  <p className="text-gray-600">We don't stop until you're thrilled</p>
                </div>
              </div>
            </div>

            {/* Contact buttons */}
            <div>
              <p className="text-gray-600 mb-4">Prefer to reach out directly?</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#1C1C1C] text-white hover:bg-[#2C2C2C] h-12 px-6 rounded-xl">
                  <a href="tel:+971581174911">
                    <Phone className="w-4 h-4 mr-2" />
                    +971 58 117 4911
                  </a>
                </Button>
                <Button asChild className="bg-[#25D366] text-white hover:bg-[#20BD5A] h-12 px-6 rounded-xl">
                  <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12 px-6 rounded-xl bg-transparent"
                >
                  <a href="mailto:info@creativefusion.llc">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                {[
                  { num: 1, label: "Contact", icon: User },
                  { num: 2, label: "Service", icon: Briefcase },
                  { num: 3, label: "Details", icon: Calendar },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                          step >= s.num ? "bg-[#1C1C1C] text-[#C4D600]" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${step >= s.num ? "text-[#1C1C1C]" : "text-gray-400"}`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded-full transition-all ${step > s.num ? "bg-[#C4D600]" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (step === 3) handleSubmit()
                }}
                className="space-y-6"
              >
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">Your Contact Information</h3>
                      <p className="text-gray-500 text-sm mb-5">Tell us how to reach you</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="h-12 pl-10 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            value={formData.company_name}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            placeholder="Your Company"
                            className="h-12 pl-10 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="h-12 pl-10 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+971 50 000 0000"
                            className="h-12 pl-10 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className="w-full bg-[#1C1C1C] text-white hover:bg-[#2C2C2C] h-14 rounded-xl text-base font-semibold mt-2"
                    >
                      Continue to Service Selection
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">Choose Your Service</h3>
                      <p className="text-gray-500 text-sm mb-5">Select the service and specific option</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Category *</label>
                      <Select
                        value={formData.service_category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, service_category: value, service_subcategory: "" })
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                          <SelectValue placeholder="Select a service category" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.category}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specific Service {formData.service_category && "*"}
                      </label>
                      <Select
                        value={formData.service_subcategory}
                        onValueChange={(value) => setFormData({ ...formData, service_subcategory: value })}
                        disabled={!formData.service_category || availableSubcategories.length === 0}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                          <SelectValue placeholder="Select specific service" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubcategories.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          Budget Range
                        </label>
                        <Select
                          value={formData.budget_range}
                          onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              serviceReqs?.budgetRanges || [
                                "Under AED 5,000",
                                "AED 5,000 - 10,000",
                                "AED 10,000 - 25,000",
                                "AED 25,000 - 50,000",
                                "AED 50,000+",
                              ]
                            ).map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Timeline
                        </label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              serviceReqs?.timelines || [
                                "ASAP (Rush)",
                                "Within 1 week",
                                "Within 2 weeks",
                                "Within 1 month",
                                "Within 2-3 months",
                                "Flexible / No rush",
                              ]
                            ).map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 rounded-xl border-[#1C1C1C] text-[#1C1C1C] bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.service_category}
                        className="flex-1 h-12 rounded-xl bg-[#1C1C1C] text-[#C4D600] hover:bg-[#2C2C2C]"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">Project Details</h3>
                      <p className="text-gray-500 text-sm mb-5">Tell us more about your project</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <Textarea
                        value={formData.project_description}
                        onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                        placeholder="Describe your project requirements, goals, and any specific details..."
                        className="min-h-[120px] rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                        required
                      />
                    </div>
                    {serviceReqs &&
                      serviceReqs.additionalFields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label} {field.required && "*"}
                          </label>
                          {field.type === "textarea" ? (
                            <Textarea
                              value={additionalData[field.name] || ""}
                              onChange={(e) => setAdditionalData({ ...additionalData, [field.name]: e.target.value })}
                              placeholder={field.placeholder}
                              required={field.required}
                              rows={3}
                              className="rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]"
                            />
                          ) : field.type === "select" ? (
                            <Select
                              value={additionalData[field.name] || ""}
                              onValueChange={(value) => setAdditionalData({ ...additionalData, [field.name]: value })}
                            >
                              <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              type={field.type}
                              value={additionalData[field.name] || ""}
                              onChange={(e) => setAdditionalData({ ...additionalData, [field.name]: e.target.value })}
                              placeholder={field.placeholder}
                              required={field.required}
                              className="h-12 rounded-xl border-gray-200"
                            />
                          )}
                        </div>
                      ))}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Preferred Date (Optional)
                        </label>
                        <Input
                          type="date"
                          value={formData.scheduled_date}
                          onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                          className="h-12 rounded-xl border-gray-200"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Preferred Time (Optional)
                          {serviceReqs && serviceReqs.minDuration && (
                            <span className="text-xs text-gray-500 ml-1">(Min. {serviceReqs.minDuration}h)</span>
                          )}
                        </label>
                        {serviceReqs && serviceReqs.availableSlots ? (
                          <Select
                            value={formData.scheduled_time}
                            onValueChange={(value) => setFormData({ ...formData, scheduled_time: value })}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceReqs.availableSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time} {serviceReqs.timeSlotType === "half-day" && "(Half Day)"}
                                  {serviceReqs.timeSlotType === "full-day" && "(Full Day)"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type="time"
                            value={formData.scheduled_time}
                            onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                            className="h-12 rounded-xl border-gray-200"
                          />
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#1C1C1C] mb-3 text-sm">Booking Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Service:</div>
                        <div className="font-medium text-[#1C1C1C]">{formData.service_category}</div>
                        <div className="text-gray-500">Type:</div>
                        <div className="font-medium text-[#1C1C1C]">{formData.service_subcategory}</div>
                        <div className="text-gray-500">Budget:</div>
                        <div className="font-medium text-[#1C1C1C]">{formData.budget_range || "Not specified"}</div>
                        <div className="text-gray-500">Timeline:</div>
                        <div className="font-medium text-[#1C1C1C]">{formData.timeline || "Not specified"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <Checkbox
                        id="tnc"
                        checked={agreeToTnC}
                        onCheckedChange={(checked) => setAgreeToTnC(checked as boolean)}
                        className="mt-1"
                      />
                      <label htmlFor="tnc" className="text-sm text-gray-700 cursor-pointer flex-1">
                        I have read and agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setShowTnCModal(true)}
                          className="text-[#C4D600] hover:underline font-semibold"
                        >
                          Terms & Conditions
                        </button>{" "}
                        including the refund policy (30 days) and cancellation policy (72 hours minimum notice).
                      </label>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-14 rounded-xl border-gray-300 bg-transparent"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.project_description || !agreeToTnC}
                        className="flex-1 bg-[#C4D600] text-[#1C1C1C] hover:bg-[#b5c700] h-14 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Submit Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <TermsConditionsModal open={showTnCModal} onOpenChange={setShowTnCModal} />
    </section>
  )
}
