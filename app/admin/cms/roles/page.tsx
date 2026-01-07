import type { Metadata } from "next"
import { RoleConfiguration } from "@/components/admin/cms/role-configuration"

export const metadata: Metadata = {
  title: "Role Configuration | CMS",
  description: "Configure user roles and permissions for CMS access",
}

export default function RolesPage() {
  return (
    <div className="p-8">
      <RoleConfiguration />
    </div>
  )
}
