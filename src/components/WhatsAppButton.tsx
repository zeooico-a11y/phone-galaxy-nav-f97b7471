import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  const handleClick = () => {
    const phone = "5511999999999"; // Substituir pelo número real
    const message = "Oi! Vim do app Master Phones e gostaria de mais informações.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all active:scale-95"
      aria-label="Contato WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
}
