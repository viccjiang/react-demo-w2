import type { Product } from "./product";

export type CartItem = {
  id: string;
  product_id: string;
  product: Product;
  qty: number;
  total: number;
  final_total: number;
};

export type CartData = {
  carts: CartItem[];
  total: number;
  final_total: number;
};
