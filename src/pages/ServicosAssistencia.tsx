import { motion } from "framer-motion";
import { ArrowLeft, Smartphone, Battery, Cable, Camera, Mic, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteImage } from "@/hooks/useSiteImage";
import earthNight from "@/assets/earth-night.jpg";

const services = [
  {
    name: "Troca de Tela",
    description: "Tela quebrada, trincada ou sem resposta ao toque",
    icon: Smartphone,
  },
  {
    name: "Troca de Bateria",
    description: "Bateria viciada, descarrega rápido ou celular desliga sozinho",
    icon: Battery,
  },
  {
    name: "Troca de Conector de Carga",
    description: "Celular não carrega ou cabo fica frouxo",
    icon: Cable,
  },
  {
    name: "Reparo de Câmera",
    description: "Câmera embaçada, não foca ou não abre",
    icon: Camera,
  },
  {
    name: "Reparo de Áudio/Microfone",
    description: "Ninguém te escuta nas ligações ou som não funciona",
    icon: Mic,
  },
  {
    name: "Limpeza Técnica (Oxidação)",
    description: "Celular caiu na água ou apresenta oxidação",
    icon: Droplets,
  },
];

export default function ServicosAssistencia() {
  const navigate = useNavigate();
  const { imageUrl: bannerImage } = useSiteImage("assistencia-banner", earthNight);

  const handleWhatsApp = (service: typeof services[0]) => {
    const message = `Olá! Gostaria de solicitar o serviço de ${service.name}.\n\n` +
      `Aguardo retorno para mais informações sobre prazo e valores.`;
    window.open(`https://wa.me/5535999366561?text=${encodeURIComponent(message)}`, "_blank");
  };

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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-display font-black tracking-wider">
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                ASSISTÊNCIA TÉCNICA
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Consertamos seu celular com rapidez e qualidade. 
              Orçamento gratuito via WhatsApp!
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 p-6 hover:border-primary/50 hover:bg-card/60 transition-all cursor-pointer"
                  onClick={() => handleWhatsApp(service)}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {/* Button */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  >
                    Solicitar Orçamento
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl bg-primary/10 border border-primary/30 p-6 sm:p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Atendimento Rápido e Profissional
            </h2>
            <p className="text-muted-foreground mb-6">
              Enviamos orçamento detalhado sem compromisso. Peças originais e 
              garantia em todos os serviços. Entre em contato agora!
            </p>
            <Button
              size="lg"
              onClick={() => window.open("https://wa.me/5535999366561", "_blank")}
              className="bg-primary hover:bg-primary/90"
            >
              Falar no WhatsApp
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
