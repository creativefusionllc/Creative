"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { generateCaptcha, type CaptchaChallenge } from "@/lib/security/captcha"

interface CaptchaInputProps {
  onVerify: (isValid: boolean) => void
  value: string
  onChange: (value: string) => void
}

export function CaptchaInput({ onVerify, value, onChange }: CaptchaInputProps) {
  const [challenge, setChallenge] = useState<CaptchaChallenge>({ question: "", answer: 0 })

  useEffect(() => {
    refreshCaptcha()
  }, [])

  const refreshCaptcha = () => {
    const newChallenge = generateCaptcha()
    setChallenge(newChallenge)
    onChange("")
    onVerify(false)
  }

  const handleChange = (newValue: string) => {
    onChange(newValue)
    if (newValue) {
      const isValid = Number.parseInt(newValue) === challenge.answer
      onVerify(isValid)
    } else {
      onVerify(false)
    }
  }

  return (
    <div>
      <Label htmlFor="captcha" className="text-gray-700 flex items-center justify-between">
        <span>Security Check *</span>
        <Button type="button" variant="ghost" size="sm" onClick={refreshCaptcha} className="h-6 px-2 text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          New question
        </Button>
      </Label>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 font-mono text-lg font-semibold text-gray-800">
          {challenge.question}
        </div>
        <Input
          id="captcha"
          type="number"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="?"
          required
          className="w-24 text-center font-semibold text-lg"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Solve the math problem to verify you're human</p>
    </div>
  )
}
