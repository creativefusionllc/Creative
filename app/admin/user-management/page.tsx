"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Shield, UserCheck, UserX, Search, Settings } from "lucide-react"

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([])
  const [permissions, setPermissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [userRole, setUserRole] = useState("")

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [usersRes, permissionsRes] = await Promise.all([
      supabase.from("clients").select("*, user_roles(role)").order("created_at", { ascending: false }),
      supabase.from("permissions").select("*").order("module", { ascending: true }),
    ])

    setUsers(usersRes.data || [])
    setPermissions(permissionsRes.data || [])
    setLoading(false)
  }

  async function openPermissionsDialog(user: any) {
    setSelectedUser(user)

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.user_id)
      .eq("is_active", true)
      .single()

    const { data: userPerms } = await supabase
      .from("user_permissions")
      .select("permission_id")
      .eq("user_id", user.user_id)
      .eq("is_active", true)

    setUserRole(roles?.role || "")
    setUserPermissions(userPerms?.map((p: any) => p.permission_id) || [])
    setShowPermissionsDialog(true)
  }

  async function updateUserPermissions() {
    if (!selectedUser) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Update role
    await supabase.from("user_roles").delete().eq("user_id", selectedUser.user_id)
    if (userRole) {
      await supabase.from("user_roles").insert({
        user_id: selectedUser.user_id,
        role: userRole,
        granted_by: user?.id,
      })
    }

    // Update permissions
    await supabase.from("user_permissions").delete().eq("user_id", selectedUser.user_id)
    for (const permId of userPermissions) {
      await supabase.from("user_permissions").insert({
        user_id: selectedUser.user_id,
        permission_id: permId,
        granted_by: user?.id,
      })
    }

    setShowPermissionsDialog(false)
    loadData()
  }

  async function toggleUserStatus(userId: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "suspended" : "active"
    await supabase.from("clients").update({ status: newStatus }).eq("user_id", userId)
    loadData()
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.client_number?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>View and manage user accounts and permissions</CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.client_type || "client"}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.user_roles?.[0]?.role ? (
                      <Badge>{user.user_roles[0].role}</Badge>
                    ) : (
                      <span className="text-gray-400">No role</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "suspended" ? "destructive" : "secondary"
                      }
                    >
                      {user.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openPermissionsDialog(user)}>
                        <Settings className="h-4 w-4 mr-1" />
                        Permissions
                      </Button>
                      <Button
                        size="sm"
                        variant={user.status === "active" ? "destructive" : "default"}
                        onClick={() => toggleUserStatus(user.user_id, user.status)}
                      >
                        {user.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C4D600]" />
              Manage Permissions - {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>Assign role and permissions for this user</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <label className="text-sm font-medium">User Role</label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Additional Permissions</label>
              <div className="mt-3 space-y-3 max-h-96 overflow-y-auto">
                {permissions.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={userPermissions.includes(perm.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUserPermissions([...userPermissions, perm.id])
                        } else {
                          setUserPermissions(userPermissions.filter((p) => p !== perm.id))
                        }
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{perm.name}</p>
                      <p className="text-xs text-gray-500">{perm.description}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {perm.module}
                      </Badge>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={updateUserPermissions} className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
