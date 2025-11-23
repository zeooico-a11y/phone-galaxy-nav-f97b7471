import { motion } from "framer-motion";
import { Users, Wrench, Tag, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { id: "quem-somos", label: "Quem somos nós", icon: Users, route: "/quem-somos" },
  { id: "assistencia", label: "Assistência Técnica", icon: Wrench, route: "/servicos-assistencia" },
  { id: "ofertas", label: "Ofertas do dia", icon: Tag, route: "/ofertas-do-dia" },
  { id: "faq", label: "Perguntas frequentes", icon: HelpCircle, route: "/perguntas-frequentes" },
];

export function ActionButtons() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 mb-8 sm:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.route)}
              className="group flex items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-border/50 px-5 py-4 sm:px-6 sm:py-4 transition-all hover:bg-card/70 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,163,255,0.25)] active:shadow-[0_0_12px_rgba(0,163,255,0.4)] min-h-[56px] sm:min-h-[60px]"
            >
              <Icon className="w-5 h-5 sm:w-5 sm:h-5 text-foreground/70 group-hover:text-primary transition-colors flex-shrink-0" />
              <span className="text-sm sm:text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors text-center leading-tight">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
