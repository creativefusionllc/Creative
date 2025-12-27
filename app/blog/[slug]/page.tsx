import { BlogPostPage } from "@/components/blog/blog-post-page"

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <BlogPostPage slug={slug} />
}
