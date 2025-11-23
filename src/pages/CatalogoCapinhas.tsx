import { CatalogList } from "@/components/CatalogList";
import capinhaTransparente from "@/assets/capinha-transparente.jpg";
import capinhaColorida from "@/assets/capinha-colorida.jpg";
import capinhaMagsafe from "@/assets/capinha-magsafe.jpg";
import capinhaCarteira from "@/assets/capinha-carteira.jpg";

const products = [
  {
    name: "Capinha Transparente Antishock iPhone",
    description: "Proteção de quinas reforçadas, cristal transparente ultra fino.",
    color: "Transparente",
    price: "R$ 49",
    image: capinhaTransparente,
  },
  {
    name: "Capinha Transparente Antishock Samsung",
    description: "Compatível com Galaxy S24, S23, A55 e outros modelos.",
    color: "Transparente",
    price: "R$ 45",
    image: capinhaTransparente,
  },
  {
    name: "Capinha Transparente Antishock Xiaomi",
    description: "Proteção completa para Xiaomi 14, Redmi Note 13 e outros.",
    color: "Transparente",
    price: "R$ 39",
    image: capinhaTransparente,
  },
  {
    name: "Capinha Silicone Colorida",
    description: "Silicone macio, cores vibrantes, ótimo grip.",
    color: "Diversas cores",
    price: "R$ 39",
    image: capinhaColorida,
  },
  {
    name: "Capinha Premium MagSafe",
    description: "Suporte magnético para carregamento sem fio rápido.",
    color: "Preto / Transparente",
    price: "R$ 89",
    image: capinhaMagsafe,
  },
  {
    name: "Capinha Tipo Carteira",
    description: "Compartimentos para cartões, suporte para vídeos.",
    color: "Couro Sintético",
    price: "R$ 79",
    image: capinhaCarteira,
  },
];

export default function CatalogoCapinhas() {
  return <CatalogList title="Capinhas & Cases" products={products} />;
}
