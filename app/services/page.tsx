import {
  Phone, Mail, MapPin, Globe, MessageCircle, Clock, Send, User, Users,
  Printer, AlignJustify, LayoutTemplate, Flag, LayoutGrid, Maximize, Monitor, Truck, Tag,
  Coffee, Shirt, Key, PenLine, HardDrive, Flame, Droplet, HardHat, ShoppingBag,
  CreditCard, FileText, BookOpen, Image as ImageIcon, MailOpen, ClipboardList,
  BookMarked, Layers, FolderOpen, Lightbulb, Award, Zap, Target, ThumbsUp,
  Headphones, ShieldCheck, UserCheck, Settings, ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const iconColors = ["#1d7bbf", "#d81751", "#1a1a1a"]

type Item = { icon: LucideIcon; label: string }
type Category = { title: string; headerColor: string; portfolioCategory?: string; items: Item[] }

const categories: Category[] = [
  {
    title: "CONTACT",
    headerColor: "#1d7bbf",
    items: [
      { icon: Phone, label: "TÉLÉPHONE" },
      { icon: Mail, label: "EMAIL" },
      { icon: MapPin, label: "LOCALISATION" },
      { icon: Globe, label: "SITE WEB" },
      { icon: MessageCircle, label: "WHATSAPP" },
      { icon: Clock, label: "HORAIRES" },
      { icon: Send, label: "ENVOYER" },
      { icon: User, label: "CLIENT" },
      { icon: Users, label: "PARTENARIAT" },
    ],
  },
  {
    title: "IMPRESSION GRAND FORMAT",
    headerColor: "#1a1a1a",
    portfolioCategory: "Support de communication",
    items: [
      { icon: Printer, label: "IMPRESSION\nGRAND FORMAT" },
      { icon: AlignJustify, label: "ROLL-UP" },
      { icon: LayoutTemplate, label: "BÂCHE" },
      { icon: Flag, label: "FLAG" },
      { icon: LayoutGrid, label: "PANNEAUX PVC" },
      { icon: Truck, label: "COVERING\nVÉHICULE" },
      { icon: Tag, label: "ADHÉSIF\nVITRINE" },
    ],
  },
  {
    title: "PERSONNALISATION",
    headerColor: "#d81751",
    portfolioCategory: "Personnalisation",
    items: [
      { icon: Coffee, label: "MUG" },
      { icon: Shirt, label: "TEXTILE" },
      { icon: Key, label: "PORTE-CLÉS" },
      { icon: PenLine, label: "STYLO" },
      { icon: HardDrive, label: "CLÉ USB" },
      { icon: HardHat, label: "CASQUETTE" },
      { icon: ShoppingBag, label: "SAC" },
    ],
  },
  {
    title: "IMPRESSION PAPIER",
    headerColor: "#1a1a1a",
    portfolioCategory: "Papeterie Professionnelle",
    items: [
      { icon: CreditCard, label: "CARTES DE\nVISITE" },
      { icon: FileText, label: "FLYERS" },
      { icon: BookOpen, label: "BROCHURES" },
      { icon: ImageIcon, label: "AFFICHES" },
      { icon: MailOpen, label: "ENVELOPPES" },
      { icon: ClipboardList, label: "BLOCS-NOTES" },
      { icon: BookMarked, label: "CATALOGUES" },
      { icon: Layers, label: "AUTOCOLLANTS" },
      { icon: FolderOpen, label: "DOSSIERS" },
    ],
  },
  {
    title: "VALEURS & SERVICES",
    headerColor: "#1a1a1a",
    items: [
      { icon: Lightbulb, label: "CRÉATIVITÉ" },
      { icon: Award, label: "QUALITÉ" },
      { icon: Zap, label: "RAPIDITÉ" },
      { icon: Target, label: "EFFICACITÉ" },
      { icon: ThumbsUp, label: "SATISFACTION" },
      { icon: Headphones, label: "ACCOMPAGNEMENT" },
      { icon: ShieldCheck, label: "FIABILITÉ" },
      { icon: UserCheck, label: "PROXIMITÉ" },
      { icon: Settings, label: "SERVICE" },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3">
            <span className="text-foreground">ICÔNES </span>
            <span style={{ color: "#1d7bbf" }}>KARO </span>
            <span style={{ color: "#d81751" }}>G</span>
            <span className="text-foreground">RAPHICS</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold tracking-widest text-muted-foreground uppercase">
            <span>Design</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d81751]" />
            <span>Impression</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d7bbf]" />
            <span>Créativité</span>
          </div>
          <div className="mt-6 flex justify-center gap-16">
            <div className="w-16 h-0.5 bg-[#1d7bbf]" />
            <div className="w-16 h-0.5 bg-[#d81751]" />
          </div>
        </div>
      </section>

      {/* Icon Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {categories.map((category) => (
              <div key={category.title}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-1.5 h-7 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.headerColor }}
                  />
                  <h2
                    className="text-xl font-extrabold tracking-widest"
                    style={{ color: category.headerColor }}
                  >
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Icons Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-5 lg:gap-6">
                  {category.items.map((item, index) => {
                    const IconComponent = item.icon
                    const bgColor = iconColors[index % 3]
                    const href = category.portfolioCategory
                      ? `/portfolio?category=${encodeURIComponent(category.portfolioCategory)}`
                      : null

                    const content = (
                      <>
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: bgColor }}
                        >
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-center uppercase tracking-wide leading-tight text-foreground">
                          {item.label.split("\n").map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </span>
                      </>
                    )

                    return href ? (
                      <Link
                        key={index}
                        href={href}
                        className="group flex flex-col items-center gap-3 cursor-pointer"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div key={index} className="group flex flex-col items-center gap-3">
                        {content}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 py-16 bg-gradient-to-r from-[#1d7bbf] to-[#1eb3e7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Un projet en tête?
          </h2>
          <p className="text-white/90 text-lg mb-8 text-pretty">
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#1d7bbf] hover:bg-white/90 rounded-full px-8"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
