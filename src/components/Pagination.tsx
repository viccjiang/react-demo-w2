import type { Pagination as PaginationType } from "../dto/product";

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { total_pages, current_page, has_pre, has_next } = pagination;

  const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

  if (total_pages <= 1) return null;

  return (
    <nav aria-label="分頁導覽">
      <ul className="mt-8 flex justify-center gap-2">
        {/* 上一頁 */}
        <li>
          <button
            type="button"
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              has_pre
                ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                : "cursor-not-allowed border-white/5 text-slate-600"
            }`}
            onClick={() => onPageChange(current_page - 1)}
            disabled={!has_pre}
          >
            上一頁
          </button>
        </li>

        {/* 頁碼 */}
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${
                page === current_page
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* 下一頁 */}
        <li>
          <button
            type="button"
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              has_next
                ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                : "cursor-not-allowed border-white/5 text-slate-600"
            }`}
            onClick={() => onPageChange(current_page + 1)}
            disabled={!has_next}
          >
            下一頁
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
