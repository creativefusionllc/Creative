"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, Loader2, Building2, Eye, EyeOff, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [clientType, setClientType] = useState<"client" | "freelancer" | "agency">("client")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [emailVerificationCode, setEmailVerificationCode] = useState("")
  const [whatsappVerificationCode, setWhatsappVerificationCode] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [whatsappVerified, setWhatsappVerified] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"form" | "email" | "whatsapp">("form")

  const supabase = createClient()
  const brandColor = "#C4D600"

  const sendEmailVerification = async () => {
    if (!email) {
      setError("Please enter your email first")
      return
    }
    setLoading(true)

    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    try {
      const isProduction = process.env.NODE_ENV === "production"
      if (!isProduction) {
        setError("In development mode, check creativefusionpro.com@gmail.com for verification email")
      }

      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationToken }),
      })

      if (response.ok) {
        sessionStorage.setItem(`email-token-${email}`, verificationToken)
        setVerificationStep("email")
        if (isProduction) {
          setError("")
        }
      } else {
        const data = await response.json()
        setError(data.error || "Failed to send email verification")
      }
    } catch (err) {
      setError("Failed to send email verification")
    } finally {
      setLoading(false)
    }
  }

  const sendWhatsappVerification = async () => {
    if (!phone) {
      setError("Please enter your phone number first")
      return
    }
    setLoading(true)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setWhatsappVerificationCode(code)

    try {
      const message = `Your Creative Fusion verification code is: ${code}`
      const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
      setVerificationStep("whatsapp")
      setError("")
    } catch (err) {
      setError("Failed to open WhatsApp")
    } finally {
      setLoading(false)
    }
  }

  const generateClientId = () => {
    const prefix = {
      client: "CL",
      freelancer: "FL",
      agency: "AC",
    }[clientType]
    const timestamp = Date.now().toString(36).toUpperCase()
    return `${prefix}-${timestamp}`
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!emailVerified) {
      setError("Please verify your email first")
      return
    }

    if (!whatsappVerified) {
      setError("Please verify your WhatsApp number first")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const clientId = generateClientId()

      const { error: clientError } = await supabase.from("clients").insert([
        {
          user_id: data.user.id,
          email,
          whatsapp: phone,
          user_type: clientType,
          client_number: clientId,
          email_verified: true,
          status: "active",
        },
      ])

      if (clientError) {
        console.error("Error creating client record:", clientError)
      }

      window.location.href = "/login?registered=true"
    }
  }

  if (verificationStep === "email") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                <Building2 className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Creative Fusion</h1>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div
              className="w-full text-center py-4 font-semibold rounded-t-2xl text-black"
              style={{ backgroundColor: brandColor }}
            >
              Verify Email
            </div>

            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Check your email</h2>
              <p className="text-gray-600 text-sm mb-6">We sent a verification link to {email}</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="emailCode" className="text-gray-700">
                    Enter Verification Code
                  </Label>
                  <Input
                    id="emailCode"
                    maxLength={6}
                    placeholder="123456"
                    onChange={(e) => {
                      if (e.target.value === emailVerificationCode) {
                        setEmailVerified(true)
                        setVerificationStep("whatsapp")
                      }
                    }}
                    className="mt-1.5 h-11 text-center text-2xl tracking-widest"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => setVerificationStep("form")}
                  className="w-full h-12 text-black font-semibold"
                  style={{ backgroundColor: brandColor }}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (verificationStep === "whatsapp") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                <Building2 className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Creative Fusion</h1>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div
              className="w-full text-center py-4 font-semibold rounded-t-2xl text-black"
              style={{ backgroundColor: brandColor }}
            >
              Verify WhatsApp
            </div>

            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Check WhatsApp</h2>
              <p className="text-gray-600 text-sm mb-6">We sent a code to {phone}</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="whatsappCode" className="text-gray-700">
                    Enter Verification Code
                  </Label>
                  <Input
                    id="whatsappCode"
                    maxLength={6}
                    placeholder="123456"
                    onChange={(e) => {
                      if (e.target.value === whatsappVerificationCode) {
                        setWhatsappVerified(true)
                        setVerificationStep("form")
                      }
                    }}
                    className="mt-1.5 h-11 text-center text-2xl tracking-widest"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => setVerificationStep("form")}
                  className="w-full h-12 text-black font-semibold"
                  style={{ backgroundColor: brandColor }}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
              style={{ backgroundColor: brandColor }}
            >
              <Building2 className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Creative Fusion</h1>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div
            className="w-full text-center py-4 font-semibold rounded-t-2xl text-black"
            style={{ backgroundColor: brandColor }}
          >
            Create Account
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sign Up</h2>
              <p className="text-gray-500 text-sm mt-1">Create your account to get started</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1.5 h-11"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  WhatsApp Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971581174911"
                  required
                  className="mt-1.5 h-11"
                />
              </div>

              <div>
                <Label className="text-gray-700 block mb-3">What type of client are you?</Label>
                <div className="space-y-3">
                  {[
                    { value: "client" as const, label: "Client" },
                    { value: "freelancer" as const, label: "Freelancer" },
                    { value: "agency" as const, label: "Agency" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={option.value}
                        name="clientType"
                        value={option.value}
                        checked={clientType === option.value}
                        onChange={(e) => setClientType(e.target.value as typeof clientType)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor={option.value} className="cursor-pointer text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  type="button"
                  onClick={sendEmailVerification}
                  disabled={!email || emailVerified}
                  className={`w-full h-12 font-semibold text-base ${emailVerified ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
                >
                  {emailVerified ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Email Verified
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={sendWhatsappVerification}
                  disabled={!phone || whatsappVerified}
                  className={`w-full h-12 font-semibold text-base ${whatsappVerified ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
                >
                  {whatsappVerified ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      WhatsApp Verified
                    </>
                  ) : (
                    "Verify WhatsApp"
                  )}
                </Button>
              </div>

              <Button
                type="submit"
                disabled={loading || !emailVerified || !whatsappVerified}
                className="w-full h-12 text-black font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-95 rounded-lg"
                style={{ backgroundColor: brandColor }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-3">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-gray-900 hover:text-gray-700">
                  Sign In
                </Link>
              </p>
              <p className="text-gray-600 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Back to website
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
