import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  storage: string[];
  price: string;
  image?: string;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string | null;
}

const products: Record<string, Product[]> = {
  iphone: [
    { name: "iPhone 15 Pro Max", storage: ["256GB", "512GB", "1TB"], price: "R$ 9.999" },
    { name: "iPhone 15 Pro", storage: ["128GB", "256GB", "512GB"], price: "R$ 8.999" },
    { name: "iPhone 15", storage: ["128GB", "256GB", "512GB"], price: "R$ 7.499" },
    { name: "iPhone 14 Pro Max", storage: ["128GB", "256GB", "512GB"], price: "R$ 7.999" },
    { name: "iPhone 14 Pro", storage: ["128GB", "256GB", "512GB"], price: "R$ 6.999" },
    { name: "iPhone 13", storage: ["128GB", "256GB"], price: "R$ 4.999" },
  ],
  samsung: [
    { name: "Galaxy S24 Ultra", storage: ["256GB", "512GB", "1TB"], price: "R$ 7.999" },
    { name: "Galaxy S24+", storage: ["256GB", "512GB"], price: "R$ 6.499" },
    { name: "Galaxy S24", storage: ["128GB", "256GB"], price: "R$ 5.499" },
    { name: "Galaxy Z Fold 5", storage: ["256GB", "512GB"], price: "R$ 9.499" },
    { name: "Galaxy Z Flip 5", storage: ["256GB", "512GB"], price: "R$ 5.999" },
    { name: "Galaxy A55", storage: ["128GB", "256GB"], price: "R$ 2.499" },
    { name: "Galaxy A35", storage: ["128GB", "256GB"], price: "R$ 1.899" },
  ],
  xiaomi: [
    { name: "Xiaomi 14 Pro", storage: ["256GB", "512GB"], price: "R$ 4.999" },
    { name: "Xiaomi 14", storage: ["256GB", "512GB"], price: "R$ 4.499" },
    { name: "Xiaomi 13T Pro", storage: ["256GB", "512GB"], price: "R$ 3.499" },
    { name: "Redmi Note 13 Pro", storage: ["128GB", "256GB"], price: "R$ 1.799" },
    { name: "Poco X6 Pro", storage: ["256GB", "512GB"], price: "R$ 2.299" },
    { name: "Redmi 12", storage: ["128GB", "256GB"], price: "R$ 1.199" },
  ],
  acessorios: [
    { name: "Capinha Premium", storage: ["Universal"], price: "R$ 89" },
    { name: "Película 3D", storage: ["Universal"], price: "R$ 59" },
    { name: "Carregador Turbo", storage: ["20W", "30W", "65W"], price: "R$ 79" },
    { name: "Fone Bluetooth", storage: ["Standard"], price: "R$ 149" },
    { name: "Power Bank", storage: ["10000mAh", "20000mAh"], price: "R$ 129" },
    { name: "Cabo Original", storage: ["USB-C", "Lightning"], price: "R$ 49" },
  ],
};

const categoryTitles: Record<string, string> = {
  iphone: "iPhone",
  samsung: "Samsung",
  xiaomi: "Xiaomi",
  acessorios: "Acessórios",
};

export function ProductModal({ open, onOpenChange, category }: ProductModalProps) {
  const [selectedStorage, setSelectedStorage] = useState<Record<string, string>>({});

  const categoryProducts = category ? products[category] || [] : [];
  const categoryTitle = category ? categoryTitles[category] || "" : "";

  const handleWhatsApp = (product: Product, storage: string) => {
    const message = `Oi, vim do app Master Phones. Quero o ${product.name} ${storage} por ${product.price}. Pode me passar as condições?`;
    const phone = "5511999999999"; // Substituir pelo número real
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wider">
            Catálogo de {categoryTitle}
          </DialogTitle>
        </DialogHeader>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {categoryProducts.map((product, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative flex flex-col gap-4 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 p-6 transition-all hover:bg-card/60 hover:border-primary/50 hover:shadow-glow">
                  {/* Placeholder image */}
                  <div className="w-full aspect-square rounded-xl bg-muted/20 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Imagem</span>
                  </div>

                  {/* Product name */}
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>

                  {/* Storage options */}
                  <div className="flex flex-wrap gap-2">
                    {product.storage.map((storage) => (
                      <button
                        key={storage}
                        onClick={() =>
                          setSelectedStorage({
                            ...selectedStorage,
                            [product.name]: storage,
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedStorage[product.name] === storage
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>

                  {/* Price */}
                  <p className="text-xl font-bold text-primary">{product.price}</p>

                  {/* WhatsApp button */}
                  <Button
                    onClick={() =>
                      handleWhatsApp(
                        product,
                        selectedStorage[product.name] || product.storage[0]
                      )
                    }
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  >
                    Pedir no WhatsApp
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
