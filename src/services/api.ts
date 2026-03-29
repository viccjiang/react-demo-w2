import axios from "axios";

export const API_PATH = import.meta.env.VITE_API_PATH;
export const API_BASE = import.meta.env.VITE_API_BASE;

// 前台公開 API（不需認證）
export const api = axios.create({
  baseURL: API_BASE,
});

// 後台 API（需要認證）
export const apiAuth = axios.create({
  baseURL: API_BASE,
});

// 請求攔截器 - 自動從 cookie 讀取 token 加入 Authorization header
apiAuth.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 回應攔截器 - 401 時清除 cookie 並導向登入頁
apiAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.hash = "#/login";
    }
    return Promise.reject(error);
  },
);
