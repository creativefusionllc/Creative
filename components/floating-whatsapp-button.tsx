"use client"

import { MessageCircle, Phone, Mail, X, Clock, Zap, Calendar } from "lucide-react"
import { useState } from "react"
import SimpleAppointmentForm from "@/components/simple-appointment-form"
import SimpleConsultationForm from "@/components/simple-consultation-form"

export function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)

  const phoneNumber = "+971581174911"
  const messageTemplates = {
    services: "Hi! I'd like to know more about Creative Fusion LLC services. Can you help me?",
    support: "I have a question about my recent project with Creative Fusion LLC.",
    sales: "I'm interested in discussing a new project with Creative Fusion LLC.",
    appointment: "I'd like to book a free consultation appointment with Creative Fusion LLC.",
  }

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageTemplates.services)}`
  const callLink = `tel:+971581174911`
  const emailLink = `mailto:info@creativefusion.llc`

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end gap-3">
          {/* Simple Consultation Button */}
          <button
            onClick={() => {
              setShowConsultationModal(true)
              setIsOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-full text-black font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75 pointer-events-none"
            } bg-[#C4D600] hover:bg-[#a8b800]`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-bold">Free Consultation</span>
          </button>

          {/* Book Appointment Button */}
          <button
            onClick={() => {
              setShowAppointmentModal(true)
              setIsOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-full text-black font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75 pointer-events-none"
            } bg-[#C4D600] hover:bg-[#a8b800]`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-bold">Book Appointment</span>
          </button>

          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-3 rounded-full text-black font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75 pointer-events-none"
            } bg-[#C4D600] hover:bg-[#a8b800]`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-bold">Message on WhatsApp</span>
          </a>

          <a
            href={callLink}
            className={`flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75 pointer-events-none"
            } bg-gray-700 hover:bg-gray-800`}
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm font-bold">Call 24/7</span>
          </a>

          {/* Email Button */}
          <a
            href={emailLink}
            className={`flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75 pointer-events-none"
            } bg-gray-700 hover:bg-gray-800`}
          >
            <Mail className="h-5 w-5" />
            <span className="text-sm font-bold">Send Email</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-[#C4D600] to-[#a8b800] text-black font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative group"
            aria-label="Open contact menu"
          >
            {isOpen ? (
              <X className="h-7 w-7 animate-spin" />
            ) : (
              <>
                <MessageCircle className="h-7 w-7 group-hover:animate-bounce" />

                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full h-7 w-7 flex items-center justify-center text-white text-xs font-black animate-pulse shadow-lg border-2 border-white">
                  24/7
                </div>

                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full h-4 w-4 border-2 border-white animate-pulse shadow-md" />
              </>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="absolute bottom-24 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5 w-72 z-50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-green-500" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Available 24/7</h3>
            </div>

            <div className="space-y-2 mb-4">
              {/* Simple Consultation Quick Option */}
              <button
                onClick={() => {
                  setShowConsultationModal(true)
                  setIsOpen(false)
                }}
                className="w-full p-3 text-sm bg-[#C4D600] text-black hover:bg-[#a8b800] rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 font-semibold cursor-pointer text-left"
              >
                🎯 Free Consultation
              </button>

              {/* Book Appointment Quick Option */}
              <button
                onClick={() => {
                  setShowAppointmentModal(true)
                  setIsOpen(false)
                }}
                className="w-full p-3 text-sm bg-[#C4D600] text-black hover:bg-[#a8b800] rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 font-semibold cursor-pointer text-left"
              >
                📅 Book Appointment
              </button>

              {/* Message Templates */}
              {Object.entries(messageTemplates).map(([key, message]) => (
                <a
                  key={key}
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-sm bg-gray-700 hover:bg-[#C4D600] hover:text-black text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 font-semibold cursor-pointer"
                >
                  {key === "services" && "📋 Ask about Services"}
                  {key === "support" && "🆘 Get Support"}
                  {key === "sales" && "💼 Discuss a Project"}
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Usually replies in 2 hours</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 text-center space-y-1">
              <p className="font-semibold">🌍 UAE Head Office</p>
              <p>+971 58 117 4911</p>
            </div>
          </div>
        )}
      </div>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full my-8">
            <SimpleConsultationForm onClose={() => setShowConsultationModal(false)} isModal={true} />
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full my-8">
            <SimpleAppointmentForm onClose={() => setShowAppointmentModal(false)} isModal={true} />
          </div>
        </div>
      )}
    </>
  )
}
