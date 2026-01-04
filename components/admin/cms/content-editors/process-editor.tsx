"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function ProcessContentEditor() {
  const [processes, setProcesses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProcesses = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "process").single()

      if (data) setProcesses(data.content || [])
      setLoading(false)
    }

    fetchProcesses()
  }, [])

  const handleAddProcess = () => {
    setProcesses([...processes, { step: processes.length + 1, title: "", description: "" }])
  }

  const handleUpdateProcess = (index, updated) => {
    const newProcesses = [...processes]
    newProcesses[index] = updated
    setProcesses(newProcesses)
  }

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "process",
      content: processes,
      is_published: true,
    })
  }

  if (loading) return <div>Loading process steps...</div>

  return (
    <div className="space-y-6">
      {processes.map((process, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Input
            value={process.title || ""}
            onChange={(e) => handleUpdateProcess(index, { ...process, title: e.target.value })}
            placeholder="Step title"
          />
          <Textarea
            value={process.description || ""}
            onChange={(e) => handleUpdateProcess(index, { ...process, description: e.target.value })}
            placeholder="Step description"
            className="h-20"
          />
        </div>
      ))}
      <Button onClick={handleAddProcess} className="bg-lime-500 text-black hover:bg-lime-600">
        Add Process Step
      </Button>
      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save Process
      </Button>
    </div>
  )
}
