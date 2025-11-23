import { CatalogList } from "@/components/CatalogList";
import xiaomi14ProBlack from "@/assets/xiaomi-14-pro-black.jpg";
import xiaomi14White from "@/assets/xiaomi-14-white.jpg";
import xiaomi13TProBlack from "@/assets/xiaomi-13t-pro-black.jpg";
import redmiNote13ProBlue from "@/assets/redmi-note-13-pro-blue.jpg";
import pocoX6ProYellow from "@/assets/poco-x6-pro-yellow.jpg";
import redmi12Blue from "@/assets/redmi-12-blue.jpg";

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
    color: "Branco",
    storage: "256GB",
    price: "R$ 4.999",
    image: xiaomi14White,
  },
  {
    name: "Xiaomi 13T Pro",
    description: "Câmera de 50MP, carregamento de 120W e chip MediaTek Dimensity 9200+.",
    color: "Preto Meia-Noite",
    storage: "256GB",
    price: "R$ 3.999",
    image: xiaomi13TProBlack,
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
    color: "Amarelo",
    storage: "256GB",
    price: "R$ 2.499",
    image: pocoX6ProYellow,
  },
  {
    name: "Redmi 12",
    description: "Entrada premium com tela de 90Hz, câmera de 50MP e bateria gigante.",
    color: "Azul Céu",
    storage: "128GB",
    price: "R$ 1.299",
    image: redmi12Blue,
  },
];

export default function CatalogoXiaomi() {
  return <CatalogList title="Catálogo Xiaomi" products={products} />;
}
