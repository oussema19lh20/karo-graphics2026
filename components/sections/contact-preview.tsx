import { Phone, Mail, MapPin, Clock } from "lucide-react"

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

export function ContactPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#d81751] font-medium text-sm uppercase tracking-wider">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-balance">
            Restons en contact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="bg-card rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${info.color}20` }}
              >
                <info.icon className="w-7 h-7" style={{ color: info.color }} />
              </div>
              <h3 className="font-semibold mb-1">{info.title}</h3>
              <p className="text-muted-foreground text-sm">{info.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
