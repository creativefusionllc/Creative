"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      const email = searchParams.get("email")
      const tokenHash = searchParams.get("token_hash")
      const type = searchParams.get("type")

      // Custom verification token from our system
      if (token && email) {
        try {
          const { data: client, error: fetchError } = await supabase
            .from("clients")
            .select("id, email_verified")
            .eq("email", email)
            .eq("verification_token", token)
            .single()

          if (fetchError || !client) {
            console.error("[v0] Client not found or token invalid:", fetchError)
            setStatus("error")
            setMessage("Invalid or expired verification link. Please register again.")
            return
          }

          const { error: updateError } = await supabase
            .from("clients")
            .update({
              email_verified: true,
              verification_token: null,
              email_verified_at: new Date().toISOString(),
            })
            .eq("id", client.id)

          if (updateError) {
            console.error("[v0] Update error:", updateError)
            setStatus("error")
            setMessage("Failed to verify email. Please try again.")
            return
          }

          setStatus("success")
          setMessage("Email verified successfully! Waiting for admin approval before you can login.")
        } catch (err) {
          console.error("[v0] Verification error:", err)
          setStatus("error")
          setMessage("An error occurred during verification")
        }
      }
      // Supabase auth confirmation
      else if (tokenHash && type === "email") {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "email",
          })

          if (error) {
            console.error("[v0] OTP verification error:", error)
            setStatus("error")
            setMessage(error.message || "Failed to verify email")
            return
          }

          // Get current user and update client record
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (user) {
            const { error: updateError } = await supabase
              .from("clients")
              .update({
                email_verified: true,
                email_verified_at: new Date().toISOString(),
              })
              .eq("user_id", user.id)

            if (updateError) {
              console.error("[v0] Failed to update client:", updateError)
            }
          }

          setStatus("success")
          setMessage("Email verified successfully! Waiting for admin approval before you can login.")
        } catch (err) {
          console.error("[v0] Verification error:", err)
          setStatus("error")
          setMessage("An error occurred during verification")
        }
      } else {
        console.error("[v0] No valid verification parameters found")
        setStatus("error")
        setMessage("Invalid verification link")
      }
    }

    verifyEmail()
  }, [searchParams, supabase])

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            {status === "loading" && (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email...</h2>
                <p className="text-gray-600">Please wait while we verify your email address</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    An admin will review your account shortly. You'll receive an email once approved, then you can
                    login.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold">
                    Go to Login
                  </Button>
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-3">
                  <Link href="/register">
                    <Button className="w-full h-12 bg-[#C4D600] hover:bg-[#a8b800] text-black font-semibold">
                      Register Again
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full h-12 bg-transparent">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
