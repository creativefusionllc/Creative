"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Code,
  Building2,
  MapPin,
  FileText,
  HelpCircle,
  Star,
  Calendar,
  ShoppingBag,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

const schemaTypes = [
  { id: "organization", name: "Organization", icon: Building2, description: "Business or company information" },
  { id: "localBusiness", name: "Local Business", icon: MapPin, description: "Local business with physical location" },
  { id: "article", name: "Article", icon: FileText, description: "Blog posts and news articles" },
  { id: "faq", name: "FAQ Page", icon: HelpCircle, description: "Frequently asked questions" },
  { id: "review", name: "Review", icon: Star, description: "Product or service reviews" },
  { id: "event", name: "Event", icon: Calendar, description: "Events and conferences" },
  { id: "product", name: "Product", icon: ShoppingBag, description: "E-commerce products" },
]

export function SchemaGenerator() {
  const [selectedType, setSelectedType] = useState("localBusiness")
  const [generatedSchema, setGeneratedSchema] = useState("")
  const [copied, setCopied] = useState(false)

  // Form states for Local Business
  const [businessForm, setBusinessForm] = useState({
    name: "Creative Fusion LLC",
    description: "Full-service creative and digital marketing agency",
    image: "https://creativefusion.ae/logo.png",
    telephone: "+971 50 123 4567",
    email: "info@creativefusion.ae",
    url: "https://creativefusion.ae",
    streetAddress: "Sharjah Media City (Shams)",
    addressLocality: "Sharjah",
    addressRegion: "Sharjah",
    postalCode: "12345",
    addressCountry: "AE",
    latitude: "25.3463",
    longitude: "55.4209",
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
  })

  // Form states for FAQ
  const [faqItems, setFaqItems] = useState([
    {
      question: "What services do you offer?",
      answer: "We offer digital marketing, branding, web development, and creative content services.",
    },
    { question: "Where are you located?", answer: "We are located in Sharjah Media City, UAE." },
  ])

  function generateSchema() {
    let schema: any = {}

    switch (selectedType) {
      case "localBusiness":
        schema = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: businessForm.name,
          description: businessForm.description,
          image: businessForm.image,
          telephone: businessForm.telephone,
          email: businessForm.email,
          url: businessForm.url,
          address: {
            "@type": "PostalAddress",
            streetAddress: businessForm.streetAddress,
            addressLocality: businessForm.addressLocality,
            addressRegion: businessForm.addressRegion,
            postalCode: businessForm.postalCode,
            addressCountry: businessForm.addressCountry,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: businessForm.latitude,
            longitude: businessForm.longitude,
          },
          priceRange: businessForm.priceRange,
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        }
        break

      case "faq":
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
        break

      case "organization":
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: businessForm.name,
          description: businessForm.description,
          url: businessForm.url,
          logo: businessForm.image,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: businessForm.telephone,
            contactType: "customer service",
            email: businessForm.email,
          },
          sameAs: [
            "https://facebook.com/creativefusion",
            "https://instagram.com/creativefusion",
            "https://linkedin.com/company/creativefusion",
          ],
        }
        break

      default:
        schema = { "@context": "https://schema.org", "@type": selectedType }
    }

    setGeneratedSchema(JSON.stringify(schema, null, 2))
  }

  function copySchema() {
    navigator.clipboard.writeText(generatedSchema)
    setCopied(true)
    toast.success("Schema copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  function addFaqItem() {
    setFaqItems([...faqItems, { question: "", answer: "" }])
  }

  function updateFaqItem(index: number, field: "question" | "answer", value: string) {
    const updated = [...faqItems]
    updated[index][field] = value
    setFaqItems(updated)
  }

  function removeFaqItem(index: number) {
    setFaqItems(faqItems.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            Schema Markup Generator
          </h1>
          <p className="text-gray-400 mt-1">Generate structured data for better search visibility</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          <Sparkles className="h-3 w-3 mr-1" />
          Schema.org
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schema Type Selection */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Schema Type</CardTitle>
            <CardDescription className="text-gray-400">Select the type of structured data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {schemaTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedType === type.id
                      ? "bg-[#C4D600]/10 border-[#C4D600] text-[#C4D600]"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">{type.name}</p>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Details</CardTitle>
            <CardDescription className="text-gray-400">Enter your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
            {selectedType === "localBusiness" || selectedType === "organization" ? (
              <>
                <div>
                  <Label className="text-gray-400">Business Name</Label>
                  <Input
                    value={businessForm.name}
                    onChange={(e) => setBusinessForm({ ...businessForm, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Description</Label>
                  <Textarea
                    value={businessForm.description}
                    onChange={(e) => setBusinessForm({ ...businessForm, description: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Website URL</Label>
                  <Input
                    value={businessForm.url}
                    onChange={(e) => setBusinessForm({ ...businessForm, url: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Phone</Label>
                  <Input
                    value={businessForm.telephone}
                    onChange={(e) => setBusinessForm({ ...businessForm, telephone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Email</Label>
                  <Input
                    value={businessForm.email}
                    onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                {selectedType === "localBusiness" && (
                  <>
                    <div>
                      <Label className="text-gray-400">Street Address</Label>
                      <Input
                        value={businessForm.streetAddress}
                        onChange={(e) => setBusinessForm({ ...businessForm, streetAddress: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-gray-400">City</Label>
                        <Input
                          value={businessForm.addressLocality}
                          onChange={(e) => setBusinessForm({ ...businessForm, addressLocality: e.target.value })}
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400">Country</Label>
                        <Input
                          value={businessForm.addressCountry}
                          onChange={(e) => setBusinessForm({ ...businessForm, addressCountry: e.target.value })}
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400">Price Range</Label>
                      <Select
                        value={businessForm.priceRange}
                        onValueChange={(v) => setBusinessForm({ ...businessForm, priceRange: v })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$">$ (Budget)</SelectItem>
                          <SelectItem value="$$">$$ (Moderate)</SelectItem>
                          <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                          <SelectItem value="$$$$">$$$$ (Luxury)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </>
            ) : selectedType === "faq" ? (
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-400">Question {i + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFaqItem(i)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                    <Input
                      value={item.question}
                      onChange={(e) => updateFaqItem(i, "question", e.target.value)}
                      placeholder="Enter question..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Label className="text-gray-400">Answer</Label>
                    <Textarea
                      value={item.answer}
                      onChange={(e) => updateFaqItem(i, "answer", e.target.value)}
                      placeholder="Enter answer..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addFaqItem}
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  + Add Question
                </Button>
              </div>
            ) : (
              <p className="text-gray-400">Schema type form coming soon...</p>
            )}

            <Button onClick={generateSchema} className="w-full bg-[#C4D600] text-black hover:bg-[#d4e600]">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Schema
            </Button>
          </CardContent>
        </Card>

        {/* Generated Schema */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Generated Schema</CardTitle>
                <CardDescription className="text-gray-400">Copy and paste into your website</CardDescription>
              </div>
              {generatedSchema && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySchema}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedSchema ? (
              <div className="bg-[#0a0a0a] rounded-lg p-4 overflow-auto max-h-[400px]">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  <code>{`<script type="application/ld+json">\n${generatedSchema}\n</script>`}</code>
                </pre>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Fill in the details and click Generate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
