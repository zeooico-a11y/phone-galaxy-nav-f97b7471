import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, MessageCircle, Package } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductModal } from "@/components/ProductModal";
import { ActionButtons } from "@/components/ActionButtons";
import { DeliverySteps } from "@/components/DeliverySteps";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import earthNight from "@/assets/earth-night.jpg";

// Custom Xiaomi-style icon
const XiaomiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm4 0h-2V7h2v10zm4 0h-2V7h2v10z" />
  </svg>
);

const categories = [
  { id: "iphone", label: "iPhone", icon: Apple },
  { id: "samsung", label: "Samsung", icon: MessageCircle },
  { id: "xiaomi", label: "Xiaomi", icon: XiaomiIcon },
  { id: "acessorios", label: "Acessórios", icon: Package },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setModalOpen(true);
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
                onClick={() => handleCategoryClick(cat.id)}
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

      {/* Product modal */}
      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={selectedCategory}
      />

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
