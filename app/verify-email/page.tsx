import { Suspense } from "react"
import VerifyEmailContent from "@/components/verify-email-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
