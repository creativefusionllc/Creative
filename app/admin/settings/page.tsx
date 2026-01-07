import { AdminLayout } from "@/components/admin/admin-layout"
import { SystemSettings } from "@/components/admin/system-settings"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <SystemSettings />
    </AdminLayout>
  )
}
