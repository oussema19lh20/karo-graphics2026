import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageLoader } from "@/components/page-loader"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "karo graphics - Conception & Impression",
  description:
    "Design graphique, impression et objets personnalisés. Votre partenaire créatif pour tous vos projets.",
  keywords: [
    "design graphique",
    "impression",
    "personnalisation",
    "mariage",
    "cartes",
    "textile",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <PageLoader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
