import { AdminLayout } from "@/components/admin/admin-layout"
import { DatabaseBackupManagement } from "@/components/admin/database-backup-management"

export default function BackupPage() {
  return (
    <AdminLayout>
      <DatabaseBackupManagement />
    </AdminLayout>
  )
}
