"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-[80vh] sm:min-h-[88vh] flex items-center overflow-hidden bg-background">
      {/* Decorative right-side background */}
      <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-l from-muted/60 to-transparent" />
        {/* Yellow accent circles */}
        <div className="absolute top-12 right-20 w-14 h-14 rounded-full bg-[#fcd10f] shadow-lg" />
        <div className="absolute top-36 right-8 w-9 h-9 rounded-full bg-[#fcd10f] opacity-70" />
        <div className="absolute bottom-24 right-16 w-11 h-11 rounded-full bg-[#fcd10f]" />
        <div className="absolute bottom-10 right-40 w-6 h-6 rounded-full bg-[#fcd10f] opacity-50" />
        {/* Decorative arcs */}
        <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-10" viewBox="0 0 320 320" fill="none">
          <path d="M320 0 Q160 160 0 320" stroke="#1d7bbf" strokeWidth="40" />
          <path d="M320 60 Q200 180 60 320" stroke="#d81751" strokeWidth="30" />
          <path d="M320 120 Q220 220 120 320" stroke="#000" strokeWidth="20" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left content */}
          <div className={`space-y-5 sm:space-y-7 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight">
              <span className="text-foreground block">DONNEZ VIE À</span>
              <span className="block mt-1">
                <span style={{ color: "#1d7bbf" }}>VOTRE </span>
                <span style={{ color: "#d81751" }}>IMAGE</span>
              </span>
            </h1>

            {/* Colored dots separator */}
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-10 bg-[#1d7bbf]" />
              <span className="w-3 h-3 rounded-full bg-[#1d7bbf] block" />
              <span className="w-3 h-3 rounded-full bg-[#d81751] block" />
              <span className="w-3 h-3 rounded-full bg-foreground block" />
              <div className="h-0.5 w-10 bg-[#d81751]" />
            </div>

            <p className="text-muted-foreground text-lg max-w-md">
              karo graphics, votre partenaire créatif pour des{" "}
              <span className="text-[#1d7bbf] font-semibold">solutions sur mesure</span>{" "}
              en conception graphique et impression.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-[#1d7bbf] text-white px-6 py-3.5 font-bold text-sm uppercase tracking-wider hover:bg-[#1d7bbf]/90 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                NOS SERVICES
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#d81751] text-white px-6 py-3.5 font-bold text-sm uppercase tracking-wider hover:bg-[#d81751]/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                CONTACTEZ-NOUS
              </Link>
            </div>
          </div>

          {/* Right - Product showcase */}
          <div className={`relative transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative h-[260px] sm:h-[340px] lg:h-[480px]">
              <Image
                src="/images%20karo%20design/papietrie.png"
                alt="karo graphics Papeterie"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
