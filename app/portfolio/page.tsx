"use client"

import { useState, useMemo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { categoriesData, isPDFFile } from "@/lib/data"
import {
  Eye, ArrowRight, Download, X, Sparkles,
  ChevronDown, SlidersHorizontal,
  Palette, PartyPopper, Package, Gift, FileText, Shirt, Megaphone,
} from "lucide-react"
import { type LucideIcon } from "lucide-react"

const subcategoryImages: Record<string, string> = {
  "Invitations de mariage": "/images/works/wedding-invitation.jpg",
  "Cartes de visite": "/images/works/business-cards.jpg",
  "Plexi": "/images/works/plexi-decoration.jpg",
  "Impression sur tissu": "/images/works/custom-tshirts.jpg",
  "Chartes graphiques": "/images/works/branding-kit.jpg",
  "Mugs": "/images/works/custom-mugs.jpg",
  "Flyer": "/images/works/flyer-design.jpg",
  "Supports": "/images/works/rollup-banner.jpg",
  "Pack anniversaire": "/images/works/wedding-invitation.jpg",
  "Pack médecin": "/images/works/business-cards.jpg",
  "Pack soutenance": "/images/works/branding-kit.jpg",
  "Pack thème cinéma": "/images/works/flyer-design.jpg",
  "Facture & Bon de Livraison": "/images/works/branding-kit.jpg",
  "Décoration vitrine": "/images/works/rollup-banner.jpg",
  "Étiquettes": "/images/works/custom-mugs.jpg",
  "Tableaux": "/images/works/plexi-decoration.jpg",
  "Notebook": "/images/works/branding-kit.jpg",
}

const defaultImage = "/placeholder.jpg"

type CatMeta = { icon: LucideIcon; color: string }
const categoryMeta: Record<string, CatMeta> = {
  "Design graphique":              { icon: Palette,      color: "#1d7bbf" },
  "Evénementiel":                  { icon: PartyPopper,  color: "#d81751" },
  "Les Packs":                     { icon: Package,      color: "#f59e0b" },
  "Objets & Cadeaux Personnalisés":{ icon: Gift,         color: "#1eb3e7" },
  "Papeterie Professionnelle":     { icon: FileText,     color: "#7c3aed" },
  "Personnalisation":              { icon: Shirt,        color: "#d81751" },
  "Support de communication":      { icon: Megaphone,    color: "#111827" },
}

function getPdfCoverImage(p: string) { return p.replace(/\.pdf$/i, ".png") }

function PortfolioContent() {
  const searchParams = useSearchParams()
  const [selectedCategory,    setSelectedCategory]    = useState(searchParams.get("category") || "")
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get("subcategory") || "")
  const [expanded,            setExpanded]            = useState<string | null>(searchParams.get("category") || null)
  const [drawerOpen,          setDrawerOpen]          = useState(false)
  const [hovered,             setHovered]             = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    const out: Array<{ name: string; category: string; subcategory: string; image: string }> = []
    categoriesData.forEach((cat) => {
      if (selectedCategory && cat.name !== selectedCategory) return
      cat.subcategories.forEach((sub) => {
        if (selectedSubcategory && sub.name !== selectedSubcategory) return
        sub.products.forEach((p) => out.push({
          name: p.name, category: cat.name, subcategory: sub.name,
          image: p.image || subcategoryImages[sub.name] || defaultImage,
        }))
      })
    })
    return out
  }, [selectedCategory, selectedSubcategory])

  const totalProducts = useMemo(() =>
    categoriesData.reduce((a, c) => a + c.subcategories.reduce((b, s) => b + s.products.length, 0), 0), [])

  const accentColor = selectedCategory ? (categoryMeta[selectedCategory]?.color ?? "#1d7bbf") : "#1d7bbf"

  const selectCategory = (name: string) => {
    setSelectedCategory(name)
    setSelectedSubcategory("")
    setExpanded(name === expanded ? null : name)
  }
  const clearAll = () => { setSelectedCategory(""); setSelectedSubcategory(""); setExpanded(null) }

  /* ── Sidebar filter (shared between desktop + drawer) ── */
  const FilterPanel = () => (
    <div className="space-y-1">
      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2 mb-4">
        Filtrer par catégorie
      </p>

      {/* All */}
      <button
        onClick={() => { clearAll(); setDrawerOpen(false) }}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
          !selectedCategory
            ? "bg-foreground text-background"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        <span className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: !selectedCategory ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)" }}
          >
            <SlidersHorizontal className="w-4 h-4" style={{ color: !selectedCategory ? "white" : "#888" }} />
          </span>
          Toutes les catégories
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
          !selectedCategory ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
        }`}>{totalProducts}</span>
      </button>

      {/* Categories */}
      {categoriesData.map((cat) => {
        const meta   = categoryMeta[cat.name]
        const Icon   = meta?.icon ?? Palette
        const color  = meta?.color ?? "#1d7bbf"
        const count  = cat.subcategories.reduce((a, s) => a + s.products.length, 0)
        const active = selectedCategory === cat.name
        const open   = expanded === cat.name

        return (
          <div key={cat.id}>
            <button
              onClick={() => { selectCategory(cat.name); setDrawerOpen(false) }}
              className={`w-full flex items-start justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                active ? "text-white shadow-md" : "hover:bg-muted text-foreground"
              }`}
              style={active ? { backgroundColor: color } : {}}
            >
              <span className="flex items-start gap-3 min-w-0">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5"
                  style={{ backgroundColor: active ? "rgba(255,255,255,0.2)" : `${color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color: active ? "white" : color }} />
                </span>
                <span className="text-left leading-snug break-words min-w-0">{cat.name}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}>{count}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""} ${
                  active ? "text-white/70" : "text-muted-foreground"
                }`} />
              </div>
            </button>

            {/* Subcategories */}
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-1" : "max-h-0"}`}>
              <div className="pl-4 pr-2 space-y-0.5 pb-1">
                {cat.subcategories.map((sub) => {
                  const subActive = selectedSubcategory === sub.name
                  return (
                    <button
                      key={sub.name}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCategory(cat.name)
                        setSelectedSubcategory(subActive ? "" : sub.name)
                        setDrawerOpen(false)
                      }}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        subActive
                          ? "text-white font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      style={subActive ? { backgroundColor: color } : {}}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${subActive ? "bg-white" : "bg-muted-foreground/50"}`} />
                        {sub.name}
                      </span>
                      <span className={`shrink-0 text-[10px] ${subActive ? "text-white/70" : "text-muted-foreground"}`}>
                        {sub.products.length}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}

      {(selectedCategory || selectedSubcategory) && (
        <button
          onClick={() => { clearAll(); setDrawerOpen(false) }}
          className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5 rounded-xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
        >
          <X className="w-3.5 h-3.5" /> Effacer les filtres
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#1d7bbf]/8 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#d81751]/8 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d81751]/10 border border-[#d81751]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#d81751]" />
            <span className="text-[#d81751] font-semibold text-sm uppercase tracking-wider">Notre Portfolio</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none mb-5">
            <span className="text-foreground">NOS </span>
            <span style={{ color: "#1d7bbf" }}>RÉALI</span>
            <span style={{ color: "#d81751" }}>SATIONS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-[#1d7bbf]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1d7bbf] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d81751] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground block" />
            <div className="h-0.5 w-12 bg-[#d81751]" />
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Découvrez nos créations. Chaque projet est réalisé avec passion et professionnalisme.
          </p>
          <div className="inline-flex items-center gap-8 bg-card border border-border rounded-2xl px-8 py-4 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: "#1d7bbf" }}>{totalProducts}+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Créations</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: "#d81751" }}>{categoriesData.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Catégories</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">100%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Sur mesure</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-8">

          {/* ── Sidebar — desktop ─── */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
              <FilterPanel />
            </div>
          </aside>

          {/* ── Main ─────────────── */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter bar */}
            <div className="lg:hidden flex items-center justify-between mb-5">
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border font-semibold text-sm hover:border-foreground transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
                {(selectedCategory || selectedSubcategory) && (
                  <span className="w-5 h-5 rounded-full bg-[#d81751] text-white text-[10px] flex items-center justify-center font-bold">
                    {(selectedCategory ? 1 : 0) + (selectedSubcategory ? 1 : 0)}
                  </span>
                )}
              </button>
              <span className="text-sm text-muted-foreground font-medium">
                {filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Active filter breadcrumb */}
            {(selectedCategory || selectedSubcategory) && (
              <div className="hidden lg:flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">{filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""} pour</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: accentColor }}>
                    {selectedCategory}
                    <button onClick={clearAll}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-foreground">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aucune réalisation trouvée</h3>
                <p className="text-muted-foreground mb-6">Essayez une autre catégorie</p>
                <button onClick={clearAll} className="px-6 py-3 rounded-full border-2 border-foreground text-sm font-bold uppercase hover:bg-foreground hover:text-background transition-all">
                  Voir tout
                </button>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                {filteredProducts.map((product, index) => {
                  const color = categoryMeta[product.category]?.color ?? "#1d7bbf"
                  const key   = `${product.category}-${product.subcategory}-${product.name}-${index}`
                  const isTall = index % 7 === 0
                  return (
                    <div
                      key={key}
                      className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className={`relative overflow-hidden ${isTall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                        <Image
                          src={isPDFFile(product.image) ? getPdfCoverImage(product.image) : (product.image || defaultImage)}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${hovered === key ? "opacity-100" : "opacity-60"}`} />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-lg" style={{ backgroundColor: color }}>
                            {product.category}
                          </span>
                        </div>
                        <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hovered === key ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div className={`absolute inset-x-0 bottom-0 p-5 transform transition-all duration-500 ${hovered === key ? "translate-y-0" : "translate-y-1"}`}>
                          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{product.subcategory}</p>
                          <h3 className="text-white font-bold text-base leading-snug mb-3">{product.name}</h3>
                          {isPDFFile(product.image) && (
                            <a href={product.image} download onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border border-white/40 rounded-full px-4 py-1.5 hover:bg-white hover:text-black transition-all">
                              <Download className="w-3.5 h-3.5" /> Télécharger
                            </a>
                          )}
                          <div className={`h-0.5 mt-3 rounded-full transition-all duration-500 ${hovered === key ? "w-full" : "w-8"}`} style={{ backgroundColor: color }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA */}
            <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d7bbf] via-[#1eb3e7] to-[#d81751] p-px">
              <div className="rounded-3xl bg-[#0a0a0a] px-8 py-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-5">
                  <Sparkles className="w-4 h-4 text-[#fcd10f]" />
                  <span className="text-white/80 text-sm font-medium">Projet sur mesure</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-3">Vous avez un projet ?</h2>
                <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Nous créons des solutions personnalisées adaptées à vos besoins.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#d81751] hover:bg-[#d81751]/90 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-full transition-all hover:scale-105 group">
                    Demander un devis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/services" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-full transition-all">
                    Nos services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setDrawerOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full z-50 bg-background shadow-2xl lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-black text-lg uppercase tracking-wide">Filtres</h3>
              <button onClick={() => setDrawerOpen(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel />
            </div>
            <div className="p-5 border-t border-border">
              <button onClick={() => setDrawerOpen(false)} className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all" style={{ backgroundColor: accentColor || "#1d7bbf" }}>
                Voir {filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#1d7bbf] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Chargement du portfolio…</p>
        </div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}
