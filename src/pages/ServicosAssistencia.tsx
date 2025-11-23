import { motion } from "framer-motion";
import { ArrowLeft, Smartphone, Battery, Cable, Camera, Mic, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
          src={earthNight}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNpcmN1aXQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDMwIEwgNjAgMzAgTSAzMCAwIEwgMzAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNjaXJjdWl0KSIvPjwvc3ZnPg==')] opacity-30"></div>
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-[0.15em] sm:tracking-[0.2em]">
            <span className="bg-gradient-chrome bg-clip-text text-transparent">
              MASTER PHONES
            </span>
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-foreground/70 font-display">
            Importados
          </p>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground pt-4">
            Escolha o serviço que você precisa
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Selecione o tipo de reparo e envie sua solicitação direto para nossa equipe
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col items-center text-center gap-4 rounded-3xl bg-card/40 backdrop-blur-md border-2 border-primary/40 p-8 hover:bg-card/60 hover:border-primary/60 hover:-translate-y-1 transition-all hover:shadow-[0_0_30px_rgba(0,163,255,0.3)]"
                onClick={() => handleWhatsApp(service)}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                {/* Service info */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Button */}
                <Button
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold rounded-full transition-all"
                >
                  Solicitar este serviço
                </Button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
