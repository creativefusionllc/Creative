import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag")

  if (!tag) {
    return NextResponse.json({ error: "Missing tag" }, { status: 400 })
  }

  try {
    revalidateTag(tag)
    console.log(`[v0] Revalidated tag: ${tag}`)
    return NextResponse.json({ revalidated: true, tag })
  } catch (error) {
    console.error(`[v0] Error revalidating ${tag}:`, error)
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 })
  }
}
