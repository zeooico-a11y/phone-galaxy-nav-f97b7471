import { CatalogList } from "@/components/CatalogList";
import capinhaTransparente from "@/assets/capinha-transparente.jpg";
import pelicula3D from "@/assets/pelicula-3d.jpg";
import carregadorTurbo from "@/assets/carregador-turbo.jpg";
import foneBluetooth from "@/assets/fone-bluetooth.jpg";
import powerBank from "@/assets/power-bank.jpg";
import caboUsbC from "@/assets/cabo-usb-c.jpg";

const products = [
  {
    name: "Capinha Premium",
    description: "Proteção completa com design elegante, disponível para iPhone, Samsung e Xiaomi.",
    color: "Transparente",
    price: "R$ 89",
    image: capinhaTransparente,
  },
  {
    name: "Película de Vidro 3D",
    description: "Proteção de tela ultra resistente com cobertura total e toque suave.",
    color: "Transparente",
    price: "R$ 49",
    image: pelicula3D,
  },
  {
    name: "Carregador Turbo",
    description: "Carregamento rápido de 30W a 67W, compatível com diversos modelos.",
    color: "Branco",
    price: "R$ 79",
    image: carregadorTurbo,
  },
  {
    name: "Fone Bluetooth Premium",
    description: "Cancelamento de ruído ativo, graves potentes e bateria de longa duração.",
    color: "Preto",
    price: "R$ 249",
    image: foneBluetooth,
  },
  {
    name: "Power Bank 20000mAh",
    description: "Carregue seu celular múltiplas vezes, ideal para viagens e uso intenso.",
    color: "Preto",
    price: "R$ 149",
    image: powerBank,
  },
  {
    name: "Cabo USB-C Original",
    description: "Cabo reforçado com suporte a carregamento rápido e transferência de dados.",
    color: "Branco",
    price: "R$ 39",
    image: caboUsbC,
  },
];

export default function CatalogoAcessorios() {
  return <CatalogList title="Catálogo de Acessórios" products={products} />;
}
