"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdminSession } from "@/lib/auth-session";
import { OrderStatus, orderStatuses } from "@/lib/orders";
import { db } from "@/lib/db";
import { orders, productMedia, products } from "@/lib/db/schema";
import { uploadFileToTelegram } from "@/lib/telegram";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function parseSizes(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((size) => size.trim().toUpperCase())
    .filter(Boolean);
}

function parsePriceBySize(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return null;
  }

  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [size, amount] = entry.split(":").map((part) => part.trim());
      const price = Number(amount);

      if (!size || Number.isNaN(price)) {
        throw new Error(
          "El campo de precio por talla debe usar el formato S:18, M:18, XL:20.",
        );
      }

      return [size.toUpperCase(), price] as const;
    });

  return Object.fromEntries(entries);
}

async function readMediaFiles(formData: FormData) {
  const files = formData
    .getAll("media")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (files.length === 0) {
    return [];
  }

  return Promise.all(files.map((file) => uploadFileToTelegram(file)));
}

async function parseProductInput(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const basePrice = Number(formData.get("basePrice") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const sizes = parseSizes(formData.get("sizes"));
  const priceBySize = parsePriceBySize(formData.get("priceBySize"));
  const isActive = formData.get("isActive") === "on";

  if (!name || !subtitle || Number.isNaN(basePrice) || sizes.length === 0) {
    throw new Error("Nombre, subtitulo, tallas y precio base son obligatorios.");
  }

  return {
    name,
    subtitle,
    description: description || null,
    basePrice,
    sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
    sizes,
    priceBySize,
    isActive,
    slug: slugify(name),
  };
}

function revalidateAdminAndStore() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/checkout");
}

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

  revalidateAdminAndStore();
}

export async function createProduct(formData: FormData) {
  await requireAdminSession();

  const payload = await parseProductInput(formData);
  const uploadedMedia = await readMediaFiles(formData);

  if (uploadedMedia.length === 0) {
    throw new Error("Debes subir al menos una imagen o un video.");
  }

  const now = new Date();
  const productId = crypto.randomUUID();

  await db.transaction(async (tx) => {
    await tx.insert(products).values({
      id: productId,
      slug: `${payload.slug}-${productId.slice(0, 6)}`,
      name: payload.name,
      subtitle: payload.subtitle,
      description: payload.description,
      basePrice: payload.basePrice,
      sizes: JSON.stringify(payload.sizes),
      priceBySize: payload.priceBySize ? JSON.stringify(payload.priceBySize) : null,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      createdAt: now,
      updatedAt: now,
    });

    await tx.insert(productMedia).values(
      uploadedMedia.map((item, index) => ({
        id: crypto.randomUUID(),
        productId,
        url: "", // No guardamos el token en la DB
        type: item.kind,
        mimeType: item.mimeType,
        telegramFileId: item.fileId,
        telegramFilePath: item.filePath,
        sortOrder: index,
        createdAt: now,
        updatedAt: now,
      })),
    );
  });

  revalidateAdminAndStore();
}

export async function updateProduct(formData: FormData) {
  await requireAdminSession();

  const productId = String(formData.get("productId") ?? "");
  const replaceMedia = formData.get("replaceMedia") === "on";

  if (!productId) {
    throw new Error("Producto invalido.");
  }

  const payload = await parseProductInput(formData);
  const uploadedMedia = await readMediaFiles(formData);

  if (replaceMedia && uploadedMedia.length === 0) {
    throw new Error(
      "Si marcas reemplazar media debes subir al menos una imagen o video nuevo.",
    );
  }

  const now = new Date();

  await db.transaction(async (tx) => {
    await tx
      .update(products)
      .set({
        slug: `${payload.slug}-${productId.slice(0, 6)}`,
        name: payload.name,
        subtitle: payload.subtitle,
        description: payload.description,
        basePrice: payload.basePrice,
        sizes: JSON.stringify(payload.sizes),
        priceBySize: payload.priceBySize ? JSON.stringify(payload.priceBySize) : null,
        isActive: payload.isActive,
        sortOrder: payload.sortOrder,
        updatedAt: now,
      })
      .where(eq(products.id, productId));

    if (replaceMedia) {
      await tx.delete(productMedia).where(eq(productMedia.productId, productId));
    }

    if (uploadedMedia.length > 0) {
      const currentMedia = replaceMedia
        ? []
        : await tx
          .select({ id: productMedia.id })
          .from(productMedia)
          .where(eq(productMedia.productId, productId));

      await tx.insert(productMedia).values(
        uploadedMedia.map((item, index) => ({
          id: crypto.randomUUID(),
          productId,
          url: "", // No guardamos el token en la DB
          type: item.kind,
          mimeType: item.mimeType,
          telegramFileId: item.fileId,
          telegramFilePath: item.filePath,
          sortOrder: currentMedia.length + index,
          createdAt: now,
          updatedAt: now,
        })),
      );
    }
  });

  revalidateAdminAndStore();
}

export async function deleteProduct(formData: FormData) {
  await requireAdminSession();

  const productId = String(formData.get("productId") ?? "");

  if (!productId) {
    return;
  }

  await db.transaction(async (tx) => {
    await tx.delete(productMedia).where(eq(productMedia.productId, productId));
    await tx.delete(products).where(eq(products.id, productId));
  });

  revalidateAdminAndStore();
}
