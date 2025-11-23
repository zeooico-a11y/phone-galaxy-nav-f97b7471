import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import AgendamentoReparo from "./pages/AgendamentoReparo";
import OfertasDoDia from "./pages/OfertasDoDia";
import OfertaDaSemana from "./pages/OfertaDaSemana";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import CatalogoIPhone from "./pages/CatalogoIPhone";
import CatalogoSamsung from "./pages/CatalogoSamsung";
import CatalogoXiaomi from "./pages/CatalogoXiaomi";
import CatalogoAcessorios from "./pages/CatalogoAcessorios";
import CatalogoPeliculas from "./pages/CatalogoPeliculas";
import CatalogoCapinhas from "./pages/CatalogoCapinhas";
import CatalogoCarregadores from "./pages/CatalogoCarregadores";
import CatalogoFones from "./pages/CatalogoFones";
import CatalogoPowerBank from "./pages/CatalogoPowerBank";
import CatalogoSmartwatch from "./pages/CatalogoSmartwatch";
import ServicosAssistencia from "./pages/ServicosAssistencia";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Orders from "./pages/admin/Orders";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Sections from "./pages/admin/Sections";
import Products from "./pages/admin/Products";
import Testimonials from "./pages/admin/Testimonials";
import AdminSettings from "./pages/admin/Settings";
import Categories from "./pages/admin/Categories";
import Promotions from "./pages/admin/Promotions";
import SiteImages from "./pages/admin/SiteImages";
import FAQPage from "./pages/admin/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/agendamento-reparo" element={<AgendamentoReparo />} />
          <Route path="/ofertas-do-dia" element={<OfertasDoDia />} />
          <Route path="/oferta-da-semana" element={<OfertaDaSemana />} />
          <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
          <Route path="/catalogo-iphone" element={<CatalogoIPhone />} />
          <Route path="/catalogo-samsung" element={<CatalogoSamsung />} />
          <Route path="/catalogo-xiaomi" element={<CatalogoXiaomi />} />
          <Route path="/catalogo-acessorios" element={<CatalogoAcessorios />} />
          <Route path="/catalogo-peliculas" element={<CatalogoPeliculas />} />
          <Route path="/catalogo-capinhas" element={<CatalogoCapinhas />} />
          <Route path="/catalogo-carregadores" element={<CatalogoCarregadores />} />
          <Route path="/catalogo-fones" element={<CatalogoFones />} />
          <Route path="/catalogo-powerbank" element={<CatalogoPowerBank />} />
          <Route path="/catalogo-smartwatch" element={<CatalogoSmartwatch />} />
          <Route path="/servicos-assistencia" element={<ServicosAssistencia />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/sections" element={<Sections />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/promotions" element={<Promotions />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/site-images" element={<SiteImages />} />
          <Route path="/admin/faq" element={<FAQPage />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
