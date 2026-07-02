"use client"

import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const packs = [
  {
    name: "Pack Starter",
    icon: Zap,
    description: "Idéal pour démarrer votre projet",
    features: [
      "Logo simple",
      "Carte de visite",
      "Papier en-tête",
      "2 révisions incluses",
    ],
    color: "#1eb3e7",
    gradient: "from-[#1eb3e7] to-[#1d7bbf]",
    popular: false,
  },
  {
    name: "Pack Business",
    icon: Sparkles,
    description: "Pour une identité visuelle complète",
    features: [
      "Logo professionnel",
      "Charte graphique",
      "Cartes de visite",
      "Flyers & Brochures",
      "5 révisions incluses",
    ],
    color: "#d81751",
    gradient: "from-[#d81751] to-[#ff6b8a]",
    popular: true,
  },
  {
    name: "Pack Premium",
    icon: Crown,
    description: "Solution sur mesure pour votre entreprise",
    features: [
      "Identité visuelle complète",
      "Site web one-page",
      "Supports marketing",
      "Révisions illimitées",
      "Support prioritaire",
    ],
    color: "#fcd10f",
    gradient: "from-[#fcd10f] to-[#f59e0b]",
    popular: false,
  },
]

export function PacksPreview() {
  const [hoveredPack, setHoveredPack] = useState<string | null>(null)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1eb3e7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d81751]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#fcd10f] font-medium text-sm uppercase tracking-wider mb-3">
            <span className="w-8 h-px bg-[#fcd10f]" />
            Nos Offres
            <span className="w-8 h-px bg-[#fcd10f]" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Des Packs Adaptés à
            <span className="text-[#d81751]"> Vos Besoins</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Choisissez le pack qui correspond le mieux à votre projet. 
            Chaque pack est personnalisable selon vos besoins spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packs.map((pack) => (
            <Card
              key={pack.name}
              className={`relative overflow-hidden border-0 transition-all duration-500 ${
                pack.popular
                  ? "shadow-2xl shadow-[#d81751]/20 md:scale-105 z-10"
                  : "shadow-lg hover:shadow-xl"
              } ${hoveredPack === pack.name ? "transform -translate-y-2" : ""}`}
              onMouseEnter={() => setHoveredPack(pack.name)}
              onMouseLeave={() => setHoveredPack(null)}
            >
              {/* Popular Badge */}
              {pack.popular && (
                <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${pack.gradient} text-white text-center text-sm font-semibold py-2`}>
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Le plus populaire
                </div>
              )}

              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${pack.gradient} opacity-0 transition-opacity duration-500 ${
                hoveredPack === pack.name ? "opacity-10" : ""
              }`} />

              <CardContent className={`p-8 ${pack.popular ? "pt-14" : "pt-8"}`}>
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pack.gradient} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 ${
                    hoveredPack === pack.name ? "scale-110 rotate-3" : ""
                  }`}
                >
                  <pack.icon className="w-8 h-8 text-white" />
                </div>

                {/* Header */}
                <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {pack.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-r ${pack.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full rounded-full group bg-gradient-to-r ${pack.gradient} hover:opacity-90 text-white border-0`}
                >
                  <Link href="/contact">
                    Demander un devis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          Besoin {"d'un"} pack personnalisé?{" "}
          <Link href="/contact" className="text-[#1eb3e7] hover:text-[#d81751] font-medium underline-offset-4 hover:underline">
            Contactez-nous pour un devis sur mesure
          </Link>
        </p>
      </div>
    </section>
  )
}
