"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Star, CheckCircle2, AlertCircle } from "lucide-react"

interface Review {
  id: string
  reviewer_name: string
  rating: number
  review_text: string
  review_date: string
  ai_reply_text?: string
}

interface GMBSyncPageProps {
  profile: any
  existingReviews: Review[]
}

export function GMBSyncPage({ profile, existingReviews }: GMBSyncPageProps) {
  const [syncing, setSyncing] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [reviews, setReviews] = useState(existingReviews)

  async function syncReviews() {
    setSyncing(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/gmb/sync-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: profile.id }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(`Successfully synced ${data.syncedCount} new reviews!`)

        // Reload page to show new reviews
        window.location.reload()
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to sync reviews")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while syncing")
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Google Business Reviews</h1>
        <p className="text-gray-600">
          Sync your Google Business reviews to display them as testimonials on your website
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{profile?.business_name}</h2>
            <p className="text-sm text-gray-600">
              Last synced: {profile?.last_sync_at ? new Date(profile.last_sync_at).toLocaleString() : "Never"}
            </p>
          </div>
          <Button onClick={syncReviews} disabled={syncing} size="lg">
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "Sync Reviews"}
          </Button>
        </div>

        {status === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{message}</p>
          </div>
        )}
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{reviews.length} Reviews</h3>

        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold">{review.reviewer_name}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{new Date(review.review_date).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-700 mb-3">{review.review_text}</p>
            {review.ai_reply_text && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-semibold text-gray-600 mb-1">Your AI Reply:</p>
                <p className="text-sm text-gray-700">{review.ai_reply_text}</p>
              </div>
            )}
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500">
              No reviews synced yet. Click "Sync Reviews" to fetch your Google Business reviews.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
