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
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 p-6 sm:p-8 transition-all hover:bg-card/60 hover:border-primary/50 hover:shadow-glow"
    >
      <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
