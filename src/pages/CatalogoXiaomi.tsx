import { CatalogList } from "@/components/CatalogList";
import xiaomi14ProBlack from "@/assets/xiaomi-14-pro-black.jpg";
import redmiNote13ProBlue from "@/assets/redmi-note-13-pro-blue.jpg";

const products = [
  {
    name: "Xiaomi 14 Pro",
    description: "Top de linha com câmera Leica, carregamento ultra rápido e design premium.",
    color: "Preto",
    storage: "512GB",
    price: "R$ 5.799",
    image: xiaomi14ProBlack,
  },
  {
    name: "Xiaomi 14",
    description: "Potência flagship em tamanho compacto, com câmera Leica e AMOLED.",
    color: "Preto",
    storage: "256GB",
    price: "R$ 4.999",
  },
  {
    name: "Xiaomi 13T Pro",
    description: "Câmera de 50MP, carregamento de 120W e chip MediaTek Dimensity 9200+.",
    color: "Preto Meia-Noite",
    storage: "256GB",
    price: "R$ 3.999",
  },
  {
    name: "Redmi Note 13 Pro",
    description: "Melhor custo-benefício, com câmera de 200MP e carregamento de 67W.",
    color: "Azul",
    storage: "256GB",
    price: "R$ 2.999",
    image: redmiNote13ProBlue,
  },
  {
    name: "Poco X6 Pro",
    description: "Focado em performance gaming, com chip MediaTek Dimensity 8300 Ultra.",
    color: "Preto",
    storage: "256GB",
    price: "R$ 2.499",
  },
  {
    name: "Redmi 12",
    description: "Entrada premium com tela de 90Hz, câmera de 50MP e bateria gigante.",
    color: "Azul Céu",
    storage: "128GB",
    price: "R$ 1.299",
  },
];

export default function CatalogoXiaomi() {
  return <CatalogList title="Catálogo Xiaomi" products={products} />;
}
