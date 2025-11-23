import { CatalogList } from "@/components/CatalogList";
import samsungWatch6 from "@/assets/samsung-galaxy-watch-6-44mm.jpg";
import samsungWatch5 from "@/assets/samsung-galaxy-watch-5-40mm.jpg";
import appleWatch9 from "@/assets/apple-watch-series-9-41mm.jpg";
import appleWatchSE from "@/assets/apple-watch-se-40mm.jpg";
import huaweiWatchGT4 from "@/assets/huawei-watch-gt4-46mm.jpg";
import xiaomiSmartBand8Pro from "@/assets/xiaomi-smart-band-8-pro.jpg";
import amazfitBip5 from "@/assets/amazfit-bip-5.jpg";
import redmiWatch3Active from "@/assets/redmi-watch-3-active.jpg";
import samsungFit3 from "@/assets/samsung-galaxy-fit-3.jpg";
import huaweiBand9 from "@/assets/huawei-band-9.jpg";

const products = [
  {
    name: "Samsung Galaxy Watch 6 44mm",
    description: "Smartwatch premium com tela AMOLED, monitoramento de saúde avançado e Galaxy AI.",
    color: "Preto",
    storage: "44mm · Wear OS",
    price: "R$ 1.799",
    image: samsungWatch6,
  },
  {
    name: "Samsung Galaxy Watch 5 40mm",
    description: "Design elegante com sensor de temperatura corporal, GPS e bateria de longa duração.",
    color: "Prata",
    storage: "40mm · Wear OS",
    price: "R$ 1.299",
    image: samsungWatch5,
  },
  {
    name: "Apple Watch Series 9 41mm",
    description: "Relógio inteligente com chip S9, tela sempre ligada e recursos de saúde avançados.",
    color: "Midnight",
    storage: "41mm · watchOS",
    price: "R$ 3.299",
    image: appleWatch9,
  },
  {
    name: "Apple Watch SE 2ª Geração 40mm",
    description: "Versão acessível com detecção de quedas, monitoramento cardíaco e resistência à água.",
    color: "Starlight",
    storage: "40mm · watchOS",
    price: "R$ 2.199",
    image: appleWatchSE,
  },
  {
    name: "Huawei Watch GT 4 46mm",
    description: "Bateria de até 14 dias, monitoramento de saúde 24h e design premium em aço inoxidável.",
    color: "Preto",
    storage: "46mm · HarmonyOS",
    price: "R$ 1.499",
    image: huaweiWatchGT4,
  },
  {
    name: "Xiaomi Smart Band 8 Pro",
    description: "Pulseira inteligente com GPS integrado, 150+ modos esportivos e bateria de 14 dias.",
    color: "Preto",
    storage: '1.74" AMOLED · Mi Fitness',
    price: "R$ 499",
    image: xiaomiSmartBand8Pro,
  },
  {
    name: "Amazfit Bip 5",
    description: "Relógio acessível com Alexa integrada, monitoramento de oxigênio no sangue e bateria de 10 dias.",
    color: "Preto",
    storage: '1.91" TFT · Zepp OS',
    price: "R$ 399",
    image: amazfitBip5,
  },
  {
    name: "Redmi Watch 3 Active",
    description: "Smartwatch básico com chamadas Bluetooth, 100+ modos esportivos e resistência à água 5 ATM.",
    color: "Preto",
    storage: '1.83" LCD · Mi Fitness',
    price: "R$ 299",
    image: redmiWatch3Active,
  },
  {
    name: "Samsung Galaxy Fit 3",
    description: "Pulseira fitness com tela AMOLED, monitoramento de sono e até 13 dias de bateria.",
    color: "Preto",
    storage: '1.6" AMOLED · Samsung Health',
    price: "R$ 599",
    image: samsungFit3,
  },
  {
    name: "Huawei Band 9",
    description: "Pulseira inteligente com tela AMOLED, 100+ modos esportivos e bateria de 14 dias.",
    color: "Preto",
    storage: '1.47" AMOLED · HarmonyOS',
    price: "R$ 349",
    image: huaweiBand9,
  },
];

export default function CatalogoSmartwatch() {
  return <CatalogList title="Smartwatch · Relógios Inteligentes" products={products} />;
}
