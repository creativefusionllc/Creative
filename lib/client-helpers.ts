import { createClient } from "@/lib/supabase/server"
import { createServerClient } from "@supabase/ssr"

export async function getOrCreateClient(userId: string, userEmail?: string, userMetadata?: Record<string, string>) {
  const supabase = await createClient()

  let { data: client } = await supabase.from("clients").select("*").eq("user_id", userId).maybeSingle()

  if (!client && userEmail) {
    const { data: clientByEmail } = await supabase.from("clients").select("*").eq("email", userEmail).maybeSingle()

    if (clientByEmail) {
      const { data: updatedClient, error: updateError } = await supabase
        .from("clients")
        .update({ user_id: userId })
        .eq("id", clientByEmail.id)
        .select()
        .single()

      if (!updateError && updatedClient) {
        console.log("[v0] Updated existing client with user_id")
        client = updatedClient
      } else {
        console.log("[v0] Error updating client:", updateError?.message)
      }
    }
  }

  if (!client) {
    const clientNumber = `CL${Date.now().toString().slice(-8)}`

    const serviceSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
      },
    )

    const { data: newClient, error: insertError } = await serviceSupabase
      .from("clients")
      .insert({
        user_id: userId || null,
        name: userMetadata?.name || userEmail?.split("@")[0] || "Client",
        email: userEmail || "",
        company_name: userMetadata?.company || "",
        phone: userMetadata?.phone || "",
        client_number: clientNumber,
        wallet_balance: 0,
        points_balance: 0,
        is_active: true,
      })
      .select()
      .single()

    if (insertError) {
      console.log("[v0] Error creating client:", insertError.message, insertError.details)
      return null
    }

    if (newClient) {
      console.log("[v0] Created new client successfully:", newClient.id)
      client = newClient
    }
  }

  return client
}
