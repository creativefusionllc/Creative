"use client"
import { Linkedin } from "lucide-react"

const team = [
  {
    name: "Fatima Al-Hassan",
    role: "Creative Director",
    image: "/professional-female-creative-director-portrait-bus.jpg",
  },
  {
    name: "Omar Khan",
    role: "Lead Cinematographer",
    image: "/professional-male-cinematographer-portrait-camera.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Digital Marketing Lead",
    image: "/professional-female-marketing-manager-portrait-bus.jpg",
  },
  {
    name: "Ahmed Malik",
    role: "Senior Developer",
    image: "/professional-male-software-developer-portrait-offi.jpg",
  },
]

export function TeamSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#C4D600] rounded-full" />
            <span className="text-[#1C1C1C] text-sm font-medium">Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6">
            The Creative <span className="text-[#C4D600]">Minds</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team of experts brings together years of experience in media production, digital marketing, and
            creative design.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#1C1C1C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href="#"
                    className="p-3 bg-[#C4D600] rounded-xl text-[#1C1C1C] hover:bg-[#b0c200] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1C1C1C]/80 to-transparent" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1C]">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-600">Want to join our team? We're always looking for talented individuals.</p>
            <a href="/careers" className="text-[#C4D600] font-semibold hover:underline whitespace-nowrap">
              View Openings →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
