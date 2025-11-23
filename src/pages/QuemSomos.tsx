import { motion } from "framer-motion";
import { ArrowLeft, Shield, Truck, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteImage } from "@/hooks/useSiteImage";
import earthNight from "@/assets/earth-night.jpg";

export default function QuemSomos() {
  const navigate = useNavigate();
  const { imageUrl: bannerImage } = useSiteImage("quem-somos-banner", earthNight);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={bannerImage}
          alt="Background"
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
              trazendo os melhores aparelhos do mercado internacional diretamente para você.
            </p>

            <p className="text-lg text-foreground/90 leading-relaxed">
              Nossa missão é oferecer produtos de altíssima qualidade com o melhor custo-benefício, 
              sempre garantindo a procedência e autenticidade de cada aparelho. Trabalhamos com 
              marcas líderes como Apple, Samsung e Xiaomi, além de uma linha completa de acessórios.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Garantia</h3>
                <p className="text-sm text-muted-foreground">
                  Produtos com garantia de procedência e qualidade
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Entrega</h3>
                <p className="text-sm text-muted-foreground">
                  Enviamos para todo Brasil com rastreamento
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Seleção rigorosa de cada produto importado
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
