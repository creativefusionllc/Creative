"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  RefreshCw,
  CreditCard,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Star,
  Check,
  Crown,
  Zap,
  Rocket,
} from "lucide-react"
import { format } from "date-fns"

interface Plan {
  id: string
  name: string
  slug: string
  description: string | null
  price_monthly: number
  price_yearly: number | null
  features: string[]
  limits: Record<string, any>
  is_popular: boolean
  is_active: boolean
  sort_order: number
  created_at: string
}

interface ClientSubscription {
  id: string
  client_id: string
  plan_id: string
  status: string
  billing_cycle: string
  current_period_start: string
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  clients?: { name: string; email: string }
  subscription_plans?: { name: string; price_monthly: number }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-green-500/20 text-green-400" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400" },
  past_due: { label: "Past Due", color: "bg-yellow-500/20 text-yellow-400" },
  trialing: { label: "Trial", color: "bg-blue-500/20 text-blue-400" },
  paused: { label: "Paused", color: "bg-gray-500/20 text-gray-400" },
}

const planIcons: Record<string, React.ElementType> = {
  starter: Zap,
  professional: Star,
  business: Crown,
  enterprise: Rocket,
}

export function SubscriptionManagement() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [subscriptions, setSubscriptions] = useState<ClientSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [isPlanOpen, setIsPlanOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const supabase = createClient()

  const [planForm, setPlanForm] = useState({
    name: "",
    slug: "",
    description: "",
    price_monthly: 0,
    price_yearly: 0,
    features: "",
    is_popular: false,
    is_active: true,
    sort_order: 0,
  })

  const [stats, setStats] = useState({
    totalPlans: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    churnRate: 0,
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [plansRes, subsRes] = await Promise.all([
      supabase.from("subscription_plans").select("*").order("sort_order"),
      supabase
        .from("client_subscriptions")
        .select("*, clients(name, email), subscription_plans(name, price_monthly)")
        .order("created_at", { ascending: false }),
    ])

    if (plansRes.data) setPlans(plansRes.data)
    if (subsRes.data) {
      setSubscriptions(subsRes.data)
      calculateStats(plansRes.data || [], subsRes.data)
    }
    setLoading(false)
  }

  function calculateStats(plansData: Plan[], subsData: ClientSubscription[]) {
    const totalPlans = plansData.filter((p) => p.is_active).length
    const activeSubscriptions = subsData.filter((s) => s.status === "active").length
    const monthlyRevenue = subsData
      .filter((s) => s.status === "active")
      .reduce((sum, s) => sum + (s.subscription_plans?.price_monthly || 0), 0)
    const cancelled = subsData.filter((s) => s.status === "cancelled").length
    const churnRate = subsData.length > 0 ? Math.round((cancelled / subsData.length) * 100) : 0

    setStats({ totalPlans, activeSubscriptions, monthlyRevenue, churnRate })
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  async function handleSavePlan() {
    const planData = {
      ...planForm,
      slug: planForm.slug || generateSlug(planForm.name),
      features: planForm.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      price_yearly: planForm.price_yearly || null,
    }

    if (editingPlan) {
      await supabase.from("subscription_plans").update(planData).eq("id", editingPlan.id)
    } else {
      await supabase.from("subscription_plans").insert(planData)
    }

    setIsPlanOpen(false)
    setEditingPlan(null)
    resetPlanForm()
    fetchData()
  }

  async function handleDeletePlan(id: string) {
    if (!confirm("Delete this plan?")) return
    await supabase.from("subscription_plans").delete().eq("id", id)
    fetchData()
  }

  async function handleTogglePlanActive(id: string, isActive: boolean) {
    await supabase.from("subscription_plans").update({ is_active: !isActive }).eq("id", id)
    fetchData()
  }

  async function handleUpdateSubscriptionStatus(id: string, status: string) {
    const updates: Record<string, any> = { status, updated_at: new Date().toISOString() }
    if (status === "cancelled") updates.cancelled_at = new Date().toISOString()
    await supabase.from("client_subscriptions").update(updates).eq("id", id)
    fetchData()
  }

  function openEditPlan(plan: Plan) {
    setEditingPlan(plan)
    setPlanForm({
      name: plan.name,
      slug: plan.slug,
      description: plan.description || "",
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly || 0,
      features: plan.features?.join("\n") || "",
      is_popular: plan.is_popular,
      is_active: plan.is_active,
      sort_order: plan.sort_order,
    })
    setIsPlanOpen(true)
  }

  function resetPlanForm() {
    setPlanForm({
      name: "",
      slug: "",
      description: "",
      price_monthly: 0,
      price_yearly: 0,
      features: "",
      is_popular: false,
      is_active: true,
      sort_order: 0,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
          <p className="text-gray-400">Manage subscription plans and client subscriptions</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          className="border-white/10 text-gray-300 hover:text-white bg-transparent"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Active Plans</p>
                <p className="text-2xl font-bold text-white">{stats.totalPlans}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Active Subscribers</p>
                <p className="text-2xl font-bold text-white">{stats.activeSubscriptions}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">AED {stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-[#C4D600]/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[#C4D600]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Churn Rate</p>
                <p className="text-2xl font-bold text-white">{stats.churnRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger
            value="plans"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Plans
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Subscriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-end">
            <Dialog
              open={isPlanOpen}
              onOpenChange={(open) => {
                setIsPlanOpen(open)
                if (!open) {
                  setEditingPlan(null)
                  resetPlanForm()
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#141414] border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingPlan ? "Edit Plan" : "Create Plan"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingPlan ? "Update subscription plan details" : "Create a new subscription plan"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Plan Name *</Label>
                    <Input
                      value={planForm.name}
                      onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="e.g., Professional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={planForm.description}
                      onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Perfect for growing businesses"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Monthly Price (AED) *</Label>
                      <Input
                        type="number"
                        value={planForm.price_monthly}
                        onChange={(e) => setPlanForm({ ...planForm, price_monthly: Number(e.target.value) })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Yearly Price (AED)</Label>
                      <Input
                        type="number"
                        value={planForm.price_yearly}
                        onChange={(e) => setPlanForm({ ...planForm, price_yearly: Number(e.target.value) })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={planForm.features}
                      onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={5}
                      placeholder="Unlimited projects&#10;Priority support&#10;Advanced analytics"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sort Order</Label>
                      <Input
                        type="number"
                        value={planForm.sort_order}
                        onChange={(e) => setPlanForm({ ...planForm, sort_order: Number(e.target.value) })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-3 pt-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={planForm.is_popular}
                          onCheckedChange={(v) => setPlanForm({ ...planForm, is_popular: v })}
                        />
                        <Label>Popular</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={planForm.is_active}
                          onCheckedChange={(v) => setPlanForm({ ...planForm, is_active: v })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsPlanOpen(false)}
                    className="border-white/10 text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSavePlan}
                    disabled={!planForm.name || !planForm.price_monthly}
                    className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90"
                  >
                    {editingPlan ? "Save Changes" : "Create Plan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Plans Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : plans.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                <CreditCard className="h-12 w-12 mb-4 opacity-50" />
                <p>No subscription plans yet</p>
              </div>
            ) : (
              plans.map((plan) => {
                const Icon = planIcons[plan.slug] || Star
                return (
                  <Card
                    key={plan.id}
                    className={`bg-[#141414] border-white/10 relative ${!plan.is_active ? "opacity-60" : ""} ${plan.is_popular ? "border-[#C4D600]" : ""}`}
                  >
                    {plan.is_popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#C4D600] text-black">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-[#C4D600]/20 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-[#C4D600]" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white">{plan.name}</CardTitle>
                            {plan.description && <p className="text-xs text-gray-400">{plan.description}</p>}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-white">
                            AED {plan.price_monthly.toLocaleString()}
                          </span>
                          <span className="text-gray-400">/month</span>
                        </div>
                        {plan.price_yearly && (
                          <p className="text-sm text-gray-400">
                            or AED {plan.price_yearly.toLocaleString()}/year (save{" "}
                            {Math.round(
                              ((plan.price_monthly * 12 - plan.price_yearly) / (plan.price_monthly * 12)) * 100,
                            )}
                            %)
                          </p>
                        )}
                      </div>
                      {plan.features && plan.features.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {plan.features.slice(0, 5).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="h-4 w-4 text-[#C4D600]" />
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 5 && (
                            <li className="text-sm text-gray-400">+{plan.features.length - 5} more features</li>
                          )}
                        </ul>
                      )}
                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditPlan(plan)}
                          className="flex-1 text-gray-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTogglePlanActive(plan.id, plan.is_active)}
                          className={plan.is_active ? "text-green-400" : "text-gray-400"}
                        >
                          {plan.is_active ? "Active" : "Inactive"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-0">
              {subscriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Users className="h-12 w-12 mb-4 opacity-50" />
                  <p>No subscriptions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Client</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Plan</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Billing</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Started</th>
                        <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-white">{sub.clients?.name || "Unknown"}</p>
                              <p className="text-xs text-gray-400">{sub.clients?.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-white">{sub.subscription_plans?.name || "Unknown"}</span>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-white/10 text-gray-300 capitalize">{sub.billing_cycle}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={statusConfig[sub.status]?.color || ""}>
                              {statusConfig[sub.status]?.label || sub.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-400">
                              {format(new Date(sub.current_period_start), "MMM d, yyyy")}
                            </span>
                          </td>
                          <td className="p-4">
                            <Select onValueChange={(v) => handleUpdateSubscriptionStatus(sub.id, v)}>
                              <SelectTrigger className="w-[120px] h-8 bg-white/5 border-white/10 text-white text-xs">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1a1a1a] border-white/10">
                                <SelectItem value="active" className="text-white hover:bg-white/10">
                                  Active
                                </SelectItem>
                                <SelectItem value="paused" className="text-white hover:bg-white/10">
                                  Paused
                                </SelectItem>
                                <SelectItem value="cancelled" className="text-white hover:bg-white/10">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
