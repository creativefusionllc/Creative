"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Search,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface Company {
  id: string
  name: string
  industry: string | null
  website: string | null
  logo_url: string | null
  address: string | null
  city: string | null
  country: string
  contact_person: string | null
  contact_email: string | null
  contact_phone: string | null
  notes: string | null
  is_active: boolean
  created_at: string
  clients?: { id: string; name: string }[]
}

export function CompaniesManagement() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchCompanies()
  }, [])

  async function fetchCompanies() {
    setLoading(true)
    const { data, error } = await supabase
      .from("companies")
      .select("*, clients(id, name)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching companies:", error)
      toast.error("Failed to load companies")
    } else {
      setCompanies(data || [])
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const companyData = {
      name: formData.get("name") as string,
      industry: (formData.get("industry") as string) || null,
      website: (formData.get("website") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      country: (formData.get("country") as string) || "UAE",
      contact_person: (formData.get("contact_person") as string) || null,
      contact_email: (formData.get("contact_email") as string) || null,
      contact_phone: (formData.get("contact_phone") as string) || null,
      notes: (formData.get("notes") as string) || null,
      is_active: true,
    }

    if (editingCompany) {
      const { error } = await supabase.from("companies").update(companyData).eq("id", editingCompany.id)
      if (error) {
        toast.error("Failed to update company")
        return
      }
      toast.success("Company updated")
    } else {
      const { error } = await supabase.from("companies").insert(companyData)
      if (error) {
        toast.error("Failed to create company")
        return
      }
      toast.success("Company created")
    }
    setShowDialog(false)
    setEditingCompany(null)
    fetchCompanies()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this company? This will unlink all associated clients.")) return
    const { error } = await supabase.from("companies").delete().eq("id", id)
    if (error) {
      toast.error("Failed to delete company")
      return
    }
    toast.success("Company deleted")
    fetchCompanies()
  }

  function openEditDialog(company: Company) {
    setEditingCompany(company)
    setShowDialog(true)
  }

  const filteredCompanies = companies.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeCompanies = companies.filter((c) => c.is_active).length
  const totalClients = companies.reduce((acc, c) => acc + (c.clients?.length || 0), 0)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C4D600]/10 rounded-lg">
                <Building2 className="h-6 w-6 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Companies</p>
                <p className="text-2xl font-bold text-white">{companies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Building2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Companies</p>
                <p className="text-2xl font-bold text-white">{activeCompanies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Linked Clients</p>
                <p className="text-2xl font-bold text-white">{totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#141414] border-white/10 text-white"
          />
        </div>
        <Dialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open)
            if (!open) setEditingCompany(null)
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-[#0a0a0a] gap-2">
              <Plus className="h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCompany ? "Edit Company" : "Add New Company"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-gray-400">Company Name *</Label>
                  <Input
                    name="name"
                    required
                    defaultValue={editingCompany?.name || ""}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Industry</Label>
                  <Input
                    name="industry"
                    defaultValue={editingCompany?.industry || ""}
                    placeholder="e.g., Real Estate, F&B"
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Website</Label>
                  <Input
                    name="website"
                    type="url"
                    defaultValue={editingCompany?.website || ""}
                    placeholder="https://"
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">City</Label>
                  <Input
                    name="city"
                    defaultValue={editingCompany?.city || ""}
                    placeholder="Dubai"
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Country</Label>
                  <Input
                    name="country"
                    defaultValue={editingCompany?.country || "UAE"}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-gray-400">Address</Label>
                  <Input
                    name="address"
                    defaultValue={editingCompany?.address || ""}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Contact Person</Label>
                  <Input
                    name="contact_person"
                    defaultValue={editingCompany?.contact_person || ""}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Contact Email</Label>
                  <Input
                    name="contact_email"
                    type="email"
                    defaultValue={editingCompany?.contact_email || ""}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Contact Phone</Label>
                  <Input
                    name="contact_phone"
                    defaultValue={editingCompany?.contact_phone || ""}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-gray-400">Notes</Label>
                  <Textarea
                    name="notes"
                    defaultValue={editingCompany?.notes || ""}
                    rows={3}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-[#0a0a0a]">
                  {editingCompany ? "Update" : "Create"} Company
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowDialog(false)
                    setEditingCompany(null)
                  }}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Companies Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      ) : filteredCompanies.length === 0 ? (
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="py-16 text-center">
            <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No companies found</p>
            <p className="text-sm text-gray-500">Add your first company to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="bg-[#141414] border-white/10 hover:border-white/20 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#C4D600]/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-[#C4D600]" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{company.name}</CardTitle>
                      {company.industry && (
                        <Badge variant="outline" className="mt-1 text-xs border-white/20 text-gray-400">
                          {company.industry}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
                      <DropdownMenuItem onClick={() => openEditDialog(company)} className="text-white hover:bg-white/5">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(company.id)}
                        className="text-red-400 hover:bg-white/5"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {company.city && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {company.city}, {company.country}
                    </span>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C4D600] hover:underline truncate"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {company.contact_email && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{company.contact_email}</span>
                  </div>
                )}
                {company.contact_phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>{company.contact_phone}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Linked Clients</span>
                    <Badge className="bg-white/10 text-white">{company.clients?.length || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
