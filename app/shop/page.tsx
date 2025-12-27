import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingBag, Package, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop | Creative Products & Merchandise",
  description:
    "Browse Creative Fusion LLC products including branded merchandise, gift items, and promotional materials.",
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#C4D600]" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our online shop is currently under development. Soon you'll be able to purchase branded merchandise, gift
              items, and promotional products directly from our website.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center p-6">
              <Package className="w-12 h-12 mx-auto mb-4 text-[#C4D600]" />
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium branded merchandise and promotional items</p>
            </div>
            <div className="text-center p-6">
              <Truck className="w-12 h-12 mx-auto mb-4 text-[#C4D600]" />
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across UAE and GCC</p>
            </div>
            <div className="text-center p-6">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-[#C4D600]" />
              <h3 className="font-bold text-lg mb-2">Custom Orders</h3>
              <p className="text-gray-600">Personalized products for your business needs</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Need branded merchandise or promotional items now?</p>
            <Link
              href="/contact"
              className="inline-block bg-[#C4D600] text-[#1C1C1C] px-8 py-3 rounded-lg font-semibold hover:bg-[#a8b500] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
