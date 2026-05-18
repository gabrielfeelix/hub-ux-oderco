import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Package, Heart, MapPin, User, CreditCard, HelpCircle, Shield, LogOut,
  ChevronRight, Truck, Check, Clock, X as XIcon, Star, ShoppingBag,
  ArrowLeft, Copy, Receipt, Info, Share2, AlertCircle, PackageCheck,
  LayoutDashboard, Sparkles
} from "lucide-react";
import { useAuth, type Order } from "./AuthContext";
import { useFavorites } from "./FavoritesContext";
import { useCart } from "./CartContext";
import { useTheme } from "./ThemeProvider";
import { allProducts } from "./productsData";
import { Footer } from "./Footer";
import { getPrimaryProductImage, getVisibleCatalogProducts } from "./productPresentation";

function OrderStatusTimeline({ status }: { status: Order["status"] }) {
  const steps = [
    { key: "received", label: "Recebido", icon: Clock },
    { key: "processing", label: "Preparando", icon: Check },
    { key: "shipped", label: "Em Trânsito", icon: Truck },
    { key: "delivered", label: "Entregue", icon: PackageCheck },
  ];

  const getStatusIndex = (s: string) => {
    if (s === "cancelled") return -1;
    if (s === "delivered") return 3;
    if (s === "shipped") return 2;
    if (s === "processing") return 1;
    return 0;
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="relative flex justify-between items-start mb-12 mt-4 px-2 sm:px-4">
      <div className="absolute top-[20px] left-[10%] right-[10%] h-[2px] bg-foreground/5 hidden sm:block z-0" />
      {currentIndex >= 0 && (
        <div 
          className="absolute top-[20px] left-[10%] h-[2px] bg-primary transition-all duration-1000 hidden sm:block z-0"
          style={{ width: `${(currentIndex / 3) * 80}%` }} 
        />
      )}
      
      {steps.map((step, idx) => {
        const isActive = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const isCancelled = status === "cancelled";
        
        return (
          <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 mb-2.5 ${
              isActive ? (isCancelled ? "bg-red-500 text-white" : "bg-primary text-white shadow-lg shadow-primary/20") 
              : "bg-foreground/5 text-foreground/35"
            }`}>
              <step.icon size={18} className={isCurrent ? "animate-pulse" : ""} />
            </div>
            <p className={`text-[10px] sm:text-[11px] text-center font-medium leading-tight ${
              isActive ? "text-foreground" : "text-foreground/35"
            }`} style={{ fontFamily: "var(--font-family-inter)" }}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

type Tab = "overview" | "orders" | "favorites" | "addresses" | "data" | "cards" | "help" | "privacy";

const TABS: { key: Tab; icon: typeof Package; label: string }[] = [
  { key: "overview", icon: LayoutDashboard, label: "Visão Geral" },
  { key: "orders", icon: Package, label: "Meus Pedidos" },
  { key: "favorites", icon: Heart, label: "Favoritos" },
  { key: "addresses", icon: MapPin, label: "Endereços" },
  { key: "data", icon: User, label: "Dados Pessoais" },
  { key: "cards", icon: CreditCard, label: "Cartões" },
  { key: "help", icon: HelpCircle, label: "Ajuda e Suporte" },
  { key: "privacy", icon: Shield, label: "Privacidade" },
];

const STATUS_MAP = {
  processing: { label: "Preparando", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: Clock },
  shipped: { label: "A caminho", color: "text-blue-400", bg: "bg-blue-400/10", icon: Truck },
  delivered: { label: "Entregue", color: "text-green-500", bg: "bg-green-500/10", icon: Check },
  cancelled: { label: "Cancelado", color: "text-red-400", bg: "bg-red-400/10", icon: XIcon },
};

export function ProfilePage() {
  const { user, isLoggedIn, setAuthModalOpen, logout, updateUser } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = TABS.some((tab) => tab.key === searchParams.get("tab")) ? searchParams.get("tab") as Tab : "overview";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const setProfileTab = (tab: Tab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    if (tab === "overview") next.delete("tab");
    else next.set("tab", tab);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (TABS.some((tab) => tab.key === tabParam)) {
      setActiveTab(tabParam as Tab);
    } else {
      setActiveTab("overview");
    }
  }, [searchParams]);

  if (!isLoggedIn || !user) {
    return (
      <div className="pt-[160px] md:pt-[190px] min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <User size={40} className="text-foreground/30 mx-auto mb-6" />
          <h2 className="text-foreground mb-3" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "28px", fontWeight: "var(--font-weight-light)" }}>
            Acesse sua conta
          </h2>
          <p className="text-foreground/50 mb-8" style={{ fontFamily: "var(--font-family-inter)", fontSize: "14px", lineHeight: "1.7" }}>
            Faça login para acessar seus pedidos, favoritos e informações.
          </p>
          <button onClick={() => setAuthModalOpen(true)}
            className="px-8 py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "14px", fontWeight: "var(--font-weight-medium)" }}
          >Entrar na minha conta</button>
        </div>
      </div>
    );
  }

  const favoriteProducts = getVisibleCatalogProducts(allProducts).filter((p) => favorites.has(p.id));

  const activeOrders = user.orders.filter((o) => o.status === "processing" || o.status === "shipped").length;

  return (
    <div className="pt-[160px] md:pt-[190px]">
      {/* Header */}
      <div className="px-5 md:px-8 pt-9 pb-8" style={{ background: isDark ? "#161617" : "#f5f5f7" }}>
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="w-[78px] h-[78px] rounded-full bg-primary/10 flex items-center justify-center border border-primary/20" style={{ boxShadow: "0 0 0 4px rgba(255,43,46,0.04)" }}>
                <span className="text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "30px", fontWeight: 600 }}>
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-foreground mb-1" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "34px", fontWeight: 600, lineHeight: "1.1" }}>
                E aí, {user.name.split(" ")[0]}
              </h1>
              <p className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px" }}>
                {user.email}
              </p>
            </div>
          </div>
          <div className="md:ml-auto flex items-center gap-6 md:gap-8">
            <div>
              <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Pedidos</p>
              <p className="text-foreground mt-1" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "24px", fontWeight: 600 }}>{user.orders.length}</p>
            </div>
            <div className="h-8 w-px bg-foreground/10" />
            <div>
              <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Favoritos</p>
              <p className="text-foreground mt-1" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "24px", fontWeight: 600 }}>{favorites.size}</p>
            </div>
            <div className="h-8 w-px bg-foreground/10 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Cliente desde</p>
              <p className="text-foreground mt-1" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "24px", fontWeight: 600 }}>
                {(() => {
                  const oldestOrder = [...user.orders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                  if (!oldestOrder) return "Hoje";
                  return new Date(oldestOrder.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }).replace(".", "");
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 py-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-[230px] flex-shrink-0">
            <nav className="space-y-0.5">
              {TABS.map((tab) => (
                <button key={tab.key} onClick={() => setProfileTab(tab.key)}
                  className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 transition-all duration-200 cursor-pointer ${
                    activeTab === tab.key
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground/88"
                  }`}
                  style={{
                    borderRadius: "10px",
                    background: activeTab === tab.key
                      ? (isDark ? "linear-gradient(90deg, rgba(255,43,46,0.12) 0%, rgba(255,43,46,0.04) 100%)" : "linear-gradient(90deg, rgba(220,20,20,0.08) 0%, rgba(220,20,20,0.02) 100%)")
                      : "transparent",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "13px",
                    fontWeight: activeTab === tab.key ? 600 : 500,
                    boxShadow: activeTab === tab.key ? "inset 2px 0 0 var(--primary)" : "none",
                  }}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
              <div className="h-px bg-foreground/8 my-3" />
              <button onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-foreground/50 hover:text-primary transition-all duration-200 cursor-pointer"
                style={{ borderRadius: "10px", fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 500 }}
              ><LogOut size={15} /> Sair</button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-foreground mb-6" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Visão Geral</h2>

                  {/* Hero card: pedido em rota com timeline anti-ansiedade OU estado de calma */}
                  {(() => {
                    const nextOrder = user.orders.find((o) => o.status === "shipped" || o.status === "processing");
                    if (!nextOrder) {
                      return (
                        <div
                          className="relative mb-4 p-5 flex items-center gap-4 overflow-hidden"
                          style={{
                            borderRadius: "16px",
                            background: isDark
                              ? "linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(255,255,255,0.02) 60%)"
                              : "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(0,0,0,0.015) 60%)",
                            border: "1px solid rgba(34,197,94,0.18)",
                          }}
                        >
                          <div className="w-11 h-11 rounded-full bg-green-500/12 flex items-center justify-center flex-shrink-0">
                            <Check size={18} className="text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-green-500 mb-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                              Tudo certo
                            </p>
                            <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "14px", fontWeight: "var(--font-weight-medium)" }}>
                              Sem pedidos pendentes
                            </p>
                            <p className="text-foreground/60 mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                              Que tal um upgrade no setup?
                            </p>
                          </div>
                          <Link to="/produtos" className="px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}>
                            Explorar
                          </Link>
                        </div>
                      );
                    }
                    const stages = [
                      { key: "received", label: "Recebido", icon: Clock },
                      { key: "processing", label: "Preparando", icon: Check },
                      { key: "shipped", label: "A caminho", icon: Truck },
                      { key: "delivered", label: "Entregue", icon: PackageCheck },
                    ];
                    const stageIdx = nextOrder.status === "shipped" ? 2 : nextOrder.status === "processing" ? 1 : 0;
                    const eta = nextOrder.status === "shipped" ? "Chega quinta, 18/Abr · em 3 dias" : "Previsão: 22/Abr · em 7 dias";
                    const lastUpdate = nextOrder.history?.[0];
                    return (
                      <div
                        className="relative mb-4 overflow-hidden"
                        style={{
                          borderRadius: "16px",
                          background: isDark
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.015)",
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        {/* Header: status + ETA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-5 pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                            </span>
                            <span className="text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                              {nextOrder.status === "shipped" ? "A caminho" : "Preparando loadout"}
                            </span>
                          </div>
                          <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "14px", fontWeight: "var(--font-weight-medium)" }}>
                            {eta}
                          </p>
                        </div>

                        {/* Pedido + thumbs */}
                        <div className="flex items-center gap-3 px-5 pb-4">
                          <div className="flex items-center gap-1.5">
                            {nextOrder.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="w-12 h-12 flex-shrink-0 overflow-hidden border border-foreground/8" style={{ borderRadius: "10px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {nextOrder.items.length > 3 && (
                              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-foreground/60" style={{ borderRadius: "10px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "11px", fontWeight: 600 }}>
                                +{nextOrder.items.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>
                              Pedido {nextOrder.id}
                            </p>
                            <p className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                              {nextOrder.items.length} {nextOrder.items.length === 1 ? "item" : "itens"} · {nextOrder.total}
                            </p>
                          </div>
                        </div>

                        {/* Timeline horizontal */}
                        <div className="px-5 pb-4">
                          <div className="relative flex justify-between items-start">
                            <div className="absolute top-[11px] left-[6%] right-[6%] h-[2px] bg-foreground/8 z-0" />
                            <div
                              className="absolute top-[11px] left-[6%] h-[2px] bg-primary transition-all duration-1000 z-0"
                              style={{ width: `${(stageIdx / 3) * 88}%` }}
                            />
                            {stages.map((stg, idx) => {
                              const isActive = idx <= stageIdx;
                              const isCurrent = idx === stageIdx;
                              return (
                                <div key={stg.key} className="flex flex-col items-center flex-1 relative z-10">
                                  <div className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 mb-1.5 ${
                                    isActive ? "bg-primary text-white" : "bg-foreground/8 text-foreground/30"
                                  }`}>
                                    <stg.icon size={11} />
                                    {isCurrent && (
                                      <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
                                    )}
                                  </div>
                                  <p className={`text-center leading-tight ${isActive ? "text-foreground/80" : "text-foreground/40"}`} style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: isCurrent ? 700 : 500 }}>
                                    {stg.label}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Última atualização */}
                        {lastUpdate && (
                          <div className="px-5 py-3 border-t border-foreground/6 flex items-center gap-2" style={{ background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)" }}>
                            <Info size={12} className="text-primary/70 flex-shrink-0" />
                            <p className="text-foreground/65 truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px" }}>
                              <span className="text-foreground/85">{lastUpdate.description}</span>
                              <span className="text-foreground/45"> · {lastUpdate.date}</span>
                            </p>
                          </div>
                        )}

                        {/* CTAs */}
                        <div className="flex items-center gap-2 px-5 py-3 border-t border-foreground/6">
                          <button
                            onClick={() => { setProfileTab("orders"); setSelectedOrderId(nextOrder.id); }}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}
                          >
                            <Truck size={13} /> Rastrear pedido
                          </button>
                          <button
                            onClick={() => setProfileTab("help")}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 text-foreground/70 hover:text-foreground transition-all cursor-pointer"
                            style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}
                          >
                            <HelpCircle size={13} /> Ajuda
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Grid de cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Últimos pedidos */}
                    <button
                      onClick={() => setProfileTab("orders")}
                      className="group cursor-pointer text-left p-5 transition-all hover:bg-white/[0.025] profile-card"
                      style={{
                        borderRadius: "14px",
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                        border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Últimos pedidos</p>
                        <ChevronRight size={14} className="text-foreground/35 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {user.orders.slice(0, 4).flatMap((o) => o.items).slice(0, 4).map((item, i) => (
                          <div key={i} className="w-12 h-12 flex-shrink-0 overflow-hidden border border-foreground/5" style={{ borderRadius: "8px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                            <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "18px", fontWeight: "var(--font-weight-medium)" }}>{user.orders.length} pedidos</p>
                      <p className="text-foreground/60 mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>{activeOrders > 0 ? `${activeOrders} em andamento` : "Todos entregues"}</p>
                    </button>

                    {/* Favoritos */}
                    <button
                      onClick={() => setProfileTab("favorites")}
                      className="group cursor-pointer text-left p-5 transition-all hover:bg-white/[0.025] profile-card"
                      style={{
                        borderRadius: "14px",
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                        border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Favoritos</p>
                        <ChevronRight size={14} className="text-foreground/35 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 mb-3 min-h-[48px]">
                        {favoriteProducts.slice(0, 4).map((p) => (
                          <div key={p.id} className="w-12 h-12 flex-shrink-0 overflow-hidden border border-foreground/5" style={{ borderRadius: "8px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                            <ImageWithFallback src={getPrimaryProductImage(p)} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {favoriteProducts.length === 0 && (
                          <Heart size={20} className="text-foreground/30" />
                        )}
                      </div>
                      <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "18px", fontWeight: "var(--font-weight-medium)" }}>{favoriteProducts.length} {favoriteProducts.length === 1 ? "produto" : "produtos"}</p>
                      <p className="text-foreground/60 mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>No seu stash</p>
                    </button>

                    {/* Endereço padrão */}
                    {user.addresses[0] && (
                      <button
                        onClick={() => setProfileTab("addresses")}
                        className="group cursor-pointer text-left p-5 transition-all hover:bg-white/[0.025] profile-card"
                        style={{
                          borderRadius: "14px",
                          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                          border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Endereço padrão</p>
                          <ChevronRight size={14} className="text-foreground/35 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin size={16} className="text-primary/70 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-foreground truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: "var(--font-weight-medium)" }}>
                              {user.addresses[0].label}
                            </p>
                            <p className="text-foreground/60 truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                              {user.addresses[0].street}, {user.addresses[0].number} · {user.addresses[0].city}/{user.addresses[0].state}
                            </p>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Cartão padrão */}
                    {user.cards.find((c) => c.isDefault) && (() => {
                      const c = user.cards.find((c) => c.isDefault)!;
                      return (
                        <button
                          onClick={() => setProfileTab("cards")}
                          className="group cursor-pointer text-left p-5 transition-all hover:bg-white/[0.01]"
                          style={{
                            borderRadius: "14px",
                            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Cartão padrão</p>
                            <ChevronRight size={14} className="text-foreground/35 group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex items-start gap-3">
                            <CreditCard size={16} className="text-primary/70 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: "var(--font-weight-medium)" }}>
                                {c.brand} ·••• {c.last4}
                              </p>
                              <p className="text-foreground/60 truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                                {c.name} · Validade {c.expiry}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })()}
                  </div>

                  {/* Atalhos rápidos */}
                  <div className="mt-6 flex items-center justify-between p-5" style={{ borderRadius: "14px", background: isDark ? "rgba(255,43,46,0.04)" : "rgba(220,20,20,0.03)", border: "1px solid rgba(255,43,46,0.12)" }}>
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} className="text-primary" />
                      <div>
                        <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: "var(--font-weight-medium)" }}>
                          Próxima missão
                        </p>
                        <p className="text-foreground/65" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                          Upgrades sugeridos baseado no seu setup atual
                        </p>
                      </div>
                    </div>
                    <Link to="/produtos" className="px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: "var(--font-weight-medium)" }}>
                      Ver produtos
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {!selectedOrderId ? (
                    <>
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Meus Pedidos</h2>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-foreground hover:text-foreground transition-colors text-[11px] cursor-pointer" style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontWeight: 600 }}>Todos</button>
                          <button className="px-3 py-1.5 text-foreground/60 hover:text-foreground/80 transition-colors text-[11px] cursor-pointer" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontWeight: 600 }}>Em andamento</button>
                          <button className="px-3 py-1.5 text-foreground/60 hover:text-foreground/80 transition-colors text-[11px] cursor-pointer" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontWeight: 600 }}>Entregues</button>
                        </div>
                      </div>
                      {user.orders.length === 0 ? (
                        <div className="text-center py-20 px-6" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                          <Package size={28} className="text-foreground/35 mx-auto mb-4" />
                          <p className="text-foreground/55 mb-2" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "15px", fontWeight: "var(--font-weight-medium)" }}>Nenhum pedido ainda</p>
                          <p className="text-foreground/40 mb-6" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px" }}>Quando você fizer um pedido, ele aparece aqui.</p>
                          <Link to="/produtos" className="inline-block px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}>Explorar produtos</Link>
                        </div>
                      ) : (
                      <div className="space-y-2">
                        {user.orders.map((order) => {
                          const s = STATUS_MAP[order.status];
                          const datePtBr = (d: string) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
                          const lastEvent = order.history?.[0];
                          const isDelivered = order.status === "delivered";
                          const isShipped = order.status === "shipped";
                          const isProcessing = order.status === "processing";
                          const isCancelled = order.status === "cancelled";
                          const deliveredDate = isDelivered ? datePtBr(lastEvent?.date.split(" ")[0] || order.date) : null;
                          const returnDeadline = isDelivered ? datePtBr(new Date(new Date(lastEvent?.date.split(" ")[0] || order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]) : null;
                          const statusLineColor = isDelivered ? "text-green-500" : isShipped ? "text-blue-400" : isProcessing ? "text-yellow-500" : "text-red-400";
                          const statusLineText = isDelivered
                            ? `Entregue em ${deliveredDate} · Devolução grátis até ${returnDeadline}`
                            : isShipped
                            ? `Chega quinta, 18/Abr · em 3 dias`
                            : isProcessing
                            ? `Preparando seu pedido · Previsão: 22/Abr`
                            : `Cancelado em ${datePtBr(lastEvent?.date.split(" ")[0] || order.date)}`;
                          const StatusLineIcon = isDelivered ? Check : isShipped ? Truck : isProcessing ? Clock : XIcon;
                          const firstItem = order.items[0];
                          const extraItems = order.items.length - 1;
                          const paymentShort = order.paymentMethod?.split(" (")[0] || "Cartão";
                          return (
                            <div key={order.id}
                              onClick={() => setSelectedOrderId(order.id)}
                              className="group transition-all cursor-pointer relative overflow-hidden"
                              style={{
                                borderRadius: "14px",
                                background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                              }}
                            >
                              {/* Header: identidade + status + total */}
                              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${s.bg} ${s.color}`}>
                                  <s.icon size={15} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>Pedido {order.id}</p>
                                    <span className="text-foreground/40">·</span>
                                    <p className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>
                                      {new Date(order.date).toLocaleDateString("pt-BR")}
                                    </p>
                                  </div>
                                  <p className="text-foreground/50 mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px" }}>
                                    {order.items.length} {order.items.length === 1 ? "item" : "itens"} · {paymentShort}
                                  </p>
                                </div>
                                <span className={`px-2.5 py-1 flex-shrink-0 ${s.bg} ${s.color}`} style={{ borderRadius: "100px", fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                  {s.label}
                                </span>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "15px", fontWeight: 600 }}>{order.total}</p>
                                </div>
                              </div>

                              {/* Produto: thumb + nome inline */}
                              <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)" }}>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <div className="w-14 h-14 overflow-hidden border border-foreground/5" style={{ borderRadius: "10px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                                    <ImageWithFallback src={firstItem.image} alt={firstItem.name} className="w-full h-full object-cover" />
                                  </div>
                                  {order.items.slice(1, 3).map((item, i) => (
                                    <div key={i} className="w-10 h-10 overflow-hidden border border-foreground/5" style={{ borderRadius: "8px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                                      <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                  {extraItems > 2 && (
                                    <div className="w-10 h-10 flex items-center justify-center text-foreground/55" style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "11px", fontWeight: 600 }}>
                                      +{extraItems - 2}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-foreground truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: "var(--font-weight-medium)" }}>
                                    {firstItem.name}
                                  </p>
                                  {extraItems > 0 && (
                                    <p className="text-foreground/55 mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px" }}>+ {extraItems} {extraItems === 1 ? "outro item" : "outros itens"}</p>
                                  )}
                                </div>
                              </div>

                              {/* Status line contextual */}
                              <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)", background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)" }}>
                                <StatusLineIcon size={13} className={`${statusLineColor} flex-shrink-0`} />
                                <p className={`${statusLineColor} truncate`} style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                  {statusLineText}
                                </p>
                              </div>

                              {/* CTAs contextuais */}
                              <div className="flex items-center justify-between gap-2 px-4 py-3" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)" }}>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {isDelivered && (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); addItem({ ...firstItem, id: firstItem.name, price: firstItem.price, originalPrice: firstItem.price, category: "", brand: "", description: "", rating: 5, reviews: 0, images: [firstItem.image] } as any); }}
                                        className="px-3 py-1.5 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                                        style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                        <ShoppingBag size={12} /> Comprar de novo
                                      </button>
                                      <button onClick={(e) => e.stopPropagation()}
                                        className="px-3 py-1.5 text-foreground/70 hover:text-foreground transition-all cursor-pointer flex items-center gap-1.5"
                                        style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                        <Star size={12} /> Avaliar
                                      </button>
                                    </>
                                  )}
                                  {isShipped && (
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedOrderId(order.id); }}
                                      className="px-3 py-1.5 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                                      style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                      <Truck size={12} /> Rastrear pedido
                                    </button>
                                  )}
                                  {isProcessing && (
                                    <button onClick={(e) => e.stopPropagation()}
                                      className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                                      style={{ borderRadius: "8px", background: "rgba(239,68,68,0.06)", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                      <XIcon size={12} /> Cancelar
                                    </button>
                                  )}
                                  {isCancelled && (
                                    <button onClick={(e) => e.stopPropagation()}
                                      className="px-3 py-1.5 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                                      style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>
                                      <ShoppingBag size={12} /> Comprar de novo
                                    </button>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelectedOrderId(order.id); }}
                                  className="px-3 py-1.5 text-foreground/70 hover:text-primary transition-all flex-shrink-0 cursor-pointer flex items-center gap-1"
                                  style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}
                                >
                                  Ver detalhes <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      )}
                    </>
                  ) : (() => {
                    const order = user.orders.find(o => o.id === selectedOrderId);
                    if (!order) return null;
                    const s = STATUS_MAP[order.status];
                    
                    return (
                      <div className="space-y-6">
                        <button 
                          onClick={() => setSelectedOrderId(null)}
                          className="flex items-center gap-2 text-foreground/55 hover:text-primary transition-colors mb-6 group cursor-pointer"
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px" }}
                        >
                          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para pedidos
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "24px", fontWeight: "var(--font-weight-medium)" }}>Pedido {order.id}</h2>
                              <span className={`flex items-center gap-1.5 px-3 py-1 ${s.bg} ${s.color}`} style={{ borderRadius: "100px", fontSize: "11px", fontWeight: "var(--font-weight-medium)" }}>
                                {s.label}
                              </span>
                            </div>
                            <p className="text-foreground/45" style={{ fontSize: "13px" }}>Realizado em {new Date(order.date).toLocaleDateString("pt-BR")} às 14:30</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground/80 transition-colors cursor-pointer" style={{ borderRadius: "var(--radius-button)", fontSize: "12px" }}>
                              <Receipt size={14} /> Nota Fiscal
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground/80 transition-colors cursor-pointer" style={{ borderRadius: "var(--radius-button)", fontSize: "12px" }}>
                              <Share2 size={14} /> Compartilhar
                            </button>
                          </div>
                        </div>

                        {/* Visual Tracking */}
                        <div className="bg-foreground/[0.02] border border-foreground/5 p-8" style={{ borderRadius: "var(--radius-card)" }}>
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="text-foreground/88 font-medium" style={{ fontSize: "16px" }}>Acompanhamento do Pedido</h3>
                            {order.tracking && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary border border-primary/10" style={{ borderRadius: "var(--radius-button)" }}>
                                <Truck size={14} />
                                <span className="font-mono text-[11px] font-bold">{order.tracking}</span>
                                <button onClick={() => { navigator.clipboard.writeText(order.tracking!); }} className="hover:text-primary/70 transition-colors ml-1 cursor-pointer">
                                  <Copy size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <OrderStatusTimeline status={order.status} />
                          
                          {order.status !== "cancelled" && order.status !== "delivered" && (
                            <div className="mt-8 p-4 bg-primary/5 border border-primary/10 flex items-start gap-3" style={{ borderRadius: "var(--radius)" }}>
                              <Info size={16} className="text-primary mt-0.5" />
                              <div className="text-[12px] text-primary/80 leading-relaxed">
                                Seu pedido está seguindo o cronograma previsto. A data estimada de entrega é <strong>15 de Abril de 2026</strong>.
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Order History */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-background border border-foreground/5 overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
                              <div className="px-6 py-4 border-b border-foreground/5 bg-foreground/[0.01]">
                                <h3 className="text-foreground/80 font-medium" style={{ fontSize: "14px" }}>Histórico de Atualizações</h3>
                              </div>
                              <div className="p-6">
                                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-foreground/5">
                                  {order.history?.map((event, i) => (
                                    <div key={i} className="relative pl-8">
                                      <div className={`absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-4 border-background flex items-center justify-center z-10 ${
                                        i === 0 ? "bg-primary" : "bg-foreground/10"
                                      }`} />
                                      <div>
                                        <p className={`font-medium mb-1 ${i === 0 ? "text-foreground" : "text-foreground/65"}`} style={{ fontSize: "14px" }}>{event.description}</p>
                                        <p className="text-foreground/45" style={{ fontSize: "12px" }}>{event.date}</p>
                                      </div>
                                    </div>
                                  )) || (
                                    <div className="text-center py-4 text-foreground/45 text-[13px]">
                                      Nenhum histórico disponível para este pedido.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="bg-background border border-foreground/5 overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
                              <div className="px-6 py-4 border-b border-foreground/5 bg-foreground/[0.01]">
                                <h3 className="text-foreground/80 font-medium" style={{ fontSize: "14px" }}>Itens do Pedido</h3>
                              </div>
                              <div className="divide-y divide-foreground/5">
                                {order.items.map((item, i) => (
                                  <div key={i} className="p-6 flex items-center gap-4">
                                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden border border-foreground/5" style={{ borderRadius: "var(--radius)", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                                      <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-foreground font-medium mb-1 truncate" style={{ fontSize: "14px" }}>{item.name}</h4>
                                      <p className="text-foreground/45 mb-2" style={{ fontSize: "12px" }}>Quantidade: {item.qty}</p>
                                      <div className="flex items-center gap-2">
                                        <button className="text-primary hover:underline font-medium cursor-pointer" style={{ fontSize: "12px" }}>Comprar novamente</button>
                                        <span className="text-foreground/35">•</span>
                                        <button className="text-foreground/55 hover:text-foreground/75 transition-colors cursor-pointer" style={{ fontSize: "12px" }}>Ver produto</button>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-foreground font-semibold" style={{ fontSize: "15px" }}>{item.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="p-6 bg-foreground/[0.01] border-t border-foreground/5 space-y-2">
                                <div className="flex justify-between text-[13px] text-foreground/55">
                                  <span>Subtotal</span>
                                  <span>{order.total}</span>
                                </div>
                                <div className="flex justify-between text-[13px] text-foreground/55">
                                  <span>Frete</span>
                                  <span className="text-green-500">Grátis</span>
                                </div>
                                <div className="flex justify-between text-[16px] text-foreground font-bold pt-2">
                                  <span>Total</span>
                                  <span>{order.total}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Info */}
                          <div className="space-y-6">
                            <div className="bg-background border border-foreground/5 p-6" style={{ borderRadius: "var(--radius-card)" }}>
                              <h3 className="text-foreground/80 font-medium mb-4" style={{ fontSize: "14px" }}>Endereço de Entrega</h3>
                              <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-foreground/35 mt-1" />
                                <div>
                                  <p className="text-foreground/88 font-medium mb-1" style={{ fontSize: "13px" }}>{user.addresses[0].label}</p>
                                  <p className="text-foreground/55 leading-relaxed" style={{ fontSize: "12px" }}>
                                    {user.addresses[0].street}, {user.addresses[0].number}<br />
                                    {user.addresses[0].neighborhood}<br />
                                    {user.addresses[0].city} - {user.addresses[0].state}<br />
                                    CEP {user.addresses[0].cep}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-background border border-foreground/5 p-6" style={{ borderRadius: "var(--radius-card)" }}>
                              <h3 className="text-foreground/80 font-medium mb-4" style={{ fontSize: "14px" }}>Pagamento</h3>
                              <div className="flex items-center gap-3">
                                <CreditCard size={16} className="text-foreground/35" />
                                <p className="text-foreground/75" style={{ fontSize: "13px" }}>{order.paymentMethod || "Cartão de Crédito"}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-foreground/10 hover:border-foreground/30 text-foreground/75 transition-all font-medium cursor-pointer"
                                style={{ borderRadius: "var(--radius-button)", fontSize: "13px" }}>
                                <HelpCircle size={16} /> Preciso de ajuda
                              </button>
                              {order.status === "processing" && (
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-all font-medium border border-red-500/10 cursor-pointer"
                                  style={{ borderRadius: "var(--radius-button)", fontSize: "13px" }}>
                                  Cancelar Pedido
                                </button>
                              )}
                            </div>
                            
                            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 flex items-start gap-3" style={{ borderRadius: "var(--radius)" }}>
                              <AlertCircle size={16} className="text-yellow-500 mt-0.5" />
                              <p className="text-[11px] text-yellow-600 leading-normal">
                                Você tem até 7 dias após o recebimento para solicitar a devolução gratuita.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {activeTab === "favorites" && (
                <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Favoritos</h2>
                    {favoriteProducts.length > 0 && (
                      <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>{favoriteProducts.length} {favoriteProducts.length === 1 ? "produto" : "produtos"}</p>
                    )}
                  </div>
                  {favoriteProducts.length === 0 ? (
                    <div className="text-center py-20 px-6" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                      <Heart size={28} className="text-foreground/30 mx-auto mb-4" />
                      <p className="text-foreground/55 mb-2" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "15px", fontWeight: "var(--font-weight-medium)" }}>Nenhum favorito ainda</p>
                      <p className="text-foreground/45 mb-6" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px" }}>Clique no coração nos produtos pra salvá-los aqui.</p>
                      <Link to="/produtos" className="inline-block px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all" style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: "var(--font-weight-medium)" }}>Ver produtos</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {favoriteProducts.map((product) => (
                        <div key={product.id} className="group overflow-hidden transition-all" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                          <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden" style={{ background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                            <ImageWithFallback src={getPrimaryProductImage(product)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <button onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-primary hover:bg-black/40 transition-all backdrop-blur-md cursor-pointer"
                              style={{ borderRadius: "8px", background: "rgba(0,0,0,0.3)" }}
                            ><Heart size={12} className="fill-primary" /></button>
                          </Link>
                          <div className="p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <Star size={9} className="fill-primary text-primary" />
                              <span className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px" }}>{product.rating}</span>
                            </div>
                            <p className="text-foreground truncate mb-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", fontWeight: "var(--font-weight-medium)" }}>{product.name}</p>
                            <p className="text-foreground/70 mb-3" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>{product.price}</p>
                            <button onClick={() => addItem(product)}
                              className="w-full py-1.5 bg-primary text-primary-foreground flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
                              style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "11px", fontWeight: 600 }}
                            ><ShoppingBag size={11} /> Adicionar</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Endereços</h2>
                    <button className="px-3.5 py-1.5 text-primary hover:brightness-110 transition-all cursor-pointer" style={{ borderRadius: "8px", background: "rgba(255,43,46,0.08)", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}>+ Adicionar</button>
                  </div>
                  <div className="space-y-2">
                    {user.addresses.map((a) => (
                      <div key={a.id} className="flex items-start justify-between gap-4 p-4" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,43,46,0.08)" }}>
                            <MapPin size={15} className="text-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>{a.label}</span>
                              {a.isDefault && <span className="px-2 py-0.5 bg-primary/10 text-primary" style={{ borderRadius: "100px", fontFamily: "var(--font-family-inter)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em" }}>PADRÃO</span>}
                            </div>
                            <p className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px", lineHeight: "1.55" }}>
                              {a.street}, {a.number}{a.complement ? ` - ${a.complement}` : ""} · {a.neighborhood}<br />{a.city}/{a.state} · CEP {a.cep}
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 text-foreground/70 hover:text-foreground transition-colors flex-shrink-0 cursor-pointer" style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>Editar</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "data" && (
                <motion.div key="data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-foreground mb-5" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Dados Pessoais</h2>
                  <div className="p-5" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="block text-foreground/60 mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Nome</label>
                        <input value={user.name} onChange={(e) => updateUser({ name: e.target.value })} className="w-full text-foreground placeholder:text-foreground/40 focus:outline-none transition-all" style={{ padding: "11px 13px", borderRadius: "10px", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: 500 }} />
                      </div>
                      <div>
                        <label className="block text-foreground/60 mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>E-mail</label>
                        <input value={user.email} onChange={(e) => updateUser({ email: e.target.value })} className="w-full text-foreground placeholder:text-foreground/40 focus:outline-none transition-all" style={{ padding: "11px 13px", borderRadius: "10px", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: 500 }} />
                      </div>
                      <div>
                        <label className="block text-foreground/60 mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Telefone</label>
                        <input value={user.phone} onChange={(e) => updateUser({ phone: e.target.value })} className="w-full text-foreground placeholder:text-foreground/40 focus:outline-none transition-all" style={{ padding: "11px 13px", borderRadius: "10px", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: 500 }} />
                      </div>
                      <div>
                        <label className="block text-foreground/60 mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>CPF</label>
                        <input value={user.cpf} disabled className="w-full text-foreground placeholder:text-foreground/40 focus:outline-none transition-all opacity-50" style={{ padding: "11px 13px", borderRadius: "10px", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: 500 }} />
                      </div>
                    </div>
                    <button className="px-5 py-2.5 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{ borderRadius: "8px", fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 600 }}
                    >Salvar alterações</button>
                  </div>
                </motion.div>
              )}

              {activeTab === "cards" && (
                <motion.div key="cards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Cartões salvos</h2>
                    <button className="px-3.5 py-1.5 text-primary hover:brightness-110 transition-all cursor-pointer" style={{ borderRadius: "8px", background: "rgba(255,43,46,0.08)", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}>+ Adicionar</button>
                  </div>
                  <div className="space-y-2">
                    {user.cards.map((c) => (
                      <div key={c.id} className="flex items-center gap-4 p-4" style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                        <div className="w-11 h-7 flex items-center justify-center flex-shrink-0" style={{ borderRadius: "5px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                          <span className="text-foreground/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.04em" }}>{c.brand}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>•••• {c.last4}</p>
                            {c.isDefault && <span className="px-2 py-0.5 bg-primary/10 text-primary" style={{ borderRadius: "100px", fontFamily: "var(--font-family-inter)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em" }}>PADRÃO</span>}
                          </div>
                          <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px" }}>{c.name} · Validade {c.expiry}</p>
                        </div>
                        <button className="px-3 py-1.5 text-foreground/60 hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer" style={{ borderRadius: "8px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600 }}>Remover</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "help" && (
                <motion.div key="help" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-foreground mb-5" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Ajuda e Suporte</h2>
                  <div className="space-y-2">
                    {[
                      { title: "Central de Ajuda", desc: "Encontre respostas para suas dúvidas", icon: HelpCircle },
                      { title: "Fale Conosco", desc: "Entre em contato via chat ou e-mail", icon: User },
                      { title: "Política de Trocas", desc: "Saiba como trocar ou devolver", icon: Receipt },
                      { title: "Rastrear Pedido", desc: "Acompanhe sua entrega em tempo real", icon: Truck },
                    ].map((item) => (
                      <button key={item.title} className="group cursor-pointer w-full flex items-center gap-4 p-4 transition-all hover:bg-white/[0.01]"
                        style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,43,46,0.08)" }}>
                          <item.icon size={15} className="text-primary" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-foreground mb-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>{item.title}</p>
                          <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-foreground/35 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-foreground mb-5" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: "var(--font-weight-medium)" }}>Privacidade</h2>
                  <div className="space-y-2">
                    {[
                      { title: "Política de Privacidade", desc: "Como tratamos seus dados pessoais", icon: Shield, danger: false },
                      { title: "Cookies", desc: "Gerencie suas preferências de cookies", icon: Info, danger: false },
                      { title: "Excluir minha conta", desc: "Solicite a remoção permanente dos seus dados", icon: XIcon, danger: true },
                    ].map((item) => (
                      <button key={item.title} className="group cursor-pointer w-full flex items-center gap-4 p-4 transition-all hover:bg-white/[0.01]"
                        style={{ borderRadius: "14px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${item.danger ? "bg-red-500/10" : ""}`} style={{ background: item.danger ? "rgba(239,68,68,0.08)" : "rgba(255,43,46,0.08)" }}>
                          <item.icon size={15} className={item.danger ? "text-red-400" : "text-primary"} />
                        </div>
                        <div className="text-left flex-1">
                          <p className={`mb-0.5 ${item.danger ? "text-red-400" : "text-foreground"}`} style={{ fontFamily: "var(--font-family-inter)", fontSize: "13.5px", fontWeight: "var(--font-weight-medium)" }}>{item.title}</p>
                          <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}>{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-foreground/35 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
