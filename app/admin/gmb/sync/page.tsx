import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { GMBSyncPage } from "@/components/admin/gmb/gmb-sync-page"

export const metadata = {
  title: "Sync Google Reviews | Creative Fusion",
  description: "Sync your Google Business reviews to display as testimonials",
}

export default async function Page() {
  const supabase = await createClient()

  // Get or create Creative Fusion GMB profile
  let { data: profile } = await supabase
    .from("gmb_profiles")
    .select("*")
    .eq("business_name", "Creative Fusion")
    .single()

  if (!profile) {
    const { data: newProfile } = await supabase
      .from("gmb_profiles")
      .insert({
        business_name: "Creative Fusion",
        gmb_location_id: "creative-fusion-llc",
        auto_reply_enabled: true,
        auto_post_enabled: false,
        connected_at: new Date().toISOString(),
      })
      .select()
      .single()

    profile = newProfile
  }

  // Get existing reviews
  const { data: reviews } = await supabase
    .from("gmb_reviews")
    .select("*")
    .eq("gmb_profile_id", profile?.id)
    .order("review_date", { ascending: false })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GMBSyncPage profile={profile} existingReviews={reviews || []} />
    </Suspense>
  )
}
