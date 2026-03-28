import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import {
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
  Minus,
  Plus,
  Repeat2,
  Tag,
  ChevronRight,
  Loader2,
} from "lucide-react";
import type { Product } from "../dto/product";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: { product_id: product.id, qty: quantity },
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        const data = response.data.product;
        setProduct(data);
        setSelectedImage(data.imageUrl || "");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const allImages = product
    ? [
        product.imageUrl,
        ...(product.imagesUrl || []),
      ].filter((url): url is string => !!url && url.trim() !== "")
    : [];

  const discountPercent =
    product && product.price < product.origin_price
      ? Math.round(
          ((product.origin_price - product.price) / product.origin_price) * 100,
        )
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 font-body text-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple">
                <Repeat2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                Rep<span className="text-neon-blue">X</span>
              </span>
            </Link>
          </div>
        </nav>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid animate-pulse gap-12 lg:grid-cols-2">
            <div className="h-96 rounded-2xl bg-white/5" />
            <div className="space-y-4">
              <div className="h-6 w-24 rounded bg-white/5" />
              <div className="h-10 w-3/4 rounded bg-white/5" />
              <div className="h-20 w-full rounded bg-white/5" />
              <div className="h-12 w-40 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-950 font-body text-white">
        <ShoppingBag className="mb-4 h-16 w-16 text-white/10" />
        <h2 className="font-heading text-2xl font-bold">找不到此商品</h2>
        <p className="mt-2 text-slate-500">
          您要尋找的商品不存在。
        </p>
        <Link
          to="/products"
          className="mt-6 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-sm font-semibold text-white"
        >
          返回課程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 font-body text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple">
              <Repeat2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-white">
              Rep<span className="text-neon-blue">X</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              首頁
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              探索課程
            </Link>
            <Link
              to="/cart"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-neon-blue/30 hover:text-neon-blue"
              aria-label="購物車"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition-colors hover:text-slate-300">
            首頁
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to="/products"
            className="transition-colors hover:text-slate-300"
          >
            探索課程
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-300">{product.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-neon-blue"
        >
          <ArrowLeft className="h-4 w-4" />
          返回課程列表
        </Link>

        {/* Product Content */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center">
                  <ShoppingBag className="h-20 w-20 text-white/10" />
                </div>
              )}

              {discountPercent > 0 && (
                <div className="absolute right-4 top-4 rounded-xl bg-neon-orange/90 px-3 py-1.5">
                  <span className="text-sm font-bold text-white">
                    {discountPercent}% 折扣
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-3">
                {allImages.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(url)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === url
                        ? "border-neon-blue shadow-[0_0_10px_rgba(0,212,255,0.3)]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.title} ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-neon-blue/10 px-3 py-1.5">
              <Tag className="h-3.5 w-3.5 text-neon-blue" />
              <span className="text-xs font-semibold text-neon-blue">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl font-bold lg:text-4xl">
              {product.title}
            </h1>

            {/* Description */}
            {product.description && (
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                {product.description}
              </p>
            )}

            {/* Content */}
            {product.content && product.content !== product.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {product.content}
              </p>
            )}

            {/* Price */}
            <div className="mt-8 rounded-2xl border border-white/5 bg-dark-800 p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl font-bold text-neon-green">
                  NT$ {product.price.toLocaleString()}
                </span>
                {discountPercent > 0 && (
                  <span className="text-lg text-slate-500 line-through">
                    NT$ {product.origin_price.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500">
                每 {product.unit}
              </p>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-slate-400">
                  數量
                </span>
                <div className="flex items-center rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:text-white"
                    aria-label="減少數量"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-heading text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:text-white"
                    aria-label="增加數量"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-sm text-slate-400">小計</span>
                <span className="font-heading text-2xl font-bold text-white">
                  NT$ {(product.price * quantity).toLocaleString()}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-body text-base font-bold text-white transition-all duration-300 disabled:opacity-60 ${
                  addedToCart
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 shadow-[0_0_25px_rgba(57,255,20,0.3)]"
                    : "bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
                }`}
              >
                {isAddingToCart ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : addedToCart ? (
                  <>已加入購物車！</>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    加入購物車
                  </>
                )}
              </button>
            </div>

            {/* Product Status */}
            <div className="mt-6 flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  product.is_enabled ? "bg-neon-green" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-slate-400">
                {product.is_enabled ? "供應中" : "已售完"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
