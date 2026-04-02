import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { Heart, HeartCrack, X, Sparkles, Tag, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import type { Product } from "../../dto/product";
import { addFavorite } from "../../slice/favoritesSlice";
import {
  getProduct as fetchProduct,
  getProducts as fetchProducts,
} from "../../services/products";
import useMessage from "../../hooks/useMessage";

const SWIPE_THRESHOLD = 120;

export default function SwipeCards() {
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();
  const viewedIds = useSelector((s: RootState) => s.favorites.viewedIds);
  const favorites = useSelector((s: RootState) => s.favorites.favorites);

  const [cards, setCards] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        let products: Product[] = [];

        // 優先載入瀏覽過的產品
        if (viewedIds.length > 0) {
          const results = await Promise.allSettled(
            viewedIds.slice(0, 10).map((id) => fetchProduct(id))
          );
          for (const r of results) {
            if (r.status === "fulfilled") {
              products.push(r.value.data.product);
            }
          }
        }

        // 若沒有瀏覽紀錄或數量不足，補上 API 產品
        if (products.length < 5) {
          const res = await fetchProducts(1);
          const apiProducts: Product[] = res.data.products || [];
          const existingIds = new Set(products.map((p) => String(p.id)));
          const extra = apiProducts.filter(
            (p) => !existingIds.has(String(p.id))
          );
          products = [...products, ...extra];
        }

        setCards(products);
        setCurrentIndex(0);
      } catch {
        // 失敗時嘗試用 API 產品
        try {
          const res = await fetchProducts(1);
          setCards(res.data.products || []);
          setCurrentIndex(0);
        } catch {
          setCards([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentCard = cards[currentIndex] ?? null;
  const nextCard = cards[currentIndex + 1] ?? null;
  const isFinished = currentIndex >= cards.length && cards.length > 0;
  const isFavorited = currentCard
    ? favorites.some((f) => f.id === currentCard.id)
    : false;

  const handleSwipeRight = useCallback(() => {
    if (!currentCard) return;
    if (!favorites.some((f) => f.id === currentCard.id)) {
      dispatch(addFavorite(currentCard));
      showSuccess(`已收藏「${currentCard.title}」`);
    }
    setCurrentIndex((i) => i + 1);
  }, [currentCard, dispatch, favorites, showSuccess]);

  const handleSwipeLeft = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-dark-950 py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeader />
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-neon-blue" />
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return (
      <section className="relative overflow-hidden bg-dark-950 py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeader />
          <div className="py-20 text-center">
            <p className="text-slate-400">目前沒有可推薦的產品</p>
            <Link
              to="/products"
              className="mt-4 inline-block rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-sm font-semibold text-white"
            >
              瀏覽所有課程
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-dark-950 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader />

        {isFinished ? (
          <div className="py-20 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-neon-purple" />
            <h3 className="font-heading text-2xl font-bold text-white">
              全部看完了！
            </h3>
            <p className="mt-2 text-slate-400">
              {favorites.length > 0
                ? `你已收藏 ${favorites.length} 個課程`
                : "去探索更多課程吧"}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              {favorites.length > 0 && (
                <Link
                  to="/favorites"
                  className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-orange px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_20px_rgba(255,45,123,0.3)]"
                >
                  查看收藏
                </Link>
              )}
              <Link
                to="/products"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/20"
              >
                探索更多
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Card stack — 兩張卡片堆疊 */}
            <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[480px]">
              {/* 第二張（底層） */}
              {nextCard && (
                <div className="absolute inset-0 translate-y-2 scale-[0.95] rounded-2xl border border-white/5 bg-dark-800 opacity-50 transition-all duration-300" />
              )}
              {/* 第一張（最上，可拖曳） */}
              {currentCard && (
                <SwipeCard
                  key={currentCard.id}
                  product={currentCard}
                  isFavorited={isFavorited}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleSwipeLeft}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-dark-800 text-slate-400 transition-all hover:border-red-500/30 hover:text-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                aria-label="跳過"
              >
                <X className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={handleSwipeRight}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-dark-800 text-slate-400 transition-all hover:border-neon-pink/30 hover:text-neon-pink hover:shadow-[0_0_20px_rgba(255,45,123,0.2)]"
                aria-label="收藏"
              >
                <Heart className="h-7 w-7" />
              </button>
            </div>

            {/* Progress */}
            <p className="mt-4 text-center font-body text-sm text-slate-600">
              {currentIndex + 1} / {cards.length}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mb-16 text-center">
      <span className="font-body text-sm font-semibold tracking-widest text-neon-blue uppercase">
        為你推薦
      </span>
      <h2 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
        左滑跳過，右滑{" "}
        <span className="bg-gradient-to-r from-neon-pink to-neon-orange bg-clip-text text-transparent">
          收藏
        </span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl font-body text-lg text-slate-400">
        滑動探索課程，收藏喜歡的，稍後加入購物車。
      </p>
    </div>
  );
}

function SwipeCard({
  product,
  isFavorited,
  onSwipeRight,
  onSwipeLeft,
}: {
  product: Product;
  isFavorited: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      animate(x, 500, { duration: 0.3 });
      setTimeout(onSwipeRight, 200);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      animate(x, -500, { duration: 0.3 });
      setTimeout(onSwipeLeft, 200);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab touch-none overflow-hidden rounded-2xl border border-white/10 bg-dark-800 shadow-xl active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
    >
      {/* Image */}
      <div className="relative h-[55%] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-dark-700">
            <Sparkles className="h-16 w-16 text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4 rounded-lg bg-dark-900/80 px-3 py-1 backdrop-blur-sm">
          <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-neon-blue">
            <Tag className="h-3 w-3" />
            {product.category}
          </span>
        </div>

        {/* LIKE overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-red-500/10"
          style={{ opacity: likeOpacity }}
        >
          <Heart className="h-20 w-20 fill-red-500 text-red-500 -rotate-12" />
        </motion.div>

        {/* NOPE overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-slate-500/10"
          style={{ opacity: nopeOpacity }}
        >
          <HeartCrack className="h-20 w-20 text-slate-500 rotate-12" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex h-[45%] flex-col justify-between p-5">
        <div>
          <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
            {product.title}
          </h3>
          {product.description && (
            <p className="mt-2 line-clamp-2 font-body text-sm text-slate-400">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            {product.origin_price > product.price && (
              <span className="font-body text-sm text-slate-600 line-through">
                NT$ {product.origin_price.toLocaleString()}
              </span>
            )}
            <p className="font-heading text-2xl font-bold text-neon-green">
              NT$ {product.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="rounded-lg border border-white/10 px-4 py-2 font-body text-xs font-medium text-slate-300 transition-colors hover:border-neon-blue/30 hover:text-neon-blue"
            onClick={(e) => e.stopPropagation()}
          >
            查看詳情
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
