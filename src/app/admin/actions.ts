"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdminSession } from "@/lib/auth-session";
import { OrderStatus, orderStatuses } from "@/lib/orders";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

export async function updateOrderStatus(formData: FormData) {
  await requireAdminSession();

  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;

  if (!orderId || !orderStatuses.includes(status)) {
    return;
  }

  await db
    .update(orders)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  revalidatePath("/admin");
}
