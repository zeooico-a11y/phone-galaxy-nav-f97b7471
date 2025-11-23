import { CatalogList } from "@/components/CatalogList";

const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "O mais poderoso iPhone já criado, com chip A17 Pro, câmera de 48MP e titânio aeroespacial.",
  },
  {
    name: "iPhone 15 Pro",
    description: "Desempenho profissional em formato compacto, com Action Button e USB-C.",
  },
  {
    name: "iPhone 15",
    description: "Dynamic Island, câmera de 48MP e design em alumínio premium.",
  },
  {
    name: "iPhone 14 Pro Max",
    description: "Tela Always-On, Dynamic Island e câmera de 48MP com recursos avançados.",
  },
  {
    name: "iPhone 14",
    description: "Chip A15 Bionic, câmera dupla e bateria de longa duração.",
  },
  {
    name: "iPhone 13",
    description: "Ótimo custo-benefício, com chip A15 e câmera dupla de qualidade.",
  },
];

export default function CatalogoIPhone() {
  return <CatalogList title="Catálogo iPhone" products={products} />;
}
