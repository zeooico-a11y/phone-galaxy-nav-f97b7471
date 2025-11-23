import { motion } from "framer-motion";
import { ArrowLeft, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import earthNight from "@/assets/earth-night.jpg";

const ofertas = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    originalPrice: "R$ 8.999",
    discountPrice: "R$ 7.199",
    discount: "20% OFF",
    storage: "256GB",
  },
  {
    id: 2,
    name: "Samsung S23 Ultra",
    originalPrice: "R$ 6.999",
    discountPrice: "R$ 5.599",
    discount: "20% OFF",
    storage: "256GB",
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    originalPrice: "R$ 4.999",
    discountPrice: "R$ 4.199",
    discount: "16% OFF",
    storage: "512GB",
  },
  {
    id: 4,
    name: "iPhone 13",
    originalPrice: "R$ 4.999",
    discountPrice: "R$ 3.999",
    discount: "20% OFF",
    storage: "128GB",
  },
];

export default function OfertasDoDia() {
  const navigate = useNavigate();

  const handleWhatsApp = (oferta: typeof ofertas[0]) => {
    const message = `Oi! Vi a oferta do ${oferta.name} ${oferta.storage} por ${oferta.discountPrice} (${oferta.discount}). Quero saber mais!`;
    const phone = "5511999999999"; // Substituir pelo número real
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={earthNight}
          alt="Earth at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-4 sm:px-6 pt-4 sm:pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Button>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-display font-black tracking-wider">
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                OFERTAS DO DIA
              </span>
            </h1>
            <p className="text-foreground/80">Aproveite os melhores preços em celulares importados</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ofertas.map((oferta, index) => (
              <motion.div
                key={oferta.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col gap-4 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 p-6 transition-all hover:bg-card/60 hover:border-primary/50 hover:shadow-glow"
              >
                {/* Discount badge */}
                <div className="absolute -top-3 -right-3 flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  <Tag className="w-3 h-3" />
                  {oferta.discount}
                </div>

                {/* Placeholder image */}
                <div className="w-full aspect-square rounded-xl bg-muted/20 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Imagem</span>
                </div>

                {/* Product info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{oferta.name}</h3>
                  <p className="text-sm text-muted-foreground">{oferta.storage}</p>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground line-through">
                      {oferta.originalPrice}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {oferta.discountPrice}
                    </p>
                  </div>
                </div>

                {/* WhatsApp button */}
                <Button
                  onClick={() => handleWhatsApp(oferta)}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  Pedir no WhatsApp
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
