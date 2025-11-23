import { CatalogList } from "@/components/CatalogList";
import pelicula3D from "@/assets/pelicula-3d.jpg";

const products = [
  {
    name: "Película 3D iPhone",
    description: "Proteção 3D com cobertura total da tela, borda a borda.",
    color: "Transparente",
    price: "R$ 49",
    image: pelicula3D,
  },
  {
    name: "Película 3D Samsung",
    description: "Película 3D para Galaxy S24, S23, A55 e outros modelos.",
    color: "Transparente",
    price: "R$ 45",
    image: pelicula3D,
  },
  {
    name: "Película 11D",
    description: "Máxima proteção com bordas reforçadas e instalação fácil.",
    color: "Transparente",
    price: "R$ 59",
  },
  {
    name: "Película de Privacidade",
    description: "Protege sua tela de olhares curiosos, anti-espião 360°.",
    color: "Preto",
    price: "R$ 69",
  },
  {
    name: "Película Hidrogel Frente",
    description: "Película flexível com auto-regeneração de riscos leves.",
    color: "Transparente",
    price: "R$ 39",
  },
  {
    name: "Película Hidrogel Frente + Verso",
    description: "Kit completo de proteção para frente e verso do aparelho.",
    color: "Transparente",
    price: "R$ 69",
  },
];

export default function CatalogoPeliculas() {
  return <CatalogList title="Películas & Proteção de Tela" products={products} />;
}
