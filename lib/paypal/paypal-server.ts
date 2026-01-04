// Instead compute API base URL inside each function to avoid build-time evaluation

export async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const secretKey = process.env.PAYPAL_SECRET_KEY

  if (!clientId || !secretKey) {
    throw new Error(
      "PayPal credentials are not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY.",
    )
  }

  const apiBase = process.env.PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com"
  const auth = Buffer.from(`${clientId}:${secretKey}`).toString("base64")

  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token")
  }

  const data = await response.json()
  return data.access_token
}

export async function createPayPalOrder(amount: number, clientId: string) {
  const token = await getPayPalAccessToken()
  const apiBase = process.env.PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com"

  const response = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: clientId,
          amount: {
            currency_code: "AED",
            value: amount.toString(),
          },
          description: "Wallet Top-up - Creative Fusion",
        },
      ],
      application_context: {
        brand_name: "Creative Fusion",
        locale: "en-US",
        landing_page: "BILLING",
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/wallet?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/wallet?payment=cancelled`,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("[v0] PayPal API error:", error)
    throw new Error(`PayPal order creation failed: ${error.details?.[0]?.issue || error.message || "Unknown error"}`)
  }

  const data = await response.json()
  return { id: data.id, status: data.status }
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getPayPalAccessToken()
  const apiBase = process.env.PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com"

  const response = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("[v0] PayPal capture API error:", error)
    throw new Error(`PayPal capture failed: ${error.details?.[0]?.issue || error.message || "Unknown error"}`)
  }

  const data = await response.json()
  if (data.status !== "COMPLETED") {
    throw new Error(`Payment not completed. Status: ${data.status}`)
  }
  return data
}

export async function verifyPayPalWebhook(event: any): Promise<boolean> {
  try {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const secretKey = process.env.PAYPAL_SECRET_KEY

    if (!clientId || !secretKey) {
      return false
    }

    const token = await getPayPalAccessToken()
    const apiBase = process.env.PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com"

    const response = await fetch(`${apiBase}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transmission_id: event.transmission_id,
        transmission_time: event.transmission_time,
        cert_url: event.cert_url,
        auth_algo: event.auth_algo,
        transmission_sig: event.transmission_sig,
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: event.webhook_event,
      }),
    })

    const data = await response.json()
    return data.verification_status === "SUCCESS"
  } catch (error) {
    console.error("[v0] Webhook verification error:", error)
    return false
  }
}
