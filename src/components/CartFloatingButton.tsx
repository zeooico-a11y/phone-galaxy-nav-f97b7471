import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export function CartFloatingButton() {
  const { totalItems, totalAmount } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => navigate("/carrinho")}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-4 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-95"
      aria-label="Ver carrinho"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-primary-foreground" />
        <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </div>
      <div className="text-left">
        <p className="text-xs text-primary-foreground/80 font-medium">Carrinho</p>
        <p className="text-sm text-primary-foreground font-bold">
          {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    </motion.button>
  );
}
