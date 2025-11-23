import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import earthNight from "@/assets/earth-night.jpg";

const ofertas = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    originalPrice: "R$ 9.500",
    promoPrice: "R$ 7.999",
    storage: "256GB",
  },
  {
    id: 2,
    name: "iPhone 14 Pro Max",
    originalPrice: "R$ 8.500",
    promoPrice: "R$ 6.999",
    storage: "256GB",
  },
  {
    id: 3,
    name: "Galaxy S24 Ultra",
    originalPrice: "R$ 8.500",
    promoPrice: "R$ 7.999",
    storage: "512GB",
  },
  {
    id: 4,
    name: "Galaxy S23 Ultra",
    originalPrice: "R$ 7.500",
    promoPrice: "R$ 6.799",
    storage: "256GB",
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    originalPrice: "R$ 6.500",
    promoPrice: "R$ 5.799",
    storage: "512GB",
  },
  {
    id: 6,
    name: "Redmi Note 13 Pro",
    originalPrice: "R$ 3.500",
    promoPrice: "R$ 2.999",
    storage: "256GB",
  },
];

export default function OfertaDaSemana() {
  const navigate = useNavigate();

  const handleWhatsApp = (oferta: typeof ofertas[0]) => {
    const message = `Oi, vim do app Master Phones e quero aproveitar a Oferta da Semana: ${oferta.name} por ${oferta.promoPrice}`;
    const phone = "5511999999999";
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
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Title banner */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative px-8 sm:px-16 py-4 sm:py-6 rounded-3xl bg-gradient-to-r from-card/60 via-card/80 to-card/60 backdrop-blur-md border-2 border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wider text-center">
                <span className="bg-gradient-chrome bg-clip-text text-transparent">
                  OFERTA DA SEMANA
                </span>
              </h1>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-muted-foreground text-center"
            >
              Promoções exclusivas só pelo WhatsApp
            </motion.p>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative px-4 sm:px-12"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {ofertas.map((oferta, index) => (
                  <CarouselItem key={oferta.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="group relative flex flex-col gap-4 rounded-2xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-6 transition-all hover:bg-card/60 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      {/* Badge */}
                      <div className="absolute -top-3 -right-3 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full shadow-glow">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                      </div>

                      {/* Product image placeholder */}
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center border border-border/30">
                        <span className="text-muted-foreground text-sm">Imagem</span>
                      </div>

                      {/* Product info */}
                      <div className="space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          {oferta.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{oferta.storage}</p>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground line-through">
                            {oferta.originalPrice}
                          </p>
                          <p className="text-3xl font-black text-foreground">
                            {oferta.promoPrice}
                          </p>
                        </div>
                      </div>

                      {/* WhatsApp button */}
                      <Button
                        onClick={() => handleWhatsApp(oferta)}
                        className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-full transition-all hover:scale-[0.98]"
                      >
                        Pedir no WhatsApp
                      </Button>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-6 lg:-left-12 bg-card/60 backdrop-blur-md border-primary/30 hover:bg-card hover:border-primary" />
              <CarouselNext className="hidden sm:flex -right-6 lg:-right-12 bg-card/60 backdrop-blur-md border-primary/30 hover:bg-card hover:border-primary" />
            </Carousel>

            {/* Mobile swipe hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center text-xs text-muted-foreground sm:hidden"
            >
              👈 Deslize para ver mais ofertas 👉
            </motion.p>
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground"
          >
            Aproveite agora! Ofertas válidas enquanto durarem os estoques.
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
