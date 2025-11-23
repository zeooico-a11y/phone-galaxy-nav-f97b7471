import { CatalogList } from "@/components/CatalogList";
import powerBank from "@/assets/power-bank.jpg";
import powerBank10000 from "@/assets/power-bank-10000.jpg";
import powerBank30000 from "@/assets/power-bank-30000.jpg";
import magsafeCharger from "@/assets/magsafe-charger.jpg";
import estacao3em1 from "@/assets/estacao-3em1.jpg";
import baseWireless from "@/assets/base-wireless.jpg";

const products = [
  {
    name: "Power Bank 10.000mAh",
    description: "Compacto e leve, carrega até 2x seu smartphone, display digital.",
    color: "Preto",
    price: "R$ 89",
    image: powerBank10000,
  },
  {
    name: "Power Bank 20.000mAh",
    description: "Alta capacidade, carrega múltiplos dispositivos, entrada e saída rápida.",
    color: "Preto / Branco",
    price: "R$ 149",
    image: powerBank,
  },
  {
    name: "Power Bank 30.000mAh",
    description: "Máxima autonomia, ideal para viagens longas e uso intenso.",
    color: "Preto",
    price: "R$ 199",
    image: powerBank30000,
  },
  {
    name: "Carregador Magnético MagSafe",
    description: "Carregamento sem fio magnético, compatível com iPhone 12+.",
    color: "Branco",
    price: "R$ 129",
    image: magsafeCharger,
  },
  {
    name: "Estação de Carregamento 3 em 1",
    description: "Carregue iPhone, Apple Watch e AirPods simultaneamente.",
    color: "Branco / Preto",
    price: "R$ 249",
    image: estacao3em1,
  },
  {
    name: "Base de Carregamento Sem Fio",
    description: "Carregamento wireless 15W, design premium em alumínio.",
    color: "Preto",
    price: "R$ 99",
    image: baseWireless,
  },
];

export default function CatalogoPowerBank() {
  return <CatalogList title="Power Bank & Energia" products={products} />;
}
