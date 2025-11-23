import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, Send } from "lucide-react";

interface QuickWhatsAppBuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productPrice: string;
  productColor?: string;
  productStorage?: string;
  productImage?: string;
  whatsappNumber?: string;
}

export function QuickWhatsAppBuyModal({
  open,
  onOpenChange,
  productName,
  productPrice,
  productColor,
  productStorage,
  productImage,
  whatsappNumber = "5511999999999",
}: QuickWhatsAppBuyModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");

  const handleSend = () => {
    let whatsappMessage = `🛒 *PEDIDO VIA WHATSAPP*\n\n`;
    whatsappMessage += `👤 *Nome:* ${name}\n`;
    whatsappMessage += `📱 *Telefone:* ${phone}\n\n`;
    whatsappMessage += `📦 *Produto:* ${productName}\n`;
    
    if (productColor) whatsappMessage += `🎨 *Cor:* ${productColor}\n`;
    if (productStorage) whatsappMessage += `💾 *Armazenamento:* ${productStorage}\n`;
    whatsappMessage += `💰 *Preço:* ${productPrice}\n\n`;
    
    whatsappMessage += `🚚 *Tipo de Entrega:* ${deliveryType === "delivery" ? "Entrega em casa" : "Retirada na loja"}\n\n`;
    whatsappMessage += `✅ Gostaria de finalizar este pedido!\n\n`;
    whatsappMessage += `Por favor, me confirme:\n`;
    whatsappMessage += `• Disponibilidade\n`;
    whatsappMessage += `• Formas de pagamento\n`;
    whatsappMessage += `• Prazo de entrega`;
    
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
    
    // Limpar e fechar
    setName("");
    setPhone("");
    setDeliveryType("delivery");
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0 && phone.trim().length >= 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-2 border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Comprar pelo WhatsApp
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados para finalizar a compra via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Produto */}
          <div className="rounded-lg bg-muted/30 p-4 border border-border/30 flex gap-3">
            {productImage && (
              <img 
                src={productImage} 
                alt={productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{productName}</p>
              {(productColor || productStorage) && (
                <p className="text-xs text-muted-foreground mt-1">
                  {productColor && `${productColor}`}
                  {productColor && productStorage && " · "}
                  {productStorage && `${productStorage}`}
                </p>
              )}
              <p className="text-primary font-bold text-lg mt-1">{productPrice}</p>
            </div>
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Seu nome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border/50"
              maxLength={100}
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              Seu telefone/WhatsApp <span className="text-destructive">*</span>
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

          {/* Tipo de Entrega */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Tipo de Entrega <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={deliveryType} onValueChange={(value) => setDeliveryType(value as "delivery" | "pickup")}>
              <div className="flex items-center space-x-2 bg-background/50 border border-border/50 rounded-lg p-3">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="cursor-pointer flex-1">
                  🚚 Entrega em casa
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-background/50 border border-border/50 rounded-lg p-3">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="cursor-pointer flex-1">
                  🏪 Retirada na loja
                </Label>
              </div>
            </RadioGroup>
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
            Finalizar no WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
