"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, Loader2, Building2, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const supabase = createClient()

  const brandColor = "#C4D600"

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError("")

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
      // Automatically confirm user (no email verification needed)
      window.location.href = "/login?registered=true"
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

              <Button
                type="submit"
                disabled={loading}
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
                  ← Back to website
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
