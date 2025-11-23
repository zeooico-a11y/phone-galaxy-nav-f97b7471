import { CatalogList } from "@/components/CatalogList";

const products = [
  {
    name: "Capinha Premium",
    description: "Proteção completa com design elegante, disponível para iPhone, Samsung e Xiaomi.",
  },
  {
    name: "Película de Vidro 3D",
    description: "Proteção de tela ultra resistente com cobertura total e toque suave.",
  },
  {
    name: "Carregador Turbo",
    description: "Carregamento rápido de 30W a 67W, compatível com diversos modelos.",
  },
  {
    name: "Fone Bluetooth Premium",
    description: "Cancelamento de ruído ativo, graves potentes e bateria de longa duração.",
  },
  {
    name: "Power Bank 20000mAh",
    description: "Carregue seu celular múltiplas vezes, ideal para viagens e uso intenso.",
  },
  {
    name: "Cabo USB-C Original",
    description: "Cabo reforçado com suporte a carregamento rápido e transferência de dados.",
  },
];

export default function CatalogoAcessorios() {
  return <CatalogList title="Catálogo de Acessórios" products={products} />;
}
