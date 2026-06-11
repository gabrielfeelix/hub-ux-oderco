import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";
import { DropDoDiaSection } from "./DropDoDiaSection";
import { FlashDealsStrip } from "./FlashDealsStrip";
import { CategoryShowcase } from "./CategoryShowcase";
import { ProductShelf } from "./ProductShelf";
import { PromoPanel } from "./PromoPanel";
import { MonteSeuKit } from "./MonteSeuKit";
import { ShopByStyle } from "./ShopByStyle";
import { LinhasDeViolao } from "./LinhasDeViolao";
import { StoryBand } from "./StoryBand";
import { RealMusicians } from "./RealMusicians";
import { Pillars } from "./Pillars";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
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

      {/* 2. Vantagens */}
      <TrustStrip />

      {/* 3. Drop do dia */}
      <DropDoDiaSection />

      {/* 4. Promoções da semana */}
      <FlashDealsStrip />

      {/* 5. Categorias — O que você toca hoje? */}
      <CategoryShowcase />

      {/* 6. Top da semana (ranked) */}
      <ProductShelf label="Mais vendidos" title="Top da semana" productIds={bestSellerIds} showRanking />

      {/* 7. Hall das ofertas */}
      <PromoPanel />

      {/* 8. Monte seu kit (combo) */}
      <MonteSeuKit />

      {/* 9. Pra cada jeito de tocar */}
      <ShopByStyle />

      {/* 10. Cada violão, uma experiência */}
      <LinhasDeViolao />

      {/* 11. Herança 1954 */}
      <StoryBand />

      {/* 12. Recém-chegados */}
      <ProductShelf label="Lançamentos" title="Recém-chegados" productIds={newArrivalIds} />

      {/* 13. Tonante por aí */}
      <RealMusicians />

      {/* 14. Pilares */}
      <Pillars />

      {/* 15. Newsletter + Footer */}
      <Newsletter />
      <Footer />
    </>
  );
}
