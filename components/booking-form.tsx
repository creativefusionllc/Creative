"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, Loader2 } from "lucide-react"

const serviceCategories = {
  "Creative & Design Services": [
    "Brand Identity & Corporate Design",
    "Graphic & Visual Design",
    "Social Media Content & Design",
    "Animation & Motion Graphics",
    "Photography Services",
    "Videography & Post-Production",
  ],
  "Digital & Software Development Services": [
    "Website Design & Development",
    "Mobile & Web Applications",
    "Custom Software & ERP Solutions",
    "Website Maintenance & Hosting",
  ],
}

export function BookingForm() {
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
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error: submitError } = await supabase.from("bookings").insert([
        {
          ...formData,
          source: "website",
        },
      ])

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        service_category: "",
        service_subcategory: "",
        project_description: "",
        budget_range: "",
        timeline: "",
      })

      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open("https://wa.me/971581174911?text=Hi, I just submitted a booking request on your website.", "_blank")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const subcategories = formData.service_category
    ? serviceCategories[formData.service_category as keyof typeof serviceCategories] || []
    : []

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      {success ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#C4D600] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-gray-900" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Received!</h3>
          <p className="text-gray-600 mb-4">We'll contact you shortly. Redirecting to WhatsApp...</p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            Submit Another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book a Service</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Service Category *</Label>
              <select
                id="category"
                required
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={formData.service_category}
                onChange={(e) =>
                  setFormData({ ...formData, service_category: e.target.value, service_subcategory: "" })
                }
              >
                <option value="">Select a category</option>
                {Object.keys(serviceCategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="subcategory">Service Type *</Label>
              <select
                id="subcategory"
                required
                disabled={!formData.service_category}
                className="w-full h-10 px-3 rounded-md border border-input bg-background disabled:opacity-50"
                value={formData.service_subcategory}
                onChange={(e) => setFormData({ ...formData, service_subcategory: e.target.value })}
              >
                <option value="">Select a service</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <select
                id="budget"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={formData.budget_range}
                onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              >
                <option value="">Select budget</option>
                <option value="< AED 5,000">{"< AED 5,000"}</option>
                <option value="AED 5,000 - 10,000">AED 5,000 - 10,000</option>
                <option value="AED 10,000 - 25,000">AED 10,000 - 25,000</option>
                <option value="AED 25,000 - 50,000">AED 25,000 - 50,000</option>
                <option value="> AED 50,000">{"> AED 50,000"}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              >
                <option value="">Select timeline</option>
                <option value="Urgent (< 2 weeks)">Urgent ({"< 2 weeks"})</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] h-12"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
