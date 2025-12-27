"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign, Clock, Users, Plus, Loader2, Eye, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function FreelancerManagement() {
  const [projects, setProjects] = useState<any[]>([])
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    project_title: "",
    project_description: "",
    category: "",
    budget_min: "",
    budget_max: "",
    duration_days: "",
    required_skills: "",
  })

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [projectsData, freelancersData] = await Promise.all([
      supabase
        .from("freelancer_marketplace")
        .select("*, clients!posted_by(name, email)")
        .order("created_at", { ascending: false }),
      supabase.from("clients").select("*").eq("user_type", "freelancer"),
    ])

    setProjects(projectsData.data || [])
    setFreelancers(freelancersData.data || [])
    setLoading(false)
  }

  async function createProject() {
    setCreating(true)
    const { data: user } = await supabase.auth.getUser()

    await supabase.from("freelancer_marketplace").insert({
      ...formData,
      budget_min: Number.parseFloat(formData.budget_min),
      budget_max: Number.parseFloat(formData.budget_max),
      duration_days: Number.parseInt(formData.duration_days),
      required_skills: formData.required_skills.split(",").map((s) => s.trim()),
      posted_by: user.user?.id,
    })

    loadData()
    setCreating(false)
    setFormData({
      project_title: "",
      project_description: "",
      category: "",
      budget_min: "",
      budget_max: "",
      duration_days: "",
      required_skills: "",
    })
  }

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
            <Briefcase className="h-8 w-8 text-[#C4D600]" />
            Freelancer Marketplace
          </h1>
          <p className="text-gray-500 mt-2">Post projects and hire skilled freelancers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
              <Plus className="h-4 w-4 mr-2" />
              Post Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Project</DialogTitle>
              <DialogDescription>Describe your project and find the right freelancer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  placeholder="E.g., Product Photography for E-commerce"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  placeholder="Describe your project requirements..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Photography, Design, etc."
                  />
                </div>
                <div>
                  <Label>Duration (Days)</Label>
                  <Input
                    type="number"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    placeholder="7"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Budget (AED)</Label>
                  <Input
                    type="number"
                    value={formData.budget_min}
                    onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>Max Budget (AED)</Label>
                  <Input
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                    placeholder="2000"
                  />
                </div>
              </div>
              <div>
                <Label>Required Skills (comma-separated)</Label>
                <Input
                  value={formData.required_skills}
                  onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                  placeholder="Product Photography, Lightroom, Adobe Photoshop"
                />
              </div>
              <Button
                onClick={createProject}
                disabled={creating}
                className="w-full bg-[#C4D600] hover:bg-[#a8b800] text-black"
              >
                {creating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Post Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{projects.filter((p) => p.status === "open").length}</p>
                <p className="text-sm text-gray-500">Open Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#C4D600]" />
              <div>
                <p className="text-2xl font-bold">{freelancers.length}</p>
                <p className="text-sm text-gray-500">Freelancers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{projects.filter((p) => p.status === "in_progress").length}</p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{projects.filter((p) => p.status === "completed").length}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Projects available for bidding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{project.project_title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.project_description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">{project.category}</Badge>
                          <Badge variant="outline">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {project.budget_min} - {project.budget_max} AED
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {project.duration_days} days
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.required_skills?.map((skill: string) => (
                            <span key={skill} className="px-2 py-1 text-xs bg-[#C4D600]/10 text-[#C4D600] rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge
                          className={
                            project.status === "open"
                              ? "bg-green-100 text-green-700"
                              : project.status === "in_progress"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {project.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Bids
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Top Freelancers</CardTitle>
              <CardDescription>Available freelancers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {freelancers.slice(0, 5).map((freelancer) => (
                  <div key={freelancer.id} className="border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 flex items-center justify-center">
                        <span className="font-bold text-[#C4D600]">{freelancer.name?.[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{freelancer.name}</p>
                        <p className="text-xs text-gray-500">{freelancer.specializations?.[0] || "Freelancer"}</p>
                        {freelancer.hourly_rate && (
                          <p className="text-xs text-[#C4D600] font-medium mt-1">{freelancer.hourly_rate} AED/hr</p>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          freelancer.availability_status === "available"
                            ? "border-green-500 text-green-700"
                            : "border-gray-300"
                        }
                      >
                        {freelancer.availability_status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
