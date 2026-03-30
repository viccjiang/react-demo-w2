import { api, apiAuth } from "./api";
import type { LoginFormData } from "../dto/auth";

export const login = (data: LoginFormData) => {
  return api.post("/admin/signin", data);
};

export const checkUserAuth = () => {
  return apiAuth.post("/api/user/check");
};

export const logout = () => {
  return apiAuth.post("/logout");
};
