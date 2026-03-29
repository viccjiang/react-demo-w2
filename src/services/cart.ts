import { api, API_PATH } from "./api";

export const getCart = () => {
  return api.get(`/api/${API_PATH}/cart`);
};

export const addToCart = (productId: string | number, qty: number = 1) => {
  return api.post(`/api/${API_PATH}/cart`, {
    data: { product_id: productId, qty },
  });
};

export const updateCartItem = (cartItemId: string, productId: string, qty: number) => {
  return api.put(`/api/${API_PATH}/cart/${cartItemId}`, {
    data: { product_id: productId, qty },
  });
};

export const removeCartItem = (cartItemId: string) => {
  return api.delete(`/api/${API_PATH}/cart/${cartItemId}`);
};

export const clearCart = () => {
  return api.delete(`/api/${API_PATH}/carts`);
};
