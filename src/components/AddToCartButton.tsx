import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productPriceText: string;
  productImage?: string;
  productColor?: string;
  productStorage?: string;
  className?: string;
  redirectToCheckout?: boolean;
  variant?: "default" | "outline" | "secondary";
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
  redirectToCheckout = false,
  variant = "default",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

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
    
    if (redirectToCheckout) {
      navigate("/checkout");
    } else {
      toast.success("Produto adicionado ao carrinho!");
    }
  };

  return (
    <Button onClick={handleAddToCart} variant={variant} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {redirectToCheckout ? "Comprar pelo WhatsApp" : "Adicionar ao Carrinho"}
    </Button>
  );
}
