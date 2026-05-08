import { ChevronLeft, ChevronRight } from "lucide-react";

const ArrowButton = ({ isLeft, ...props }) => {
  return (
    <button
      {...props}
      className="p-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-surface disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary disabled:cursor-not-allowed transition duration-200 hover:cursor-pointer"
    >
      {isLeft ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
};

const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <ArrowButton
        isLeft={true}
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      ></ArrowButton>
      <span className="text-text font-bold">
        {page} / {totalPages}
      </span>
      <ArrowButton
        isLeft={false}
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      ></ArrowButton>
    </div>
  );
};

export default Pagination;
