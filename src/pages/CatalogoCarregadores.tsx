import { CatalogList } from "@/components/CatalogList";
import fonteUsbcIPhoneNovo from "@/assets/fonte-usbc-20w-iphone-novo.jpg";
import fonteUsbIPhoneAntigo from "@/assets/fonte-usb-20w-iphone-antigo.jpg";
import caboUsbcUsbc from "@/assets/cabo-usb-c.jpg";
import caboUsbcLightning from "@/assets/cabo-usbc-lightning.jpg";
import caboUsbLightning from "@/assets/cabo-lightning.jpg";
import carregadorSamsung25w from "@/assets/carregador-samsung-25w.jpg";
import carregador45w from "@/assets/carregador-45w.jpg";
import carregadorVeicular from "@/assets/carregador-veicular.jpg";

// IMPORTANTE: Você pode trocar os preços e as imagens editando este array
const products = [
  // ========== FONTES PARA iPHONE ==========
  {
    name: "Carregador USB-C 20W para iPhone (Modelos Novos)",
    description: "Fonte oficial USB-C 20W para carregar rapidamente os iPhones mais novos com cabo USB-C.",
    color: "Branco",
    storage: "iPhone 15 e posteriores",
    price: "R$ 129,90",
    image: fonteUsbcIPhoneNovo,
  },
  {
    name: "Carregador USB 20W para iPhone (Modelos Antigos)",
    description: "Fonte 20W para usar com cabo Lightning, ideal para os iPhones anteriores à linha 15.",
    color: "Branco",
    storage: "iPhone 8 ao iPhone 14",
    price: "R$ 119,90",
    image: fonteUsbIPhoneAntigo,
  },

  // ========== CABOS USB-C E LIGHTNING ==========
  {
    name: "Cabo USB-C para USB-C Reforçado 1m",
    description: "Cabo reforçado de 1 metro, ideal para carregamento rápido e transferência de dados.",
    color: "Branco",
    storage: "iPhone 15, Android, iPad",
    price: "R$ 59,90",
    image: caboUsbcUsbc,
  },
  {
    name: "Cabo USB-C para Lightning 1m",
    description: "Cabo para usar iPhones com Lightning em fontes USB-C, carregamento rápido e seguro.",
    color: "Branco",
    storage: "iPhone 8 ao 14, iPhone SE",
    price: "R$ 89,90",
    image: caboUsbcLightning,
  },
  {
    name: "Cabo USB para Lightning 1m",
    description: "Cabo clássico USB para Lightning, ideal para uso com fontes antigas e computadores.",
    color: "Branco",
    storage: "iPhone 5 ao 14, iPhone SE",
    price: "R$ 69,90",
    image: caboUsbLightning,
  },

  // ========== CARREGADORES SAMSUNG ==========
  {
    name: "Carregador Turbo 25W Samsung",
    description: "Carregamento rápido oficial para diversos modelos Samsung Galaxy.",
    color: "Branco",
    storage: "Galaxy com Super Fast Charging",
    price: "R$ 139,90",
    image: carregadorSamsung25w,
  },
  {
    name: "Carregador Turbo 45W Samsung",
    description: "Máxima velocidade de carregamento para Galaxy Ultra e modelos premium.",
    color: "Branco",
    storage: "Galaxy Ultra e S Series",
    price: "R$ 179,90",
    image: carregador45w,
  },

  // ========== CARREGADOR VEICULAR ==========
  {
    name: "Carregador Veicular Dual USB",
    description: "Duas portas USB para carregar até dois aparelhos ao mesmo tempo no carro.",
    color: "Preto",
    storage: "Todos os smartphones",
    price: "R$ 79,90",
    image: carregadorVeicular,
  },
];

export default function CatalogoCarregadores() {
  return <CatalogList title="Carregadores & Cabos" products={products} />;
}
