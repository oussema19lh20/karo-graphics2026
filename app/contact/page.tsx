"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "52.617.032",
    color: "#1eb3e7",
  },
  {
    icon: Mail,
    title: "Email",
    content: "karographics1@gmail.com",
    color: "#d81751",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "La Gare, Hammamet",
    link: "https://maps.app.goo.gl/PjSfzkGtbj7FuNo66",
    color: "#fcd10f",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun–Ven: 9h00–17h30\nSam: 9h00–14h00",
    color: "#1d7bbf",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#1eb3e7] font-medium text-sm uppercase tracking-wider">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Contactez-nous
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Une question? Un projet en tête? N&apos;hésitez pas à nous contacter.
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => {
              const cardContent = (
                <CardContent className="p-6 text-center">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <info.icon
                      className="w-7 h-7"
                      style={{ color: info.color }}
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-muted-foreground text-sm">{info.content}</p>
                </CardContent>
              )
              return info.link ? (
                <a key={info.title} href={info.link} target="_blank" rel="noopener noreferrer">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    {cardContent}
                  </Card>
                </a>
              ) : (
                <Card key={info.title} className="border-0 shadow-md">
                  {cardContent}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              {submitted ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Message envoyé!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Merci de nous avoir contacté. Nous vous répondrons dans les
                      plus brefs délais.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                    >
                      Envoyer un autre message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nom complet
                        </label>
                        <Input
                          type="text"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="border-border"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                            className="border-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Téléphone
                          </label>
                          <Input
                            type="tel"
                            placeholder="+216 52 617 032"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <Textarea
                          placeholder="Décrivez votre projet..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                          rows={5}
                          className="border-border resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#d81751] hover:bg-[#d81751]/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* WhatsApp Button */}
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                >
                  <a
                    href="https://wa.me/21652617032"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contactez-nous sur WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Notre localisation</h2>
              <a
                href="https://maps.app.goo.gl/PjSfzkGtbj7FuNo66"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-[500px]"
              >
                <Card className="border-0 shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-0 h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1d7bbf]/5 to-[#1eb3e7]/10 gap-6">
                    <div className="w-24 h-24 rounded-full bg-[#d81751]/10 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-[#d81751]" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg text-foreground mb-1">karo graphics</p>
                      <p className="text-muted-foreground text-sm">Cliquez pour voir sur Google Maps</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#1d7bbf] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md">
                      <MapPin className="w-4 h-4" />
                      Ouvrir dans Google Maps
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
