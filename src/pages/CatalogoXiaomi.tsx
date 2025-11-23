import { CatalogList } from "@/components/CatalogList";

const products = [
  {
    name: "Xiaomi 14 Pro",
    description: "Top de linha com câmera Leica, carregamento ultra rápido e design premium.",
  },
  {
    name: "Xiaomi 14",
    description: "Potência flagship em tamanho compacto, com câmera Leica e AMOLED.",
  },
  {
    name: "Xiaomi 13T Pro",
    description: "Câmera de 50MP, carregamento de 120W e chip MediaTek Dimensity 9200+.",
  },
  {
    name: "Redmi Note 13 Pro",
    description: "Melhor custo-benefício, com câmera de 200MP e carregamento de 67W.",
  },
  {
    name: "Poco X6 Pro",
    description: "Focado em performance gaming, com chip MediaTek Dimensity 8300 Ultra.",
  },
  {
    name: "Redmi 12",
    description: "Entrada premium com tela de 90Hz, câmera de 50MP e bateria gigante.",
  },
];

export default function CatalogoXiaomi() {
  return <CatalogList title="Catálogo Xiaomi" products={products} />;
}
