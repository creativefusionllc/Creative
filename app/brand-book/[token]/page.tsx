import { BrandBookViewer } from "@/components/brand-book/brand-book-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function BrandBookPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = await createClient()

  const { data: brandBook } = await supabase
    .from("brand_books")
    .select("*, clients(company_name, contact_name)")
    .eq("share_token", token)
    .single()

  if (!brandBook) {
    notFound()
  }

  // Fetch all related data
  const [
    storyRes,
    logoRes,
    colorsRes,
    typographyRes,
    imageryRes,
    voiceRes,
    iconographyRes,
    patternsRes,
    applicationsRes,
    assetsRes,
  ] = await Promise.all([
    supabase.from("brand_book_story").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_logo").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_colors").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_typography").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_imagery").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_voice").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_iconography").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_patterns").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_applications").select("*").eq("brand_book_id", brandBook.id).single(),
    supabase.from("brand_book_assets").select("*").eq("brand_book_id", brandBook.id),
  ])

  return (
    <BrandBookViewer
      brandBook={brandBook}
      story={storyRes.data}
      logo={logoRes.data}
      colors={colorsRes.data}
      typography={typographyRes.data}
      imagery={imageryRes.data}
      voice={voiceRes.data}
      iconography={iconographyRes.data}
      patterns={patternsRes.data}
      applications={applicationsRes.data}
      assets={assetsRes.data || []}
    />
  )
}
