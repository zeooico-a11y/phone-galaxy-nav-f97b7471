import { CatalogList } from "@/components/CatalogList";

const products = [
  {
    name: "Galaxy S24 Ultra",
    description: "O melhor da Samsung, com S Pen integrada, câmera de 200MP e inteligência artificial.",
  },
  {
    name: "Galaxy S24+",
    description: "Tela grande de 6.7 polegadas, desempenho top e câmera profissional.",
  },
  {
    name: "Galaxy S24",
    description: "Compacto e poderoso, ideal para quem busca qualidade em tamanho menor.",
  },
  {
    name: "Galaxy Z Fold 5",
    description: "Smartphone dobrável premium, se transforma em tablet na palma da mão.",
  },
  {
    name: "Galaxy Z Flip 5",
    description: "Design dobrável compacto, tela externa maior e super estilo.",
  },
  {
    name: "Galaxy A55",
    description: "Excelente custo-benefício, câmera de 50MP e bateria de 5000mAh.",
  },
  {
    name: "Galaxy A35",
    description: "Intermediário premium com recursos avançados e preço acessível.",
  },
];

export default function CatalogoSamsung() {
  return <CatalogList title="Catálogo Samsung" products={products} />;
}
