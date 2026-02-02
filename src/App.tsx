import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./assets/style.css";
import type { LoginFormData } from "./dto/auth";
import type { Product } from "./dto/product";
import ProductModal from "./components/ProductModal";
import type {
  ProductModalHandle,
  ModalType,
  TemplateData,
} from "./types/modal";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const modalRef = useRef<ProductModalHandle>(null);

  const getProductData = async () => {
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

  const checkLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/check`);
      console.log(response.data);
      setIsAuth(true);
      getProductData();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
      } else {
        console.log("Unknown error");
      }
      setIsAuth(false);
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

      getProductData();

      setIsAuth(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`登入失敗: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        alert("登入失敗: Unknown error");
      }
    }
  };

  const handleModalConfirm = async (type: ModalType, data: TemplateData) => {
    try {
      if (type === "create") {
        // 建立新產品
        await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, {
          data: {
            ...data,
            origin_price: Number(data.origin_price),
            price: Number(data.price),
            is_enabled: data.is_enabled ? 1 : 0,
          },
        });
        alert("產品建立成功");
      } else if (type === "edit") {
        // 編輯產品
        await axios.put(
          `${API_BASE}/api/${API_PATH}/admin/product/${data.id}`,
          {
            data: {
              ...data,
              origin_price: Number(data.origin_price),
              price: Number(data.price),
              is_enabled: data.is_enabled ? 1 : 0,
            },
          },
        );
        alert("產品更新成功");
      } else if (type === "delete") {
        // 刪除產品
        await axios.delete(
          `${API_BASE}/api/${API_PATH}/admin/product/${data.id}`,
        );
        alert("產品刪除成功");
      }
      // 重新取得產品列表
      await getProductData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`操作失敗: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        alert("操作失敗: Unknown error");
      }
    }
  };

  const openCreateModal = () => {
    modalRef.current?.openModal("create");
  };

  const openEditModal = (product: Product) => {
    modalRef.current?.openModal("edit", {
      id: product.id,
      title: product.title,
      category: product.category,
      origin_price: product.origin_price,
      price: product.price,
      unit: product.unit,
      description: product.description,
      content: product.content,
      is_enabled: Boolean(product.is_enabled),
      imageUrl: product.imageUrl || "",
      imagesUrl: product.imagesUrl || [],
    });
  };

  const openDeleteModal = (product: Product) => {
    modalRef.current?.openModal("delete", {
      id: product.id,
      title: product.title,
      category: product.category,
      origin_price: product.origin_price,
      price: product.price,
      unit: product.unit,
      description: product.description,
      content: product.content,
      is_enabled: Boolean(product.is_enabled),
      imageUrl: product.imageUrl || "",
      imagesUrl: product.imagesUrl || [],
    });
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (!token) return;
    axios.defaults.headers.common.Authorization = token;

    (async () => {
      await checkLogin();
    })();
  }, []);

  return (
    <>
      <ProductModal ref={modalRef} onConfirm={handleModalConfirm} />
      {isAuth ? (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">產品列表</h2>
                </div>

                {/* 新增產品按鈕 */}
                <div className="mt-4 text-end">
                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                  >
                    建立新的產品
                  </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 font-medium">分類</th>
                        <th className="px-4 py-3 font-medium">產品名稱</th>
                        <th className="px-4 py-3 font-medium">原價</th>
                        <th className="px-4 py-3 font-medium">售價</th>
                        <th className="px-4 py-3 font-medium">是否啟用</th>
                        <th className="px-4 py-3 font-medium">編輯</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products && products.length > 0 ? (
                        products.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">{item.category}</td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {item.title}
                            </td>
                            <td className="px-4 py-3">{item.origin_price}</td>
                            <td className="px-4 py-3 text-slate-700">
                              {item.price}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`${item.is_enabled ? "text-green-600" : "text-red-600"}`}
                              >
                                {item.is_enabled ? "啟用" : "未啟用"}
                              </span>
                            </td>
                            <td className="space-x-3 px-4 py-3">
                              <button
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                                type="button"
                                onClick={() => openEditModal(item)}
                              >
                                編輯
                              </button>
                              <button
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                                type="button"
                                onClick={() => openDeleteModal(item)}
                              >
                                刪除
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
