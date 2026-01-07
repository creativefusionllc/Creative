import { FreelancerManagement } from "@/components/admin/freelancer-management"

export const metadata = {
  title: "Freelancer Marketplace | Admin",
  description: "Manage freelance projects and hire freelancers",
}

export default function FreelancersPage() {
  return (
    <div className="p-6">
      <FreelancerManagement />
    </div>
  )
}
