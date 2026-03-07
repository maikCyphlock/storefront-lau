import { asc, eq } from "drizzle-orm";
import { legacyProducts } from "@/data/products";
import { db } from "@/lib/db";
import { productMedia, products } from "@/lib/db/schema";
import { Product } from "@/types/store";

function parseJsonRecord(value: string | null): Record<string, number> | undefined {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value) as Record<string, number>;
    return parsed;
  } catch {
    return undefined;
  }
}

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapProduct(row: typeof products.$inferSelect & {
  media: Array<typeof productMedia.$inferSelect>;
}): Product {
  const media = row.media
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item) => ({
      id: item.id,
      url: item.url,
      type: item.type as "image" | "video",
      mimeType: item.mimeType,
    }));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    price: row.basePrice,
    priceBySize: parseJsonRecord(row.priceBySize),
    image: media[0]?.url ?? "",
    sizes: parseJsonArray(row.sizes),
    media,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
  };
}

export async function getStoreProducts() {
  try {
    const rows = await db.query.products.findMany({
      where: eq(products.isActive, true),
      with: { media: true },
      orderBy: [asc(products.sortOrder), asc(products.createdAt)],
    });

    if (rows.length === 0) {
      return legacyProducts;
    }

    return rows.map(mapProduct).filter((product) => product.media.length > 0);
  } catch {
    return legacyProducts;
  }
}

export async function getAdminProducts() {
  try {
    const rows = await db.query.products.findMany({
      with: { media: true },
      orderBy: [asc(products.sortOrder), asc(products.createdAt)],
    });

    return rows.map(mapProduct);
  } catch {
    return [];
  }
}
