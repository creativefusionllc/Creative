import { Suspense } from "react"
import { DesignEditor } from "@/components/admin/creative-studio/design-editor"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function DesignEditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading editor...</div>}>
      <DesignEditor />
    </Suspense>
  )
}
