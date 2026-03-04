"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/store";

type AddPayload = {
  product: Product;
  size: string;
};

type CartState = {
  items: CartItem[];
  addToCart: (payload: AddPayload) => void;
  removeFromCart: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: ({ product, size }) => {
        const key = `${product.id}-${size}`;
        const items = [...get().items];
        const existingIndex = items.findIndex(
          (item) => `${item.product.id}-${item.size}` === key,
        );

        if (existingIndex > -1) {
          items[existingIndex].quantity += 1;
        } else {
          items.push({ product, quantity: 1, size });
        }

        set({ items });
      },
      removeFromCart: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size),
          ),
        });
      },
      setQuantity: (productId, size, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId, size);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: "aphelion-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
