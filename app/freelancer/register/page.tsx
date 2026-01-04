"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CaptchaInput } from "@/components/auth/captcha-input"
import { toast } from "sonner"
import Link from "next/link"
import { AlertCircle, Loader2, CheckCircle, Building2 } from "lucide-react"

export default function FreelancerRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    freelancerType: "technical", // technical or partner

    // Profile
    bio: "",
    specializations: "",
    experienceYears: "",
    portfolio: "",
    availability: "part-time",

    // Pricing
    hourlyRate: "",

    // Verification
    bankAccount: "",
    taxId: "",
  })
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError("Please fill all required fields")
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return false
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters")
        return false
      }
      if (!captchaValid) {
        setError("Please solve the security question")
        return false
      }
    }
    if (currentStep === 2) {
      if (!formData.bio || !formData.specializations || !formData.experienceYears) {
        setError("Please fill all profile fields")
        return false
      }
    }
    if (currentStep === 3) {
      if (!formData.hourlyRate || !formData.bankAccount) {
        setError("Please fill payment information")
        return false
      }
    }
    setError("")
    return true
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast.error(error)
    }
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep(step)) {
      toast.error(error)
      return
    }

    setLoading(true)

    // Check if email exists
    const { data: existingByEmail } = await supabase
      .from("clients")
      .select("id, email")
      .eq("email", formData.email)
      .single()

    if (existingByEmail) {
      setError("This email is already registered")
      toast.error("Email already registered")
      setLoading(false)
      return
    }

    // Check if phone exists
    if (formData.phone) {
      const { data: existingByPhone } = await supabase
        .from("clients")
        .select("id, phone")
        .eq("phone", formData.phone)
        .single()

      if (existingByPhone) {
        setError("This phone number is already registered")
        toast.error("Phone number already registered")
        setLoading(false)
        return
      }
    }

    // Create Supabase auth user
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_APP_URL
        : process.env.NEXT_PUBLIC_APP_URL

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: formData.name,
          role: "freelancer",
          freelancer_type: formData.freelancerType,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      toast.error(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Generate verification token
      const verificationToken =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      // Generate freelancer ID
      const freelancerPrefix = formData.freelancerType === "technical" ? "FLT" : "FLP"
      const { data: lastFreelancer } = await supabase
        .from("clients")
        .select("client_number")
        .eq("user_type", "freelancer")
        .order("created_at", { ascending: false })
        .limit(1)

      const lastNumber = lastFreelancer?.[0]?.client_number?.replace(freelancerPrefix, "") || "0"
      const newFreelancerId = freelancerPrefix + String(Number.parseInt(lastNumber) + 1).padStart(6, "0")

      // Create freelancer profile
      const { error: insertError } = await supabase.from("clients").insert({
        user_id: data.user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        user_type: "freelancer",
        client_number: newFreelancerId,
        client_type: formData.freelancerType,

        // Profile
        bio: formData.bio,
        specializations: formData.specializations.split(",").map((s) => s.trim()),
        experience_years: Number.parseInt(formData.experienceYears),
        portfolio_url: formData.portfolio,
        availability_status: formData.availability,

        // Pricing
        hourly_rate: Number.parseFloat(formData.hourlyRate),

        // Verification
        email_verified: false,
        admin_approved: false,
        account_status: "pending",
        verification_token: verificationToken,
        verification_sent_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("[v0] Error creating freelancer profile:", insertError.message)
        setError("Error creating freelancer profile")
        toast.error("Error creating freelancer profile")
        setLoading(false)
        return
      }

      // Send verification email
      try {
        await fetch("/api/send-verification-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            verificationUrl: redirectUrl,
          }),
        })
      } catch (emailError) {
        console.error("[v0] Failed to send verification email:", emailError)
      }

      // Log security event
      await supabase.from("security_logs").insert({
        user_id: data.user.id,
        event_type: "freelancer_registration_success",
        ip_address: "unknown",
        metadata: { email: formData.email, name: formData.name, type: formData.freelancerType },
      })

      setSuccess(true)
      toast.success("Freelancer account created! Check your email for verification link.")
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {formData.name}!</h2>
              <p className="text-gray-600 mb-4">Your freelancer account has been created successfully.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Freelancer ID:</strong> Check your email for verification link and your unique ID.
                </p>
              </div>
              <div className="space-y-2 text-left text-sm text-gray-600 mb-6">
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>1. Verify your email address</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>2. Admin approval (usually within 24 hours)</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>3. Start bidding on projects</span>
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Building2 className="h-12 w-12 text-[#C4D600] mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-white">Creative Fusion</h1>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? "bg-[#C4D600] text-black" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-[#C4D600]" : "bg-gray-200"}`}></div>}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Freelancer Account</h2>
              <form className="space-y-4">
                <div>
                  <Label className="text-gray-700">Freelancer Type *</Label>
                  <div className="mt-3 space-y-3">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="freelancerType"
                        value="technical"
                        checked={formData.freelancerType === "technical"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Technical Freelancer</p>
                        <p className="text-sm text-gray-600">Accept job assignments from us</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="freelancerType"
                        value="partner"
                        checked={formData.freelancerType === "partner"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Partner Freelancer</p>
                        <p className="text-sm text-gray-600">Bring your own projects and sales</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-gray-700">
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-700">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <CaptchaInput value={captchaValue} onChange={setCaptchaValue} onVerify={setCaptchaValid} />

                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!captchaValid}
                  className="w-full h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold"
                >
                  Continue to Profile
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Professional Profile</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio" className="text-gray-700">
                    Professional Bio *
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your experience and expertise"
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="specializations" className="text-gray-700">
                    Specializations * (comma-separated)
                  </Label>
                  <Input
                    id="specializations"
                    name="specializations"
                    type="text"
                    value={formData.specializations}
                    onChange={handleChange}
                    placeholder="Photography, Video Editing, Graphic Design"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceYears" className="text-gray-700">
                      Years of Experience *
                    </Label>
                    <Input
                      id="experienceYears"
                      name="experienceYears"
                      type="number"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      placeholder="5"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability" className="text-gray-700">
                      Availability *
                    </Label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="mt-1.5 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4D600]"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="project-based">Project-based</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolio" className="text-gray-700">
                    Portfolio URL
                  </Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="mt-1.5"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handlePreviousStep}
                    variant="outline"
                    className="flex-1 h-12 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold"
                  >
                    Continue to Pricing
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pricing & Payment Info</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hourlyRate" className="text-gray-700">
                    Hourly Rate (AED) *
                  </Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="150"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="bankAccount" className="text-gray-700">
                    Bank Account Number *
                  </Label>
                  <Input
                    id="bankAccount"
                    name="bankAccount"
                    type="text"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    placeholder="Enter your bank account number"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="taxId" className="text-gray-700">
                    Tax ID / TRN (optional)
                  </Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    type="text"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="Tax Registration Number"
                    className="mt-1.5"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handlePreviousStep}
                    variant="outline"
                    className="flex-1 h-12 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold"
                  >
                    Review & Submit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Information</h2>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong>{" "}
                    {formData.freelancerType === "technical" ? "Technical Freelancer" : "Partner Freelancer"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Specializations:</strong> {formData.specializations}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Hourly Rate:</strong> AED {formData.hourlyRate}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    By submitting, you agree to our Terms & Conditions and will need to verify your email and wait for
                    admin approval.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handlePreviousStep}
                  variant="outline"
                  className="flex-1 h-12 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="flex-1 h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Freelancer Account"
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#C4D600] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
