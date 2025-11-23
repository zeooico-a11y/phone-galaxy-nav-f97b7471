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
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => navigate("/carrinho")}
      className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-1 p-4 rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all active:scale-95"
      aria-label="Ver carrinho"
    >
      <div className="relative">
        <ShoppingCart className="w-7 h-7 text-primary-foreground" />
        <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
          {totalItems}
        </span>
      </div>
      <div className="text-center">
        <p className="text-xs text-primary-foreground font-bold whitespace-nowrap">
          {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    </motion.button>
  );
}
