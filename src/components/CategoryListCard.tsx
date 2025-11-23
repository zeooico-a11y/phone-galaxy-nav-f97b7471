import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryListCardProps {
  title: string;
  description: string;
  route: string;
  index: number;
  icon: LucideIcon;
}

export function CategoryListCard({ title, description, route, index, icon: Icon }: CategoryListCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(route)}
      className="group cursor-pointer flex items-center gap-4 rounded-2xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-5 hover:bg-card/60 hover:border-primary/30 transition-all"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 truncate">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
          {description}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
    </motion.div>
  );
}
