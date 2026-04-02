import { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingCart, Trash2, Sparkles } from "lucide-react";
import { Oval } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFavorite } from "../../slice/favoritesSlice";
import { addToCart as addToCartApi } from "../../services/cart";
import useMessage from "../../hooks/useMessage";
import usePageTitle from "../../hooks/usePageTitle";

export default function Favorites() {
  usePageTitle("我的收藏");
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.favorites);
  const { showSuccess, showError } = useMessage();
  const [addingToCart, setAddingToCart] = useState<Set<string | number>>(
    new Set()
  );

  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: string | number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart((prev) => new Set(prev).add(productId));
    try {
      await addToCartApi(productId);
      showSuccess("已加入購物車");
    } catch {
      showError("加入購物車失敗");
    } finally {
      setAddingToCart((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const handleRemove = (productId: string | number) => {
    dispatch(removeFavorite(productId));
    showSuccess("已移除收藏");
  };

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <Sparkles className="mb-4 h-16 w-16 text-white/10" />
        <h2 className="font-heading text-2xl font-bold text-white">
          還沒有收藏
        </h2>
        <p className="mt-2 text-center text-slate-500">
          回首頁滑動探索課程，右滑收藏喜歡的！
        </p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-gradient-to-r from-neon-pink to-neon-orange px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_20px_rgba(255,45,123,0.3)]"
        >
          開始探索
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-neon-pink" />
          <h1 className="font-heading text-3xl font-bold text-white">
            我的收藏
          </h1>
          <span className="rounded-full bg-neon-pink/10 px-3 py-1 font-body text-sm font-semibold text-neon-pink">
            {favorites.length}
          </span>
        </div>
        <p className="mt-2 font-body text-slate-400">
          這些是你滑動收藏的課程，可以加入購物車購買。
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
          >
            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemove(product.id)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-dark-900/80 text-slate-400 backdrop-blur-sm transition-colors hover:bg-red-500/20 hover:text-red-400"
              aria-label="移除收藏"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            {/* Image */}
            <Link to={`/product/${product.id}`}>
              <div className="relative h-48 overflow-hidden bg-dark-700">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Sparkles className="h-12 w-12 text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute left-3 top-3 rounded-lg bg-dark-900/80 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-neon-blue">
                    {product.category}
                  </span>
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-neon-blue">
                  {product.title}
                </h3>
              </Link>
              {product.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                  {product.description}
                </p>
              )}

              {/* Price & CTA */}
              <div className="mt-5 flex items-end justify-between">
                <div>
                  {product.origin_price > product.price && (
                    <span className="font-body text-sm text-slate-600 line-through">
                      NT$ {product.origin_price.toLocaleString()}
                    </span>
                  )}
                  <p className="font-heading text-2xl font-bold text-neon-green">
                    NT$ {product.price.toLocaleString()}
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      / {product.unit}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, product.id)}
                  disabled={addingToCart.has(product.id)}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50"
                >
                  {addingToCart.has(product.id) ? (
                    <Oval
                      height={16}
                      width={16}
                      color="#fff"
                      secondaryColor="#a855f7"
                      strokeWidth={4}
                      strokeWidthSecondary={4}
                    />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
