"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Users, Search, Plus, Edit, Trash2, Loader2, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function UserRightsManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [userRights, setUserRights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [permissions, setPermissions] = useState({
    can_view: true,
    can_create: false,
    can_edit: false,
    can_delete: false,
    can_approve: false,
  })

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [usersData, rolesData, rightsData] = await Promise.all([
      supabase.from("clients").select("*"),
      supabase.from("super_admin_roles").select("*").order("role_level", { ascending: false }),
      supabase.from("user_rights").select("*, super_admin_roles(role_name)"),
    ])

    setUsers(usersData.data || [])
    setRoles(rolesData.data || [])
    setUserRights(rightsData.data || [])
    setLoading(false)
  }

  async function assignRights() {
    if (!selectedUser) return

    const { data: currentUser } = await supabase.auth.getUser()

    await supabase.from("user_rights").insert({
      user_id: selectedUser.user_id,
      ...permissions,
      granted_by: currentUser.user?.id,
    })

    loadData()
    setSelectedUser(null)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#C4D600]" />
            User Rights Management
          </h1>
          <p className="text-gray-500 mt-2">Manage user roles, permissions, and access control</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
              <Plus className="h-4 w-4 mr-2" />
              Assign Rights
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign User Rights</DialogTitle>
              <DialogDescription>Select a user and configure their permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Select User</Label>
                <Select onValueChange={(value) => setSelectedUser(users.find((u) => u.id === value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Permissions</Label>
                {Object.entries(permissions).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, [key]: checked }))}
                    />
                    <label className="text-sm capitalize">{key.replace(/_/g, " ")}</label>
                  </div>
                ))}
              </div>

              <Button onClick={assignRights} className="w-full bg-[#C4D600] hover:bg-[#a8b800] text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Rights
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#C4D600]" />
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-sm text-gray-500">Roles Defined</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Edit className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{userRights.length}</p>
                <p className="text-sm text-gray-500">Rights Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Rights Overview</CardTitle>
          <CardDescription>View and manage all user permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const rights = userRights.find((r) => r.user_id === user.user_id)
              return (
                <div key={user.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex gap-2 mt-2">
                      {rights?.can_view && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">View</span>
                      )}
                      {rights?.can_create && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Create</span>
                      )}
                      {rights?.can_edit && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Edit</span>
                      )}
                      {rights?.can_delete && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Delete</span>
                      )}
                      {rights?.can_approve && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Approve</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
