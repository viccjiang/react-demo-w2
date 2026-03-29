export type OrderFormData = {
  name: string;
  email: string;
  tel: string;
  address: string;
  message: string;
};

export type OrderProduct = {
  id: string;
  product_id: string;
  qty: number;
};

export type OrderUser = {
  name: string;
  email: string;
  tel: string;
  address: string;
};

export type Order = {
  id: string;
  create_at: number;
  is_paid: boolean;
  message: string;
  products: Record<string, OrderProduct>;
  user: OrderUser;
  total: number;
};
