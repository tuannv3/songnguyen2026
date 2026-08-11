import { Hero } from "@/components/sections/hero";
import { BrandHighlightsMarquee } from "@/components/sections/brand-highlights-marquee";
import { BestSellers } from "@/components/sections/best-sellers";
import { Philosophy } from "@/components/sections/philosophy";
import { Science } from "@/components/sections/science";
import { Testimonials } from "@/components/sections/testimonials";
import { CorporateTeaser } from "@/components/sections/corporate-teaser";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandHighlightsMarquee />
      <BestSellers />
      <Philosophy />
      <Science />
      <Testimonials />
      <CorporateTeaser />
      <NewsTeaser />
      <CtaBand />
    </>
  );
}
