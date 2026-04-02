import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import type { Order } from "../../dto/order";
import type { Pagination as PaginationType } from "../../dto/product";
import Pagination from "../../components/Pagination";
import { getAdminOrders } from "../../services/orders";
import usePageTitle from "../../hooks/usePageTitle";

export default function AdminOrders() {
  usePageTitle("後台 - 訂單管理");
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const res = await getAdminOrders(page);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <h2 className="font-heading text-xl font-bold text-white">訂單列表</h2>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-dark-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/5 bg-dark-900/50">
            <tr>
              <th className="px-5 py-3.5 font-medium text-slate-400">訂單編號</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">訂購人</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">Email</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">訂單金額</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">付款狀態</th>
              <th className="px-5 py-3.5 font-medium text-slate-400">訂單日期</th>
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
            ) : orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                    {order.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-white">
                    {order.user?.name || "-"}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {order.user?.email || "-"}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-neon-green">
                    NT$ {order.total?.toLocaleString() || 0}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.is_paid
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${order.is_paid ? "bg-emerald-400" : "bg-red-400"}`} />
                      {order.is_paid ? "已付款" : "未付款"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {formatDate(order.create_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                  尚無訂單資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} onPageChange={getOrders} />
    </>
  );
}
