import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Filter, ShoppingBag, ShoppingCart } from "lucide-react";
import { Oval } from "react-loader-spinner";
import type { Product, Pagination as PaginationType } from "../dto/product";
import { getProducts as fetchProducts } from "../services/products";
import { addToCart as addToCartApi } from "../services/cart";
import useMessage from "../hooks/useMessage";

const CATEGORIES = ["全部", "培訓", "體驗課"];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: "",
  });
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<Set<string | number>>(new Set());
  const { showSuccess, showError } = useMessage();

  const addToCart = async (e: React.MouseEvent, productId: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart((prev) => new Set(prev).add(productId));
    try {
      await addToCartApi(productId);
      showSuccess("已加入購物車");
    } catch (err) {
      showError("加入購物車失敗");
      console.error(err);
    } finally {
      setAddingToCart((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const getProducts = async (page: number = 1, category?: string) => {
    setIsLoading(true);
    try {
      const response = await fetchProducts(page, category);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1, activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handlePageChange = (page: number) => {
    getProducts(page, activeCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : products;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-dark-900 py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-neon-blue/10 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[200px] w-[200px] rounded-full bg-neon-purple/10 blur-[80px]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-heading text-4xl font-bold lg:text-5xl">
            探索{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              課程
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-400">
            找到最適合你健身目標的訓練課程。
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="搜尋課程..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-blue/50 sm:w-72"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        {isLoading ? (
          /* Skeleton Loading */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/5 bg-dark-800"
              >
                <div className="h-48 rounded-t-2xl bg-white/5" />
                <div className="p-5">
                  <div className="h-4 w-20 rounded bg-white/5" />
                  <div className="mt-3 h-6 w-3/4 rounded bg-white/5" />
                  <div className="mt-4 h-4 w-full rounded bg-white/5" />
                  <div className="mt-6 flex justify-between">
                    <div className="h-8 w-24 rounded bg-white/5" />
                    <div className="h-10 w-28 rounded-xl bg-white/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
              >
                {/* Image */}
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
                      <ShoppingBag className="h-12 w-12 text-white/10" />
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

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-neon-blue">
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                      {product.description}
                    </p>
                  )}

                  {/* Price & CTA */}
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="font-heading text-2xl font-bold text-neon-green">
                        NT$ {product.price.toLocaleString()}
                        <span className="ml-1 text-sm font-normal text-slate-500">
                          / {product.unit}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => addToCart(e, product.id)}
                      disabled={addingToCart.has(product.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50"
                    >
                      {addingToCart.has(product.id) ? (
                        <Oval height={16} width={16} color="#fff" secondaryColor="#a855f7" strokeWidth={4} strokeWidthSecondary={4} />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                      加入購物車
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center py-20 text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-white/10" />
            <h3 className="font-heading text-xl font-bold text-white">
              找不到相關課程
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              請調整搜尋條件或篩選項目。
            </p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && pagination.total_pages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.has_pre}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              上一頁
            </button>
            {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pagination.current_page === page
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.has_next}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              下一頁
            </button>
          </div>
        )}
      </div>
    </>
  );
}
