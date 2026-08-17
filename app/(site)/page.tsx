import { Hero } from "@/components/sections/hero";
import { BestSellers } from "@/components/sections/best-sellers";
import { Philosophy } from "@/components/sections/philosophy";
import { Science } from "@/components/sections/science";
import { Testimonials } from "@/components/sections/testimonials";
import { CorporateTeaser } from "@/components/sections/corporate-teaser";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { CtaBand } from "@/components/sections/cta-band";
import { getHeroSlides } from "@/lib/cms/hero";
import { getProducts } from "@/lib/cms/products";
import { getNewsPosts } from "@/lib/cms/news";
import { getHomeStats } from "@/lib/cms/home-stats";

export default async function Home() {
  const [heroSlides, products, newsPosts, homeStats] = await Promise.all([
    getHeroSlides(),
    getProducts(),
    getNewsPosts(),
    getHomeStats(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} stats={homeStats.items} />
      <BestSellers products={products} />
      <Philosophy />
      <Science />
      <Testimonials />
      <CorporateTeaser />
      <NewsTeaser posts={newsPosts} />
      <CtaBand />
    </>
  );
}
