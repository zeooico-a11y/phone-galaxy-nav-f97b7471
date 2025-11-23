import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Award, Scale } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Peças de qualidade",
    description: "Usamos apenas peças de alta qualidade nos reparos.",
  },
  {
    icon: Wrench,
    title: "Técnicos experientes",
    description: "Equipe especializada em iPhone, Samsung e Xiaomi.",
  },
  {
    icon: Award,
    title: "Garantia de serviço",
    description: "Garantia em todos os serviços de assistência.",
  },
  {
    icon: Scale,
    title: "Transparência",
    description: "Valores e prazos explicados antes de qualquer serviço.",
  },
];

export function TrustSection() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wider text-center"
        >
          <span className="bg-gradient-chrome bg-clip-text text-transparent">
            POR QUE CONFIAR NA MASTER PHONES
          </span>
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group flex flex-col items-center gap-6 rounded-2xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-8 transition-all hover:bg-card/60 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/20 border border-border/30 group-hover:border-primary/40 transition-all">
                  <Icon className="w-10 h-10 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
