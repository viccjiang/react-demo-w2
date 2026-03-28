import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const sidebarLinks = [
  { label: "產品管理", path: "/admin/products" },
  { label: "訂單列表", path: "/admin/orders" },
  { label: "優惠券", path: "/admin/coupons" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common.Authorization = token;

    (async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        setIsChecking(false);
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        驗證中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            RepX 後台管理
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            回到前台
          </Link>
        </div>
      </nav>
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        <aside className="w-48 shrink-0">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
