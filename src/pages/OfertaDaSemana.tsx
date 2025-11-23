import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import earthNight from "@/assets/earth-night.jpg";

interface Promotion {
  id: string;
  original_price: string | null;
  promotional_price: string;
  highlight_text: string | null;
  products: {
    name: string;
    image_url: string | null;
    color: string | null;
    storage: string | null;
    description: string | null;
  } | null;
}

export default function OfertaDaSemana() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPromotions();
    fetchBannerImage();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from("promotions")
        .select(`
          id,
          original_price,
          promotional_price,
          highlight_text,
          products (
            name,
            image_url,
            color,
            storage,
            description
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (error: any) {
      console.error("Error fetching promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBannerImage = async () => {
    try {
      const { data } = await supabase
        .from("site_images")
        .select("image_url")
        .eq("image_key", "oferta-semana-banner")
        .single();

      if (data?.image_url) {
        setBannerImage(data.image_url);
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const handleWhatsApp = (promo: Promotion) => {
    if (!promo.products) return;

    let economia = "0";
    if (promo.original_price) {
      const original = parseFloat(promo.original_price.replace(/[^\d,]/g, '').replace(',', '.'));
      const promotional = parseFloat(promo.promotional_price.replace(/[^\d,]/g, '').replace(',', '.'));
      economia = (original - promotional).toFixed(2).replace('.', ',');
    }
    
    const message = `⭐ *OFERTA DA SEMANA!*\n\n` +
      `📱 *Produto:* ${promo.products.name}\n` +
      `${promo.products.storage ? `💾 *Armazenamento:* ${promo.products.storage}\n` : ''}` +
      `${promo.products.color ? `🎨 *Cor:* ${promo.products.color}\n` : ''}` +
      `${promo.original_price ? `💰 *Preço Normal:* ${promo.original_price}\n` : ''}` +
      `✨ *Preço Especial:* ${promo.promotional_price}\n` +
      `${promo.original_price ? `💵 *Você economiza:* R$ ${economia}\n` : ''}` +
      `${promo.highlight_text ? `\n🏷️ ${promo.highlight_text}\n` : ''}` +
      `\n━━━━━━━━━━━━━━━━━\n` +
      `🎁 *OFERTA VÁLIDA POR TEMPO LIMITADO!*\n\n` +
      `Quero garantir essa oferta!\n` +
      `Por favor, me confirme:\n` +
      `• Disponibilidade em estoque\n` +
      `• Condições de pagamento (à vista/parcelado)\n` +
      `• Prazo de entrega\n` +
      `• Garantia do produto`;
    
    const phone = "5535999366561";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={bannerImage || earthNight}
          alt="Background"
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
          {promotions.length > 0 ? (
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
                  {promotions.map((promo, index) => (
                    <CarouselItem key={promo.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
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

                        {/* Highlight text */}
                        {promo.highlight_text && (
                          <div className="absolute -top-2 left-4 px-3 py-1 bg-primary rounded-full">
                            <span className="text-xs font-bold text-primary-foreground">
                              {promo.highlight_text}
                            </span>
                          </div>
                        )}

                        {/* Product image */}
                        <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center border border-border/30 overflow-hidden mt-4">
                          {promo.products?.image_url ? (
                            <img 
                              src={promo.products.image_url} 
                              alt={promo.products.name}
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <Shield className="w-24 h-24 text-muted-foreground" />
                          )}
                        </div>

                        {/* Product info */}
                        <div className="space-y-3">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">
                            {promo.products?.name || "Produto"}
                          </h3>
                          {promo.products?.storage && (
                            <p className="text-sm text-muted-foreground">{promo.products.storage}</p>
                          )}
                          {promo.products?.color && (
                            <p className="text-sm text-muted-foreground">Cor: {promo.products.color}</p>
                          )}
                          
                          <div className="space-y-1">
                            {promo.original_price && (
                              <p className="text-sm text-muted-foreground line-through">
                                {promo.original_price}
                              </p>
                            )}
                            <p className="text-3xl font-black text-primary">
                              {promo.promotional_price}
                            </p>
                          </div>
                        </div>

                        {/* WhatsApp button */}
                        <Button
                          onClick={() => handleWhatsApp(promo)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all hover:scale-[0.98]"
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
          ) : (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-foreground">Nenhuma promoção disponível no momento</p>
              <p className="text-muted-foreground mt-2">Volte em breve para conferir as ofertas!</p>
            </div>
          )}

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
