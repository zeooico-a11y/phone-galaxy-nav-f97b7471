import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import brazilMap from "@/assets/brazil-map.jpg";

export function LocationSection() {
  const handleWhatsAppPocoFundo = () => {
    const phone = "5535999366561";
    const message = "Oi, sou de Poço Fundo e vim do app Master Phones";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="w-full bg-background/90 backdrop-blur-sm py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title and subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-wider">
            <span className="bg-gradient-chrome bg-clip-text text-transparent">
              LOCALIZAÇÃO E ÁREA DE ATENDIMENTO
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Atendimento especializado em Poço Fundo (MG)
          </p>
        </motion.div>

        {/* Map image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8 rounded-3xl overflow-hidden border border-border/50 shadow-2xl"
        >
          <img
            src={brazilMap}
            alt="Mapa do Brasil - Área de atendimento Poço Fundo"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Description text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8 space-y-3 max-w-3xl mx-auto"
        >
          <p className="text-base text-foreground leading-relaxed">
            Nossa base de atendimento está localizada no Sul de Minas, em Poço Fundo, 
            oferecendo entrega rápida e suporte dedicado para toda a região.
          </p>
          <p className="text-sm text-muted-foreground">
            Consulte nossa equipe para saber prazos e condições de envio para outras cidades.
          </p>
        </motion.div>

        {/* WhatsApp button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center mb-6"
        >
          <Button
            onClick={handleWhatsAppPocoFundo}
            className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-6 text-base"
          >
            <MapPin className="w-5 h-5" />
            Falar com atendimento Poço Fundo
          </Button>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-muted-foreground/70"
        >
          Em breve, expansão da área de atendimento para novas cidades.
        </motion.p>
      </div>
    </div>
  );
}
