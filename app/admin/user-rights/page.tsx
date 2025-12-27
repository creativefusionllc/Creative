import { UserRightsManagement } from "@/components/admin/user-rights-management"

export const metadata = {
  title: "User Rights Management | Admin",
  description: "Manage user roles and permissions",
}

export default function UserRightsPage() {
  return (
    <div className="p-6">
      <UserRightsManagement />
    </div>
  )
}
