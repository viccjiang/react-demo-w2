import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Product, Pagination as PaginationType } from "../dto/product";
import ProductModal from "../components/ProductModal";
import Pagination from "../components/Pagination";
import type {
  ProductModalHandle,
  ModalType,
  TemplateData,
} from "../types/modal";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: "",
  });
  const modalRef = useRef<ProductModalHandle>(null);

  const getProductData = async (page: number = 1) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products`,
        { params: { page } },
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message);
      } else {
        console.error(err);
      }
    }
  };

  const handleModalConfirm = async (type: ModalType, data: TemplateData) => {
    try {
      if (type === "create") {
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
        await axios.delete(
          `${API_BASE}/api/${API_PATH}/admin/product/${data.id}`,
        );
        alert("產品刪除成功");
      }
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
    (async () => {
      await getProductData();
    })();
  }, []);

  return (
    <>
      <ProductModal ref={modalRef} onConfirm={handleModalConfirm} />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">產品列表</h2>
      </div>

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
                  <td className="px-4 py-3 text-slate-700">{item.price}</td>
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

      <Pagination pagination={pagination} onPageChange={getProductData} />
    </>
  );
}
