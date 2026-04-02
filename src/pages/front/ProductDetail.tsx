import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
  Minus,
  Plus,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import type { Product } from "../../dto/product";
import { getProduct as fetchProduct } from "../../services/products";
import { addToCart as addToCartApi } from "../../services/cart";
import { addViewed } from "../../slice/favoritesSlice";
import useMessage from "../../hooks/useMessage";
import usePageTitle from "../../hooks/usePageTitle";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  usePageTitle(product?.title ?? "產品詳情");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { showSuccess, showError } = useMessage();

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await addToCartApi(product.id, quantity);
      setAddedToCart(true);
      showSuccess("已加入購物車");
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      showError("加入購物車失敗");
      console.error(err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProduct(id!);
        const data = response.data.product;
        setProduct(data);
        setSelectedImage(data.imageUrl || "");
        dispatch(addViewed(String(data.id)));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id, dispatch]);

  const allImages = product
    ? [product.imageUrl, ...(product.imagesUrl || [])].filter(
        (url): url is string => !!url && url.trim() !== "",
      )
    : [];

  if (isLoading) {
    return (
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
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-white/10" />
        <h2 className="font-heading text-2xl font-bold">找不到此商品</h2>
        <p className="mt-2 text-slate-500">您要尋找的商品不存在。</p>
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
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="transition-colors hover:text-slate-300">
          首頁
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="transition-colors hover:text-slate-300">
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
            </div>
            <p className="mt-1 text-sm text-slate-500">每 {product.unit}</p>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400">數量</span>
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
                <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  secondaryColor="#a855f7"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
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
  );
}
