"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Gift, Star, TrendingUp, ArrowUpRight, ArrowDownLeft, Sparkles } from "lucide-react"

interface Transaction {
  id: string
  type: string
  points: number
  balance_after: number
  description: string
  reference_type: string
  created_at: string
}

interface PointsManagementProps {
  clientId: string
  balance: number
  transactions: Transaction[]
}

const rewardTiers = [
  { points: 500, reward: "5% discount on next booking", value: 5 },
  { points: 1000, reward: "10% discount on next booking", value: 10 },
  { points: 2500, reward: "Free consultation session", value: 25 },
  { points: 5000, reward: "AED 250 wallet credit", value: 250 },
  { points: 10000, reward: "AED 500 wallet credit + VIP status", value: 500 },
]

export function PointsManagement({ clientId, balance, transactions }: PointsManagementProps) {
  const [showRedeem, setShowRedeem] = useState(false)

  const earnRate = "1 point per AED 10 spent"
  const nextTier = rewardTiers.find((t) => t.points > balance) || rewardTiers[rewardTiers.length - 1]
  const progressToNext = nextTier ? (balance / nextTier.points) * 100 : 100

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Points & Rewards</h1>
        <p className="text-gray-600">Earn points on every booking and redeem for rewards.</p>
      </div>

      {/* Points Balance Card */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-1">Points Balance</p>
            <p className="text-4xl font-bold">{balance.toLocaleString()}</p>
            <p className="text-sm opacity-80 mt-2">Earn rate: {earnRate}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="h-8 w-8" />
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && balance < nextTier.points && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress to next reward</span>
              <span>{nextTier.points - balance} pts to go</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
            <p className="text-xs mt-2 opacity-80">Next reward: {nextTier.reward}</p>
          </div>
        )}
      </div>

      {/* How to Earn */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#C4D600]" />
          How to Earn Points
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="font-bold text-2xl text-[#C4D600] mb-1">1 pt</p>
            <p className="text-sm text-gray-600">Per AED 10 spent on bookings</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="font-bold text-2xl text-[#C4D600] mb-1">50 pts</p>
            <p className="text-sm text-gray-600">For referring a new client</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="font-bold text-2xl text-[#C4D600] mb-1">2x pts</p>
            <p className="text-sm text-gray-600">During promotional campaigns</p>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#C4D600]" />
          Rewards Catalog
        </h2>
        <div className="space-y-3">
          {rewardTiers.map((tier, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 flex items-center justify-between ${
                balance >= tier.points ? "border-[#C4D600] bg-[#C4D600]/5" : "border-gray-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    balance >= tier.points ? "bg-[#C4D600] text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tier.reward}</p>
                  <p className="text-sm text-gray-500">{tier.points.toLocaleString()} points</p>
                </div>
              </div>
              {balance >= tier.points ? (
                <Button size="sm" className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                  Redeem
                </Button>
              ) : (
                <span className="text-sm text-gray-400">{(tier.points - balance).toLocaleString()} more needed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-900">Points History</h2>
        </div>

        {transactions.length > 0 ? (
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "earned" || tx.type === "bonus" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {tx.type === "earned" || tx.type === "bonus" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.created_at).toLocaleDateString()} • {tx.reference_type}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    tx.type === "earned" || tx.type === "bonus" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "earned" || tx.type === "bonus" ? "+" : "-"}
                  {Math.abs(tx.points)} pts
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No points history yet</p>
            <p className="text-sm text-gray-400 mt-1">Make a booking to start earning!</p>
          </div>
        )}
      </div>
    </div>
  )
}
