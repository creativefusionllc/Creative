"use client"

import { Users, Briefcase, Award, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

export function StatsSection() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState([
    { icon: Briefcase, value: 0, label: "Projects Completed", suffix: "+" },
    { icon: Users, value: 0, label: "Active Clients", suffix: "+" },
    { icon: Award, value: 0, label: "Satisfied Clients", suffix: "%" },
    { icon: Target, value: 0, label: "Years Experience", suffix: "+" },
  ])
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    setMounted(true)

    async function fetchStats() {
      const supabase = createBrowserClient()

      const [projectsResult, clientsResult, portfolioResult] = await Promise.all([
        supabase.from("erp_projects").select("id", { count: "exact", head: true }),
        supabase.from("clients").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("portfolio").select("id", { count: "exact", head: true }),
      ])

      const projectsCount = (projectsResult.count || 0) + (portfolioResult.count || 0)
      const clientsCount = clientsResult.count || 0

      const realStats = [
        { icon: Briefcase, value: Math.max(projectsCount, 500), label: "Projects Completed", suffix: "+" },
        { icon: Users, value: Math.max(clientsCount, 200), label: "Active Clients", suffix: "+" },
        { icon: Award, value: 98, label: "Satisfied Clients", suffix: "%" },
        { icon: Target, value: 15, label: "Years Experience", suffix: "+" },
      ]

      setStats(realStats)

      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      realStats.forEach((stat, index) => {
        let currentStep = 0
        const increment = stat.value / steps

        const timer = setInterval(() => {
          currentStep++
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.min(Math.floor(increment * currentStep), stat.value)
            return newCounts
          })

          if (currentStep >= steps) {
            clearInterval(timer)
          }
        }, stepDuration)
      })
    }

    fetchStats()
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/best-agency-shape.png')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <p className="text-gray-500 font-medium tracking-wide uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Our Track Record
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Numbers That Speak
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#C4D600] mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Delivering excellence across every project for over 15 years
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#C4D600]/30"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#C4D600]/10 transition-colors duration-300">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-400 group-hover:text-[#C4D600] transition-colors" />
              </div>

              <div
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 ${index === 0 ? "text-[#C4D600]" : "text-gray-900"}`}
              >
                {mounted ? counts[index] : 0}
                {stat.suffix}
              </div>

              <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-600">{stat.label}</div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C4D600] rounded-b-xl sm:rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12">
          {/* 3x Average ROI - lighter brand color background */}
          <div className="bg-[#D4E157] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">3x</div>
            <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">Average ROI for Clients</div>
          </div>

          {/* 100% Project Delivery - same as 3x card color */}
          <div className="bg-[#D4E157] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">Project Delivery Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
