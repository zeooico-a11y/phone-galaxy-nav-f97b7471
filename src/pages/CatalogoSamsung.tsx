import { CatalogList } from "@/components/CatalogList";
import samsungS24UltraBlack from "@/assets/samsung-s24-ultra-black.jpg";
import samsungS24Cream from "@/assets/samsung-s24-cream.jpg";

const products = [
  {
    name: "Galaxy S24 Ultra",
    description: "O melhor da Samsung, com S Pen integrada, câmera de 200MP e inteligência artificial.",
    color: "Preto Phantom",
    storage: "512GB",
    price: "R$ 7.999",
    image: samsungS24UltraBlack,
  },
  {
    name: "Galaxy S24+",
    description: "Tela grande de 6.7 polegadas, desempenho top e câmera profissional.",
    color: "Preto Phantom",
    storage: "256GB",
    price: "R$ 6.499",
  },
  {
    name: "Galaxy S24",
    description: "Compacto e poderoso, ideal para quem busca qualidade em tamanho menor.",
    color: "Creme",
    storage: "256GB",
    price: "R$ 5.799",
    image: samsungS24Cream,
  },
  {
    name: "Galaxy Z Fold 5",
    description: "Smartphone dobrável premium, se transforma em tablet na palma da mão.",
    color: "Preto Phantom",
    storage: "512GB",
    price: "R$ 9.999",
  },
  {
    name: "Galaxy Z Flip 5",
    description: "Design dobrável compacto, tela externa maior e super estilo.",
    color: "Creme",
    storage: "256GB",
    price: "R$ 5.999",
  },
  {
    name: "Galaxy A55",
    description: "Excelente custo-benefício, câmera de 50MP e bateria de 5000mAh.",
    color: "Azul Claro",
    storage: "128GB",
    price: "R$ 2.499",
  },
  {
    name: "Galaxy A35",
    description: "Intermediário premium com recursos avançados e preço acessível.",
    color: "Azul Escuro",
    storage: "128GB",
    price: "R$ 1.899",
  },
];

export default function CatalogoSamsung() {
  return <CatalogList title="Catálogo Samsung" products={products} />;
}
