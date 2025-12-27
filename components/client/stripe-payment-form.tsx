"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface StripePaymentFormProps {
  clientId: string
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function StripePaymentForm({ clientId, amount, onSuccess, onError }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [saveCard, setSaveCard] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError("Stripe not loaded")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const intentResponse = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, clientId, saveCard }),
      })

      console.log("[v0] Payment intent response status:", intentResponse.status)

      if (!intentResponse.ok) {
        const errorData = await intentResponse.json()
        console.error("[v0] Payment intent error:", errorData)
        throw new Error(errorData.error || "Failed to create payment intent")
      }

      const data = await intentResponse.json()
      console.log("[v0] Payment intent created:", data.paymentIntentId)

      const { clientSecret } = data

      if (!clientSecret) {
        throw new Error("No client secret received from server")
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "Customer",
          },
        },
        ...(saveCard && { setup_future_usage: "on_session" }),
      })

      if (stripeError) {
        console.error("[v0] Stripe error:", stripeError)
        throw new Error(stripeError.message || "Payment confirmation failed")
      }

      if (paymentIntent?.status === "succeeded") {
        console.log("[v0] Payment successful:", paymentIntent.id)
        setSuccess(true)
        onSuccess?.()
      } else {
        throw new Error(`Payment status: ${paymentIntent?.status}`)
      }
    } catch (err: any) {
      console.error("[v0] Payment error:", err)
      const errorMessage = err.message || "Payment failed"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-medium text-green-900">Payment Successful!</p>
          <p className="text-sm text-green-700">AED {amount.toFixed(2)} has been added to your wallet instantly.</p>
          {saveCard && <p className="text-sm text-green-600 mt-1">Your card has been saved for future payments.</p>}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="p-4 border rounded-lg bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
      </div>

      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <input
          type="checkbox"
          id="save-card"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#C4D600] cursor-pointer"
        />
        <label htmlFor="save-card" className="text-sm text-gray-700 cursor-pointer flex-1">
          Save this card for faster future payments
        </label>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-200">
        <p className="font-medium">Total Amount: AED {amount.toFixed(2)}</p>
        <p className="text-blue-600 mt-1">Your wallet will be updated immediately after payment.</p>
      </div>

      <Button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-[#C4D600] hover:bg-[#a8b800] text-black"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Processing..." : `Pay AED ${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}
