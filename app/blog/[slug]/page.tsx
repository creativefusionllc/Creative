import { BlogPostPage } from "@/components/blog/blog-post-page"
import type { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/metadata-generator"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  return generateSEOMetadata({
    title: `Blog Post: ${slug.replace(/-/g, " ").charAt(0).toUpperCase() + slug.slice(1)}`,
    description: `Read our latest insights on creative fusion, branding, digital marketing, and business solutions. Expert blog posts for Dubai, UAE and GCC regions.`,
    keywords: [
      slug.replace(/-/g, " "),
      "blog",
      "creative fusion blog",
      "dubai blog",
      "marketing insights",
      "branding tips",
      "digital marketing",
      "dubai insights",
      "uae business",
      "creative tips",
    ],
    path: `/blog/${slug}`,
    type: "article",
  })
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogPostPage slug={slug} />
}
