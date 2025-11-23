import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Menu, MessageCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductModal } from "@/components/ProductModal";
import { ProductSidebar } from "@/components/ProductSidebar";
import { ActionButtons } from "@/components/ActionButtons";
import { DeliverySteps } from "@/components/DeliverySteps";
import { LocationSection } from "@/components/LocationSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import earthNight from "@/assets/earth-night.jpg";

// Custom Xiaomi-style icon
const XiaomiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm4 0h-2V7h2v10zm4 0h-2V7h2v10z" />
  </svg>
);

const categories = [
  { id: "iphone", label: "iPhone", icon: Apple, route: "/catalogo-iphone" },
  { id: "samsung", label: "Samsung", icon: MessageCircle, route: "/catalogo-samsung" },
  { id: "xiaomi", label: "Xiaomi", icon: XiaomiIcon, route: "/catalogo-xiaomi" },
  { id: "acessorios", label: "Acessórios", icon: Package, route: "/catalogo-acessorios" },
];

const Index = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  const handleMenuClick = () => {
    setSelectedCategory("all");
    setSidebarOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with image and overlay */}
      <div className="fixed inset-0 -z-10">
        <img
          src={earthNight}
          alt="Earth at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleMenuClick}
          className="p-3 rounded-full bg-card/40 backdrop-blur-md border border-border/50 hover:bg-card/60 hover:border-primary/50 transition-all hover:shadow-glow"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </motion.button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 pb-8 pt-4">
        {/* Logo and tagline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center mt-8 sm:mt-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
            <span className="bg-gradient-chrome bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">
              MASTER
            </span>
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-[0.15em] sm:tracking-[0.2em] leading-tight -mt-2">
            <span className="bg-gradient-chrome bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">
              PHONES
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-foreground/70 font-display"
          >
            Importados
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 sm:mt-12 text-base sm:text-lg text-foreground font-light"
          >
            Celulares importados originais, com garantia e entrega rápida
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Toque em uma marca para ver os modelos disponíveis
          </motion.p>
        </motion.div>

        {/* Action buttons */}
        <ActionButtons />

        {/* Category cards */}
        <div className="w-full max-w-2xl px-2 sm:px-4 space-y-6 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                onClick={() => handleCategoryClick(cat.route)}
                delay={1.1 + index * 0.1}
              />
            ))}
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Envio para todo Brasil com rastreio</span>
          </motion.div>
        </div>

      </main>

      {/* Delivery steps */}
      <DeliverySteps />

      {/* Oferta da semana card */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate("/oferta-da-semana")}
          className="cursor-pointer group relative overflow-hidden rounded-3xl bg-gradient-to-r from-card/60 via-card/80 to-card/60 backdrop-blur-md border-2 border-primary/30 p-8 transition-all hover:border-primary hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-[1.02]"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/50 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/50 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-3xl" />
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-wider">
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                OFERTA DA SEMANA
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Promoções exclusivas só pelo WhatsApp
            </p>
            <div className="mt-2 px-6 py-2 rounded-full bg-primary/20 border border-primary/30">
              <p className="text-sm font-semibold text-primary">
                6 ofertas imperdíveis • Clique para ver →
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Location section */}
      <LocationSection />

      {/* Product modal */}
      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={selectedCategory}
      />

      {/* Product sidebar */}
      <ProductSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        selectedCategory={selectedCategory}
      />

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
