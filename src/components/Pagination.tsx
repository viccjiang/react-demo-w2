import type { Pagination as PaginationType } from "../dto/product";

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { total_pages, current_page, has_pre, has_next } = pagination;

  const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <nav aria-label="分頁導覽">
      <ul className="mt-6 flex justify-center gap-1">
        {/* 上一頁 */}
        <li>
          <button
            type="button"
            className={`rounded-md border px-3 py-2 text-sm ${
              has_pre
                ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                : "cursor-not-allowed border-slate-200 text-slate-400"
            }`}
            onClick={() => onPageChange(current_page - 1)}
            disabled={!has_pre}
          >
            &laquo; 上一頁
          </button>
        </li>

        {/* 頁碼 */}
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                page === current_page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
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
            className={`rounded-md border px-3 py-2 text-sm ${
              has_next
                ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                : "cursor-not-allowed border-slate-200 text-slate-400"
            }`}
            onClick={() => onPageChange(current_page + 1)}
            disabled={!has_next}
          >
            下一頁 &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
