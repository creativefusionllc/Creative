import { AdminLayout } from "@/components/admin/admin-layout"
import { SocialMediaManagement } from "@/components/admin/social-media-management"

export const metadata = {
  title: "Social Media Management | Admin",
  description: "Manage social media content and calendar",
}

export default function SocialMediaPage() {
  return (
    <AdminLayout>
      <SocialMediaManagement />
    </AdminLayout>
  )
}
