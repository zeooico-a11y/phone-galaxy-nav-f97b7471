import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import AgendamentoReparo from "./pages/AgendamentoReparo";
import OfertasDoDia from "./pages/OfertasDoDia";
import CatalogoIPhone from "./pages/CatalogoIPhone";
import CatalogoSamsung from "./pages/CatalogoSamsung";
import CatalogoXiaomi from "./pages/CatalogoXiaomi";
import CatalogoAcessorios from "./pages/CatalogoAcessorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/agendamento-reparo" element={<AgendamentoReparo />} />
          <Route path="/ofertas-do-dia" element={<OfertasDoDia />} />
          <Route path="/catalogo-iphone" element={<CatalogoIPhone />} />
          <Route path="/catalogo-samsung" element={<CatalogoSamsung />} />
          <Route path="/catalogo-xiaomi" element={<CatalogoXiaomi />} />
          <Route path="/catalogo-acessorios" element={<CatalogoAcessorios />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
