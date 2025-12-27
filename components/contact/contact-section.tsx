"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const services = [
  "Photography",
  "Videography",
  "Drone & Aerial",
  "Website Development",
  "Branding & Design",
  "Social Media Management",
  "Digital Marketing",
  "ERP & Software Solutions",
  "Other",
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Have a project in mind? Fill out the form below and we'll get back to you within 24 hours. You can also
              reach us directly through the contact information provided.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2C2C2C] rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a
                    href="tel:+971581174911"
                    className="text-muted-foreground hover:text-[#C4D600] transition-colors block"
                  >
                    +971 58 117 4911
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2C2C2C] rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:info@creativefusion.llc"
                    className="text-muted-foreground hover:text-[#C4D600] transition-colors block"
                  >
                    info@creativefusion.llc
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2C2C2C] rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    Sharjah Media City (SHAMS)
                    <br />
                    Sharjah, United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2C2C2C] rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">
                    Sunday - Thursday: 9:00 AM - 6:00 PM
                    <br />
                    Friday - Saturday: By Appointment
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="gap-2 bg-[#C4D600] hover:bg-[#a8b800] text-gray-900" asChild>
              <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Service Required *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.106533249564!2d55.67697481549818!3d25.27830029535745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef593a32ca797c9%3A0x939290c0f6f3576c!2sCreative%20Fusion%20LLC!5e1!3m2!1sen!2sae!4v1765518887653!5m2!1sen!2sae"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Creative Fusion Location - Sharjah Media City SHAMS"
          />
        </div>
      </div>
    </section>
  )
}
