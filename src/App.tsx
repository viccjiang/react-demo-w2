import { useState } from "react";
import axios from "axios";
import "./assets/style.css";
import type { LoginFormData } from "./dto/auth";
import type { Product } from "./dto/product";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [isAuth, setisAuth] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [tempProduct, setTempProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  async function checkLogin() {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      if (!token) return;
      axios.defaults.headers.common.Authorization = token;

      await axios.post(`${API_BASE}/api/user/check`);
    } catch (error) {
      console.error(error);
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products`,
      );
      setProducts(response.data.products);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message);
      } else {
        console.error(err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      axios.defaults.headers.common.Authorization = `${token}`;

      getData();

      setisAuth(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`登入失敗: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        alert("登入失敗: Unknown error");
      }
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">產品列表</h2>
                  <button
                    className="rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-600"
                    type="button"
                    id="check"
                    onClick={checkLogin}
                  >
                    確認是否登入
                  </button>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 font-medium">產品名稱</th>
                        <th className="px-4 py-3 font-medium">原價</th>
                        <th className="px-4 py-3 font-medium">售價</th>
                        <th className="px-4 py-3 font-medium">是否啟用</th>
                        <th className="px-4 py-3 font-medium">查看細節</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products && products.length > 0 ? (
                        products.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {item.title}
                            </td>
                            <td className="px-4 py-3">{item.origin_price}</td>
                            <td className="px-4 py-3 text-slate-700">
                              {item.price}
                            </td>
                            <td className="px-4 py-3">
                              {item.is_enabled ? "啟用" : "未啟用"}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                                onClick={() => {
                                  setTempProduct(item);
                                  setMainImage(item.imageUrl || "");
                                }}
                              >
                                查看細節
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="px-4 py-6 text-center text-slate-500"
                            colSpan={5}
                          >
                            尚無產品資料
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full lg:w-95">
                <h2 className="text-xl font-semibold">單一產品細節</h2>
                {tempProduct ? (
                  <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <img
                      src={mainImage || tempProduct.imageUrl}
                      className="h-48 w-full object-cover"
                      alt="主圖"
                    />
                    <div className="space-y-3 p-4">
                      <div className="flex items-center gap-2">
                        <h5 className="text-lg font-semibold">
                          {tempProduct.title}
                        </h5>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                          {tempProduct.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        商品描述：{tempProduct.description}
                      </p>
                      <p className="text-sm text-slate-600">
                        商品內容：{tempProduct.content}
                      </p>
                      <div className="text-sm text-slate-700">
                        <span className="mr-2 text-slate-400 line-through">
                          {tempProduct.origin_price}
                        </span>
                        元 / {tempProduct.price} 元
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-slate-700">
                          更多圖片：
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tempProduct.imagesUrl?.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              className="h-16 w-16 cursor-pointer rounded-md object-cover"
                              alt="副圖"
                              onClick={() => setMainImage(url)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                    請選擇一個商品查看
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="mb-4 text-xl font-semibold">請先登入</h1>
              <form id="form" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="username"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    name="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                  type="submit"
                >
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
