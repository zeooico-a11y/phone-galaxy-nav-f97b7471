import { motion } from "framer-motion";
import { Users, Wrench, Tag, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { id: "quem-somos", label: "Quem somos nós", icon: Users, route: "/quem-somos" },
  { id: "agendamento", label: "Agendamento de reparo", icon: Wrench, route: "/agendamento-reparo" },
  { id: "ofertas", label: "Ofertas do dia", icon: Tag, route: "/ofertas-do-dia" },
  { id: "faq", label: "Perguntas frequentes", icon: HelpCircle, route: "/perguntas-frequentes" },
];

export function ActionButtons() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl px-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              onClick={() => navigate(action.route)}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 px-6 py-4 transition-all hover:bg-card/60 hover:border-primary/50 hover:shadow-glow"
            >
              <Icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
