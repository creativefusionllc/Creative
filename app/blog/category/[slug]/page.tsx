import { BlogCategoryPage } from "@/components/blog/blog-category-page"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <BlogCategoryPage slug={slug} />
}
