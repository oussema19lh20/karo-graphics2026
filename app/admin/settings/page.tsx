"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "karo graphics",
    tagline: "Conception & Impression",
    email: "karographics1@gmail.com",
    phone: "52.617.032",
    address: "https://maps.app.goo.gl/PjSfzkGtbj7FuNo66",
    whatsapp: "52617032",
    facebook: "https://facebook.com/karodesign",
    instagram: "https://instagram.com/karodesign",
    about:
      "karo graphics est votre partenaire créatif pour tous vos projets de design graphique, impression et personnalisation.",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Simulate save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Configurez les informations de votre site
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-[#1d7bbf] hover:bg-[#1d7bbf]/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Enregistré!" : "Enregistrer"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Nom du site
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Slogan</label>
              <Input
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                À propos
              </label>
              <Textarea
                value={settings.about}
                onChange={(e) =>
                  setSettings({ ...settings, about: e.target.value })
                }
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Téléphone
              </label>
              <Input
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Adresse</label>
              <Input
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                WhatsApp (numéro sans +)
              </label>
              <Input
                value={settings.whatsapp}
                onChange={(e) =>
                  setSettings({ ...settings, whatsapp: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Réseaux sociaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Facebook
                </label>
                <Input
                  value={settings.facebook}
                  onChange={(e) =>
                    setSettings({ ...settings, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Instagram
                </label>
                <Input
                  value={settings.instagram}
                  onChange={(e) =>
                    setSettings({ ...settings, instagram: e.target.value })
                  }
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
