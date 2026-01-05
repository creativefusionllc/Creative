"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { AlertCircle, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function ClientLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const brandColor = "#C4D600"

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedClientEmail")
    const savedPassword = localStorage.getItem("rememberedClientPassword")

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

    try {
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
          localStorage.setItem("rememberedClientEmail", email)
          localStorage.setItem("rememberedClientPassword", password)
        } else {
          localStorage.removeItem("rememberedClientEmail")
          localStorage.removeItem("rememberedClientPassword")
        }

        window.location.href = "/client/dashboard"
      }
    } catch (err) {
      setError("An error occurred during login.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
              style={{ backgroundColor: brandColor }}
            >
              <div className="text-2xl font-bold text-black">CF</div>
            </div>
            <h1 className="text-2xl font-bold text-white">Creative Fusion</h1>
            <p className="text-gray-400 text-sm mt-1">Client Dashboard</p>
          </Link>
        </div>

        <div className="bg-[#141414] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div
            className="w-full text-center py-4 font-semibold rounded-t-2xl text-black"
            style={{ backgroundColor: brandColor }}
          >
            Client Login
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
              <p className="text-gray-400 text-sm mt-1">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleClientLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1.5 h-11 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">
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
                    className="h-11 pr-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">
                  Remember me on this device
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-black font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-95 rounded-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: brandColor }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-3">Need Help?</p>
              <div className="space-y-2">
                <Link href="/admin/login">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    Admin Login
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    Back to Website
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
              Don't have an account? <span className="text-gray-500">Contact us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
