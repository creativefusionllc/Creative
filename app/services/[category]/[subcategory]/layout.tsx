import type { ReactNode } from "react"

export default async function ServiceSubcategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ category: string; subcategory: string }>
}) {
  const { category, subcategory } = await params

  return (
    <div data-category={category} data-subcategory={subcategory}>
      {children}
    </div>
  )
}
