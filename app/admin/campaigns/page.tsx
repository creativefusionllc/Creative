import { AdminLayout } from "@/components/admin/admin-layout"
import { CampaignManager } from "@/components/admin/campaigns/campaign-manager"

export default function CampaignsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage AI-powered marketing campaigns for your clients
          </p>
        </div>
        <CampaignManager />
      </div>
    </AdminLayout>
  )
}
