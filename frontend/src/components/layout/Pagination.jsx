import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {

  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        disabled={isFirst}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded disabled:opacity-50"
      >
        <ChevronLeft size={15} />
      </button>

      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={isLast}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded disabled:opacity-50"
      >
        <ChevronRight size={15}/>
      </button>
    </div>
  );
};

export default Pagination;
