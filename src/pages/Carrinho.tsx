import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";

export default function Carrinho() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold text-foreground">Carrinho Vazio</h1>
          <p className="text-muted-foreground">
            Você ainda não adicionou produtos ao carrinho
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Loja
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Continuar Comprando</span>
          </button>
          <h1 className="text-xl font-bold text-foreground">
            Carrinho ({totalItems})
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-4 sm:p-6"
              >
                <div className="flex gap-4">
                  {/* Imagem */}
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-muted/20 overflow-hidden border border-border/30">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">
                      {item.name}
                    </h3>
                    {item.color && (
                      <p className="text-xs text-muted-foreground">Cor: {item.color}</p>
                    )}
                    {item.storage && (
                      <p className="text-xs text-muted-foreground">{item.storage}</p>
                    )}
                    <p className="text-primary font-bold mt-2">{item.priceText}</p>
                  </div>

                  {/* Controles */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      aria-label="Remover produto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border border-border p-6 sticky top-24 space-y-6"
            >
              <h2 className="text-xl font-bold text-foreground">Resumo do Pedido</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {totalAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Itens</span>
                  <span className="font-semibold text-foreground">{totalItems}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {totalAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                size="lg"
                className="w-full text-base"
              >
                Finalizar Compra
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Você será direcionado para o formulário de pagamento
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
