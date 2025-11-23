import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, Banknote, Calendar, ShoppingBag, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal("")),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().trim().max(500).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(50).optional(),
  zipcode: z.string().trim().max(10).optional(),
  paymentMethod: z.enum(["card", "cash", "installment"]),
  notes: z.string().trim().max(1000).optional(),
});

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryType: "delivery" as "delivery" | "pickup",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    paymentMethod: "card" as "card" | "cash" | "installment",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Carrinho vazio");
      navigate("/carrinho");
      return;
    }

    try {
      // Validar dados
      const validated = checkoutSchema.parse(formData);

      // Validar endereço se for entrega
      if (validated.deliveryType === "delivery") {
        if (!validated.address || !validated.city || !validated.state || !validated.zipcode) {
          toast.error("Preencha todos os campos de endereço para entrega");
          return;
        }
      }

      setLoading(true);

      // Criar pedido
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: validated.name,
          customer_phone: validated.phone,
          customer_email: validated.email || null,
          customer_address: validated.address || null,
          customer_city: validated.city || null,
          customer_state: validated.state || null,
          customer_zipcode: validated.zipcode || null,
          delivery_type: validated.deliveryType,
          payment_method: validated.paymentMethod,
          total_amount: totalAmount,
          notes: validated.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Criar itens do pedido
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image || null,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Enviar via WhatsApp
      const whatsappMessage = `🛒 *NOVO PEDIDO #${order.id.slice(0, 8)}*\n\n` +
        `👤 *Cliente:* ${validated.name}\n` +
        `📱 *Telefone:* ${validated.phone}\n` +
        (validated.email ? `📧 *Email:* ${validated.email}\n` : "") +
        `\n📦 *Tipo de Entrega:* ${validated.deliveryType === "delivery" ? "🚚 Entrega" : "🏪 Retirada na Loja"}\n` +
        (validated.deliveryType === "delivery" ? 
          `📍 *Endereço:* ${validated.address}, ${validated.city} - ${validated.state}, CEP: ${validated.zipcode}\n` : 
          "") +
        `\n💳 *Forma de Pagamento:* ${
          validated.paymentMethod === "card" ? "💳 Cartão" : 
          validated.paymentMethod === "cash" ? "💵 Dinheiro" : 
          "📅 Carnê"
        }\n` +
        `\n🛍️ *Produtos:*\n` +
        items.map((item) => 
          `• ${item.name}${item.color ? ` (${item.color})` : ""}${item.storage ? ` - ${item.storage}` : ""}\n` +
          `  Qtd: ${item.quantity} x ${item.priceText}`
        ).join("\n") +
        `\n\n💰 *Total: R$ ${totalAmount.toFixed(2)}*` +
        (validated.notes ? `\n\n📝 *Observações:* ${validated.notes}` : "");

      window.open(
        `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
      );

      // Limpar carrinho
      clearCart();
      toast.success("Pedido realizado com sucesso!");
      navigate("/");

    } catch (error: any) {
      console.error("Erro ao finalizar pedido:", error);
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Erro ao finalizar pedido");
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/carrinho")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Voltar ao Carrinho</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Finalizar Compra</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados pessoais */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Dados Pessoais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    maxLength={20}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    maxLength={255}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Tipo de entrega */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Entrega
              </h2>

              <RadioGroup
                value={formData.deliveryType}
                onValueChange={(value: "delivery" | "pickup") =>
                  setFormData({ ...formData, deliveryType: value })
                }
              >
                <div className="flex items-center space-x-2 p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    🚚 Entrega no Endereço
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    🏪 Retirar na Loja
                  </Label>
                </div>
              </RadioGroup>

              {formData.deliveryType === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required={formData.deliveryType === "delivery"}
                      maxLength={500}
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required={formData.deliveryType === "delivery"}
                        maxLength={100}
                        placeholder="Cidade"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required={formData.deliveryType === "delivery"}
                        maxLength={50}
                        placeholder="SP"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipcode">CEP *</Label>
                      <Input
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                        required={formData.deliveryType === "delivery"}
                        maxLength={10}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Forma de pagamento */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Forma de Pagamento
              </h2>

              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value: "card" | "cash" | "installment") =>
                  setFormData({ ...formData, paymentMethod: value })
                }
              >
                <div className="flex items-center space-x-2 p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Cartão de Crédito/Débito
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Dinheiro
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors cursor-pointer">
                  <RadioGroupItem value="installment" id="installment" />
                  <Label htmlFor="installment" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Carnê (Parcelado)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Observações */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Observações (opcional)</h2>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                maxLength={1000}
                placeholder="Alguma observação sobre o pedido?"
                rows={4}
              />
            </div>

            {/* Resumo */}
            <div className="bg-primary/10 rounded-2xl border border-primary/30 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total do Pedido</span>
                <span className="text-2xl font-bold text-primary">
                  {totalAmount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "produto" : "produtos"} no carrinho
              </p>
            </div>

            {/* Botão de finalizar */}
            <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
              {loading ? "Processando..." : "Confirmar Pedido"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ao confirmar, seu pedido será enviado via WhatsApp para finalização
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
