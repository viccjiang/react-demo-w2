import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import {
  Repeat2,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import type { CartData, CartItem } from "../dto/cart";
import type { OrderFormData } from "../dto/order";
import FullPageLoader from "../components/FullPageLoader";
import * as cartService from "../services/cart";
import { submitOrder as submitOrderApi } from "../services/orders";
import useMessage from "../hooks/useMessage";

export default function Cart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartData>({
    carts: [],
    total: 0,
    final_total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [isFullPageLoading, setIsFullPageLoading] = useState(false);
  const { showSuccess, showError } = useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    defaultValues: { name: "", email: "", tel: "", address: "", message: "" },
  });

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await cartService.getCart();
      setCartData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQty = async (item: CartItem, newQty: number) => {
    if (newQty < 1) return;
    setLoadingItems((prev) => new Set(prev).add(item.id));
    try {
      await cartService.updateCartItem(item.id, item.product_id, newQty);
      await fetchCart();
      showSuccess("已更新數量");
    } catch (err) {
      showError("更新數量失敗");
      console.error(err);
    } finally {
      setLoadingItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  const removeItem = async (id: string) => {
    setLoadingItems((prev) => new Set(prev).add(id));
    try {
      await cartService.removeCartItem(id);
      await fetchCart();
      showSuccess("已移除商品");
    } catch (err) {
      showError("移除商品失敗");
      console.error(err);
    } finally {
      setLoadingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleClearCart = async () => {
    setIsFullPageLoading(true);
    try {
      await cartService.clearCart();
      await fetchCart();
      showSuccess("已清空購物車");
    } catch (err) {
      showError("清空購物車失敗");
      console.error(err);
    } finally {
      setIsFullPageLoading(false);
    }
  };

  const submitOrder = async (data: OrderFormData) => {
    setIsFullPageLoading(true);
    try {
      await submitOrderApi(data);
      reset();
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      showError("訂單送出失敗，請稍後再試");
    } finally {
      setIsFullPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {(isFullPageLoading || isSubmitting) && <FullPageLoader />}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            to="/products"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-neon-blue"
          >
            <ArrowLeft className="h-4 w-4" />
            繼續購物
          </Link>
          <h1 className="font-heading text-3xl font-bold">
            <ShoppingCart className="mb-1 mr-3 inline-block h-7 w-7 text-neon-blue" />
            購物車
            {cartData.carts.length > 0 && (
              <span className="ml-3 text-lg font-normal text-slate-500">
                ({cartData.carts.length} 件商品)
              </span>
            )}
          </h1>
        </div>
        {cartData.carts.length > 0 && (
          <button
            type="button"
            onClick={handleClearCart}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/20"
          >
            清空全部
          </button>
        )}
      </div>

      {isLoading ? (
        /* Loading skeleton */
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse gap-4 rounded-2xl border border-white/5 bg-dark-800 p-5"
            >
              <div className="h-24 w-24 shrink-0 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-1/3 rounded bg-white/5" />
                <div className="h-4 w-1/4 rounded bg-white/5" />
              </div>
              <div className="h-8 w-24 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : cartData.carts.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center py-24 text-center">
          <ShoppingCart className="mb-4 h-20 w-20 text-white/10" />
          <h2 className="font-heading text-2xl font-bold">
            購物車是空的
          </h2>
          <p className="mt-2 text-slate-500">
            探索我們的課程，開始你的健身旅程。
          </p>
          <Link
            to="/products"
            className="mt-8 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 font-body text-sm font-bold text-white shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
          >
            瀏覽課程
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {cartData.carts.map((item) => {
              const isItemLoading = loadingItems.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-dark-800 p-5 transition-opacity sm:flex-row sm:items-center ${isItemLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  {isItemLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <Oval
                        height={24}
                        width={24}
                        color="#00d4ff"
                        secondaryColor="#a855f7"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                      />
                    </div>
                  )}

                  {/* Image */}
                  <Link
                    to={`/product/${item.product_id}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-dark-700"
                  >
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Repeat2 className="h-8 w-8 text-white/10" />
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="font-heading text-base font-bold text-white transition-colors hover:text-neon-blue"
                    >
                      {item.product.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.product.category} / {item.product.unit}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-neon-green">
                      NT$ {item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => updateQty(item, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="flex h-9 w-9 items-center justify-center text-slate-400 transition-colors hover:text-white disabled:opacity-30"
                        aria-label="減少數量"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center font-heading text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item, item.qty + 1)}
                        className="flex h-9 w-9 items-center justify-center text-slate-400 transition-colors hover:text-white"
                        aria-label="增加數量"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="w-28 text-right font-heading text-base font-bold text-white">
                      NT$ {item.final_total.toLocaleString()}
                    </span>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`移除 ${item.product.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-dark-800 p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>小計</span>
                <span>NT$ {cartData.total.toLocaleString()}</span>
              </div>
              <hr className="border-white/5" />
              <div className="flex justify-between">
                <span className="text-base font-semibold text-white">
                  合計
                </span>
                <span className="font-heading text-2xl font-bold text-neon-green">
                  NT$ {cartData.final_total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-dark-800 p-6">
            <h2 className="mb-6 font-heading text-xl font-bold text-white">
              結帳資訊
            </h2>
            <form onSubmit={handleSubmit(submitOrder)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    姓名
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-blue/50"
                    }`}
                    placeholder="請輸入姓名"
                    {...register("name", { required: "姓名為必填" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full rounded-xl border bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-blue/50"
                    }`}
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Email 為必填",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    電話
                  </label>
                  <input
                    type="tel"
                    className={`w-full rounded-xl border bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                      errors.tel
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-blue/50"
                    }`}
                    placeholder="請輸入電話"
                    {...register("tel", {
                      required: "電話為必填",
                      minLength: {
                        value: 8,
                        message: "電話至少需要 8 碼",
                      },
                    })}
                  />
                  {errors.tel && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.tel.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    地址
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                      errors.address
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-blue/50"
                    }`}
                    placeholder="請輸入地址"
                    {...register("address", { required: "地址為必填" })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  留言 <span className="text-slate-500">（選填）</span>
                </label>
                <textarea
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-blue/50"
                  placeholder="有什麼想告訴我們的嗎？"
                  rows={3}
                  {...register("message")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Oval
                      height={20}
                      width={20}
                      color="#fff"
                      secondaryColor="#a855f7"
                      strokeWidth={4}
                      strokeWidthSecondary={4}
                    />
                    送出訂單中...
                  </>
                ) : (
                  "送出訂單"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
