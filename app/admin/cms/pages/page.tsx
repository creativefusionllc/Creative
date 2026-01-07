import type { Metadata } from "next"
import { PageTemplateEditor } from "@/components/admin/cms/page-template-editor"

export const metadata: Metadata = {
  title: "Pages & Templates | CMS",
  description: "Edit website pages and templates with role-based access control",
}

export default function PagesPage() {
  return (
    <div className="p-8">
      <PageTemplateEditor />
    </div>
  )
}
