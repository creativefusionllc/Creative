"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function ServicesContentEditor() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("cms_services").select("*")

      if (data) setServices(data)
      setLoading(false)
    }

    fetchServices()
  }, [])

  const handleUpdateService = async (id, updatedService) => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("cms_services").update(updatedService).eq("id", id)

    setServices(services.map((s) => (s.id === id ? { ...s, ...updatedService } : s)))
  }

  if (loading) return <div>Loading services...</div>

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <div key={service.id} className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-lg">{service.name}</h3>
          <Textarea
            value={service.description || ""}
            onChange={(e) => handleUpdateService(service.id, { description: e.target.value })}
            placeholder="Service description"
            className="h-24"
          />
          <Button
            onClick={() => handleUpdateService(service.id, service)}
            className="bg-lime-500 text-black hover:bg-lime-600"
          >
            Update Service
          </Button>
        </div>
      ))}
    </div>
  )
}
