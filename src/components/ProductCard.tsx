import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const handleWhatsApp = () => {
    let message = `Oi, vim do app Master Phones e quero o ${name}`;
    if (color) message += ` na cor ${color}`;
    if (storage) message += ` ${storage}`;
    message += ".";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-3xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-6 hover:bg-card/60 hover:border-primary/30 transition-all group"
    >
      {/* Product image */}
      <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-muted/20 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm">Imagem</span>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 flex flex-col gap-3 text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          {name}
        </h3>
        {color && (
          <p className="text-sm font-semibold text-primary">
            Cor: {color}
          </p>
        )}
        {storage && (
          <p className="text-sm font-medium text-muted-foreground">
            {storage}
          </p>
        )}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
        {price && (
          <p className="text-lg sm:text-xl font-bold text-foreground">
            {price}
          </p>
        )}
      </div>

      {/* WhatsApp button */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Button
          onClick={handleWhatsApp}
          className="w-full sm:w-auto bg-muted hover:bg-muted/80 text-foreground font-semibold px-6 py-6 rounded-full transition-all"
        >
          Pedir no WhatsApp
        </Button>
      </div>
    </motion.div>
  );
}
