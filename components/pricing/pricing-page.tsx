"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Crown, Zap, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Plan {
  id: string
  name: string
  slug: string
  description: string | null
  price_monthly: number
  price_yearly: number | null
  features: string[]
  is_popular: boolean
}

const planIcons: Record<string, React.ElementType> = {
  starter: Zap,
  professional: Star,
  business: Crown,
  enterprise: Rocket,
}

const planColors: Record<string, string> = {
  starter: "from-blue-500 to-cyan-500",
  professional: "from-purple-500 to-pink-500",
  business: "from-[#C4D600] to-green-500",
  enterprise: "from-orange-500 to-red-500",
}

export function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [isYearly, setIsYearly] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {
    const { data } = await supabase
      .from("subscription_plans")
      .select("id, name, slug, description, price_monthly, price_yearly, features, is_popular")
      .eq("is_active", true)
      .order("sort_order")
    if (data) setPlans(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-[#C4D600] text-black mb-4">Simple Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Flexible pricing options to scale with your business needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={!isYearly ? "font-semibold" : "text-gray-400"}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={isYearly ? "font-semibold" : "text-gray-400"}>
              Yearly <Badge className="ml-1 bg-green-500 text-white">Save 20%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 -mt-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4D600]"></div>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No subscription plans available yet</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = planIcons[plan.slug] || Star
                const gradientColor = planColors[plan.slug] || "from-gray-500 to-gray-600"
                const price = isYearly && plan.price_yearly ? plan.price_yearly / 12 : plan.price_monthly
                const totalPrice = isYearly && plan.price_yearly ? plan.price_yearly : plan.price_monthly * 12

                return (
                  <Card
                    key={plan.id}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.is_popular ? "border-2 border-[#C4D600] shadow-lg" : "border border-gray-200"
                    }`}
                  >
                    {plan.is_popular && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-none rounded-bl-lg bg-[#C4D600] text-black">Most Popular</Badge>
                      </div>
                    )}
                    <div className={`h-2 bg-gradient-to-r ${gradientColor}`} />
                    <CardHeader className="text-center pb-2">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-4`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      {plan.description && <p className="text-sm text-gray-500">{plan.description}</p>}
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">AED {Math.round(price).toLocaleString()}</span>
                          <span className="text-gray-500">/mo</span>
                        </div>
                        {isYearly && plan.price_yearly && (
                          <p className="text-sm text-gray-400 mt-1">AED {totalPrice.toLocaleString()} billed yearly</p>
                        )}
                      </div>

                      {plan.features && plan.features.length > 0 && (
                        <ul className="space-y-3 mb-6 text-left">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link href="/contact">
                        <Button
                          className={`w-full ${
                            plan.is_popular
                              ? "bg-[#C4D600] hover:bg-[#C4D600]/90 text-black"
                              : "bg-gray-900 hover:bg-gray-800 text-white"
                          }`}
                        >
                          Get Started
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ or CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Plan?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer custom enterprise solutions for large organizations with specific requirements
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#C4D600] text-black hover:bg-[#C4D600]/90">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
