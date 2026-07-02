"use client"

import { Palette, Printer, Gift, PartyPopper, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const services = [
  {
    icon: Palette,
    title: "Design Graphique",
    description: "Logos, identité visuelle, flyers, affiches et bien plus encore.",
    image: "/images/works/branding-kit.jpg",
    color: "#1eb3e7",
    link: "/portfolio?category=Design%20graphique"
  },
  {
    icon: Printer,
    title: "Impression",
    description: "Impression haute qualité sur tous supports: papier, vinyle, bâche.",
    image: "/images/works/flyer-design.jpg",
    color: "#d81751",
    link: "/portfolio?category=Papeterie%20Professionnelle"
  },
  {
    icon: Gift,
    title: "Personnalisation",
    description: "Mugs, t-shirts, casquettes, objets publicitaires personnalisés.",
    image: "/images/works/custom-mugs.jpg",
    color: "#fcd10f",
    link: "/portfolio?category=Personnalisation"
  },
  {
    icon: PartyPopper,
    title: "Événementiel",
    description: "Faire-parts, invitations, décoration et accessoires pour vos événements.",
    image: "/images/works/wedding-invitation.jpg",
    color: "#1d7bbf",
    link: "/portfolio?category=Evenementiel"
  },
]

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-right"
          style={{ backgroundImage: "url('/images/pattern.png')" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#1eb3e7] font-medium text-sm uppercase tracking-wider mb-3">
            <span className="w-8 h-px bg-[#1eb3e7]" />
            Ce que nous faisons
            <span className="w-8 h-px bg-[#1eb3e7]" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Nos Services
            <span className="text-[#d81751]">.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Des solutions créatives complètes pour tous vos besoins en design et impression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link href={service.link} key={service.title}>
              <Card
                className="group cursor-pointer overflow-hidden border-0 bg-card h-full transition-all duration-500 hover:shadow-2xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-70" : "opacity-40"
                      }`}
                      style={{
                        background: `linear-gradient(to top, ${service.color}, transparent)`,
                      }}
                    />
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${
                          hoveredIndex === index ? "scale-110 rotate-6" : ""
                        }`}
                        style={{ backgroundColor: `${service.color}40` }}
                      >
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                      {service.title}
                      <ArrowRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          hoveredIndex === index
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0"
                        }`}
                        style={{ color: service.color }}
                      />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`h-1 transition-all duration-500 ${
                      hoveredIndex === index ? "w-full" : "w-0"
                    }`}
                    style={{ backgroundColor: service.color }}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#1d7bbf] hover:text-[#1eb3e7] font-medium group"
          >
            Découvrir tous nos services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
