import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  price_text: string | null;
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, image_url, price_text")
        .eq("is_active", true)
        .order("name")
        .limit(20);
      
      if (data) setProducts(data);
    };

    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center"
      >
        Catálogo de Aparelhos
      </motion.h2>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex-[0_0_280px] min-w-0 cursor-pointer",
                "bg-card/50 backdrop-blur-xl border-2 border-border/50",
                "rounded-2xl p-6 hover:bg-card/70 hover:border-primary/30",
                "hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]",
                "transition-all duration-300 group"
              )}
              onClick={() => navigate(`/produto/${product.id}`)}
            >
              {/* Product Image */}
              <div className="aspect-square mb-4 rounded-xl bg-muted/20 overflow-hidden border border-border/30">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Imagem</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="text-center space-y-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                {product.price_text && (
                  <p className="text-primary font-bold text-lg">
                    {product.price_text}
                  </p>
                )}
                <button className="w-full py-2 px-4 rounded-xl bg-primary/20 backdrop-blur-xl border border-primary/50 hover:bg-primary/30 transition-all text-primary text-sm font-semibold">
                  Pedir no WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
