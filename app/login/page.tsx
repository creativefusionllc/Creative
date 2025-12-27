"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CaptchaInput } from "@/components/auth/captcha-input"
import Link from "next/link"
import { AlertCircle, Loader2, Building2, Eye, EyeOff, ShieldAlert } from "lucide-react"

export default function UnifiedLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"client" | "admin">("client")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const supabase = createClient()

  const brandColor = "#C4D600"

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedPassword = localStorage.getItem("rememberedPassword")
    const attempts = Number.parseInt(localStorage.getItem("loginAttempts") || "0")

    setLoginAttempts(attempts)
    setShowCaptcha(attempts >= 2)

    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
    if (savedPassword) {
      setPassword(savedPassword)
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (showCaptcha && !captchaValid) {
      setError("Please solve the security question correctly")
      return
    }

    setLoading(true)

    const { data: clientData } = await supabase.from("clients").select("*").eq("email", email).single()

    if (clientData) {
      // Check if account is locked
      if (clientData.locked_until && new Date(clientData.locked_until) > new Date()) {
        const minutesLeft = Math.ceil((new Date(clientData.locked_until).getTime() - Date.now()) / 60000)
        setError(`Account temporarily locked. Try again in ${minutesLeft} minutes.`)
        setLoading(false)
        return
      }

      // Check account status
      if (clientData.account_status === "suspended") {
        setError("Your account has been suspended. Please contact support.")
        setLoading(false)
        return
      }

      if (clientData.account_status === "banned") {
        setError("Your account has been banned. Please contact support.")
        setLoading(false)
        return
      }
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)
      localStorage.setItem("loginAttempts", newAttempts.toString())

      if (newAttempts >= 2) {
        setShowCaptcha(true)
      }

      if (clientData && newAttempts >= 5) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        await supabase
          .from("clients")
          .update({
            login_attempts: newAttempts,
            locked_until: lockUntil.toISOString(),
          })
          .eq("email", email)

        await supabase.from("security_logs").insert({
          event_type: "account_locked",
          ip_address: await fetch("https://api.ipify.org?format=json")
            .then((r) => r.json())
            .then((d) => d.ip)
            .catch(() => "unknown"),
          metadata: { email, reason: "too_many_failed_attempts" },
        })

        setError("Too many failed attempts. Account locked for 15 minutes.")
      } else {
        setError(`Invalid credentials (Attempt ${newAttempts}/5)`)
      }

      await supabase.from("security_logs").insert({
        event_type: "login_failed",
        ip_address: await fetch("https://api.ipify.org?format=json")
          .then((r) => r.json())
          .then((d) => d.ip)
          .catch(() => "unknown"),
        metadata: { email, activeTab },
      })

      setLoading(false)
      return
    }

    const isAdmin = authData?.user?.user_metadata?.role === "admin" || authData?.user?.user_metadata?.is_admin === true

    if (!isAdmin && clientData && !clientData.email_verified) {
      setError("Please verify your email before logging in.")
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    if (!isAdmin && clientData && !clientData.admin_approved) {
      setError("Your account is pending admin approval.")
      setLoading(false)
      return
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email)
      localStorage.setItem("rememberedPassword", password)
      localStorage.setItem("rememberedUserType", activeTab)
    } else {
      localStorage.removeItem("rememberedEmail")
      localStorage.removeItem("rememberedPassword")
      localStorage.removeItem("rememberedUserType")
    }

    if (authData.user) {
      localStorage.setItem("loginAttempts", "0")
      setShowCaptcha(false)

      if (clientData) {
        await supabase
          .from("clients")
          .update({
            login_attempts: 0,
            locked_until: null,
            last_login_at: new Date().toISOString(),
          })
          .eq("email", email)
      }

      await supabase.from("security_logs").insert({
        user_id: authData.user.id,
        event_type: "login_success",
        ip_address: await fetch("https://api.ipify.org?format=json")
          .then((r) => r.json())
          .then((d) => d.ip)
          .catch(() => "unknown"),
        metadata: { email, activeTab },
      })

      if (activeTab === "admin") {
        if (isAdmin) {
          window.location.href = "/admin"
        } else {
          setError("Admin access required. Login with admin credentials.")
          await supabase.auth.signOut()
          setLoading(false)
        }
      } else {
        window.location.href = "/client/dashboard"
      }
    } else {
      setError("Login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
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
          <div className="flex rounded-t-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setActiveTab("client")
                setError("")
              }}
              className="w-1/2 text-center py-4 font-semibold transition-all duration-200 rounded-tl-2xl"
              style={{
                background: activeTab === "client" ? brandColor : "#F3F3F3",
                color: activeTab === "client" ? "#000" : "#555",
              }}
            >
              Client Login
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("admin")
                setError("")
              }}
              className="w-1/2 text-center py-4 font-semibold transition-all duration-200 rounded-tr-2xl"
              style={{
                background: activeTab === "admin" ? brandColor : "#F3F3F3",
                color: activeTab === "admin" ? "#000" : "#555",
              }}
            >
              Admin Login
            </button>
          </div>

          <div className="p-8">
            {/* Dynamic Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === "client" ? "Welcome Back" : "Admin Portal"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {activeTab === "client"
                  ? "Sign in to manage your bookings and projects"
                  : "Sign in to manage business operations"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 text-sm">{error}</p>
                  {error.includes("pending admin approval") && (
                    <p className="text-red-600 text-xs mt-1">
                      Contact support at info@creativefusion.llc for assistance
                    </p>
                  )}
                </div>
              </div>
            )}

            {showCaptcha && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-700 text-sm">
                  Multiple failed attempts detected. Additional verification required.
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: brandColor }}>
                    Forgot password?
                  </Link>
                </div>
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

              {showCaptcha && (
                <CaptchaInput value={captchaValue} onChange={setCaptchaValue} onVerify={setCaptchaValid} />
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember my credentials
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || (showCaptcha && !captchaValid)}
                className="w-full h-12 text-black font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-95 rounded-lg"
                style={{ backgroundColor: brandColor }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {activeTab === "client" && (
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm">
                  New client?{" "}
                  <Link href="/register" className="hover:underline font-medium" style={{ color: brandColor }}>
                    Create an account
                  </Link>
                </p>
              </div>
            )}

            {activeTab === "admin" && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-xs text-yellow-800 text-center">
                    Admin access is restricted. Contact support if you need access.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
