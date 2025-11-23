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
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-wider text-foreground">
              OFERTA DA SEMANA
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              ⚡ Promoções exclusivas só pelo WhatsApp ⚡
            </p>
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
                  loop: false,
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
                        className="group relative flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-card/60 via-card/80 to-card/60 backdrop-blur-xl border-2 border-orange-500/30 p-6 transition-all hover:border-orange-400/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02]"
                      >
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badge */}
                        <div className="absolute -top-3 -right-3 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse">
                          <Shield className="w-6 h-6 text-white" />
                        </div>

                        {/* Highlight text */}
                        {promo.highlight_text && (
                          <div className="absolute -top-3 left-4 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                            <span className="text-xs font-bold text-white drop-shadow">
                              {promo.highlight_text}
                            </span>
                          </div>
                        )}

                        {/* Product image */}
                        <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 flex items-center justify-center border-2 border-orange-500/20 overflow-hidden mt-4 group-hover:border-orange-400/40 transition-all">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                          {promo.products?.image_url ? (
                            <img 
                              src={promo.products.image_url} 
                              alt={promo.products.name}
                              className="relative z-10 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
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
                          className="relative z-10 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold rounded-full py-6 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all hover:scale-105"
                        >
                          🚀 Pedir no WhatsApp
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
