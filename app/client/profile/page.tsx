"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientLayout } from "@/components/client/client-layout"
import { AddFundsDialog } from "@/components/client/add-funds-dialog"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  User,
  Lock,
  Building2,
  Phone,
  Mail,
  Hash,
  Gift,
  Copy,
  Clock,
  XCircle,
  Upload,
  X,
  Briefcase,
  DollarSign,
  ImageIcon,
  Camera,
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  company_name: string
  phone: string
  client_number?: string
  referral_code?: string
  wallet_balance?: number
  points_balance?: number
  client_type?: string
  avatar_url?: string
  bio?: string
  skills?: string[]
  portfolio_images?: string[]
  hourly_rate?: number
  availability?: string
}

export default function ClientProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [copied, setCopied] = useState(false)
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([])

  // Profile fields
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [availability, setAvailability] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([])
  const [avatarPreview, setAvatarPreview] = useState("")
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([])

  // Password fields
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/login"
      return
    }

    let { data: clientData } = await supabase.from("clients").select("*").eq("user_id", user.id).maybeSingle()

    if (!clientData) {
      const { data: newClient } = await supabase
        .from("clients")
        .insert({
          user_id: user.id,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "Client",
          email: user.email || "",
          company_name: user.user_metadata?.company || "",
          phone: user.user_metadata?.phone || "",
          wallet_balance: 0,
          points_balance: 0,
          client_type: "client",
        })
        .select()
        .single()

      if (newClient) {
        clientData = newClient
      }
    }

    const profileData: UserProfile = {
      id: user.id,
      email: user.email || "",
      full_name: clientData?.name || "",
      company_name: clientData?.company_name || "",
      phone: clientData?.phone || "",
      client_number: clientData?.client_number,
      referral_code: clientData?.referral_code,
      wallet_balance: clientData?.wallet_balance,
      points_balance: clientData?.points_balance,
      client_type: clientData?.client_type || "client",
      avatar_url: clientData?.avatar_url,
      bio: clientData?.bio,
      skills: clientData?.skills || [],
      portfolio_images: clientData?.portfolio_images || [],
      hourly_rate: clientData?.hourly_rate,
      availability: clientData?.availability,
    }

    setProfile(profileData)
    setFullName(profileData.full_name)
    setCompanyName(profileData.company_name)
    setPhone(profileData.phone)
    setBio(profileData.bio || "")
    setSkills(profileData.skills || [])
    setHourlyRate(profileData.hourly_rate?.toString() || "")
    setAvailability(profileData.availability || "")
    setAvatarPreview(profileData.avatar_url || "")
    setPortfolioPreviews(profileData.portfolio_images || [])

    await fetchPendingTransactions(clientData?.id)
    setLoading(false)
  }

  async function fetchPendingTransactions(clientId: string) {
    if (!clientId) return

    const { data } = await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("client_id", clientId)
      .in("verification_status", ["pending_verification", "rejected"])
      .order("created_at", { ascending: false })

    setPendingTransactions(data || [])
  }

  function copyReferralCode() {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handlePortfolioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setPortfolioFiles((prev) => [...prev, ...files])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolioPreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  function removePortfolioImage(index: number) {
    setPortfolioPreviews((prev) => prev.filter((_, i) => i !== index))
    setPortfolioFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill))
  }

  async function uploadFile(file: File, path: string): Promise<string | null> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return null
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

    return data.publicUrl
  }

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSaving(true)

    try {
      let avatarUrl = avatarPreview
      let portfolioUrls = portfolioPreviews

      if (avatarFile) {
        const url = await uploadFile(avatarFile, "avatars")
        if (url) {
          avatarUrl = url
          setAvatarFile(null) // Clear after upload
        }
      }

      // Upload portfolio images if new files
      if (portfolioFiles.length > 0) {
        const uploadedUrls = await Promise.all(portfolioFiles.map((file) => uploadFile(file, "portfolio")))
        portfolioUrls = [
          ...portfolioPreviews.filter((url) => url.startsWith("http")),
          ...(uploadedUrls.filter((url) => url !== null) as string[]),
        ]
        setPortfolioFiles([]) // Clear after upload
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { error: updateError } = await supabase
          .from("clients")
          .update({
            name: fullName,
            company_name: companyName,
            phone: phone,
            avatar_url: avatarUrl || null, // Ensure avatar_url is saved
            bio: bio,
            skills: skills,
            portfolio_images: portfolioUrls,
            hourly_rate: hourlyRate ? Number.parseFloat(hourlyRate) : null,
            availability: availability,
          })
          .eq("user_id", user.id)

        if (updateError) {
          setError("Failed to save profile: " + updateError.message)
          setSaving(false)
          return
        }
      }

      setSuccess("Profile updated successfully!")
      await loadProfile()
    } catch (err) {
      setError("Failed to update profile")
      console.error(err)
    }

    setSaving(false)
    setTimeout(() => setSuccess(""), 3000)
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    setChangingPassword(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: profile?.email || "",
      password: currentPassword,
    })

    if (signInError) {
      setPasswordError("Current password is incorrect")
      setChangingPassword(false)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      setPasswordError(updateError.message)
      setChangingPassword(false)
      return
    }

    setPasswordSuccess("Password changed successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setChangingPassword(false)

    setTimeout(() => setPasswordSuccess(""), 3000)
  }

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your account settings and portfolio</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={profile?.client_type === "freelancer" ? "default" : "secondary"}>
              {profile?.client_type?.toUpperCase()}
            </Badge>
            <AddFundsDialog clientId={profile?.id || ""} onSuccess={loadProfile} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 flex items-center justify-center">
                  <Hash className="h-5 w-5 text-[#C4D600]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Number</p>
                  <p className="font-mono font-bold text-gray-900">{profile?.client_number || "Loading..."}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Referral Code</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-gray-900">{profile?.referral_code || "Loading..."}</p>
                    <Button size="sm" variant="ghost" onClick={copyReferralCode} className="h-6 px-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Rewards</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Wallet</p>
                    <p className="font-bold text-gray-900">AED {profile?.wallet_balance?.toFixed(2) || "0.00"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Points</p>
                    <p className="font-bold text-gray-900">{profile?.points_balance || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {pendingTransactions.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Payment Verifications
              </CardTitle>
              <CardDescription>Your payment submissions pending admin verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTransactions.map((tx) => (
                  <div key={tx.id} className="bg-white rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-gray-900">AED {tx.amount.toFixed(2)}</p>
                          {tx.verification_status === "pending_verification" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </span>
                          )}
                          {tx.verification_status === "rejected" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Method:</span>{" "}
                            {tx.payment_method?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </p>
                          <p>
                            <span className="font-medium">Submitted:</span>{" "}
                            {new Date(tx.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {tx.rejection_reason && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                              <p className="text-xs font-medium text-red-900">Rejection Reason:</p>
                              <p className="text-xs text-red-700 mt-1">{tx.rejection_reason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-[#141414] border border-white/10">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            {(profile?.client_type === "freelancer" || profile?.client_type === "agent") && (
              <TabsTrigger
                value="portfolio"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
              >
                <Briefcase className="h-4 w-4" />
                Portfolio
              </TabsTrigger>
            )}
            <TabsTrigger
              value="security"
              className="flex items-center gap-2 text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal and company details</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{success}</p>
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Avatar Upload */}
                  <div>
                    <Label>Profile Picture</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview || "/placeholder.svg"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("avatar")?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="mt-1.5 bg-gray-50"
                      />
                      <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your Company"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="mt-1.5"
                      />
                    </div>

                    {(profile?.client_type === "freelancer" || profile?.client_type === "agent") && (
                      <>
                        <div>
                          <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            Hourly Rate (AED)
                          </Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="150"
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="availability">Availability</Label>
                          <Input
                            id="availability"
                            type="text"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            placeholder="Full-time, Part-time, etc."
                            className="mt-1.5"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="mt-1.5"
                    />
                  </div>

                  {(profile?.client_type === "freelancer" || profile?.client_type === "agent") && (
                    <div>
                      <Label>Skills</Label>
                      <div className="mt-2 flex flex-wrap gap-2 mb-3">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" onClick={addSkill} variant="outline">
                          Add
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button type="submit" disabled={saving} className="bg-[#C4D600] hover:bg-[#a8b800] text-black">
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {(profile?.client_type === "freelancer" || profile?.client_type === "agent") && (
            <TabsContent value="portfolio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your work and projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Portfolio Images</Label>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolioPreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
                          >
                            <img
                              src={preview || "/placeholder.svg"}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePortfolioImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-[#C4D600] transition-colors cursor-pointer">
                          <input
                            type="file"
                            id="portfolio"
                            accept="image/*"
                            multiple
                            onChange={handlePortfolioChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById("portfolio")?.click()}
                            className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#C4D600]"
                          >
                            <ImageIcon className="h-8 w-8" />
                            <span className="text-sm">Add Images</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      className="bg-[#C4D600] hover:bg-[#a8b800] text-black"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Update Portfolio"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                {passwordError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{passwordSuccess}</p>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="currentPassword"
                        type={showPasswords ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={changingPassword}
                      className="bg-[#C4D600] hover:bg-[#a8b800] text-black"
                    >
                      {changingPassword ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Changing...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
