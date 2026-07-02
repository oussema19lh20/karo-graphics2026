import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { FeaturedWork } from "@/components/sections/featured-work"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { PacksPreview } from "@/components/sections/packs-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { CtaBanner } from "@/components/sections/cta-banner"
import { ContactPreview } from "@/components/sections/contact-preview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <FeaturedWork />
      <WhyChooseUs />
      <PacksPreview />
      <Testimonials />
      <CtaBanner />
      <ContactPreview />
    </>
  )
}
