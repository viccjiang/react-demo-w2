import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Oval } from "react-loader-spinner";
import { Package, ClipboardList, Ticket, ArrowLeft, LogOut } from "lucide-react";
import { checkUserAuth, logout } from "../services/auth";
import useMessage from "../hooks/useMessage";

const sidebarLinks = [
  { label: "產品管理", path: "/admin/products", icon: Package },
  { label: "訂單列表", path: "/admin/orders", icon: ClipboardList },
  { label: "優惠券", path: "/admin/coupons", icon: Ticket },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const { showSuccess, showError } = useMessage();

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      showSuccess("已成功登出");
      navigate("/login");
    } catch {
      showError("登出失敗");
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        await checkUserAuth();
        setIsChecking(false);
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <Oval
          height={48}
          width={48}
          color="#00d4ff"
          secondaryColor="#a855f7"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Top Nav */}
      <nav className="border-b border-white/5 bg-dark-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/admin/products" className="font-heading text-lg font-bold">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              RepX
            </span>
            <span className="ml-2 text-slate-300">後台管理</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-blue"
            >
              <ArrowLeft className="h-4 w-4" />
              回到前台
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              登出
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-neon-blue/15 to-neon-purple/15 text-neon-blue shadow-[inset_0_0_0_1px_rgba(0,212,255,0.2)]"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-neon-blue" : ""}`} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
