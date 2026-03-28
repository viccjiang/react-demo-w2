import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Repeat2, Menu, X, ShoppingCart } from "lucide-react";

const navLinks = [
  { label: "探索課程", href: "/products", isRoute: true },
  { label: "訓練項目", href: "#workouts", isRoute: false },
  { label: "進度追蹤", href: "#progress", isRoute: false },
  { label: "教練團隊", href: "#trainers", isRoute: false },
  { label: "方案價格", href: "#pricing", isRoute: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const scrollTo = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollTo, 100);
    } else {
      scrollTo();
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple">
            <Repeat2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-white">
            Rep<span className="text-neon-blue">X</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-neon-blue"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="font-body text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-neon-blue"
              >
                {link.label}
              </button>
            ),
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/cart"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-neon-blue/30 hover:text-neon-blue"
            aria-label="購物車"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="font-body text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            登入
          </Link>
          <Link
            to="/products"
            className="rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-2.5 font-body text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            免費體驗
          </Link>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "關閉選單" : "開啟選單"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 bg-dark-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-base font-medium text-slate-300 transition-colors hover:text-neon-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  className="font-body text-base font-medium text-slate-300 transition-colors hover:text-neon-blue text-left"
                  onClick={() => {
                    scrollToSection(link.href);
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </button>
              ),
            )}
            <Link
              to="/cart"
              className="font-body text-base font-medium text-slate-300 transition-colors hover:text-neon-blue"
              onClick={() => setIsOpen(false)}
            >
              購物車
            </Link>
            <Link
              to="/login"
              className="font-body text-base font-medium text-slate-300 transition-colors hover:text-neon-blue"
              onClick={() => setIsOpen(false)}
            >
              登入
            </Link>
            <hr className="border-white/10" />
            <Link
              to="/products"
              className="w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple py-3 text-center font-body text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              免費體驗
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
