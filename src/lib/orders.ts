import { z } from "zod";

export const deliveryMethods = [
  "Delivery Acarigua",
  "Retiro en punto",
  "Envio nacional",
] as const;

export const orderTypes = ["Catalogo", "Diseno personalizado"] as const;

export const orderStatuses = [
  "pending",
  "awaiting-payment",
  "paid",
  "in-production",
  "shipped",
  "completed",
  "cancelled",
] as const;

export const checkoutOrderSchema = z
  .object({
    fullName: z.string().min(3, "Ingresa nombre y apellido"),
    phone: z
      .string()
      .min(10, "Ingresa un telefono valido")
      .regex(/^[0-9+\-\s()]+$/, "Solo caracteres de telefono"),
    deliveryMethod: z.enum(deliveryMethods),
    orderType: z.enum(orderTypes),
    customBrief: z.string().trim().max(240, "Maximo 240 caracteres").optional(),
    notes: z.string().trim().max(200, "Maximo 200 caracteres").optional(),
    items: z.array(
      z.object({
        productId: z.string().min(1),
        productName: z.string().min(1),
        productImage: z.string().min(1),
        size: z.string().min(1),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === "Catalogo" && data.items.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["items"],
        message: "Agrega productos al carrito antes de continuar",
      });
    }

    if (
      data.orderType === "Diseno personalizado" &&
      !data.customBrief?.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["customBrief"],
        message: "Describe tu idea para el diseno personalizado",
      });
    }
  });

export type CheckoutOrderInput = z.infer<typeof checkoutOrderSchema>;
export type OrderStatus = (typeof orderStatuses)[number];
