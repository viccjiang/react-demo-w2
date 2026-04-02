import { Ticket } from "lucide-react";
import usePageTitle from "../../hooks/usePageTitle";

export default function AdminCoupons() {
  usePageTitle("後台 - 優惠券管理");
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <Ticket className="h-8 w-8 text-white/10" />
      </div>
      <h2 className="font-heading text-xl font-bold text-white">優惠券管理</h2>
      <p className="mt-2 text-sm text-slate-500">此功能尚未實作</p>
    </div>
  );
}
