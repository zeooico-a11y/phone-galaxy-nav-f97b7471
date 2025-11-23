import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  price_text: string | null;
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      // Lista de produtos a excluir do carrocel
      const excludedProducts = [
        'iPhone 15 Pro Max',
        'iPhone 16 Pro',
        'Galaxy S24 Ultra',
        'Galaxy S24+',
        'iPhone 15',
        'iPhone 14',
        'iPhone 13',
        'iPhone 11'
      ];

      const { data } = await supabase
        .from("products")
        .select("id, name, image_url, price_text, price")
        .eq("is_active", true)
        .not("image_url", "is", null)
        .limit(50);
      
      if (data) {
        // Filtrar produtos excluídos e sem imagens válidas
        const validProducts = data.filter(p => 
          p.image_url && 
          p.image_url.trim() !== '' &&
          !excludedProducts.includes(p.name)
        );
        
        // Ordenar por preço e limitar a 15 produtos
        const sortedProducts = [...validProducts]
          .sort((a, b) => {
            const priceA = a.price || parseFloat(a.price_text?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
            const priceB = b.price || parseFloat(b.price_text?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
            return priceB - priceA;
          })
          .slice(0, 15);
          
        setProducts(sortedProducts);
      }
    };

    fetchProducts();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (products.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 relative group">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center"
      >
        Catálogo de Produtos
      </motion.h2>
      
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 hover:bg-card hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] opacity-0 group-hover:opacity-100 active:scale-95"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 hover:bg-card hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] opacity-0 group-hover:opacity-100 active:scale-95"
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={cn(
                "flex-[0_0_280px] min-w-0 cursor-pointer",
                "bg-card/50 backdrop-blur-xl border-2 border-border/50",
                "rounded-2xl p-6 hover:bg-card/70 hover:border-primary/30",
                "hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]",
                "transition-all duration-300"
              )}
              onClick={() => navigate(`/produto/${product.id}`)}
            >
              {/* Product Image */}
              <ProductImage
                src={product.image_url}
                alt={product.name}
                containerClassName="aspect-square mb-4 rounded-xl border border-border/30"
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
              />

              {/* Product Info */}
              <div className="text-center space-y-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
                {product.price_text && (
                  <p className="text-primary font-bold text-lg">
                    {product.price_text}
                  </p>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/produto/${product.id}`);
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-primary/20 backdrop-blur-xl border border-primary/50 hover:bg-primary/30 transition-all text-primary text-sm font-semibold"
                >
                  Pedir no WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
