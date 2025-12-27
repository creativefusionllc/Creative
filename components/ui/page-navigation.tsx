"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Home, AlertTriangle, RefreshCw } from "lucide-react"

interface PageNavigationProps {
  showBack?: boolean
  showForward?: boolean
  showHome?: boolean
  backLabel?: string
  backHref?: string
  className?: string
}

export function PageNavigation({
  showBack = true,
  showForward = false,
  showHome = false,
  backLabel = "Back",
  backHref,
  className = "",
}: PageNavigationProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  const handleForward = () => {
    router.forward()
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backLabel}
        </Button>
      )}
      {showForward && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleForward}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          Forward
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      )}
      {showHome && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          <Home className="h-4 w-4 mr-1" />
          Home
        </Button>
      )}
    </div>
  )
}

// Error Boundary Component
interface ErrorDisplayProps {
  error: Error | string
  reset?: () => void
  showRetry?: boolean
  showGoBack?: boolean
}

export function ErrorDisplay({ error, reset, showRetry = true, showGoBack = true }: ErrorDisplayProps) {
  const router = useRouter()
  const errorMessage = typeof error === "string" ? error : error.message

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6 max-w-md">{errorMessage || "An unexpected error occurred. Please try again."}</p>
      <div className="flex gap-3">
        {showGoBack && (
          <Button variant="outline" onClick={() => router.back()} className="border-gray-600 text-gray-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
        {showRetry && reset && (
          <Button onClick={reset} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

// Not Found Component
export function NotFoundDisplay({ message, backHref }: { message?: string; backHref?: string }) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="text-8xl font-bold text-gray-700 mb-4">404</div>
      <h2 className="text-xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6 max-w-md">{message || "The page you're looking for doesn't exist."}</p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          className="border-gray-600 text-gray-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
        <Button onClick={() => router.push("/")} className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
          <Home className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  )
}
