import { CartItem } from "@/types/store";

export const SALES_WHATSAPP = "584120000000";

export type DeliveryMethod = "Delivery Acarigua" | "Retiro en punto" | "Envio nacional";
export type OrderType = "Catalogo" | "Diseno personalizado";

export type CheckoutPayload = {
  fullName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  orderType: OrderType;
  customBrief?: string;
  notes?: string;
};

export function buildOrderMessage(payload: CheckoutPayload, items: CartItem[]) {
  const lines = items.map(
    (item) =>
      `- ${item.product.name} | Talla ${item.size} | x${item.quantity} | USD ${item.product.price * item.quantity}`,
  );

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const advance = Math.ceil(total * 0.5);

  return [
    "Hola OverSizeByLau, quiero confirmar este pedido:",
    "",
    `Nombre: ${payload.fullName}`,
    `Telefono: ${payload.phone}`,
    `Tipo de pedido: ${payload.orderType}`,
    `Metodo de entrega: ${payload.deliveryMethod}`,
    payload.customBrief ? `Brief de diseno: ${payload.customBrief}` : "",
    payload.notes ? `Notas: ${payload.notes}` : "",
    "",
    "Productos:",
    ...lines,
    "",
    `Total: USD ${total}`,
    `Anticipo obligatorio (50%): USD ${advance}`,
    "Entiendo que mi pedido queda en espera hasta enviar el 50% por WhatsApp.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
