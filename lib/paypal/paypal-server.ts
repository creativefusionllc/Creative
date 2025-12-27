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
    throw new Error(`PayPal order creation failed: ${error.message}`)
  }

  const data = await response.json()
  return data
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
    throw new Error(`PayPal capture failed: ${error.message}`)
  }

  const data = await response.json()
  return data
}
