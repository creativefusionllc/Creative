"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Server, Shield, Plus, Edit, Trash2, ShoppingCart, Search } from "lucide-react"
import { format } from "date-fns"

interface AdminHostingDashboardProps {
  tlds: any[]
  hostingPlans: any[]
  sslCerts: any[]
  emailPlans: any[]
  recentOrders: any[]
  totalDomains: number
}

export function AdminHostingDashboard({
  tlds,
  hostingPlans,
  sslCerts,
  emailPlans,
  recentOrders,
  totalDomains,
}: AdminHostingDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hosting Management</h1>
          <p className="text-muted-foreground">Manage domains, hosting, SSL, and email services</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C4D600]/20 rounded-lg">
                <Globe className="h-5 w-5 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tlds.length}</p>
                <p className="text-sm text-muted-foreground">TLDs Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Server className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{hostingPlans.length}</p>
                <p className="text-sm text-muted-foreground">Hosting Plans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sslCerts.length}</p>
                <p className="text-sm text-muted-foreground">SSL Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalDomains}</p>
                <p className="text-sm text-muted-foreground">Domains Sold</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tlds">Domain TLDs</TabsTrigger>
          <TabsTrigger value="hosting">Hosting Plans</TabsTrigger>
          <TabsTrigger value="ssl">SSL Certificates</TabsTrigger>
          <TabsTrigger value="email">Email Plans</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest domain and hosting orders</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">{order.client?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">AED {order.total_amount}</p>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular TLDs */}
            <Card>
              <CardHeader>
                <CardTitle>Popular TLDs</CardTitle>
                <CardDescription>Most searched domain extensions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tlds
                    .filter((t) => t.is_popular)
                    .map((tld) => (
                      <div key={tld.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-lg font-mono">
                            {tld.extension}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{tld.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">AED {tld.registration_price}/yr</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TLDs Tab */}
        <TabsContent value="tlds">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Domain TLDs</CardTitle>
                <CardDescription>Manage domain extensions and pricing</CardDescription>
              </div>
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                <Plus className="h-4 w-4 mr-2" />
                Add TLD
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Extension</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Renewal</TableHead>
                    <TableHead>Transfer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tlds.map((tld) => (
                    <TableRow key={tld.id}>
                      <TableCell className="font-mono font-semibold">{tld.extension}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tld.category}</Badge>
                      </TableCell>
                      <TableCell>AED {tld.registration_price}</TableCell>
                      <TableCell>AED {tld.renewal_price}</TableCell>
                      <TableCell>AED {tld.transfer_price}</TableCell>
                      <TableCell>
                        <Badge variant={tld.is_active ? "default" : "secondary"}>
                          {tld.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hosting Plans Tab */}
        <TabsContent value="hosting">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hosting Plans</CardTitle>
                <CardDescription>Manage web hosting plans and pricing</CardDescription>
              </div>
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Monthly</TableHead>
                    <TableHead>Yearly</TableHead>
                    <TableHead>Disk</TableHead>
                    <TableHead>Bandwidth</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostingPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{plan.name}</p>
                          {plan.is_popular && <Badge className="bg-[#C4D600] text-black text-xs">Popular</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{plan.category}</Badge>
                      </TableCell>
                      <TableCell>AED {plan.price_monthly}</TableCell>
                      <TableCell>AED {plan.price_yearly}</TableCell>
                      <TableCell>{plan.disk_space}</TableCell>
                      <TableCell>{plan.bandwidth}</TableCell>
                      <TableCell>
                        <Badge variant={plan.is_active ? "default" : "secondary"}>
                          {plan.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SSL Tab */}
        <TabsContent value="ssl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>SSL Certificates</CardTitle>
                <CardDescription>Manage SSL certificate products</CardDescription>
              </div>
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                <Plus className="h-4 w-4 mr-2" />
                Add SSL
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Yearly</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sslCerts.map((ssl) => (
                    <TableRow key={ssl.id}>
                      <TableCell className="font-semibold">{ssl.name}</TableCell>
                      <TableCell>{ssl.provider}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ssl.type}</Badge>
                      </TableCell>
                      <TableCell>AED {ssl.price_yearly}</TableCell>
                      <TableCell>${ssl.warranty_amount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={ssl.is_active ? "default" : "secondary"}>
                          {ssl.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Email Hosting Plans</CardTitle>
                <CardDescription>Manage email hosting products</CardDescription>
              </div>
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Monthly</TableHead>
                    <TableHead>Yearly</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-semibold">{plan.name}</TableCell>
                      <TableCell>{plan.provider}</TableCell>
                      <TableCell>AED {plan.price_monthly}</TableCell>
                      <TableCell>AED {plan.price_yearly}</TableCell>
                      <TableCell>{plan.storage_per_user}</TableCell>
                      <TableCell>
                        <Badge variant={plan.is_active ? "default" : "secondary"}>
                          {plan.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Domain and hosting orders history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">{order.order_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.client?.name}</p>
                          <p className="text-sm text-muted-foreground">{order.client?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.order_type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">AED {order.total_amount}</TableCell>
                      <TableCell>
                        <Badge variant={order.payment_status === "paid" ? "default" : "secondary"}>
                          {order.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.status === "completed" ? "default" : "outline"}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{format(new Date(order.created_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
