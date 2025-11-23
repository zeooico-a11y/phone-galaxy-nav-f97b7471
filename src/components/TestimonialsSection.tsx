import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "João S",
    text: "Entrega rápida em Paraguaçu!",
    rating: 5,
    avatar: "👨",
  },
  {
    id: 2,
    name: "Maria P",
    text: "Conserto perfeito no iPhone, ficou novo!",
    rating: 5,
    avatar: "👩",
  },
  {
    id: 3,
    name: "Pedro L",
    text: "Preços justos e ótimo atendimento.",
    rating: 5,
    avatar: "👨",
  },
];

export function TestimonialsSection() {
  const handleWhatsApp = () => {
    const message = "Oi, vim do app Master Phones e quero falar com vocês";
    const phone = "5535999366561";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wider text-center"
        >
          <span className="text-foreground">
            Depoimentos Rápidos
          </span>
        </motion.h2>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative px-4 sm:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center gap-6 rounded-2xl bg-card/40 backdrop-blur-md border-2 border-border/50 p-8 transition-all hover:bg-card/60 hover:border-primary/30"
                  >
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 border-2 border-border/30 text-4xl">
                      {testimonial.avatar}
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-center text-sm sm:text-base text-foreground leading-relaxed">
                      {testimonial.text}
                    </p>

                    {/* Name */}
                    <p className="text-sm text-muted-foreground italic">
                      – {testimonial.name}
                    </p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-6 lg:-left-12 bg-card/60 backdrop-blur-md border-primary/30 hover:bg-card hover:border-primary" />
            <CarouselNext className="hidden sm:flex -right-6 lg:-right-12 bg-card/60 backdrop-blur-md border-primary/30 hover:bg-card hover:border-primary" />
          </Carousel>

          {/* Mobile swipe hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-xs text-muted-foreground sm:hidden"
          >
            👈 Deslize para ver mais depoimentos 👉
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base sm:text-lg px-8 py-6 rounded-full transition-all hover:scale-[0.98]"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Fale Agora no WhatsApp
          </Button>
          <p className="text-sm text-muted-foreground">
            +55 35 99936-6561
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
