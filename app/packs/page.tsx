"use client"

import { Check, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useMemo, useState } from "react"
import { categoriesData } from "@/lib/data"

const packDescriptions: Record<string, string> = {
  "Pack anniversaire": "Un pack complet pour fêtes et invitations avec une identité visuelle coordonnée.",
  "Pack médecin": "Le kit pro pour votre cabinet : cartes, ordonnances et signalétique.",
  "Pack soutenance": "Un pack structuré pour présenter votre projet avec impact.",
  "Pack thème cinéma": "Une direction visuelle originale inspirée du monde du cinéma.",
}

export default function PacksPage() {
  const [hoveredPack, setHoveredPack] = useState<string | null>(null)

  const packCategory = useMemo(
    () => categoriesData.find((category) => category.name === "Les Packs"),
    [],
  )

  const packs = packCategory?.subcategories.map((sub) => ({
    name: sub.name,
    description: packDescriptions[sub.name] ?? "Un pack prêt à donner du style à votre communication.",
    features: sub.products.map((product) => product.name),
    gradient:
      sub.name === "Pack anniversaire"
        ? "from-[#1eb3e7] to-[#1d7bbf]"
        : sub.name === "Pack médecin"
        ? "from-[#d81751] to-[#ff6b8a]"
        : sub.name === "Pack soutenance"
        ? "from-[#fcd10f] to-[#f59e0b]"
        : "from-[#8b5cf6] to-[#a78bfa]",
  })) ?? []

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden pt-24 pb-16 bg-[radial-gradient(circle_at_top,_rgba(30,179,231,0.12),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(216,23,81,0.12),_transparent_40%)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 w-96 h-96 -translate-x-1/2 rounded-full bg-[#1eb3e7]/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#d81751]/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[#fcd10f] font-semibold text-sm uppercase tracking-widest mb-5">
            <span className="w-10 h-px bg-[#fcd10f]" />
            Offres packagées
            <span className="w-10 h-px bg-[#fcd10f]" />
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6 text-foreground">
            Les packs expliqués
            <span className="block text-[#d81751]">pour choisir vite et bien.</span>
          </h1>
          <p className="mx-auto text-base sm:text-lg max-w-3xl text-muted-foreground leading-relaxed">
            Cette page présente les packs de la catégorie « Les Packs » comme de vraies offres, avec des bénéfices clairs et des contenus concrets.
          </p>

          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="rounded-full bg-gradient-to-r from-[#d81751] to-[#1eb3e7] text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all">
              <Link href="/contact">Obtenir un devis</Link>
            </Button>
            <Link href="/portfolio" className="text-sm font-semibold text-[#1d7bbf] hover:text-[#d81751] transition-colors">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,_1fr)]">
            <aside className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1eb3e7]/10 px-4 py-2 text-sm font-semibold text-[#1eb3e7] mb-6">
                <Sparkles className="w-4 h-4" />
                Comment choisir ?
              </span>
              <h2 className="text-3xl font-bold mb-4">Une page structurée pour vos packs</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Présentez vos packs comme des solutions : objectif, avantages et premiers éléments inclus.
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                {packs.map((pack) => (
                  <div key={pack.name} className="rounded-3xl bg-white/80 p-4 border border-border shadow-sm">
                    <p className="font-semibold text-foreground mb-2">{pack.name}</p>
                    <p>{pack.description}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="grid gap-6 sm:grid-cols-2">
              {packs.map((pack) => (
                <Card
                  key={pack.name}
                  className={`relative overflow-hidden border-0 shadow-lg transition-transform duration-500 ${
                    hoveredPack === pack.name ? "-translate-y-2 shadow-[#1d7bbf]/20" : "hover:-translate-y-1"
                  }`}
                  onMouseEnter={() => setHoveredPack(pack.name)}
                  onMouseLeave={() => setHoveredPack(null)}
                >
                  <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${pack.gradient} opacity-20`} />
                  <CardContent className="relative p-8 pt-20">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pack prêt à l'emploi</p>
                        <h3 className="text-2xl font-black mt-3">{pack.name}</h3>
                      </div>
                      <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827] shadow-sm">
                        {pack.features.length} éléments
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {pack.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {pack.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1d7bbf]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className={`w-full rounded-full bg-gradient-to-r ${pack.gradient} text-white py-3 font-semibold hover:opacity-90 transition-all`}
                    >
                      <Link href="/contact">
                        Je veux ce pack
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#eff6ff] via-[#fdf2f8] to-[#fffbeb]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#1eb3e7] font-semibold mb-4">Une page organisée</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-6 text-foreground">Des packs lisibles et faciles à comparer.</h2>
          <p className="mx-auto text-muted-foreground max-w-2xl leading-relaxed mb-10">
            En présentant chaque pack comme une proposition complète, le visiteur comprend rapidement le bénéfice et l'action suivante.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-border">
              <p className="text-xl font-semibold mb-3">Clarté</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Chaque pack se lit en un coup d'œil.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-border">
              <p className="text-xl font-semibold mb-3">Confiance</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Des offres structurées rassurent le client.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-border">
              <p className="text-xl font-semibold mb-3">Action</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Un bouton clair dirige vers le devis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
