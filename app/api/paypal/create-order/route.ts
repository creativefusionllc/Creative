import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { createPayPalOrder } from "@/lib/paypal/paypal-server"

export async function POST(request: Request) {
  try {
    const { amount, clientId } = await request.json()

    if (!amount || !clientId) {
      return Response.json({ error: "Missing amount or clientId" }, { status: 400 })
    }

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

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = await createPayPalOrder(amount, clientId)

    console.log("[v0] PayPal order created:", orderId)

    return Response.json({ orderId })
  } catch (error: any) {
    console.error("[v0] PayPal order creation error:", error)
    return Response.json({ error: error.message || "Failed to create PayPal order" }, { status: 500 })
  }
}
