"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface PayPalPaymentFormProps {
  clientId: string
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PayPalPaymentForm({ clientId, amount, onSuccess, onError }: PayPalPaymentFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const processingFee = amount * 0.04
  const tax = 0
  const totalAmount = amount + processingFee + tax

  useEffect(() => {
    if (!clientId) {
      setError("PayPal configuration is missing. Please contact support.")
      setLoading(false)
      return
    }

    let isComponentMounted = true
    let scriptTimeoutId: NodeJS.Timeout | undefined

    const loadPayPalScript = async () => {
      if ((window as any).paypal) {
        if (isComponentMounted) renderPayPalButtons()
        return
      }

      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=AED&disable-funding=credit,card`
      script.async = true

      let loadAttempts = 0
      const maxAttempts = 3

      script.onload = () => {
        if ((window as any).paypal && isComponentMounted) {
          renderPayPalButtons()
        } else if (loadAttempts < maxAttempts && isComponentMounted) {
          loadAttempts++
          setTimeout(loadPayPalScript, 1000)
        } else if (isComponentMounted) {
          setError("PayPal failed to initialize. Please try refreshing the page.")
          setLoading(false)
          onError?.("PayPal initialization failed")
        }
      }

      script.onerror = () => {
        if (!isComponentMounted) return
        setError("Failed to load PayPal. Checking configuration and retrying...")

        if (loadAttempts < maxAttempts) {
          loadAttempts++
          setTimeout(() => {
            if (isComponentMounted) {
              loadPayPalScript()
            }
          }, 2000)
        } else if (isComponentMounted) {
          setError(
            `PayPal failed to load after ${maxAttempts} attempts. Please check your PayPal Client ID configuration or contact support.`,
          )
          setLoading(false)
          onError?.("PayPal script failed to load")
        }
      }

      document.head.appendChild(script)

      scriptTimeoutId = setTimeout(() => {
        if (isComponentMounted && loading && !error) {
          setError("PayPal is taking too long to load. Please try refreshing the page.")
          setLoading(false)
          onError?.("PayPal loading timeout")
        }
      }, 15000)
    }

    const renderPayPalButtons = () => {
      if (!isComponentMounted || !containerRef.current) return

      if (!(window as any).paypal) {
        if (isComponentMounted) {
          setError("PayPal is not properly loaded. Please refresh the page.")
          setLoading(false)
        }
        return
      }

      const createOrder = async () => {
        try {
          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount, clientId }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Failed to create PayPal order")
          }

          const { orderId } = await response.json()
          return orderId
        } catch (err: any) {
          throw new Error(err.message || "Failed to create order")
        }
      }

      const onApprove = async (data: any) => {
        try {
          setLoading(true)
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              clientId,
              amount: totalAmount,
            }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Payment capture failed")
          }

          setSuccess(true)
          onSuccess?.()
        } catch (err: any) {
          const errorMsg = err.message || "Payment capture failed"
          setError(errorMsg)
          onError?.(errorMsg)
        } finally {
          setLoading(false)
        }
      }

      const onPayPalError = (err: any) => {
        const errorMsg = err.message || "PayPal error occurred"
        setError(errorMsg)
        onError?.(errorMsg)
        setLoading(false)
      }

      try {
        ;(window as any).paypal
          .Buttons({
            createOrder,
            onApprove,
            onError: onPayPalError,
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
            },
          })
          .render(containerRef.current)

        setLoading(false)
      } catch (err: any) {
        setError("Failed to render PayPal buttons. Please try refreshing.")
        setLoading(false)
      }
    }

    loadPayPalScript()

    return () => {
      isComponentMounted = false
      if (scriptTimeoutId) clearTimeout(scriptTimeoutId)
    }
  }, [clientId, totalAmount, onSuccess, onError])

  if (success) {
    return (
      <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-medium text-green-900">Payment Successful!</p>
          <p className="text-sm text-green-700">
            AED {totalAmount.toFixed(2)} has been added to your wallet instantly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <p className="text-xs text-red-600 mt-1">
              If the problem persists, contact support at support@creativefusion.llc
            </p>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-900 font-medium">AED {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Processing Fee (4%):</span>
          <span className="text-gray-900 font-medium">AED {processingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">TAX:</span>
          <span className="text-gray-900 font-medium">TAX 0</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between items-center">
          <span className="text-gray-900 font-bold">Total Amount:</span>
          <span className="text-[#C4D600] font-bold text-lg">AED {totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-200">
        <p className="font-medium">Secure Payment Processing</p>
        <p className="text-blue-600 mt-1">Your wallet will be updated immediately after payment is confirmed.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-[#C4D600]" />
        </div>
      ) : (
        <div ref={containerRef} />
      )}
    </div>
  )
}
