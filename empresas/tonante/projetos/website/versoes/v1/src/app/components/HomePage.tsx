import { HeroSection } from "./HeroSection";
import { DropDoDiaSection } from "./DropDoDiaSection";
import { CategoryShowcase } from "./CategoryShowcase";
import { EssentialsSection } from "./EssentialsSection";
import { FlashDealsStrip } from "./FlashDealsStrip";
import { ProductShelf } from "./ProductShelf";
import { DealsHighlight } from "./DealsHighlight";
import { TrustStrip } from "./TrustStrip";
import { StoryBand } from "./StoryBand";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { SEO } from "./SEO";
import { allProducts } from "./productsData";

// Seleções dinâmicas do catálogo Tonante (antes eram IDs fixos do PCYES que
// não existem mais → shelves vazias).
const byReviews = [...allProducts].sort((a, b) => b.reviews - a.reviews);
const bestSellerIds = byReviews.slice(0, 10).map((p) => p.id);
const dealIds = [...allProducts]
  .filter((p) => p.oldPriceNum && p.oldPriceNum > p.priceNum)
  .slice(0, 8)
  .map((p) => p.id);
const novelties = [...allProducts].filter((p) => p.badge === "Novidade");
const newArrivalIds = (novelties.length >= 6 ? novelties : byReviews.slice(10, 16))
  .slice(0, 6)
  .map((p) => p.id);

export function HomePage() {
  return (
    <>
      <SEO
        title="Violões, guitarras, contrabaixos e acessórios"
        description="Loja oficial Tonante. Tradição brasileira desde 1954. Violões, guitarras, contrabaixos, cordas e acessórios. Frete grátis acima de R$ 299. Até 12x sem juros."
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
      {/* Hero */}
      <HeroSection />

      {/* Benefícios (frete, parcelas, garantia, troca) */}
      <TrustStrip />

      {/* Drop do dia (3 maiores descontos) */}
      <DropDoDiaSection />

      {/* Promoções da semana */}
      <FlashDealsStrip />

      {/* Vitrine de categorias */}
      <CategoryShowcase />

      {/* Mais cobiçados */}
      <DealsHighlight label="Os queridinhos" title="Mais cobiçados da casa" productIds={dealIds} />

      {/* Mais vendidos */}
      <ProductShelf label="Mais vendidos" title="Top da semana" productIds={bestSellerIds} showRanking />

      {/* Essenciais */}
      <EssentialsSection />

      {/* Lançamentos */}
      <ProductShelf label="Lançamentos" title="Recém-chegados" productIds={newArrivalIds} />

      {/* Herança 1954 */}
      <StoryBand />

      {/* Institucional */}
      <Newsletter />
      <Footer />
    </>
  );
}
