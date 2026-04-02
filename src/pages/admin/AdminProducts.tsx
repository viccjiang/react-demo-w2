import { useEffect, useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import type { Product, Pagination as PaginationType } from "../../dto/product";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";
import type {
  ProductModalHandle,
  ModalType,
  TemplateData,
} from "../../types/modal";
import usePageTitle from "../../hooks/usePageTitle";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/products";
import useMessage from "../../hooks/useMessage";

export default function AdminProducts() {
  usePageTitle("後台 - 產品管理");
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<ProductModalHandle>(null);
  const { showSuccess, showError } = useMessage();

  const getProductData = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await getAdminProducts(page);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalConfirm = async (type: ModalType, data: TemplateData) => {
    try {
      if (type === "create") {
        await createProduct({
          ...data,
          origin_price: Number(data.origin_price),
          price: Number(data.price),
          is_enabled: data.is_enabled ? 1 : 0,
        });
        showSuccess("產品建立成功");
      } else if (type === "edit") {
        await updateProduct(data.id, {
          ...data,
          origin_price: Number(data.origin_price),
          price: Number(data.price),
          is_enabled: data.is_enabled ? 1 : 0,
        });
        showSuccess("產品更新成功");
      } else if (type === "delete") {
        await deleteProduct(data.id);
        showSuccess("產品刪除成功");
      }
      await getProductData();
    } catch (error) {
      showError(`操作失敗: ${error instanceof Error ? error.message : "Unknown error"}`);
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
        <h2 className="font-heading text-xl font-bold text-white">產品列表</h2>
        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
        >
          建立新的產品
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-dark-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/5 bg-dark-900/50">
            <tr>
              <th className="px-5 py-3.5 font-medium text-slate-400">分類</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">產品名稱</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">原價</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">售價</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">狀態</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center">
                  <div className="flex items-center justify-center">
                    <Oval
                      height={32}
                      width={32}
                      color="#00d4ff"
                      secondaryColor="#a855f7"
                      strokeWidth={4}
                      strokeWidthSecondary={4}
                    />
                  </div>
                </td>
              </tr>
            ) : products && products.length > 0 ? (
              products.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5">
                    <span className="rounded-lg bg-neon-blue/10 px-2.5 py-1 text-xs font-medium text-neon-blue">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-white">
                    {item.title}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    NT$ {item.origin_price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-neon-green">
                    NT$ {item.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.is_enabled
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${item.is_enabled ? "bg-emerald-400" : "bg-red-400"}`} />
                      {item.is_enabled ? "啟用" : "未啟用"}
                    </span>
                  </td>
                  <td className="space-x-2 px-5 py-3.5">
                    <button
                      className="rounded-lg border border-neon-blue/20 bg-neon-blue/10 px-3 py-1.5 text-xs font-medium text-neon-blue transition-colors hover:border-neon-blue/40 hover:bg-neon-blue/20"
                      type="button"
                      onClick={() => openEditModal(item)}
                    >
                      編輯
                    </button>
                    <button
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/20"
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
                  className="px-5 py-10 text-center text-slate-500"
                  colSpan={6}
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
