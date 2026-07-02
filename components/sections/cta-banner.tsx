"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d7bbf] via-[#1eb3e7] to-[#d81751]" />
      
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pattern.png')" }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#fcd10f]/20 rounded-full blur-lg animate-float" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-[#fcd10f]" />
            Devis gratuit sous 24h
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Prêt à donner vie à votre
            <span className="block mt-2">
              <span className="relative inline-block">
                projet
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C40 4 80 2 100 6C140 10 160 4 198 8" stroke="#fcd10f" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              ?
            </span>
          </h2>

          {/* Description */}
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-pretty">
            Contactez-nous dès maintenant pour discuter de votre projet et obtenir un devis personnalisé gratuit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1d7bbf] hover:bg-white/90 px-10 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
            >
              <Link href="/contact">
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 px-10 py-7 text-lg rounded-full transition-all group"
            >
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Réponse rapide
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#fcd10f] rounded-full" />
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" />
              100% gratuit
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
