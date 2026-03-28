import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-slate-400">找不到您要的頁面</p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
      >
        回到首頁
      </Link>
    </div>
  );
}
