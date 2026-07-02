"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import { useState } from "react"

const featuredWorks = [
  {
    id: 1,
    title: "Invitation Mariage",
    category: "Evénementiel",
    image: "/images%20karo%20design/invatation%20mariage.png",
  },
  {
    id: 2,
    title: "Trophée",
    category: "Objets & Cadeaux Personnalisés",
    image: "/images%20karo%20design/troph%C3%A9e.png",
  },
  {
    id: 3,
    title: "T-Shirt",
    category: "Personnalisation",
    image: "/images%20karo%20design/t-shirt.png",
  },
  {
    id: 4,
    title: "Bâche",
    category: "Support de communication",
    image: "/images%20karo%20design/bache.png",
  },
  {
    id: 5,
    title: "Flyer",
    category: "Personnalisation",
    image: "/images%20karo%20design/flyer.png",
  },
  {
    id: 6,
    title: "Roll-Up",
    category: "Support de communication",
    image: "/images%20karo%20design/roll-up.png",
  },
  {
    id: 7,
    title: "Carnet",
    category: "Papeterie Professionnelle",
    image: "/images%20karo%20design/carnet.png",
  },
  {
    id: 8,
    title: "Décoration Vitrine",
    category: "Personnalisation",
    image: "/images%20karo%20design/d%C3%A9coration%20vitrine.png",
  },
  {
    id: 9,
    title: "Dépliant",
    category: "Support de communication",
    image: "/images%20karo%20design/d%C3%A9pliant.png",
  },
  {
    id: 10,
    title: "Facture & Bon Livraison",
    category: "Papeterie Professionnelle",
    image: "/images%20karo%20design/facture%20%26%20bon%20livraison.png",
  },
  {
    id: 11,
    title: "Flag",
    category: "Support de communication",
    image: "/images%20karo%20design/flag.png",
  },
  {
    id: 12,
    title: "Impression Grand Format",
    category: "Support de communication",
    image: "/images%20karo%20design/impression%20grand%20format.png",
  },
  {
    id: 13,
    title: "Menu",
    category: "Papeterie Professionnelle",
    image: "/images%20karo%20design/menu.png",
  },
  {
    id: 14,
    title: "Papeterie",
    category: "Papeterie Professionnelle",
    image: "/images%20karo%20design/papietrie.png",
  },
  {
    id: 15,
    title: "Personnalisation",
    category: "Personnalisation",
    image: "/images%20karo%20design/personnalisation.png",
  },
  {
    id: 16,
    title: "Plaque",
    category: "Les Packs",
    image: "/images%20karo%20design/plaque.png",
  },
  {
    id: 17,
    title: "Porte Clé",
    category: "Objets & Cadeaux Personnalisés",
    image: "/images%20karo%20design/porte%20cl%C3%A9.png",
  },
  {
    id: 18,
    title: "Stylo",
    category: "Objets & Cadeaux Personnalisés",
    image: "/images%20karo%20design/stylo.png",
  },
  {
    id: 19,
    title: "X-Banner",
    category: "Support de communication",
    image: "/images%20karo%20design/x-banner.png",
  },
]

export function FeaturedWork() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[#d81751] font-medium text-sm uppercase tracking-wider mb-3">
              <span className="w-8 h-px bg-[#d81751]" />
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Nos Réalisations
              <span className="text-[#1eb3e7]">.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg text-pretty">
              Découvrez une sélection de nos meilleurs travaux qui illustrent notre savoir-faire et créativité.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1d7bbf] text-[#1d7bbf] hover:bg-[#1d7bbf] hover:text-white rounded-full px-6 group"
          >
            <Link href="/portfolio">
              Voir tout le portfolio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks.map((work, index) => (
            <Link
              href={`/portfolio?category=${encodeURIComponent(work.category)}`}
              key={work.id}
              className={`group relative overflow-hidden rounded-3xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-[4/3]"}`}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  hoveredId === work.id
                    ? "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                }`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`transform transition-all duration-500 ${
                    hoveredId === work.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-80"
                  }`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#fcd10f] text-black text-xs font-semibold mb-3">
                      {work.category}
                    </span>
                    <h3 className={`text-white font-bold mb-2 ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {work.title}
                    </h3>
                    <p className="text-white/70 text-sm">{work.category}</p>
                  </div>

                  {/* View Icon */}
                  <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                    hoveredId === work.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}>
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Border Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                  hoveredId === work.id
                    ? "ring-2 ring-[#1eb3e7] ring-offset-2 ring-offset-background"
                    : ""
                }`} />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Vous avez un projet en tête? Parlons-en!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#d81751] to-[#1eb3e7] text-white rounded-full px-8 shadow-lg"
          >
            <Link href="/contact">
              Commencer votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
