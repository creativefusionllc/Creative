"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HeroContentEditor from "@/components/admin/cms/content-editors/hero-editor"
import ServicesContentEditor from "@/components/admin/cms/content-editors/services-editor"
import TestimonialsContentEditor from "@/components/admin/cms/content-editors/testimonials-editor"
import PricingContentEditor from "@/components/admin/cms/content-editors/pricing-editor"
import AboutContentEditor from "@/components/admin/cms/content-editors/about-editor"
import ProcessContentEditor from "@/components/admin/cms/content-editors/process-editor"
import BlogContentEditor from "@/components/admin/cms/content-editors/blog-editor"
import FooterContentEditor from "@/components/admin/cms/content-editors/footer-editor"

export default function WebsiteContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Website Content Manager</h1>
        <p className="text-gray-500 mt-2">Edit all website content - every section, every line, fully customizable</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit your homepage hero section - headline, subheadline, CTA button</CardDescription>
            </CardHeader>
            <CardContent>
              <HeroContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Content</CardTitle>
              <CardDescription>Manage all 12 services - descriptions, features, sub-services, benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <ServicesContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Client Testimonials</CardTitle>
              <CardDescription>Add, edit, delete testimonials - quotes, ratings, client info</CardDescription>
            </CardHeader>
            <CardContent>
              <TestimonialsContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Packages</CardTitle>
              <CardDescription>Manage pricing tiers - packages, prices, features, buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Edit company about text, mission, values, team info</CardDescription>
            </CardHeader>
            <CardContent>
              <AboutContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process">
          <Card>
            <CardHeader>
              <CardTitle>Process Steps</CardTitle>
              <CardDescription>Edit your process workflow - steps, descriptions, icons</CardDescription>
            </CardHeader>
            <CardContent>
              <ProcessContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage blog content - articles, categories, featured images</CardDescription>
            </CardHeader>
            <CardContent>
              <BlogContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Content</CardTitle>
              <CardDescription>Edit footer - company info, links, social media, copyright</CardDescription>
            </CardHeader>
            <CardContent>
              <FooterContentEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
