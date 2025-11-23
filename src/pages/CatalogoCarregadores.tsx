import { CatalogList } from "@/components/CatalogList";
import carregadorTurbo from "@/assets/carregador-turbo.jpg";

const products = [
  {
    name: "Carregador Turbo 20W iPhone",
    description: "Carregamento rápido USB-C, original qualidade premium.",
    color: "Branco",
    price: "R$ 59",
    image: carregadorTurbo,
  },
  {
    name: "Carregador Turbo 25W Samsung",
    description: "Carregamento super rápido para Galaxy S24, S23 e outros.",
    color: "Branco",
    price: "R$ 49",
    image: carregadorTurbo,
  },
  {
    name: "Carregador Turbo 45W Samsung",
    description: "Máxima velocidade de carregamento para Galaxy Ultra.",
    color: "Branco",
    price: "R$ 79",
  },
  {
    name: "Cabo Lightning 1m",
    description: "Cabo reforçado original, resistente e durável.",
    color: "Branco",
    price: "R$ 39",
  },
  {
    name: "Cabo USB-C 1m",
    description: "Cabo USB-C para USB-C, carregamento rápido e transferência de dados.",
    color: "Branco",
    price: "R$ 29",
  },
  {
    name: "Carregador Veicular Duplo",
    description: "2 portas USB, carregamento rápido simultâneo.",
    color: "Preto",
    price: "R$ 49",
  },
];

export default function CatalogoCarregadores() {
  return <CatalogList title="Carregadores & Cabos" products={products} />;
}
