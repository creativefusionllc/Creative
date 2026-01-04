"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { COUNTRY_CODES, formatPhoneForWhatsApp } from "@/lib/utils/country-codes"

interface AppointmentFormProps {
  onClose: () => void
  isModal?: boolean
}

export default function SimpleAppointmentForm({ onClose, isModal = false }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+971",
    phone: "",
    preferredDate: "",
    preferredTime: "",
  })

  const [whatsappSent, setWhatsappSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSendWhatsApp = () => {
    if (!formData.phone) {
      setError("Please enter your phone number first")
      return
    }

    setError("")
    setIsLoading(true)

    const message = `Hello, I would like to book an appointment. Name: ${formData.name}, Email: ${formData.email}, Preferred Date: ${formData.preferredDate}, Time: ${formData.preferredTime}`

    const formattedPhone = formatPhoneForWhatsApp(formData.phone, formData.countryCode)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")

    setWhatsappSent(true)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!whatsappSent) {
      setError("Please send message via WhatsApp first")
      return
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError("Failed to book appointment. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4 text-5xl">✓</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appointment Confirmed!</h3>
        <p className="text-gray-600 dark:text-gray-300">
          We've received your appointment request and will confirm via WhatsApp shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Book Appointment</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Free consultation call - 30 minutes</p>
        </div>
        {isModal && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Country Code <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {COUNTRY_CODES.map((cc) => (
                <option key={cc.code + cc.country} value={cc.code}>
                  {cc.flag} {cc.country} ({cc.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="581174911"
              className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preferred Time</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <Input
                type="time"
                required
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Send via WhatsApp</h3>
          {!whatsappSent ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">
                Send your appointment details via WhatsApp
              </p>
              <Button
                type="button"
                onClick={handleSendWhatsApp}
                disabled={isLoading || !formData.phone}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold h-10"
              >
                {isLoading ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4">
              <p className="text-sm text-green-700 dark:text-green-300 font-semibold flex items-center gap-2">
                <span className="text-lg">✓</span> Message sent successfully
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !whatsappSent}
          className="w-full bg-gradient-to-r from-[#C4D600] to-[#a8b800] hover:from-[#b0c200] hover:to-[#95a200] text-gray-900 font-bold h-12 text-lg disabled:opacity-50"
        >
          {isLoading ? "Booking..." : "Confirm Appointment"}
        </Button>
      </form>
    </div>
  )
}
