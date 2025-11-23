import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Package, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/ProductImage";

interface Product {
  id: string;
  name: string;
  description: string | null;
  storage: string | null;
  color: string | null;
  image_url: string | null;
  brand: string | null;
  price_text: string | null;
  categories?: {
    name: string;
  } | null;
}

interface SearchResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: Product[];
  searchTerm: string;
}

export function SearchResultsModal({ 
  open, 
  onOpenChange, 
  results, 
  searchTerm 
}: SearchResultsModalProps) {
  const navigate = useNavigate();
  
  const handleProductClick = (productId: string) => {
    navigate(`/produto/${productId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30 max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl flex items-center justify-between">
            <span>
              Resultados para "{searchTerm}"
              {results.length > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({results.length} {results.length === 1 ? 'produto' : 'produtos'})
                </span>
              )}
            </span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-120px)]">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative flex flex-col gap-3 rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 p-4 transition-all hover:bg-background/80 hover:border-primary/50 hover:shadow-glow cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product image */}
                  <ProductImage
                    src={product.image_url}
                    alt={product.name}
                    containerClassName="relative w-full aspect-square rounded-xl border border-border/30"
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Product info */}
                  <div className="space-y-2 flex-1">
                    {product.categories && (
                      <p className="text-xs text-primary font-semibold">
                        {product.categories.name}
                      </p>
                    )}
                    <h3 className="text-base font-bold text-foreground line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {(product.storage || product.color) && (
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {product.storage && <span>💾 {product.storage}</span>}
                        {product.color && <span>🎨 {product.color}</span>}
                      </div>
                    )}

                    {product.price_text && (
                      <p className="text-lg font-bold text-primary">
                        {product.price_text}
                      </p>
                    )}

                    {product.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-muted-foreground max-w-md">
                Não encontramos produtos com "{searchTerm}". 
                Tente buscar por marca, modelo ou categoria.
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
