"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { AlertCircle, Loader2, Lock, Eye, EyeOff, Shield, ArrowRight } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const brandColor = "#C4D600"

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedAdminEmail")
    const savedPassword = localStorage.getItem("rememberedAdminPassword")

    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
    if (savedPassword) {
      setPassword(savedPassword)
    }
  }, [])

  async function handleAdminLogin(e: React.FormEvent) {
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
        // Check if user is admin
        const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()

        if (userData?.role === "admin") {
          if (rememberMe) {
            localStorage.setItem("rememberedAdminEmail", email)
            localStorage.setItem("rememberedAdminPassword", password)
          } else {
            localStorage.removeItem("rememberedAdminEmail")
            localStorage.removeItem("rememberedAdminPassword")
          }

          window.location.href = "/admin"
        } else {
          setError("Admin access denied. You do not have admin privileges.")
          setLoading(false)
          await supabase.auth.signOut()
        }
      } else {
        setError("Login failed. Please try again.")
        setLoading(false)
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
              <Lock className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">Creative Fusion</h1>
            <p className="text-gray-400 text-sm mt-1">Administration Portal</p>
          </Link>
        </div>

        <div className="bg-[#141414] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div
            className="w-full text-center py-4 font-semibold rounded-t-2xl text-black flex items-center justify-center gap-2"
            style={{ backgroundColor: brandColor }}
          >
            <Shield className="h-5 w-5" />
            Admin Portal Access
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
              <p className="text-gray-400 text-sm mt-1">Sign in to manage your website and content</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@creativefusion.llc"
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
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-3">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    View Website
                  </button>
                </Link>
                <Link href="/login">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    Client Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    Register
                  </button>
                </Link>
                <Link href="/services">
                  <button className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                    Services
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-3">
              <p className="text-gray-400 text-sm">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
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
