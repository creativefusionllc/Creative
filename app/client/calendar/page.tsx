import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientLayout } from "@/components/client/client-layout"
import { SocialCalendarView } from "@/components/client/social-calendar-view"
import { getOrCreateClient } from "@/lib/client-helpers"

export const metadata = {
  title: "Social Media Calendar | Creative Fusion",
  description: "View your scheduled social media content",
}

export default async function CalendarPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const client = await getOrCreateClient(user.id, user.email, user.user_metadata as Record<string, string>)
  const clientId = client?.id

  const { data: calendarItems } = clientId
    ? await supabase
        .from("social_media_calendar")
        .select("*")
        .eq("client_id", clientId)
        .eq("is_visible_to_client", true)
        .order("scheduled_date", { ascending: true })
    : { data: [] }

  return (
    <ClientLayout
      user={{ email: user.email || "", name: client?.company_name }}
      walletBalance={client?.wallet_balance || 0}
      pointsBalance={client?.points_balance || 0}
    >
      <SocialCalendarView items={calendarItems || []} />
    </ClientLayout>
  )
}
