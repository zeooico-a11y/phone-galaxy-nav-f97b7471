import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import earthNight from "@/assets/earth-night.jpg";

export default function AgendamentoReparo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    modelo: "",
    problema: "",
    cidade: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.celular || !formData.modelo || !formData.problema || !formData.cidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const message = `🔧 *AGENDAMENTO - ASSISTÊNCIA TÉCNICA*\n\n` +
      `👤 *Nome:* ${formData.nome}\n` +
      `📱 *Celular:* ${formData.celular}\n` +
      `📲 *Modelo do Aparelho:* ${formData.modelo}\n` +
      `🏙️ *Cidade:* ${formData.cidade}\n\n` +
      `⚠️ *Problema Relatado:*\n${formData.problema}\n\n` +
      `━━━━━━━━━━━━━━━━━\n` +
      `Gostaria de agendar este reparo.\n` +
      `Por favor, me informe:\n` +
      `• Horários disponíveis\n` +
      `• Valor estimado\n` +
      `• Prazo de reparo\n` +
      `• Garantia do serviço`;

    const phone = "5511999999999";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

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
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Logo and Title */}
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.15em]"
            >
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                MASTER
              </span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.15em] -mt-4"
            >
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                PHONES
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs tracking-[0.3em] uppercase text-foreground/70 font-display"
            >
              Importados
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl sm:text-3xl font-display font-black tracking-wider mt-8"
            >
              <span className="text-foreground">
                AGENDAMENTO RÁPIDO
              </span>
            </motion.h2>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="bg-card/40 backdrop-blur-md border-2 border-border/50 text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary/50 transition-all"
            />
            
            <Input
              placeholder="Celular"
              value={formData.celular}
              onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              className="bg-card/40 backdrop-blur-md border-2 border-border/50 text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary/50 transition-all"
            />
            
            <Input
              placeholder="Modelo do Aparelho"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              className="bg-card/40 backdrop-blur-md border-2 border-border/50 text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary/50 transition-all"
            />
            
            <Textarea
              placeholder="Descreva o Problema"
              value={formData.problema}
              onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
              className="bg-card/40 backdrop-blur-md border-2 border-border/50 text-foreground placeholder:text-muted-foreground min-h-[100px] rounded-xl focus:border-primary/50 transition-all resize-none"
            />
            
            <Input
              placeholder="Cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              className="bg-card/40 backdrop-blur-md border-2 border-border/50 text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary/50 transition-all"
            />

            <Button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-lg h-16 rounded-xl transition-all hover:scale-[0.98] mt-6"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Enviar para WhatsApp
            </Button>
          </motion.form>
        </motion.div>
      </main>
    </div>
  );
}
