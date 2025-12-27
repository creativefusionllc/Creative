import { generateSEOMetadata } from "@/utils/seo-metadata"
import { BlogListPage } from "@/components/blog/blog-list-page"

export const metadata = generateSEOMetadata({
  title: "Blog & Resources | Creative Fusion",
  description:
    "Expert insights on digital marketing, branding, web development, and creative strategies. Stay updated with latest trends from Dubai UAE.",
  keywords: ["marketing blog dubai", "branding tips uae", "web development insights", "digital marketing trends dubai"],
  path: "/blog",
})

export default function BlogPage() {
  return <BlogListPage />
}
