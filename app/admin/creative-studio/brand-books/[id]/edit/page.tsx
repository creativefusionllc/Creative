import { BrandBookEditor } from "@/components/admin/creative-studio/brand-book-editor"

export default async function BrandBookEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <BrandBookEditor brandBookId={id} />
}
