import { motion } from "framer-motion";
import { ComponentType } from "react";

interface CategoryCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  delay?: number;
}

export function CategoryCard({ icon: Icon, label, onClick, delay = 0 }: CategoryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-xl border-2 border-border/50 p-5 sm:p-7 lg:p-8 transition-all hover:bg-card/70 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(0,163,255,0.3)] active:shadow-[0_0_16px_rgba(0,163,255,0.5)] min-h-[120px] sm:min-h-[140px]"
    >
      <div className="rounded-full bg-primary/10 p-3 sm:p-4 group-hover:bg-primary/20 transition-all group-hover:shadow-[0_0_16px_rgba(0,163,255,0.3)]">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors text-center leading-tight">
        {label}
      </span>
    </motion.button>
  );
}
