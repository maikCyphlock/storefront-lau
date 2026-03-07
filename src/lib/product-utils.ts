import { Product } from "@/types/store";

export function getProductPrice(product: Product, size: string) {
  if (product.priceBySize?.[size]) {
    return product.priceBySize[size];
  }

  return product.price;
}
