import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import earthNight from "@/assets/earth-night.jpg";

export default function AgendamentoReparo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    modelo: "",
    problema: "",
    descricao: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de agendar um reparo:
Nome: ${formData.nome}
Telefone: ${formData.telefone}
Modelo: ${formData.modelo}
Tipo de problema: ${formData.problema}
Descrição: ${formData.descricao}`;
    
    const phone = "5511999999999"; // Substituir pelo número real
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
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-wider text-center">
            <span className="bg-gradient-chrome bg-clip-text text-transparent">
              AGENDAMENTO DE REPARO
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo do aparelho</Label>
              <Input
                id="modelo"
                placeholder="Ex: iPhone 14 Pro"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problema">Tipo de problema</Label>
              <Select
                value={formData.problema}
                onValueChange={(value) => setFormData({ ...formData, problema: value })}
                required
              >
                <SelectTrigger id="problema">
                  <SelectValue placeholder="Selecione o problema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tela">Tela quebrada</SelectItem>
                  <SelectItem value="bateria">Bateria</SelectItem>
                  <SelectItem value="software">Software/Sistema</SelectItem>
                  <SelectItem value="camera">Câmera</SelectItem>
                  <SelectItem value="audio">Áudio/Microfone</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do problema</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o problema com detalhes..."
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
              Agendar pelo WhatsApp
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
