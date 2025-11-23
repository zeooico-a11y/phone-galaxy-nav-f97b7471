import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productPriceText: string;
  productImage?: string;
  productColor?: string;
  productStorage?: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productPriceText,
  productImage,
  productColor,
  productStorage,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: productPrice,
      priceText: productPriceText,
      image: productImage,
      color: productColor,
      storage: productStorage,
    });
  };

  return (
    <Button onClick={handleAddToCart} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      Adicionar ao Carrinho
    </Button>
  );
}
