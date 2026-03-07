export type ProductMedia = {
  id: string;
  url: string;
  type: "image" | "video";
  mimeType?: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description?: string | null;
  price: number;
  priceBySize?: Record<string, number>;
  image: string;
  sizes: string[];
  media: ProductMedia[];
  isActive: boolean;
  sortOrder: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};
