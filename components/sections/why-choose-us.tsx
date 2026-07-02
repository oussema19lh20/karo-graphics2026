"use client"

import { Palette, Clock, Award, HeadphonesIcon, ShieldCheck, Sparkles } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Palette,
    title: "Créativité sans limite",
    description: "Des designs uniques et personnalisés qui reflètent votre identité et se démarquent de la concurrence.",
    color: "#1eb3e7",
  },
  {
    icon: Clock,
    title: "Délais respectés",
    description: "Livraison dans les temps convenus. Votre projet est notre priorité, toujours.",
    color: "#d81751",
  },
  {
    icon: Award,
    title: "Qualité premium",
    description: "Matériaux et finitions haut de gamme pour des résultats qui impressionnent.",
    color: "#fcd10f",
  },
  {
    icon: HeadphonesIcon,
    title: "Support dédié",
    description: "Une équipe à votre écoute pour vous accompagner tout au long de votre projet.",
    color: "#1d7bbf",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction garantie",
    description: "Nous travaillons jusqu'à ce que vous soyez 100% satisfait du résultat.",
    color: "#10b981",
  },
  {
    icon: Sparkles,
    title: "Innovation constante",
    description: "Toujours à l'affût des dernières tendances pour des créations modernes.",
    color: "#8b5cf6",
  },
]

export function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1eb3e7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#d81751]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#1eb3e7] font-medium text-sm uppercase tracking-wider mb-3">
            <span className="w-8 h-px bg-[#1eb3e7]" />
            Pourquoi nous choisir
            <span className="w-8 h-px bg-[#1eb3e7]" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Notre Engagement
            <span className="text-[#d81751]">.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Plus {"qu'une"} agence de design, nous sommes votre partenaire créatif pour donner vie à vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-3xl bg-card border border-border/50 transition-all duration-500 cursor-pointer ${
                hoveredIndex === index ? "shadow-2xl -translate-y-2" : "shadow-lg hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(600px circle at 50% 0%, ${feature.color}15, transparent 70%)`,
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                    hoveredIndex === index ? "scale-110 rotate-3" : ""
                  }`}
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-7 h-7"
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 rounded-full transition-all duration-500 ${
                    hoveredIndex === index ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
