import { motion } from "framer-motion";
import { Search, MessageCircle, CreditCard, Package } from "lucide-react";

const steps = [
  { icon: Search, label: "Escolha seu modelo" },
  { icon: MessageCircle, label: "Chame no WhatsApp" },
  { icon: CreditCard, label: "Confirme pagamento" },
  { icon: Package, label: "Receba em casa" },
];

export function DeliverySteps() {
  return (
    <div className="w-full bg-background/80 backdrop-blur-sm py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-12 tracking-wider"
        >
          PASSO A PASSO DO DELIVERY
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-4 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 p-8 hover:bg-card/60 hover:border-primary/30 transition-all"
              >
                <div className="rounded-full bg-primary/10 p-6">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <p className="text-center text-sm sm:text-base font-medium text-foreground">
                  {step.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
