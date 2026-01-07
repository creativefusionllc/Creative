import { Suspense } from "react"
import { BlogManagement } from "@/components/admin/blog/blog-management"

export default function AdminBlogPage() {
  return (
    <div className="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogManagement />
      </Suspense>
    </div>
  )
}
