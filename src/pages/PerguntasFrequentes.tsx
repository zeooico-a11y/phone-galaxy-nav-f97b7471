import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import earthNight from "@/assets/earth-night.jpg";

const faqs = [
  {
    id: "1",
    question: "Como funciona o pagamento?",
    answer: "Aceitamos Pix, cartão de crédito (em até 12x) e dinheiro. No Pix ou à vista no dinheiro podemos avaliar condições especiais. O link de pagamento é enviado direto no WhatsApp, de forma segura.",
  },
  {
    id: "2",
    question: "Vocês parcelam?",
    answer: "Sim, parcelamos em até 12x no cartão de crédito. As condições de juros ou parcelas sem juros variam de acordo com o valor do pedido e a bandeira do cartão. Na hora do atendimento, te informamos todas as opções de parcelamento.",
  },
  {
    id: "3",
    question: "Tem garantia?",
    answer: "Sim, todos os aparelhos têm garantia. Oferecemos garantia de 6 meses direto conosco. Em caso de qualquer problema dentro do prazo, é só falar com a nossa equipe pelo WhatsApp.",
  },
  {
    id: "4",
    question: "Qual o prazo de entrega?",
    answer: "O prazo de entrega depende da sua cidade e do estoque do modelo escolhido. Para a região de Paraguaçu e Poço Fundo (MG), normalmente a entrega é rápida e combinada diretamente no WhatsApp. Para outras cidades, informamos o prazo estimado assim que você passar o CEP.",
  },
  {
    id: "5",
    question: "Os aparelhos são novos?",
    answer: "Sim, trabalhamos apenas com aparelhos novos e originais. Todos os produtos vêm lacrados de fábrica ou com selo de garantia, dependendo do modelo. Não vendemos produtos falsificados ou de procedência duvidosa.",
  },
];

export default function PerguntasFrequentes() {
  const navigate = useNavigate();

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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Title */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wider"
            >
              <span className="bg-gradient-chrome bg-clip-text text-transparent">
                PERGUNTAS FREQUENTES
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base text-muted-foreground"
            >
              Tire suas dúvidas sobre delivery e pagamento
            </motion.p>
          </div>

          {/* FAQ Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            <Accordion type="single" collapsible className="contents">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <AccordionItem
                    value={faq.id}
                    className="rounded-2xl bg-card/40 backdrop-blur-md border-2 border-border/50 px-6 py-4 transition-all hover:bg-card/60 hover:border-primary/30 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  >
                    <AccordionTrigger className="hover:no-underline py-4 text-left">
                      <div className="flex items-center justify-between w-full pr-4">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                          {faq.question}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center space-y-4 pt-8"
          >
            <p className="text-base sm:text-lg text-foreground">
              Ainda tem dúvidas?
            </p>
            <Button
              onClick={() => {
                const message = "Oi! Vim do app Master Phones e tenho uma dúvida sobre delivery";
                window.open(
                  `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-8 py-6 text-base"
            >
              Fale conosco no WhatsApp
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
