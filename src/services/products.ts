import { api, apiAuth, API_PATH } from "./api";

// 前台
export const getProducts = (page: number = 1, category?: string) => {
  const params: Record<string, string | number> = { page };
  if (category && category !== "全部") {
    params.category = category;
  }
  return api.get(`/api/${API_PATH}/products`, { params });
};

export const getProduct = (id: string) => {
  return api.get(`/api/${API_PATH}/product/${id}`);
};

// 後台
export const getAdminProducts = (page: number = 1) => {
  return apiAuth.get(`/api/${API_PATH}/admin/products`, { params: { page } });
};

export const createProduct = (data: Record<string, unknown>) => {
  return apiAuth.post(`/api/${API_PATH}/admin/product`, { data });
};

export const updateProduct = (id: string | number, data: Record<string, unknown>) => {
  return apiAuth.put(`/api/${API_PATH}/admin/product/${id}`, { data });
};

export const deleteProduct = (id: string | number) => {
  return apiAuth.delete(`/api/${API_PATH}/admin/product/${id}`);
};
