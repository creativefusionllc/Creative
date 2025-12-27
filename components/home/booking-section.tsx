"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react"

const services = {
  creative: [
    "Brand Identity & Corporate Design",
    "Graphic & Visual Design",
    "Social Media Content & Design",
    "Animation & Motion Graphics",
    "Photography Services",
    "Videography & Post-Production",
  ],
  digital: [
    "Website Design & Development",
    "Mobile & Web Applications",
    "Custom Software & ERP Solutions",
    "Website Maintenance & Hosting",
  ],
}

const steps = [
  { id: 1, title: "Service" },
  { id: 2, title: "Details" },
  { id: 3, title: "Contact" },
]

export function BookingSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleWhatsApp = () => {
    const message = `Hi Creative Fusion! I'm interested in ${formData.service || "your services"}.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ACompany: ${formData.company}%0A%0AMessage: ${formData.message}`
    window.open(`https://wa.me/971581174911?text=${message}`, "_blank")
  }

  return (
    <section id="booking" className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              Book a Service
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Ready to</span>{" "}
              <span className="text-primary">Start Your Project?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours. Or chat with us directly on WhatsApp
              for instant response.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Free consultation & project estimate",
                "Dedicated project manager",
                "Fast turnaround times",
                "100% satisfaction guarantee",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90" onClick={handleWhatsApp}>
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Booking Form */}
          <div className="bg-secondary rounded-2xl p-8 border border-border">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                        currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 lg:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-2 block">Select Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value, service: "" })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creative">Creative & Design Services</SelectItem>
                      <SelectItem value="digital">Digital & Software Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.category && (
                  <div>
                    <Label className="text-foreground mb-2 block">Select Service</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services[formData.category as keyof typeof services]?.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-2 block">Company Name (Optional)</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Project Details</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-2 block">Full Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Phone Number *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                    className="bg-background border-border"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handleBack} className="border-border bg-transparent">
                  Back
                </Button>
              ) : (
                <div />
              )}
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-primary text-primary-foreground gap-2"
                  disabled={currentStep === 1 && !formData.service}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="gap-2 border-[#25D366] text-[#25D366] bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button className="bg-primary text-primary-foreground gap-2">
                    Submit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
