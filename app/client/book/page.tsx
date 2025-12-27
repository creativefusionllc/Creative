"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function ClientBookPage() {
  const [services, setServices] = useState<Service[]>([])
  const [serviceReqs, setServiceReqs] = useState<ServiceRequirement | null>(null)
  const [additionalData, setAdditionalData] = useState<Record<string, any>>({})
  const [formData, setFormData] = useState({
    service_category: "",
    service_subcategory: "",
    project_description: "",
    budget_range: "",
    timeline: "",
    scheduled_date: "",
    scheduled_time: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [agreeToTnC, setAgreeToTnC] = useState(false)
  const [serviceTnC, setServiceTnC] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

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
      fetchServiceTnC(formData.service_category)
    } else {
      setServiceReqs(null)
      setServiceTnC(null)
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

  const selectedService = services.find((s) => s.category === formData.service_category)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/client/login")
      return
    }

    const bookingNotes = formData.notes
      ? `${formData.notes}\n\nService Details: ${JSON.stringify(additionalData)}`
      : JSON.stringify(additionalData)

    const { error: insertError } = await supabase.from("bookings").insert({
      user_id: user.id,
      email: user.email,
      name: user.user_metadata?.name || "",
      phone: user.user_metadata?.phone || "",
      company_name: user.user_metadata?.company || "",
      service_category: formData.service_category,
      service_subcategory: formData.service_subcategory,
      project_description: formData.project_description,
      budget_range: formData.budget_range,
      timeline: formData.timeline,
      scheduled_date: formData.scheduled_date || null,
      scheduled_time: formData.scheduled_time || null,
      notes: bookingNotes,
      status: "pending",
      source: "client-portal",
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push("/client/bookings")
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-8 text-center max-w-md border border-[#C4D600]/20">
          <div className="w-16 h-16 bg-[#C4D600] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-[#0a0a0a]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Booking Submitted!</h1>
          <p className="text-gray-400">We'll contact you soon to confirm your appointment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] shadow-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#C4D600]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#1a1a1a] rounded-2xl shadow-sm border border-white/10 p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create New Booking</h1>
          <p className="text-gray-400 mb-8">Fill in the details below and we'll get back to you shortly.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="service" className="text-gray-300">
                  Service *
                </Label>
                <Select
                  value={formData.service_category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service_category: value, service_subcategory: "" })
                  }
                >
                  <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-white/10">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.category} className="text-white">
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subservice" className="text-gray-300">
                  Specific Service
                </Label>
                <Select
                  value={formData.service_subcategory}
                  onValueChange={(value) => setFormData({ ...formData, service_subcategory: value })}
                  disabled={!selectedService}
                >
                  <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white disabled:opacity-50">
                    <SelectValue placeholder="Select specific service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-white/10">
                    {selectedService?.subservices?.map((sub) => (
                      <SelectItem key={sub} value={sub} className="text-white">
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">
                Project Description *
              </Label>
              <Textarea
                id="description"
                value={formData.project_description}
                onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                placeholder="Tell us about your project..."
                rows={4}
                required
                className="mt-1 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600"
              />
            </div>

            {serviceReqs &&
              serviceReqs.additionalFields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-gray-300">
                    {field.label} {field.required && "*"}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      value={additionalData[field.name] || ""}
                      onChange={(e) => setAdditionalData({ ...additionalData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={3}
                      className="mt-1 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600"
                    />
                  ) : field.type === "select" ? (
                    <Select
                      value={additionalData[field.name] || ""}
                      onValueChange={(value) => setAdditionalData({ ...additionalData, [field.name]: value })}
                    >
                      <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white">
                        <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141414] border-white/10">
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option} className="text-white">
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={additionalData[field.name] || ""}
                      onChange={(e) => setAdditionalData({ ...additionalData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="mt-1 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600"
                    />
                  )}
                </div>
              ))}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="budget" className="text-gray-300">
                  Budget Range
                </Label>
                <Select
                  value={formData.budget_range}
                  onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                >
                  <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-white/10">
                    {(
                      serviceReqs?.budgetRanges || [
                        "Under AED 5,000",
                        "AED 5,000 - 10,000",
                        "AED 10,000 - 25,000",
                        "AED 25,000 - 50,000",
                        "AED 50,000+",
                      ]
                    ).map((range) => (
                      <SelectItem key={range} value={range} className="text-white">
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeline" className="text-gray-300">
                  Timeline
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-white/10">
                    {(serviceReqs?.timelines || ["ASAP", "Within 1 week", "2-4 weeks", "1-2 months", "Flexible"]).map(
                      (timeline) => (
                        <SelectItem key={timeline} value={timeline} className="text-white">
                          {timeline}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-gray-300">
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1 bg-[#0a0a0a] border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-gray-300">
                  Preferred Time
                  {serviceReqs && serviceReqs.minDuration && (
                    <span className="text-sm text-gray-500 ml-2">(Min. {serviceReqs.minDuration}h)</span>
                  )}
                </Label>
                {serviceReqs && serviceReqs.availableSlots ? (
                  <Select
                    value={formData.scheduled_time}
                    onValueChange={(value) => setFormData({ ...formData, scheduled_time: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#0a0a0a] border-white/10 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141414] border-white/10">
                      {serviceReqs.availableSlots.map((time) => (
                        <SelectItem key={time} value={time} className="text-white">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="time"
                    type="time"
                    value={formData.scheduled_time}
                    onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                    className="mt-1 bg-[#0a0a0a] border-white/10 text-white"
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-300">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information..."
                rows={3}
                className="mt-1 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/10">
              <Checkbox
                id="tnc"
                checked={agreeToTnC}
                onCheckedChange={(checked) => setAgreeToTnC(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="tnc" className="text-sm text-gray-300 cursor-pointer flex-1">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => serviceTnC && alert(serviceTnC.content)}
                  className="text-[#C4D600] hover:underline font-semibold"
                >
                  Terms & Conditions
                </button>
                {serviceTnC && <span className="text-xs text-gray-500 block mt-1">{serviceTnC.title}</span>}
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !formData.service_category || !formData.project_description || !agreeToTnC}
              className="w-full bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
