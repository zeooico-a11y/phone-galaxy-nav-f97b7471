import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";

interface ProductSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
}

const phoneCategories = [
  {
    id: "iphone",
    brand: "Apple • iPhone",
    models: [
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14",
      "iPhone 13",
    ],
  },
  {
    id: "samsung",
    brand: "Samsung Galaxy",
    models: [
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy Z Fold 5",
      "Galaxy Z Flip 5",
      "Galaxy A55",
      "Galaxy A35",
    ],
  },
  {
    id: "xiaomi",
    brand: "Xiaomi / Redmi / Poco",
    models: [
      "Xiaomi 14 Pro",
      "Xiaomi 14",
      "Xiaomi 13T Pro",
      "Redmi Note 13 Pro",
      "Redmi Note 13",
      "Poco X6 Pro",
    ],
  },
  {
    id: "acessorios",
    brand: "Acessórios",
    models: [
      "Capinhas Premium",
      "Película de Vidro 3D",
      "Carregador Rápido USB-C",
      "Fone Bluetooth",
      "Power Bank 20.000mAh",
      "Cabo USB-C / Lightning",
    ],
  },
];

export function ProductSidebar({ open, onOpenChange, selectedCategory }: ProductSidebarProps) {
  const filteredCategories = selectedCategory && selectedCategory !== "all"
    ? phoneCategories.filter((cat) => cat.id === selectedCategory)
    : phoneCategories;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 bg-sidebar border-r border-border">
        <SheetHeader className="p-6 border-b border-border bg-card/30">
          <SheetTitle className="text-left text-xl font-display text-foreground flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            Catálogo
          </SheetTitle>
          <p className="text-xs text-muted-foreground text-left">
            Modelos disponíveis para entrega
          </p>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-90px)]">
          <div className="p-5 space-y-6">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="space-y-3"
              >
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-primary border-b border-primary/30 pb-2">
                  {category.brand}
                </h3>
                <ul className="space-y-2">
                  {category.models.map((model, modelIndex) => (
                    <motion.li
                      key={model}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIndex * 0.1 + modelIndex * 0.05 }}
                    >
                      <button
                        className="w-full text-left px-4 py-3 rounded-xl bg-card/40 hover:bg-card/60 border border-border/50 hover:border-primary/50 text-sm transition-all hover:shadow-glow group"
                        onClick={() => {
                          console.log("Modelo selecionado:", model);
                        }}
                      >
                        <span className="text-foreground/90 group-hover:text-primary transition-colors">
                          {model}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
