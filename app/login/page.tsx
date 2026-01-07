"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { AlertCircle, Loader2, Building2, Eye, EyeOff } from "lucide-react"

export default function UnifiedLoginPage() {
  const [activeTab, setActiveTab] = useState<"client" | "admin">("client")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const brandColor = "#C4D600"

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedPassword = localStorage.getItem("rememberedPassword")

    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
    if (savedPassword) {
      setPassword(savedPassword)
    }
  }, [])

  async function handleClientLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
        localStorage.setItem("rememberedPassword", password)
      } else {
        localStorage.removeItem("rememberedEmail")
        localStorage.removeItem("rememberedPassword")
      }

      window.location.href = "/client/dashboard"
    } else {
      setError("Login failed. Please try again.")
      setLoading(false)
    }
  }

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Admin login failed")
        setLoading(false)
        return
      }

      window.location.href = "/admin"
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
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
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab("client")
                setError("")
              }}
              className={`flex-1 py-4 font-semibold transition-all ${
                activeTab === "client"
                  ? "bg-gradient-to-r from-[#C4D600] to-[#b3c400] text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Client Login
            </button>
            <button
              onClick={() => {
                setActiveTab("admin")
                setError("")
              }}
              className={`flex-1 py-4 font-semibold transition-all ${
                activeTab === "admin"
                  ? "bg-gradient-to-r from-gray-800 to-black text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Admin Access
            </button>
          </div>

          <div className="p-8">
            {/* Client Login Tab */}
            {activeTab === "client" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
                  <p className="text-gray-500 text-sm mt-1">Sign in to access your dashboard</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleClientLogin} className="space-y-5">
                  <div>
                    <Label htmlFor="client-email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="mt-1.5 h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="client-password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="client-password"
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

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="client-remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label htmlFor="client-remember" className="text-sm text-gray-600 cursor-pointer select-none">
                      Remember me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
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

                <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-3">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-gray-900 hover:text-gray-700">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </>
            )}

            {/* Admin Login Tab */}
            {activeTab === "admin" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Admin Access</h2>
                  <p className="text-gray-500 text-sm mt-1">Sign in to access the CMS dashboard</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-5">
                  <div>
                    <Label htmlFor="admin-email" className="text-gray-700">
                      Admin Email
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@creativefusion.llc"
                      required
                      className="mt-1.5 h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="admin-password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="admin-password"
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

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-95 rounded-lg bg-gray-900 text-white hover:bg-black"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Accessing Admin...
                      </>
                    ) : (
                      "Access Admin Panel"
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600 text-sm">
                    <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                      ← Back to website
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
