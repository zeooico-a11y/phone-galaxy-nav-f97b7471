import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id?: string;
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
  id,
  name, 
  description, 
  image,
  color,
  storage,
  price,
  whatsappNumber = "5511999999999",
  index = 0 
}: ProductCardProps) {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  // Extrair valor numérico do preço
  const priceValue = price 
    ? parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0
    : 0;

  const handleWhatsApp = () => {
    let message = `👋 Olá! Vi o produto *${name}* no catálogo e gostaria de mais informações.\n\n`;
    if (color) message += `🎨 *Cor:* ${color}\n`;
    if (storage) message += `💾 *Armazenamento:* ${storage}\n`;
    if (price) message += `💰 *Preço:* ${price}\n`;
    message += `\nPoderia me informar sobre disponibilidade e formas de pagamento?`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não navegar se clicar nos botões
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (id) {
      navigate(`/produto/${id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-xl border-2 border-border/50 p-5 sm:p-6 lg:p-7 hover:bg-card/70 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,163,255,0.2)] transition-all group cursor-pointer"
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
      <div className="flex-shrink-0 w-full sm:w-auto flex flex-col gap-2">
        {price && priceValue > 0 && (
          <>
            <AddToCartButton
              productId={`${name}-${color || 'default'}-${storage || 'default'}`}
              productName={name}
              productPrice={priceValue}
              productPriceText={price}
              productImage={image}
              productColor={color}
              productStorage={storage}
              className="w-full sm:w-auto font-semibold px-5 py-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl transition-all hover:shadow-[0_0_16px_rgba(0,163,255,0.5)] active:scale-95 text-sm sm:text-base"
            />
            <AddToCartButton
              productId={`${name}-${color || 'default'}-${storage || 'default'}`}
              productName={name}
              productPrice={priceValue}
              productPriceText={price}
              productImage={image}
              productColor={color}
              productStorage={storage}
              redirectToCheckout={true}
              variant="secondary"
              className="w-full sm:w-auto font-semibold px-5 py-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl transition-all active:scale-95 text-sm sm:text-base"
            />
          </>
        )}
        <Button
          onClick={handleWhatsApp}
          className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-5 py-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl transition-all active:scale-95 text-sm sm:text-base"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar pelo WhatsApp
        </Button>
      </div>
    </motion.div>
  );
}
