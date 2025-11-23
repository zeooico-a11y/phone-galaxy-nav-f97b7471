import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LocationSection() {
  const handleWhatsAppParaguacu = () => {
    const phone = "5511999999999"; // Substituir pelo número real de Paraguaçu
    const message = "Oi, sou de Paraguaçu e vim do app Master Phones";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleWhatsAppPocoFundo = () => {
    const phone = "5511999999999"; // Substituir pelo número real de Poço Fundo
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
            Atendimento especializado para a região de Paraguaçu e Poço Fundo (MG)
          </p>
        </motion.div>

        {/* Map image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8 rounded-3xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md"
        >
          {/* Placeholder for map image - replace with actual image */}
          <div className="w-full aspect-video bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center relative">
            {/* Tech grid background effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
            
            {/* Map pins */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="flex items-center gap-12">
                {/* Paraguaçu pin */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative">
                    <MapPin className="w-12 h-12 text-primary animate-pulse" fill="currentColor" />
                    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"></div>
                  </div>
                  <span className="text-sm font-semibold text-foreground bg-background/80 px-3 py-1 rounded-full">
                    Paraguaçu
                  </span>
                </motion.div>

                {/* Poço Fundo pin */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative">
                    <MapPin className="w-12 h-12 text-primary animate-pulse" fill="currentColor" />
                    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"></div>
                  </div>
                  <span className="text-sm font-semibold text-foreground bg-background/80 px-3 py-1 rounded-full">
                    Poço Fundo
                  </span>
                </motion.div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-md">
                Atendimento rápido para Paraguaçu e Poço Fundo pelo WhatsApp
              </p>
            </div>
          </div>
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
            Nossa base de atendimento está localizada no Sul de Minas, com foco nas cidades de 
            Paraguaçu e Poço Fundo, oferecendo entrega rápida e suporte dedicado para toda a região.
          </p>
          <p className="text-sm text-muted-foreground">
            Consulte nossa equipe para saber prazos e condições de envio para outras cidades.
          </p>
        </motion.div>

        {/* WhatsApp buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
        >
          <Button
            onClick={handleWhatsAppParaguacu}
            className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-6 text-base"
          >
            <MapPin className="w-5 h-5" />
            Falar com atendimento Paraguaçu
          </Button>

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
