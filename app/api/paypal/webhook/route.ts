import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import crypto from "crypto"

// Verify PayPal webhook signature
async function verifyPayPalSignature(
  transmissionId: string,
  transmissionTime: string,
  certUrl: string,
  transmissionSig: string,
  requestBody: string,
): Promise<boolean> {
  try {
    // Get the certificate from PayPal
    const certResponse = await fetch(certUrl)
    if (!certResponse.ok) {
      console.error("[v0] Failed to fetch PayPal certificate")
      return false
    }

    const certificate = await certResponse.text()

    // Create the signature verification string
    const expectedSig = crypto
      .createVerify("sha256")
      .update(`${transmissionId}|${transmissionTime}|${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}|${requestBody}`)
      .verify(certificate, transmissionSig, "base64")

    return expectedSig
  } catch (error) {
    console.error("[v0] Webhook signature verification error:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const transmissionId = request.headers.get("paypal-transmission-id")
    const transmissionTime = request.headers.get("paypal-transmission-time")
    const certUrl = request.headers.get("paypal-cert-url")
    const transmissionSig = request.headers.get("paypal-transmission-sig")
    const webhookId = request.headers.get("paypal-auth-algo")

    const requestBody = await request.text()

    console.log("[v0] PayPal webhook received:", transmissionId)

    // Verify webhook signature for production
    if (process.env.PAYPAL_MODE === "live") {
      const isValidSignature = await verifyPayPalSignature(
        transmissionId!,
        transmissionTime!,
        certUrl!,
        transmissionSig!,
        requestBody,
      )

      if (!isValidSignature) {
        console.error("[v0] Invalid PayPal webhook signature")
        return Response.json({ error: "Invalid signature" }, { status: 403 })
      }
    }

    const event = JSON.parse(requestBody)

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    // Handle different PayPal event types
    if (event.event_type === "CHECKOUT.ORDER.COMPLETED") {
      const orderId = event.resource.id
      const clientId = event.resource.purchase_units?.[0]?.reference_id
      const amount = Number.parseFloat(event.resource.purchase_units?.[0]?.amount?.value) || 0

      console.log("[v0] Processing completed order:", orderId)

      // Update transaction status in database
      const { error: updateError } = await supabase
        .from("wallet_transactions")
        .update({ verification_status: "webhook_verified" })
        .eq("description", "Wallet top-up via PayPal")
        .gte("created_at", new Date(Date.now() - 5 * 60000).toISOString())
        .lte("created_at", new Date().toISOString())

      if (updateError) {
        console.error("[v0] Failed to update transaction status:", updateError)
      }
    }

    if (event.event_type === "CHECKOUT.ORDER.DENIED" || event.event_type === "CHECKOUT.ORDER.CREATED") {
      const orderId = event.resource.id
      console.log("[v0] Order", event.event_type, ":", orderId)

      // Handle order denial/failure
      if (event.event_type === "CHECKOUT.ORDER.DENIED") {
        const { error } = await supabase
          .from("wallet_transactions")
          .update({ verification_status: "failed" })
          .eq("description", "Wallet top-up via PayPal")
          .gte("created_at", new Date(Date.now() - 5 * 60000).toISOString())

        if (error) {
          console.error("[v0] Failed to mark transaction as failed:", error)
        }
      }
    }

    return Response.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Webhook processing error:", error)
    return Response.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
