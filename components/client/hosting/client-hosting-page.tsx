"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Shield, Mail, Plus, ExternalLink, Clock, HardDrive } from "lucide-react"
import { format } from "date-fns"

interface ClientHostingPageProps {
  hosting: any[]
  ssl: any[]
  email: any[]
  clientId: string
}

export function ClientHostingPage({ hosting, ssl, email, clientId }: ClientHostingPageProps) {
  const [activeTab, setActiveTab] = useState("hosting")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Hosting Services</h1>
          <p className="text-muted-foreground mt-1">Manage your web hosting, SSL certificates, and email services</p>
        </div>
        <Link href="/services/domain-hosting">
          <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="hosting" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Web Hosting ({hosting.length})
          </TabsTrigger>
          <TabsTrigger value="ssl" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            SSL Certificates ({ssl.length})
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Hosting ({email.length})
          </TabsTrigger>
        </TabsList>

        {/* Web Hosting Tab */}
        <TabsContent value="hosting">
          {hosting.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hosting services</h3>
                <p className="text-muted-foreground mb-4">Get reliable web hosting for your websites</p>
                <Link href="/services/domain-hosting/web-hosting">
                  <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">Browse Hosting Plans</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {hosting.map((h) => (
                <Card key={h.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                          <Server className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{h.plan?.name || "Hosting Plan"}</h3>
                            {getStatusBadge(h.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {h.domain?.domain_name || "No domain linked"}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Expires: {format(new Date(h.expiry_date), "MMM d, yyyy")}
                            </span>
                            {h.disk_used && (
                              <span className="flex items-center gap-1">
                                <HardDrive className="h-3 w-3" />
                                {h.disk_used} used
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {h.cpanel_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={h.cpanel_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              cPanel
                            </a>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/client/hosting/${h.id}`}>Manage</Link>
                        </Button>
                        <Button size="sm" className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* SSL Tab */}
        <TabsContent value="ssl">
          {ssl.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No SSL certificates</h3>
                <p className="text-muted-foreground mb-4">Secure your websites with SSL certificates</p>
                <Link href="/services/domain-hosting/ssl-certificates">
                  <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">Browse SSL Certificates</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {ssl.map((s) => (
                <Card key={s.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <Shield className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{s.certificate?.name}</h3>
                            {getStatusBadge(s.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{s.common_name || s.domain?.domain_name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Provider: {s.certificate?.provider} | Expires:{" "}
                            {format(new Date(s.expiry_date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/client/ssl/${s.id}`}>Manage</Link>
                        </Button>
                        <Button size="sm" className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email">
          {email.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No email hosting</h3>
                <p className="text-muted-foreground mb-4">Get professional email for your domain</p>
                <Link href="/services/domain-hosting/email-hosting">
                  <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">Browse Email Plans</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {email.map((e) => (
                <Card key={e.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <Mail className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{e.plan?.name}</h3>
                            {getStatusBadge(e.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {e.domain?.domain_name} | {e.total_accounts} accounts
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Provider: {e.plan?.provider} | Expires: {format(new Date(e.expiry_date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/client/email/${e.id}`}>Manage</Link>
                        </Button>
                        <Button size="sm" className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
