import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/ProductImage";

interface ProductGridCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  tag?: string;
}

export function ProductGridCard({ id, name, price, image, tag }: ProductGridCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => navigate(`/produto/${id}`)}
    >
      <Card className="overflow-hidden border-border/50 backdrop-blur-sm bg-card/80 hover:bg-card transition-all duration-300 h-full flex flex-col">
        <ProductImage
          src={image}
          alt={name}
          containerClassName="relative aspect-square"
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        {tag && (
          <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm z-10">
            {tag}
          </Badge>
        )}

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-primary font-bold text-xl">{price}</p>
        </div>
      </Card>
    </motion.div>
  );
}
