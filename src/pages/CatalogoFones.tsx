import { CatalogList } from "@/components/CatalogList";
import foneBluetooth from "@/assets/fone-bluetooth.jpg";

const products = [
  {
    name: "Fone Bluetooth TWS Pro",
    description: "Cancelamento de ruído ativo, graves potentes, até 24h de bateria.",
    color: "Branco / Preto",
    price: "R$ 149",
    image: foneBluetooth,
  },
  {
    name: "Fone Bluetooth TWS Lite",
    description: "Qualidade de som premium, confortável para uso prolongado.",
    color: "Branco",
    price: "R$ 89",
    image: foneBluetooth,
  },
  {
    name: "Fone Bluetooth Esportivo",
    description: "À prova d'água IPX7, gancho de orelha ajustável.",
    color: "Preto",
    price: "R$ 119",
  },
  {
    name: "Fone com Fio P2",
    description: "Som cristalino, microfone integrado, conector universal.",
    color: "Branco",
    price: "R$ 29",
  },
  {
    name: "Caixa de Som Bluetooth",
    description: "Som potente 360°, resistente à água, até 12h de autonomia.",
    color: "Preto",
    price: "R$ 199",
  },
  {
    name: "Caixa de Som Portátil Mini",
    description: "Compacta e potente, perfeita para levar para qualquer lugar.",
    color: "Diversas cores",
    price: "R$ 79",
  },
];

export default function CatalogoFones() {
  return <CatalogList title="Fones & Áudio" products={products} />;
}
