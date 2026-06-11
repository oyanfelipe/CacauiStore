import { CartItem } from "@/store/cartStore";

export function generateWhatsAppMessage(
  items: CartItem[],
  customerName: string,
  paymentMethod: string,
  deliveryType: string,
  notes: string,
  productionTime: string
) {
  const total = items.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const products = items
    .map(
      (item) =>
        `- ${item.name} (${item.quantity}x)`
    )
    .join("\n");

  return `
NOVO PEDIDO - CACAUÍ

Cliente:
${customerName}

Pedido:
${products}

Total:
R$ ${total.toFixed(2)}

Prazo estimado:
${productionTime}

Pagamento:
${paymentMethod}

Recebimento:
${deliveryType}

Observações:
${notes || "Nenhuma"}
`;
}