import { motion } from "framer-motion";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  description: string;
  image?: string;
  color?: string;
  storage?: string;
  price?: string;
  whatsappNumber?: string;
  index?: number;
}

export function ProductCard({ 
  name, 
  description, 
  image,
  color,
  storage,
  price,
  whatsappNumber = "5511999999999",
  index = 0 
}: ProductCardProps) {
  const [showButtons, setShowButtons] = useState(false);

  // Extrair valor numérico do preço
  const priceValue = price 
    ? parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-xl border-2 border-border/50 p-5 sm:p-6 lg:p-7 hover:bg-card/70 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,163,255,0.2)] transition-all group"
    >
      {/* Product image */}
      <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-xl sm:rounded-2xl bg-muted/20 flex items-center justify-center overflow-hidden border-2 border-border/30">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm">Imagem</span>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
          {name}
        </h3>
        {color && (
          <p className="text-xs sm:text-sm font-semibold text-primary">
            Cor: {color}
          </p>
        )}
        {storage && (
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {storage}
          </p>
        )}
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
        {price && (
          <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground mt-1">
            {price}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        {price && priceValue > 0 && (
          <AddToCartButton
            productId={`${name}-${color || 'default'}-${storage || 'default'}`}
            productName={name}
            productPrice={priceValue}
            productPriceText={price}
            productImage={image}
            productColor={color}
            productStorage={storage}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl transition-all hover:shadow-[0_0_16px_rgba(0,163,255,0.5)] active:scale-95 text-sm sm:text-base"
          />
        )}
      </div>
    </motion.div>
  );
}
