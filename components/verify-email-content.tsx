"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react"

export default function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const supabase = createClient()

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setStatus("error")
        setMessage("Invalid verification link. Please check your email and try again.")
        return
      }

      const { data: client, error } = await supabase
        .from("clients")
        .select("*")
        .eq("verification_token", token)
        .single()

      if (error || !client) {
        setStatus("error")
        setMessage("Invalid or expired verification link.")
        return
      }

      if (client.email_verified) {
        setStatus("success")
        setMessage("Your email is already verified!")
        return
      }

      const { error: updateError } = await supabase
        .from("clients")
        .update({
          email_verified: true,
          verification_token: null,
        })
        .eq("id", client.id)

      if (updateError) {
        setStatus("error")
        setMessage("Failed to verify email. Please try again or contact support.")
        return
      }

      await supabase.from("security_logs").insert({
        user_id: client.user_id,
        event_type: "email_verified",
        metadata: { email: client.email },
      })

      setStatus("success")
      setMessage("Email verified successfully!")
    }

    verifyEmail()
  }, [token, supabase])

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            {status === "loading" && (
              <>
                <Loader2 className="h-16 w-16 text-[#C4D600] mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Email</h2>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
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
                    Your account still requires admin approval before you can login. You'll receive an email once your
                    account is approved (usually within 24 hours).
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
                  <a href="mailto:info@creativefusion.llc">
                    <Button variant="outline" className="w-full h-12 bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
