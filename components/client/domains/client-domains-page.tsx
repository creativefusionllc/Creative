"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Globe, Search, Plus, Settings, RefreshCw, Shield, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { format, differenceInDays } from "date-fns"

interface Domain {
  id: string
  domain_name: string
  status: string
  registration_date: string
  expiry_date: string
  auto_renew: boolean
  whois_privacy: boolean
  domain_lock: boolean
  tld?: {
    extension: string
    renewal_price: number
  }
}

interface ClientDomainsPageProps {
  domains: Domain[]
  clientId: string
}

export function ClientDomainsPage({ domains, clientId }: ClientDomainsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDomains = domains.filter((d) => d.domain_name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getStatusBadge = (status: string, expiryDate: string) => {
    const daysUntilExpiry = differenceInDays(new Date(expiryDate), new Date())

    if (status === "expired" || daysUntilExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>
    }
    if (daysUntilExpiry <= 30) {
      return <Badge className="bg-amber-500">Expiring Soon</Badge>
    }
    if (status === "active") {
      return <Badge className="bg-green-500">Active</Badge>
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  const getExpiryWarning = (expiryDate: string) => {
    const daysUntilExpiry = differenceInDays(new Date(expiryDate), new Date())

    if (daysUntilExpiry < 0) {
      return { color: "text-red-500", text: `Expired ${Math.abs(daysUntilExpiry)} days ago` }
    }
    if (daysUntilExpiry <= 7) {
      return { color: "text-red-500", text: `Expires in ${daysUntilExpiry} days` }
    }
    if (daysUntilExpiry <= 30) {
      return { color: "text-amber-500", text: `Expires in ${daysUntilExpiry} days` }
    }
    return { color: "text-muted-foreground", text: format(new Date(expiryDate), "MMM d, yyyy") }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Domains</h1>
          <p className="text-muted-foreground mt-1">Manage your domain names, DNS settings, and renewals</p>
        </div>
        <Link href="/services/domain-hosting/domain-registration">
          <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
            <Plus className="h-4 w-4 mr-2" />
            Register New Domain
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C4D600]/20 rounded-lg">
                <Globe className="h-5 w-5 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{domains.length}</p>
                <p className="text-sm text-muted-foreground">Total Domains</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{domains.filter((d) => d.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    domains.filter((d) => {
                      const days = differenceInDays(new Date(d.expiry_date), new Date())
                      return days > 0 && days <= 30
                    }).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{domains.filter((d) => d.auto_renew).length}</p>
                <p className="text-sm text-muted-foreground">Auto-Renew</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search domains..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Domains List */}
      {filteredDomains.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No domains found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Register your first domain to get started"}
            </p>
            <Link href="/services/domain-hosting/domain-registration">
              <Button className="bg-[#C4D600] hover:bg-[#a8b800] text-black">Register Domain</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredDomains.map((domain) => {
            const expiryInfo = getExpiryWarning(domain.expiry_date)

            return (
              <Card key={domain.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Domain Info */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#C4D600]/20 rounded-lg">
                        <Globe className="h-6 w-6 text-[#C4D600]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{domain.domain_name}</h3>
                          {getStatusBadge(domain.status, domain.expiry_date)}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className={expiryInfo.color}>{expiryInfo.text}</span>
                          </span>
                          {domain.whois_privacy && (
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              Privacy
                            </span>
                          )}
                          {domain.auto_renew && (
                            <span className="flex items-center gap-1">
                              <RefreshCw className="h-3 w-3" />
                              Auto-Renew
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/client/domains/${domain.id}/dns`}>
                          <Settings className="h-4 w-4 mr-1" />
                          DNS
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/client/domains/${domain.id}`}>Manage</Link>
                      </Button>
                      {domain.tld && (
                        <Button size="sm" className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                          Renew (AED {domain.tld.renewal_price})
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
