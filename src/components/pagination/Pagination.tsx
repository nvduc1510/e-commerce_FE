import React from "react";
import { Link } from "react-router-dom";

interface PaginationProps {
    totalRecords: number;
    limit: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalRecords, limit, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRecords / limit);
    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = (): (number | "...")[] => {
        const maxVisiblePages = 5;
        const pages: (number | "...")[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage < 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage > totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="mt-10 md:mt-12 flex items-center justify-center gap-[10px]">
            {/* Previous button */}
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                }}
                className="text-title dark:text-white text-xl"
            >
                <span className="lnr lnr-arrow-left"></span>
            </Link>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span
                        key={`dots-${index}`}
                        className="text-title dark:text-white text-3xl sm:text-4xl transform"
                    >
                        ...
                    </span>
                ) : (
                    <Link
                        to="#"
                        key={page}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                        }}
                        className={`w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center leading-none text-base sm:text-lg font-medium transition-all duration-300 
                            ${currentPage === page
                                ? "bg-title text-white dark:bg-white dark:text-title"
                                : "bg-title bg-opacity-5 text-title hover:bg-opacity-100 hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:hover:bg-opacity-100 dark:hover:text-title"
                            }`}
                    >
                        {page}
                    </Link>
                )
            )}

            {/* Next button */}
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                }}
                className="text-title dark:text-white text-xl"
            >
                <span className="lnr lnr-arrow-right"></span>
            </Link>
        </div>
    );
};

export default Pagination;
