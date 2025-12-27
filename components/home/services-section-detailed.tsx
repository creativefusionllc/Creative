"use client"

import Link from "next/link"
import { Camera, Video, Palette, Code, TrendingUp, MessageSquare, Settings, Briefcase, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    icon: Camera,
    category: "Creative & Design",
    title: "Photography Services",
    description:
      "At Creative Fusion LLC, we know that a picture is worth a thousand words. Our photography team combines artistic vision with state-of-the-art technology to capture moments that tell your story, showcase your brand, and make a lasting impression.",
    equipment: "Sony Alpha 7R V paired with Sony G Master Lens Collection and Z Distortion Lenses",
    subservices: [
      "Real Estate Photography - High-resolution, wide-angle shots with minimal distortion",
      "Corporate & Commercial Photography - Professional portraits and office environment shots",
      "Wedding Photography - Cinematic and emotive captures for timeless memories",
      "Product Photography - High-quality images for e-commerce and catalogs",
      "Event Photography - Dynamic coverage of parties, conferences, and launches",
      "Medical Aesthetic Clinic Photography - Detailed imagery for medical marketing",
      "Micro & Iris Photography - Extreme close-ups with specialized macro lenses",
      "360-Degree Photography - Immersive visuals for virtual tours",
    ],
    benefits: [
      "Expert photographers",
      "Premium Sony gear & G Master lenses",
      "Pro lighting setups",
      "Fast & reliable service",
    ],
  },
  {
    id: 2,
    icon: Video,
    category: "Creative & Design",
    title: "Premium Videography",
    description:
      "We believe video is one of the most powerful ways to tell your story, build your brand, and create lasting connections. Our talented team combines creative vision with cutting-edge technology, including AI-powered editing, to deliver stunning, high-impact videos.",
    equipment: "Sony Alpha 7R V with Sony G Master Lens Collection, Z Distortion Lenses, and Insta360 cameras",
    subservices: [
      "Corporate Videos - Polished videos highlighting company culture and services",
      "Real Estate & Property Tours - Immersive walkthroughs with aerial shots and 360° tours",
      "Event Coverage - Weddings, parties, corporate events, and product launches",
      "Wedding Videography - Cinematic storytelling with elegance and authenticity",
      "Product Videos & Commercials - Engaging videos for brand visibility",
      "Promotional & Social Media Videos - Short clips optimized for engagement",
      "Documentaries & Storytelling - Authentic narratives that connect deeply",
      "Sports & Action Videos - Dynamic coverage with specialized stabilization",
      "Medical Aesthetic Clinic Videography - Professional medical procedure showcases",
      "Micro & Iris Videography - High-definition close-ups with precision",
    ],
    benefits: ["AI-powered editing", "Cinematic quality", "Drone footage included", "Fast turnaround"],
  },
  {
    id: 3,
    icon: Palette,
    category: "Creative & Design",
    title: "Graphic & Visual Design",
    description:
      "Transform your brand narrative into high-impact visual media—from compelling graphics to motion animations that captivate your audience and build lasting brand recognition.",
    subservices: [
      "Brand Identity & Corporate Design - Complete visual identity systems",
      "Social Media Content & Design - Engaging posts and story templates",
      "Animation & Motion Graphics - Dynamic animated content",
      "UI/UX Design & Digital Experience - User-centered interface design",
      "Visual Design Systems - Consistent brand guidelines",
      "Marketing Collateral - Brochures, flyers, and promotional materials",
    ],
    benefits: ["Creative excellence", "Brand consistency", "Multi-format output", "Unlimited revisions"],
  },
  {
    id: 4,
    icon: Code,
    category: "Digital & Software",
    title: "Website Design & Development",
    description:
      "Your website is the digital face of your brand. We specialize in creating visually stunning, highly functional, and user-friendly websites that captivate your audience and drive business growth.",
    subservices: [
      "Corporate Websites - Clean, professional, brand-aligned websites",
      "E-commerce Platforms - Secure online stores with streamlined checkout",
      "Custom Web Applications - Tailored solutions for specific business needs",
      "Landing Pages - High-converting pages for marketing campaigns",
      "Portfolio Websites - Creative displays for artists and professionals",
      "Blog & CMS - Easy-to-manage WordPress and Shopify sites",
    ],
    technologies: [
      "Front-end: HTML5, CSS3, JavaScript, React, Angular, Vue.js",
      "Back-end: PHP, Node.js, Python, Laravel, Django",
      "CMS: WordPress, Shopify, Joomla, Drupal",
      "Database: MySQL, MongoDB, PostgreSQL",
      "SEO & Analytics: Google Analytics, SEO Tools, Yoast SEO",
    ],
    benefits: ["Fast load times", "Mobile responsive", "Top-notch security", "SEO optimized"],
  },
  {
    id: 5,
    icon: Settings,
    category: "Digital & Software",
    title: "Custom Software & ERP Solutions",
    description:
      "Developing custom, scalable software solutions and enterprise applications that automate business processes, enhance service delivery, and drive operational efficiency.",
    subservices: [
      "Mobile App Development - Native & cross-platform applications",
      "Custom Software Development - Bespoke solutions for unique needs",
      "ERP Solutions & Business Software - Complete enterprise resource planning",
      "Enterprise & CRM Integration - Seamless system connectivity",
      "Cloud Computing - IaaS, PaaS, SaaS solutions",
      "AI & Machine Learning Solutions - Intelligent automation",
      "Cybersecurity Services - Comprehensive security frameworks",
      "Business Intelligence & Big Data - Data-driven insights",
    ],
    benefits: ["Scalable architecture", "Future-proof technology", "24/7 support", "Cloud-ready"],
  },
  {
    id: 6,
    icon: TrendingUp,
    category: "Marketing & Advertising",
    title: "Digital Marketing",
    description:
      "Focusing on targeted paid media and search optimization to drive immediate traffic, generate qualified leads, and maximize advertising return with measurable ROI.",
    subservices: [
      "Search Engine Optimization (SEO) - Organic visibility growth",
      "SEM / PPC Advertising - Paid search campaigns",
      "Social Media Marketing - Multi-platform engagement",
      "Content Marketing - Strategic content creation",
      "Email Marketing - Automated campaigns",
      "Influencer & UGC Campaigns - Authentic partnerships",
      "Media Planning & Buying - Strategic ad placement",
    ],
    benefits: ["ROI-driven results", "Data analytics", "Lead generation", "Performance tracking"],
  },
  {
    id: 7,
    icon: MessageSquare,
    category: "Marketing & Advertising",
    title: "WhatsApp Marketing",
    description:
      "Direct, personalized communication with your customers through WhatsApp Business API, enabling automated messages, customer support, and targeted campaigns.",
    subservices: [
      "WhatsApp Business API Integration",
      "Automated Customer Support",
      "Broadcast Campaigns",
      "Chatbot Development",
      "Lead Qualification",
      "Order Updates & Notifications",
    ],
    benefits: ["98% open rate", "Instant engagement", "Automation ready", "CRM integration"],
  },
  {
    id: 8,
    icon: Briefcase,
    category: "Strategy & Consultancy",
    title: "Business & Marketing Consulting",
    description:
      "Strategic advisory services to optimize operations, eliminate friction points, and ensure future-proof technological alignment with your business goals.",
    subservices: [
      "Digital Transformation Roadmapping",
      "Marketing Strategy & Campaign Planning",
      "Brand Strategy & Identity Positioning",
      "Business & Operations Consulting",
      "IT/Technology Consulting",
      "Integrated Communications Consultancy",
    ],
    benefits: ["Expert advisors", "Strategic insights", "Growth planning", "Process optimization"],
  },
]

export function ServicesDetailedSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Creative & Digital Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            From premium photography to enterprise software, we deliver end-to-end services that elevate your brand and
            accelerate growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#C4D600] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 bg-[#C4D600]/10 rounded-xl flex items-center justify-center shrink-0">
                  <service.icon className="h-7 w-7 text-[#C4D600]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#C4D600] uppercase tracking-wide mb-1">
                    {service.category}
                  </p>
                  <h3 className="font-bold text-xl text-gray-900 leading-tight">{service.title}</h3>
                </div>
              </div>

              <div className="h-[2px] w-16 bg-[#C4D600] mb-5" />

              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

              {service.equipment && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Equipment:</p>
                  <p className="text-sm text-gray-700">{service.equipment}</p>
                </div>
              )}

              {service.technologies && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Technologies:</p>
                  <div className="space-y-1.5">
                    {service.technologies.map((tech, idx) => (
                      <p key={idx} className="text-xs text-gray-600 pl-3 border-l-2 border-[#C4D600]">
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Services Include:</p>
                <ul className="space-y-2">
                  {service.subservices.slice(0, 6).map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-[#C4D600] shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
                {service.subservices.length > 6 && (
                  <p className="text-xs text-gray-500 mt-2 ml-6">+ {service.subservices.length - 6} more services</p>
                )}
              </div>

              {service.benefits && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#C4D600]/10 text-[#C4D600] text-xs font-medium rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="gap-2 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold px-8" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
