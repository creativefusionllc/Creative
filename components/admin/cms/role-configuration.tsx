"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Edit, Trash2 } from "lucide-react"

interface Role {
  id: string
  name: string
  displayName: string
  permissions: string[]
  users: number
}

export function RoleConfiguration() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Configuration</h1>
          <p className="text-gray-500 mt-1">Configure user roles and permissions for CMS access</p>
        </div>
        <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            id: "1",
            name: "super_admin",
            displayName: "Super Admin",
            permissions: ["all"],
            users: 2,
          },
          {
            id: "2",
            name: "seo_manager",
            displayName: "SEO Manager",
            permissions: ["seo_pages", "keywords", "backlinks", "analytics"],
            users: 1,
          },
          {
            id: "3",
            name: "accountant",
            displayName: "Accountant",
            permissions: ["invoices", "payments", "reports", "wallet"],
            users: 1,
          },
          {
            id: "4",
            name: "content_manager",
            displayName: "Content Manager",
            permissions: ["blog", "pages", "templates", "cms_sections"],
            users: 2,
          },
          {
            id: "5",
            name: "sales_manager",
            displayName: "Sales Manager",
            permissions: ["leads", "bookings", "clients", "campaigns"],
            users: 1,
          },
          {
            id: "6",
            name: "designer",
            displayName: "Designer",
            permissions: ["creative_studio", "brand_book", "templates"],
            users: 3,
          },
        ].map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{role.displayName}</CardTitle>
                  <CardDescription className="text-xs mt-1">{role.users} users assigned</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((perm) => (
                      <Badge key={perm} variant="secondary" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
