import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
}

const phoneCategories = [
  {
    id: "iphone",
    brand: "Apple • iPhone",
    route: "/catalogo-iphone",
  },
  {
    id: "samsung",
    brand: "Samsung Galaxy",
    route: "/catalogo-samsung",
  },
  {
    id: "xiaomi",
    brand: "Xiaomi / Redmi / Poco",
    route: "/catalogo-xiaomi",
  },
  {
    id: "acessorios",
    brand: "Acessórios",
    route: "/catalogo-acessorios",
  },
];

export function ProductSidebar({ open, onOpenChange, selectedCategory }: ProductSidebarProps) {
  const navigate = useNavigate();
  
  const filteredCategories = selectedCategory && selectedCategory !== "all"
    ? phoneCategories.filter((cat) => cat.id === selectedCategory)
    : phoneCategories;

  const handleCategoryClick = (route: string) => {
    navigate(route);
    onOpenChange(false);
  };

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
          <div className="p-5 space-y-4">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-5 px-5 rounded-xl border-2"
                  onClick={() => handleCategoryClick(category.route)}
                >
                  <div className="flex flex-col items-start gap-1 w-full">
                    <span className="font-display font-semibold text-base">{category.brand}</span>
                    <span className="text-xs text-muted-foreground">
                      Ver catálogo completo →
                    </span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
