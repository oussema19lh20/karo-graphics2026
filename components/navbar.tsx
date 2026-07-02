"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import {
  Menu, X, Moon, Sun, ChevronDown, Sparkles, Phone, Truck,
  Home, LayoutGrid, Wrench, Package, Mail,
  Palette, PartyPopper, Gift, FileText, Shirt, Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoriesData } from "@/lib/data"

const categoryMeta: Record<string, { icon: React.ElementType; color: string }> = {
  "Design graphique":               { icon: Palette,      color: "#1d7bbf" },
  "Evénementiel":                   { icon: PartyPopper,  color: "#d81751" },
  "Les Packs":                      { icon: Package,      color: "#f59e0b" },
  "Objets & Cadeaux Personnalisés": { icon: Gift,         color: "#1eb3e7" },
  "Papeterie Professionnelle":      { icon: FileText,     color: "#7c3aed" },
  "Personnalisation":               { icon: Shirt,        color: "#d81751" },
  "Support de communication":       { icon: Megaphone,    color: "#111827" },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileCategory, setMobileCategory] = useState<string | null>(null)
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { 
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMenuEnter = (menu: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(menu)
  }
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
  }

  const toggleCategory = (e: React.MouseEvent, category: string) => {
    e.stopPropagation()
    setMobileCategory(mobileCategory === category ? null : category)
  }

  // Ticker items
  const tickerItems = [
    { icon: Phone, text: "52.617.032" },
    { icon: Mail, text: "karographics1@gmail.com" },
    { icon: Sparkles, text: "Devis gratuit sous 24h", special: true },
    { icon: Truck, text: "Livraison gratuite à partir de 200DT" },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-sm"
      }`}>

        {/* Top info bar — desktop only with news ticker */}
        <div className="hidden lg:block bg-[#1d7bbf] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="py-2 text-sm relative">
              <div className="ticker-container" style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
                <div 
                  className="ticker-track"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    whiteSpace: 'nowrap',
                    animation: 'ticker 20s linear infinite',
                    width: 'max-content',
                  }}
                >
                  {/* First set */}
                  {tickerItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <span key={`first-${index}`} className="inline-flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${item.special ? 'text-[#fcd10f]' : ''}`} />
                        {item.text}
                      </span>
                    )
                  })}
                  {/* Duplicate for seamless loop */}
                  {tickerItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <span key={`second-${index}`} className="inline-flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${item.special ? 'text-[#fcd10f]' : ''}`} />
                        {item.text}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[100px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src={darkMode ? "/images/logo mode sombre.png" : "/images/logo color mode claire.png"}
                alt="karo graphics"
                width={120}
                height={120}
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="flex items-center gap-1.5 px-4 py-2 text-foreground/80 hover:text-[#1eb3e7] font-medium transition-colors rounded-lg hover:bg-muted/50">
                <Home className="w-4 h-4" />Accueil
              </Link>

              {/* Catalogue mega menu */}
              <div className="relative" onMouseEnter={() => handleMenuEnter("catalogue")} onMouseLeave={handleMenuLeave}>
                <button className="flex items-center gap-1.5 px-4 py-2 text-foreground/80 hover:text-[#1eb3e7] font-medium transition-colors rounded-lg hover:bg-muted/50">
                  <LayoutGrid className="w-4 h-4" />
                  Catalogue
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "catalogue" ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${activeMenu === "catalogue" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  <div className="bg-background rounded-2xl shadow-2xl border border-border/50 p-6 w-[880px]">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {categoriesData.map((category) => {
                        const meta = categoryMeta[category.name]
                        const Icon = meta?.icon ?? LayoutGrid
                        const color = meta?.color ?? "#1d7bbf"
                        return (
                          <Link key={category.id} href={`/portfolio?category=${encodeURIComponent(category.name)}`}
                            className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/60 transition-colors text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${color}18` }}>
                              <Icon className="w-6 h-6" style={{ color }} />
                            </div>
                            <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-[#1d7bbf] transition-colors">{category.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <div className="grid grid-cols-4 gap-x-6 gap-y-1">
                        {categoriesData.map((category) => {
                          const color = categoryMeta[category.name]?.color ?? "#1d7bbf"
                          return (
                            <div key={category.id}>
                              {category.subcategories.slice(0, 4).map((sub) => (
                                <Link key={sub.name}
                                  href={`/portfolio?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                                  className="flex items-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Explorez notre catalogue complet</p>
                      <Button asChild size="sm" className="bg-[#d81751] hover:bg-[#d81751]/90 text-white">
                        <Link href="/portfolio">Voir tout le catalogue</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/services" className="flex items-center gap-1.5 px-4 py-2 text-foreground/80 hover:text-[#1eb3e7] font-medium transition-colors rounded-lg hover:bg-muted/50">
                <Wrench className="w-4 h-4" />Services
              </Link>
              <Link href="/packs" className="flex items-center gap-1.5 px-4 py-2 text-foreground/80 hover:text-[#1eb3e7] font-medium transition-colors rounded-lg hover:bg-muted/50">
                <Package className="w-4 h-4" />Packs
              </Link>
              <Link href="/contact" className="flex items-center gap-1.5 px-4 py-2 text-foreground/80 hover:text-[#1eb3e7] font-medium transition-colors rounded-lg hover:bg-muted/50">
                <Mail className="w-4 h-4" />Contact
              </Link>

              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="ml-1">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button asChild className="ml-2 bg-gradient-to-r from-[#d81751] to-[#1eb3e7] hover:opacity-90 text-white rounded-full shadow-lg transition-all">
                <Link href="/contact">Devis Gratuit</Link>
              </Button>
            </div>

            {/* Mobile right — contact shortcut + hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <a href="tel:52617032"
                className="flex items-center gap-1.5 bg-[#1d7bbf] text-white text-xs font-bold px-3 py-2 rounded-lg">
                <Phone className="w-3.5 h-3.5" />
                Appeler
              </a>
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile menu - Always mounted, hidden with translate */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-[60] bg-background flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Contact strip */}
        <div className="bg-[#1d7bbf] text-white px-4 py-2 flex items-center justify-between text-xs shrink-0">
          <a href="tel:52617032" className="flex items-center gap-1.5 font-semibold">
            <Phone className="w-3.5 h-3.5" />52.617.032
          </a>
          <span className="text-white/70">karographics1@gmail.com</span>
        </div>

        {/* Nav items */}
        <div className="flex-1 flex flex-col justify-between px-3 py-2 overflow-y-auto">
          <div className="space-y-0.5">

            <Link href="/" className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors" onClick={closeMobileMenu}>
              <span className="w-8 h-8 rounded-lg bg-[#1d7bbf]/10 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4 text-[#1d7bbf]" />
              </span>
              Accueil
            </Link>

            {/* Catalogue accordion */}
            <div>
              <button
                onClick={(e) => toggleCategory(e, "catalogue")}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#d81751]/10 flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-4 h-4 text-[#d81751]" />
                  </span>
                  Catalogue
                </span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileCategory === "catalogue" ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                mobileCategory === "catalogue" ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="mx-2 my-1.5 grid grid-cols-4 gap-1.5 bg-muted/40 rounded-xl p-2.5">
                  {categoriesData.map((category) => {
                    const meta = categoryMeta[category.name]
                    const Icon = meta?.icon ?? LayoutGrid
                    const color = meta?.color ?? "#1d7bbf"
                    return (
                      <Link 
                        key={category.id}
                        href={`/portfolio?category=${encodeURIComponent(category.name)}`}
                        className="flex flex-col items-center gap-1 p-1.5 rounded-lg active:bg-muted transition-colors text-center"
                        onClick={(e) => {
                          e.stopPropagation()
                          closeMobileMenu()
                        }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <span className="text-[9px] font-semibold text-foreground/70 leading-tight">
                          {category.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            <Link href="/services" className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors" onClick={closeMobileMenu}>
              <span className="w-8 h-8 rounded-lg bg-[#1eb3e7]/10 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 text-[#1eb3e7]" />
              </span>
              Services
            </Link>

            <Link href="/packs" className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors" onClick={closeMobileMenu}>
              <span className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-[#f59e0b]" />
              </span>
              Packs
            </Link>

            <Link href="/contact" className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors" onClick={closeMobileMenu}>
              <span className="w-8 h-8 rounded-lg bg-[#d81751]/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#d81751]" />
              </span>
              Contact
            </Link>

            <button onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-foreground active:bg-muted transition-colors">
              <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </span>
              {darkMode ? "Mode clair" : "Mode sombre"}
            </button>
          </div>

          {/* CTA pinned to bottom */}
          <div className="pb-24">
            <Button asChild className="w-full bg-gradient-to-r from-[#d81751] to-[#1eb3e7] text-white rounded-full h-11 text-sm font-bold">
              <Link href="/contact" onClick={closeMobileMenu}>Devis Gratuit</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 lg:h-[132px]" />

      {/* Add keyframes directly in component */}
      <style jsx global>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </>
  )
}