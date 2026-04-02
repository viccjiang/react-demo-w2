import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import usePageTitle from "../../hooks/usePageTitle";

export default function OrderSuccess() {
  usePageTitle("訂單成功");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/products");
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neon-green/10">
        <CheckCircle className="h-14 w-14 text-neon-green" />
      </div>
      <h1 className="font-heading text-3xl font-bold">訂單已成功送出！</h1>
      <p className="mt-3 text-lg text-slate-400">
        感謝您的購買，我們將盡快為您處理訂單。
      </p>
      <p className="mt-6 text-sm text-slate-500">
        {countdown} 秒後自動跳轉至課程列表...
      </p>
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mt-6 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 font-body text-sm font-bold text-white shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
      >
        立即前往
      </button>
    </div>
  );
}
