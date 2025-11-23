import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import earthNight from "@/assets/earth-night.jpg";

interface Product {
  id?: string;
  name: string;
  description: string;
  image?: string;
  color?: string;
  storage?: string;
  price?: string;
}

interface CatalogListProps {
  title: string;
  products: Product[];
  whatsappNumber?: string;
}

export function CatalogList({ title, products, whatsappNumber }: CatalogListProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with circuit texture */}
      <div className="fixed inset-0 -z-10">
        <img
          src={earthNight}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        {/* Circuit pattern overlay */}
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
        {/* Logo and title */}
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
            {title}
          </h2>
        </motion.div>

        {/* Products list */}
        <div className="space-y-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id || index}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              color={product.color}
              storage={product.storage}
              price={product.price}
              whatsappNumber={whatsappNumber}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
