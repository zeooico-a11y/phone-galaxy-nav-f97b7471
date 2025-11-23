import { motion } from "framer-motion";
import { ArrowLeft, Shield, Truck, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import earthNight from "@/assets/earth-night.jpg";

export default function QuemSomos() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={earthNight}
          alt="Earth at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-4 sm:px-6 pt-4 sm:pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Button>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-wider text-center">
            <span className="bg-gradient-chrome bg-clip-text text-transparent">
              QUEM SOMOS
            </span>
          </h1>

          <div className="rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 p-8 sm:p-12 space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Somos especialistas em importação de celulares premium há mais de 5 anos, 
              atendendo todo o Brasil com garantia e entrega segura.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Nossa missão é trazer até você os smartphones mais desejados do mundo, 
              com procedência garantida, preços competitivos e atendimento personalizado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/40">
                <Shield className="w-12 h-12 text-primary" />
                <h3 className="font-semibold text-foreground">Garantia</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Produtos originais com garantia
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/40">
                <Truck className="w-12 h-12 text-primary" />
                <h3 className="font-semibold text-foreground">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Envio para todo Brasil com rastreio
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/40">
                <Award className="w-12 h-12 text-primary" />
                <h3 className="font-semibold text-foreground">Experiência</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Mais de 5 anos no mercado
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
