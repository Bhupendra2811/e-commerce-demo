import React from 'react';


export default function Pagination({ currentPage, totalPages, onPageChange }) {
    console.log("aaaaassssssss", totalPages, currentPage)
    const MAX_PAGES_DISPLAYED = 5;

    const getPaginationItems = () => {
        if (totalPages <= MAX_PAGES_DISPLAYED) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            if (currentPage === 1) end += 2;
            if (currentPage === totalPages) start -= 2;
            let pages = [1, ...Array.from({ length: end - start + 1 }, (_, i) => i + start), totalPages];
            if (pages[1] > 2) pages.splice(1, 0, '...');
            if (pages[pages.length - 2] < totalPages - 1) pages.splice(pages.length - 1, 0, '...');
            return pages;
        }
    };

    return (
        <div className="flex items-center justify-end gap-4 py-6">
            <div
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(Math.max(currentPage - 1, 1));
                    }
                }}
                className={`cursor-pointer ${currentPage === 1 ? 'text-gray-500' : ''}`}
            >
                <span /* src={Icon} alt="Previous Icon" */ className={`${currentPage === 1 ? 'rotate-180' : ''}`} >Prev</span>
            </div>
            {getPaginationItems()?.map((page, index) => (
                <div
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`border border-solid rounded w-8 h-8 flex items-center justify-center transition duration-300 ${page === currentPage ? 'text-blue-500 border-blue-500' : 'text-gray-700 hover:text-blue-500 hover:border-blue-500'
                        }`}
                >
                    {page}
                </div>
            ))}
            <div
                onClick={() => {
                    if (currentPage < totalPages) {
                        onPageChange(Math.min(currentPage + 1, totalPages));
                    }
                }}
                className={`cursor-pointer ${currentPage === totalPages ? 'text-gray-500' : ''}`}
            >
                <span>Next</span>
            </div>
        </div>
    );
}
