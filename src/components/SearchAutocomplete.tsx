import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  brand: string | null;
  price_text: string | null;
  storage: string | null;
  color: string | null;
}

interface SearchAutocompleteProps {
  onClose: () => void;
}

export function SearchAutocomplete({ onClose }: SearchAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      setShowResults(true);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, image_url, brand, price_text, storage, color")
          .eq("is_active", true)
          .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,storage.ilike.%${searchTerm}%,color.ilike.%${searchTerm}%`)
          .order("name")
          .limit(8);

        if (error) throw error;
        setResults(data || []);
      } catch (error) {
        console.error("Erro ao buscar:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleProductClick = (productId: string) => {
    navigate(`/produto/${productId}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="relative"
      ref={searchRef}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
        <Input
          ref={inputRef}
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-10 py-2 w-48 sm:w-64 md:w-80 bg-card/60 backdrop-blur-xl border-border/50"
          autoFocus
        />
        {loading && (
          <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
        <button
          onClick={onClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <AnimatePresence>
        {showResults && searchTerm.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleProductClick(product.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
                      "hover:bg-primary/10 hover:border-primary/30 border border-transparent"
                    )}
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-muted/20 overflow-hidden border border-border/30">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Search className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        {product.brand && <span>{product.brand}</span>}
                        {product.storage && (
                          <>
                            <span>•</span>
                            <span>{product.storage}</span>
                          </>
                        )}
                        {product.color && (
                          <>
                            <span>•</span>
                            <span>{product.color}</span>
                          </>
                        )}
                      </div>
                      {product.price_text && (
                        <p className="text-sm font-bold text-primary mt-1">
                          {product.price_text}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum produto encontrado para "{searchTerm}"
                  </p>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
