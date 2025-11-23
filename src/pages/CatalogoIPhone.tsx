import { CatalogList } from "@/components/CatalogList";
import iphone17ProMaxOrange from "@/assets/iphone-17-pro-max-orange.jpg";
import iphone15ProMaxTitanium from "@/assets/iphone-15-pro-max-titanium.jpg";
import iphone15Blue from "@/assets/iphone-15-blue.jpg";
import iphone14ProMaxPurple from "@/assets/iphone-14-pro-max-purple.jpg";

const products = [
  {
    name: "iPhone 17 Pro Max",
    description: "Top de linha com chip A18 Pro, câmera de 48MP e titânio aeroespacial.",
    color: "Laranja",
    storage: "256GB",
    price: "R$ 10.499",
    image: iphone17ProMaxOrange,
  },
  {
    name: "iPhone 15 Pro Max",
    description: "O mais poderoso iPhone já criado, com chip A17 Pro, câmera de 48MP e titânio aeroespacial.",
    color: "Titânio Natural",
    storage: "256GB",
    price: "R$ 7.999",
    image: iphone15ProMaxTitanium,
  },
  {
    name: "iPhone 15 Pro",
    description: "Desempenho profissional em formato compacto, com Action Button e USB-C.",
    color: "Titânio Natural",
    storage: "128GB",
    price: "R$ 6.999",
  },
  {
    name: "iPhone 15",
    description: "Dynamic Island, câmera de 48MP e design em alumínio premium.",
    color: "Azul",
    storage: "128GB",
    price: "R$ 5.499",
    image: iphone15Blue,
  },
  {
    name: "iPhone 14 Pro Max",
    description: "Tela Always-On, Dynamic Island e câmera de 48MP com recursos avançados.",
    color: "Roxo Profundo",
    storage: "256GB",
    price: "R$ 6.499",
    image: iphone14ProMaxPurple,
  },
  {
    name: "iPhone 14",
    description: "Chip A15 Bionic, câmera dupla e bateria de longa duração.",
    color: "Meia-Noite",
    storage: "128GB",
    price: "R$ 4.999",
  },
  {
    name: "iPhone 13",
    description: "Ótimo custo-benefício, com chip A15 e câmera dupla de qualidade.",
    color: "Azul",
    storage: "128GB",
    price: "R$ 3.999",
  },
];

export default function CatalogoIPhone() {
  return <CatalogList title="Catálogo iPhone" products={products} />;
}
