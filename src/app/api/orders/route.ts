import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { checkoutOrderSchema } from "@/lib/orders";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = checkoutOrderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.issues[0]?.message ?? "Datos invalidos",
      },
      { status: 400 },
    );
  }

  const now = new Date();
  const items = result.data.items.map((item) => ({
    ...item,
    lineTotal: item.quantity * item.unitPrice,
  }));

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const advance = Math.ceil(total * 0.5);
  const message = buildOrderMessage(
    {
      fullName: result.data.fullName,
      phone: result.data.phone,
      deliveryMethod: result.data.deliveryMethod,
      orderType: result.data.orderType,
      customBrief: result.data.customBrief,
      notes: result.data.notes,
    },
    items.map((item) => ({
      quantity: item.quantity,
      size: item.size,
      product: {
        id: item.productId,
        slug: item.productId,
        image: item.productImage,
        name: item.productName,
        price: item.unitPrice,
        sizes: [item.size],
        subtitle: "",
        media: [
          {
            id: `${item.productId}-snapshot`,
            url: item.productImage,
            type: "image",
          },
        ],
        isActive: true,
        sortOrder: 0,
      },
    })),
  );
  const whatsappLink = buildWhatsAppLink(message);
  const orderId = crypto.randomUUID();

  await db.transaction(async (tx) => {
    await tx.insert(orders).values({
      id: orderId,
      customerName: result.data.fullName,
      customerPhone: result.data.phone,
      deliveryMethod: result.data.deliveryMethod,
      orderType: result.data.orderType,
      customBrief: result.data.customBrief,
      notes: result.data.notes,
      whatsappLink,
      status: "pending",
      total,
      advance,
      createdAt: now,
      updatedAt: now,
    });

    if (items.length > 0) {
      await tx.insert(orderItems).values(
        items.map((item) => ({
          id: crypto.randomUUID(),
          orderId,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          size: item.size,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
          createdAt: now,
        })),
      );
    }
  });

  return NextResponse.json({
    id: orderId,
    total,
    advance,
    whatsappLink,
  });
}
