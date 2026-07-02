"use client"

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Benali",
    role: "Mariée 2024",
    content:
      "karo graphics a créé les faire-parts de notre mariage. Le résultat était au-delà de nos attentes. Un travail magnifique et un service impeccable!",
    rating: 5,
    initials: "SB",
    color: "#1eb3e7",
  },
  {
    name: "Ahmed Tazi",
    role: "Entrepreneur",
    content:
      "Excellente équipe créative! Ils ont conçu toute l'identité visuelle de mon entreprise. Professionnels, réactifs et talentueux.",
    rating: 5,
    initials: "AT",
    color: "#d81751",
  },
  {
    name: "Fatima Alaoui",
    role: "Wedding Planner",
    content:
      "Je travaille régulièrement avec karo graphics pour mes clients. Qualité constante, délais respectés. Je recommande vivement!",
    rating: 5,
    initials: "FA",
    color: "#fcd10f",
  },
  {
    name: "Youssef Mansouri",
    role: "Directeur Marketing",
    content:
      "Une équipe à l'écoute et très réactive. Les supports de communication qu'ils ont créés pour notre entreprise ont fait forte impression.",
    rating: 5,
    initials: "YM",
    color: "#1d7bbf",
  },
  {
    name: "Nadia Chraibi",
    role: "Propriétaire Boutique",
    content:
      "Des objets personnalisés de grande qualité pour ma boutique. Mes clients adorent! Merci karo graphics.",
    rating: 5,
    initials: "NC",
    color: "#10b981",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcd10f]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1eb3e7]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#1d7bbf] font-medium text-sm uppercase tracking-wider mb-3">
            <span className="w-8 h-px bg-[#1d7bbf]" />
            Témoignages
            <span className="w-8 h-px bg-[#1d7bbf]" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Ce que disent nos
            <span className="text-[#d81751]"> clients</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            La satisfaction de nos clients est notre plus grande récompense
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center">
                  <Quote className="w-5 h-5" style={{ color: testimonial.color }} />
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#fcd10f] text-[#fcd10f]"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden relative">
          <Card className="border-0 shadow-xl mx-auto max-w-xl">
            <CardContent className="p-8 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center">
                <Quote className="w-5 h-5" style={{ color: testimonials[activeIndex].color }} />
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic text-center mt-4">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex gap-1 justify-center mb-6">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#fcd10f] text-[#fcd10f]"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: testimonials[activeIndex].color }}
                >
                  {testimonials[activeIndex].initials}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-6 bg-[#d81751]"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
