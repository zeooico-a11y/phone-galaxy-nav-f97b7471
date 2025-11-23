import { CatalogList } from "@/components/CatalogList";
import iphone17ProMaxOrange from "@/assets/iphone-17-pro-max-orange.jpg";
import iphone16ProMaxBlack from "@/assets/iphone-16-pro-max-black.jpg";
import iphone16ProBlue from "@/assets/iphone-16-pro-blue.jpg";
import iphone16Purple from "@/assets/iphone-16-purple.jpg";
import iphone15ProMaxTitanium from "@/assets/iphone-15-pro-max-titanium.jpg";
import iphone15ProTitanium from "@/assets/iphone-15-pro-titanium.jpg";
import iphone15Blue from "@/assets/iphone-15-blue.jpg";
import iphone14ProMaxPurple from "@/assets/iphone-14-pro-max-purple.jpg";
import iphone14Midnight from "@/assets/iphone-14-midnight.jpg";
import iphone13Blue from "@/assets/iphone-13-blue.jpg";
import iphone12Blue from "@/assets/iphone-12-blue.jpg";
import iphone11Black from "@/assets/iphone-11-black.jpg";

const products = [
  {
    name: "iPhone 17 Pro Max",
    description: "O mais avançado iPhone com tela de 6,9 polegadas, câmeras revolucionárias e chip A19 Bionic.",
    color: "Laranja",
    storage: "256GB",
    price: "R$ 10.499",
    image: iphone17ProMaxOrange,
  },
  {
    name: "iPhone 16 Pro Max",
    description: "Tela ProMotion 120Hz, câmeras profissionais e bateria de longa duração.",
    color: "Preto Meia-noite",
    storage: "256GB",
    price: "R$ 8.999",
    image: iphone16ProMaxBlack,
  },
  {
    name: "iPhone 16 Pro",
    description: "Design compacto premium com câmeras de cinema e desempenho excepcional.",
    color: "Azul",
    storage: "256GB",
    price: "R$ 8.299",
    image: iphone16ProBlue,
  },
  {
    name: "iPhone 16",
    description: "Tela OLED brilhante, câmeras aprimoradas e chip A18 para uso diário.",
    color: "Roxo",
    storage: "128GB",
    price: "R$ 6.999",
    image: iphone16Purple,
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
    description: "Desempenho profissional com botão de ação, formato compacto.",
    color: "Titânio Natural",
    storage: "128GB",
    price: "R$ 6.999",
    image: iphone15ProTitanium,
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
    description: "Tela sempre ligada, câmeras profissionais e chip A16 Bionic.",
    color: "Roxo Profundo",
    storage: "256GB",
    price: "R$ 6.499",
    image: iphone14ProMaxPurple,
  },
  {
    name: "iPhone 14",
    description: "Chip A15 Bionic, câmera dupla e bateria de longa duração.",
    color: "Meia-noite",
    storage: "128GB",
    price: "R$ 4.999",
    image: iphone14Midnight,
  },
  {
    name: "iPhone 13",
    description: "Ótimo custo-benefício, com chip A15 e câmera dupla de qualidade.",
    color: "Azul",
    storage: "128GB",
    price: "R$ 3.999",
    image: iphone13Blue,
  },
  {
    name: "iPhone 12",
    description: "Tela Super Retina XDR de 6,1 polegadas, 5G e câmera dupla com Modo Noite.",
    color: "Azul",
    storage: "128GB",
    price: "R$ 3.299",
    image: iphone12Blue,
  },
  {
    name: "iPhone 11",
    description: "Excelente custo-benefício com câmera dupla, boa bateria e desempenho para o dia a dia.",
    color: "Preto",
    storage: "128GB",
    price: "R$ 2.699",
    image: iphone11Black,
  },
];

export default function CatalogoIPhone() {
  return <CatalogList title="Catálogo iPhone" products={products} />;
}
