export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceBySize?: Record<string, number>;
  image: string;
  sizes: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};
