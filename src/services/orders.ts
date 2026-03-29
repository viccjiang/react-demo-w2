import { api, apiAuth, API_PATH } from "./api";
import type { OrderFormData } from "../dto/order";

export const submitOrder = (data: OrderFormData) => {
  return api.post(`/api/${API_PATH}/order`, {
    data: {
      user: {
        name: data.name,
        email: data.email,
        tel: data.tel,
        address: data.address,
      },
      message: data.message,
    },
  });
};

export const getAdminOrders = (page: number = 1) => {
  return apiAuth.get(`/api/${API_PATH}/admin/orders`, { params: { page } });
};
