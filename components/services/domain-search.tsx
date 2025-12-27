"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Check, X, ShoppingCart, Loader2 } from "lucide-react"

interface TLD {
  extension: string
  registration_price: number
  is_popular: boolean
}

interface DomainSearchProps {
  tlds: TLD[]
}

export function DomainSearch({ tlds }: DomainSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<{ domain: string; available: boolean; price: number }[]>([])
  const [cart, setCart] = useState<string[]>([])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate domain availability check
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const domainName = searchQuery.toLowerCase().replace(/[^a-z0-9-]/g, "")

    const searchResults = tlds.slice(0, 8).map((tld) => ({
      domain: `${domainName}${tld.extension}`,
      available: Math.random() > 0.3, // Simulated availability
      price: tld.registration_price,
    }))

    setResults(searchResults)
    setIsSearching(false)
  }

  const addToCart = (domain: string) => {
    if (!cart.includes(domain)) {
      setCart([...cart, domain])
    }
  }

  const removeFromCart = (domain: string) => {
    setCart(cart.filter((d) => d !== domain))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Box */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter your domain name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-14 text-lg pl-12 bg-white text-black"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="h-14 px-8 bg-[#C4D600] hover:bg-[#a8b800] text-black text-lg font-semibold"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>

          {/* Popular TLDs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tlds
              .filter((t) => t.is_popular)
              .slice(0, 6)
              .map((tld) => (
                <Badge
                  key={tld.extension}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 cursor-pointer px-3 py-1"
                >
                  {tld.extension} - AED {tld.registration_price}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((result) => (
            <Card
              key={result.domain}
              className={`transition-all ${
                result.available ? "bg-white border-green-200 hover:border-green-400" : "bg-gray-50 border-gray-200"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${result.available ? "bg-green-100" : "bg-red-100"}`}>
                    {result.available ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-black">{result.domain}</p>
                    <p className={`text-sm ${result.available ? "text-green-600" : "text-red-600"}`}>
                      {result.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>

                {result.available && (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">AED {result.price}</p>
                      <p className="text-sm text-gray-500">/year</p>
                    </div>
                    {cart.includes(result.domain) ? (
                      <Button
                        variant="outline"
                        onClick={() => removeFromCart(result.domain)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={() => addToCart(result.domain)}
                        className="bg-[#C4D600] hover:bg-[#a8b800] text-black"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="mt-6 bg-[#C4D600] text-black">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{cart.length} domain(s) in cart</p>
              <p className="text-sm">{cart.join(", ")}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">Proceed to Checkout</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
