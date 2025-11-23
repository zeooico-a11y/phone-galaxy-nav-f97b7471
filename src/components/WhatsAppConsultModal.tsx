import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send } from "lucide-react";

interface WhatsAppConsultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productPrice?: string;
  productColor?: string;
  productStorage?: string;
  whatsappNumber: string;
}

export function WhatsAppConsultModal({
  open,
  onOpenChange,
  productName,
  productPrice,
  productColor,
  productStorage,
  whatsappNumber,
}: WhatsAppConsultModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    let whatsappMessage = `👋 Olá! Meu nome é *${name || "Cliente"}*\n\n`;
    
    if (phone) {
      whatsappMessage += `📱 *Telefone:* ${phone}\n\n`;
    }
    
    whatsappMessage += `Vi o produto *${productName}* e gostaria de saber:\n\n`;
    
    if (productColor) whatsappMessage += `🎨 *Cor:* ${productColor}\n`;
    if (productStorage) whatsappMessage += `💾 *Armazenamento:* ${productStorage}\n`;
    if (productPrice) whatsappMessage += `💰 *Preço:* ${productPrice}\n\n`;
    
    whatsappMessage += `❓ *Minha dúvida:*\n${message || "Gostaria de mais informações sobre este produto."}`;
    
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
    
    // Limpar e fechar
    setName("");
    setPhone("");
    setMessage("");
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-2 border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="w-5 h-5 text-primary" />
            Consultar pelo WhatsApp
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha o formulário abaixo com suas dúvidas sobre o produto
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Produto */}
          <div className="rounded-lg bg-muted/30 p-3 border border-border/30">
            <p className="font-semibold text-sm text-foreground">{productName}</p>
            {productPrice && (
              <p className="text-primary font-bold text-lg mt-1">{productPrice}</p>
            )}
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Seu nome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border/50"
              maxLength={100}
            />
          </div>

          {/* Telefone (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              Seu telefone <span className="text-muted-foreground text-xs">(opcional)</span>
            </Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background/50 border-border/50"
              maxLength={20}
            />
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold">
              Sua dúvida sobre o produto
            </Label>
            <Textarea
              id="message"
              placeholder="Ex: Esse produto está disponível? Qual a forma de pagamento? Tem garantia?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/50 border-border/50 min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/500 caracteres
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={!isValid}
            className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar para WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
