import { HeroSection } from "./HeroSection";
import { CategoryChips } from "./CategoryChips";
import { TrustStrip } from "./TrustStrip";
import { OfertasDaSemana } from "./OfertasDaSemana";
import { CategoryShowcase } from "./CategoryShowcase";
import { ProductShelf } from "./ProductShelf";
import { MonteSeuKit } from "./MonteSeuKit";
import { LinhasDeViolao } from "./LinhasDeViolao";
import { StoryBand } from "./StoryBand";
import { SocialProofBar } from "./SocialProofBar";
import { RealMusicians } from "./RealMusicians";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { StringDivider } from "./section";
import { SEO } from "./SEO";
import { allProducts } from "./productsData";

// Seleções dinâmicas do catálogo Tonante.
const byReviews = [...allProducts].sort((a, b) => b.reviews - a.reviews);
const bestSellerIds = byReviews.slice(0, 10).map((p) => p.id);
const novelties = [...allProducts].filter((p) => p.badge === "Novidade");
const newArrivalIds = (novelties.length >= 6 ? novelties : byReviews.slice(10, 16))
  .slice(0, 6)
  .map((p) => p.id);

export function HomePage() {
  return (
    <>
      <SEO
        title="Violões, guitarras, contrabaixos e acessórios"
        description="Loja oficial Tonante. Tradição brasileira desde 1954. Violões, guitarras, contrabaixos, cordas e acessórios. Frete grátis acima de R$ 299. Até 10x sem juros."
        canonicalPath="/"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tonante",
          url: "https://tonante.com.br",
          logo: "https://tonante.com.br/brand/tonante-wordmark-dark.png",
          sameAs: [
            "https://www.instagram.com/tonanteinstrumentos",
            "https://www.youtube.com/@tonanteinstrumentos",
          ],
        }}
      />
      {/* 1. Hero (carrossel de banners) */}
      <HeroSection />

      {/* 2. Categorias — wayfinding sob o hero (loja-first) */}
      <CategoryChips />

      {/* 3. Vantagens */}
      <TrustStrip />

      {/* 4. Ofertas da semana (funde Drop do dia + Flash deals; 1 countdown) */}
      <OfertasDaSemana />

      {/* 5. Categorias — O que você toca hoje? */}
      <CategoryShowcase />

      {/* 6. Top da semana (ranked) */}
      <ProductShelf label="Mais vendidos" title="Top da semana" productIds={bestSellerIds} showRanking />

      {/* 7. Cada violão, uma experiência */}
      <LinhasDeViolao />

      {/* 8. Monte seu kit (combo) */}
      <MonteSeuKit />

      {/* 9. Herança 1954 + prova social */}
      <StoryBand />
      <SocialProofBar />

      {/* 10. Recém-chegados */}
      <ProductShelf label="Lançamentos" title="Recém-chegados" productIds={newArrivalIds} />

      {/* 11. Tonante por aí */}
      <RealMusicians />

      {/* 12. Newsletter + Footer */}
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10" style={{ marginBottom: "8px" }}>
        <StringDivider />
      </div>
      <Newsletter />
      <Footer />
    </>
  );
}
