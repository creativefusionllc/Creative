"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle2, Download } from "lucide-react"

export function AppSetupChecklist() {
  const [steps, setSteps] = useState([
    { id: 1, title: "Create Google Play Console Account", completed: false, link: "https://play.google.com/console" },
    { id: 2, title: "Create Android App Project", completed: false, link: "https://play.google.com/console" },
    {
      id: 3,
      title: "Get Android Package Name",
      completed: false,
      hint: "From Google Play Console → App → App information",
    },
    {
      id: 4,
      title: "Create Apple App Store Connect Account",
      completed: false,
      link: "https://appstoreconnect.apple.com",
    },
    { id: 5, title: "Create iOS App Project", completed: false, link: "https://appstoreconnect.apple.com" },
    { id: 6, title: "Get iOS App Store ID", completed: false, hint: "From App Store Connect → Apps → App ID" },
    { id: 7, title: "Input App IDs in Admin Settings", completed: false, hint: "Admin → Settings → Mobile Apps" },
    { id: 8, title: "Test Download Links", completed: false, hint: "Open website on Android & iOS devices" },
  ])

  const toggleStep = (id: number) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))
  }

  const completedCount = steps.filter((s) => s.completed).length
  const progress = Math.round((completedCount / steps.length) * 100)

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-lime-50 to-yellow-50 border-lime-200">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-6 h-6 text-lime-600" />
          <h2 className="text-2xl font-bold text-lime-900">Mobile App Setup Checklist</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-lime-700 font-medium">
              Progress: {completedCount}/{steps.length} steps
            </span>
            <span className="text-lime-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-lime-200 rounded-full h-2">
            <div className="bg-lime-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {steps.map((step) => (
          <Card
            key={step.id}
            className={`p-4 transition-all ${step.completed ? "bg-green-50 border-green-200" : "bg-white"}`}
          >
            <div className="flex items-start gap-4">
              <Checkbox checked={step.completed} onCheckedChange={() => toggleStep(step.id)} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {step.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  <h3 className={`font-medium ${step.completed ? "text-green-700 line-through" : "text-gray-900"}`}>
                    {step.id}. {step.title}
                  </h3>
                </div>
                {step.hint && (
                  <p className="text-sm text-gray-600 mt-1 ml-7">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    {step.hint}
                  </p>
                )}
              </div>
              {step.link && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(step.link, "_blank")}
                  className="whitespace-nowrap"
                >
                  Visit
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>How it works:</strong> Once you complete all steps and input your app IDs in Admin Settings, your
          website will automatically show the "Download App" button to Android and iOS users. They'll be redirected to
          your app in Google Play Store or Apple App Store.
        </p>
      </Card>
    </div>
  )
}
