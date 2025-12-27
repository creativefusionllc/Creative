"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CaptchaInput } from "@/components/auth/captcha-input"
import { toast } from "sonner"
import Link from "next/link"
import { AlertCircle, Loader2, CheckCircle, Building2, User, Mail } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    referralCode: "",
    clientType: "client", // Added role/account type selection
  })
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleClientTypeChange = (value: string) => {
    setFormData({ ...formData, clientType: value })
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!captchaValid) {
      setError("Please solve the security question correctly")
      toast.error("Please solve the security question correctly")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      toast.error("Invalid email format")
      return
    }

    if (!formData.phone) {
      setError("Phone number is required")
      toast.error("Phone number is required")
      return
    }

    const phoneRegex = /^(\+971|0)?[0-9]{9}$/
    const cleanPhone = formData.phone.replace(/\s|-/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid UAE phone number (e.g., +971 50 000 0000 or 050 000 0000)")
      toast.error("Invalid phone number format")
      return
    }

    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      toast.error("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      toast.error("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    const { data: existingByEmail } = await supabase
      .from("clients")
      .select("id, email")
      .eq("email", formData.email)
      .single()

    if (existingByEmail) {
      setError("This email is already registered. Please use a different email or login.")
      toast.error("Email already registered")
      setLoading(false)
      return
    }

    if (formData.phone) {
      const { data: existingByPhone } = await supabase
        .from("clients")
        .select("id, phone")
        .eq("phone", formData.phone)
        .single()

      if (existingByPhone) {
        setError("This phone number is already registered. Please use a different phone number.")
        toast.error("Phone number already registered")
        setLoading(false)
        return
      }
    }

    let referrer = null
    if (formData.referralCode) {
      const { data: referrerData } = await supabase
        .from("clients")
        .select("id, points_balance")
        .eq("referral_code", formData.referralCode.toUpperCase())
        .single()

      if (!referrerData) {
        setError("Invalid referral code")
        toast.error("Invalid referral code")
        setLoading(false)
        return
      }
      referrer = referrerData
    }

    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          process.env.NEXT_PUBLIC_APP_URL ||
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify`
        : process.env.NEXT_PUBLIC_APP_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify`

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          role: formData.clientType, // Use selected role instead of hardcoded
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
      const verificationUrl = redirectUrl + `?token=${data.user.user_metadata?.email_verification_token || "verify"}`

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

      const verificationToken =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      const { data: lastClient } = await supabase
        .from("clients")
        .select("client_number")
        .order("created_at", { ascending: false })
        .limit(1)

      const lastNumber = lastClient?.[0]?.client_number?.replace("CL", "") || "0"
      const newClientNumber = "CL" + String(Number.parseInt(lastNumber) + 1).padStart(6, "0")

      await supabase.from("clients").insert({
        user_id: data.user.id,
        name: formData.name,
        email: formData.email,
        company_name: formData.company,
        phone: formData.phone,
        client_number: newClientNumber,
        referred_by: formData.referralCode || null,
        points_balance: formData.referralCode ? 100 : 0,
        email_verified: false,
        admin_approved: false,
        account_status: "pending",
        verification_token: verificationToken,
        verification_sent_at: new Date().toISOString(),
        client_type: formData.clientType, // Store the selected account type
      })

      if (referrer) {
        await supabase
          .from("clients")
          .update({ points_balance: referrer.points_balance + 200 })
          .eq("id", referrer.id)

        await supabase.from("points_transactions").insert({
          client_id: referrer.id,
          points: 200,
          type: "earned",
          description: `Referral bonus for ${formData.name}`,
          balance_after: referrer.points_balance + 200,
        })
      }

      await supabase.from("security_logs").insert({
        user_id: data.user.id,
        event_type: "registration_success",
        ip_address: await fetch("https://api.ipify.org?format=json")
          .then((r) => r.json())
          .then((d) => d.ip)
          .catch(() => "unknown"),
        metadata: { email: formData.email, name: formData.name, clientType: formData.clientType },
      })

      setSuccess(true)
      toast.success("Account created! Check your email for verification link.")
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-4">
                We've sent a verification email to <strong>{formData.email}</strong>
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  Your account requires admin approval before you can login. You'll receive another email once your
                  account is approved.
                </p>
              </div>
              <div className="space-y-2 text-left text-sm text-gray-600 mb-6">
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>1. Click the verification link in your email</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>2. Wait for admin approval (usually within 24 hours)</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>3. Login once approved</span>
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
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Building2 className="h-12 w-12 text-[#C4D600] mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-white">Creative Fusion</h1>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#C4D600]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-7 w-7 text-[#C4D600]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Register to access our platform</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="clientType" className="text-gray-700">
                Account Type *
              </Label>
              <Select value={formData.clientType} onValueChange={handleClientTypeChange}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client - Service Buyer</SelectItem>
                  <SelectItem value="agent">Agent - Freelance Reseller</SelectItem>
                  <SelectItem value="agency">Agency - Full Agency</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">Choose the account type that best fits your needs</p>
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
              <Label htmlFor="company" className="text-gray-700">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company LLC"
                className="mt-1.5"
              />
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
              <Label htmlFor="referralCode" className="text-gray-700">
                Referral Code (Optional)
              </Label>
              <Input
                id="referralCode"
                name="referralCode"
                type="text"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="REFXXXXXX"
                className="mt-1.5 uppercase"
              />
              <p className="text-xs text-gray-500 mt-1">Get 100 bonus points with a referral code</p>
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
                  Confirm *
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
              type="submit"
              disabled={loading || !captchaValid}
              className="w-full h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold text-base mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

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
