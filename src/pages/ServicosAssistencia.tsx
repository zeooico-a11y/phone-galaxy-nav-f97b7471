import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import earthNight from "@/assets/earth-night.jpg";

const services = [
  {
    name: "Troca de Tela",
    description: "Substituição de tela quebrada ou com defeito para iPhone, Samsung e Xiaomi.",
    details: "Tela original ou premium, com garantia de 90 dias.",
  },
  {
    name: "Troca de Bateria",
    description: "Bateria nova com capacidade original, melhora autonomia do aparelho.",
    details: "Bateria de alta qualidade, instalação rápida e segura.",
  },
  {
    name: "Limpeza Completa",
    description: "Limpeza interna e externa, remoção de poeira e resíduos.",
    details: "Melhora desempenho e evita superaquecimento.",
  },
  {
    name: "Reparo de Câmera",
    description: "Conserto ou substituição de câmera frontal ou traseira.",
    details: "Restaura qualidade de fotos e vídeos.",
  },
  {
    name: "Formatação & Backup",
    description: "Formatação completa, backup de dados e migração entre aparelhos.",
    details: "Seus dados seguros e organizados.",
  },
  {
    name: "Reparo de Botões",
    description: "Conserto de botões de volume, power e home que não respondem.",
    details: "Testes completos após o reparo.",
  },
];

export default function ServicosAssistencia() {
  const navigate = useNavigate();

  const handleWhatsApp = (service: typeof services[0]) => {
    const message = `Oi, vim do app Master Phones e quero agendar o serviço: ${service.name}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
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
            Serviços & Assistência Técnica
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Equipe especializada em iPhone, Samsung e Xiaomi. Todos os serviços com garantia.
          </p>
        </motion.div>

        {/* Services list */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-3xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-6 hover:bg-card/60 hover:border-primary/30 transition-all group"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>

              {/* Service info */}
              <div className="flex-1 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {service.name}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {service.description}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {service.details}
                </p>
              </div>

              {/* WhatsApp button */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <Button
                  onClick={() => handleWhatsApp(service)}
                  className="w-full sm:w-auto bg-muted hover:bg-muted/80 text-foreground font-semibold px-6 py-6 rounded-full transition-all"
                >
                  Agendar no WhatsApp
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
