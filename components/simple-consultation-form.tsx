"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, CheckCircle, Loader2, X } from "lucide-react"
import { COUNTRY_CODES, formatPhoneForWhatsApp } from "@/lib/utils/country-codes"

interface ConsultationFormProps {
  onClose?: () => void
  isModal?: boolean
}

export default function SimpleConsultationForm({ onClose, isModal = false }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+971",
    phone: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [whatsappSent, setWhatsappSent] = useState(false)
  const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(false)

  const supabase = createClient()

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name")
      return false
    }
    if (!formData.email.trim()) {
      setError("Please enter your email")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      return false
    }
    return true
  }

  const handleWhatsAppVerification = async () => {
    if (!validateForm()) return

    setIsLoadingWhatsApp(true)
    setError("")

    try {
      const message = `Hi, I'm ${formData.name} (${formData.email}). I'd like to book a free consultation.`
      const formattedPhone = formatPhoneForWhatsApp(formData.phone, formData.countryCode)
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      setWhatsappSent(true)
      setIsLoadingWhatsApp(false)
    } catch (err) {
      setError("Failed to open WhatsApp")
      setIsLoadingWhatsApp(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    if (!whatsappSent) {
      setError("Please send message via WhatsApp first")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const { error: dbError } = await supabase.from("consultation_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "consultation_form",
        },
      ])

      if (dbError) throw dbError

      setSuccess(true)
      setFormData({ name: "", email: "", countryCode: "+971", phone: "" })
      setWhatsappSent(false)

      setTimeout(() => {
        if (onClose) onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit consultation request")
    } finally {
      setSubmitting(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-0">
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-8 py-10 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C4D600] via-gray-900 to-gray-700 dark:from-[#C4D600] dark:via-white dark:to-gray-300 bg-clip-text text-transparent mb-3 leading-tight">
            Free Consultation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Connect with our team for expert guidance.
          </p>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Consultation Request Submitted!</h3>
              <p className="text-sm text-green-800 dark:text-green-200">
                Our team will contact you shortly via WhatsApp.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Error</h3>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Information</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="countryCode" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Country Code <span className="text-red-500">*</span>
              </Label>
              <select
                id="countryCode"
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2 focus:border-[#C4D600] focus:ring-[#C4D600]/20"
              >
                {COUNTRY_CODES.map((cc) => (
                  <option key={cc.code + cc.country} value={cc.code}>
                    {cc.flag} {cc.country} ({cc.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="581174911"
                className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#C4D600] focus:ring-[#C4D600]/20 mt-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4D600] to-[#a8b800] flex items-center justify-center text-gray-900 font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send via WhatsApp</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C4D600] to-transparent"></div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            {!whatsappSent ? (
              <Button
                type="button"
                onClick={handleWhatsAppVerification}
                disabled={isLoadingWhatsApp || success}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {isLoadingWhatsApp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Message sent successfully</span>
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 text-center">
              We'll contact you via WhatsApp to confirm your consultation time.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 px-8 py-6 bg-gray-50 dark:bg-gray-900 flex gap-3">
        {isModal && onClose && (
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 rounded-lg bg-transparent">
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={submitting || !whatsappSent || success}
          className="flex-1 h-11 bg-gradient-to-r from-[#C4D600] to-[#a8b800] hover:from-[#b3c200] hover:to-[#95a200] text-gray-900 font-bold rounded-lg transition-all disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Request Consultation"
          )}
        </Button>
      </div>
    </form>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-950 rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {formContent}
        </div>
      </div>
    )
  }

  return <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">{formContent}</div>
}
