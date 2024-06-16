import React, { useState } from 'react';

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const [visibleRange, setVisibleRange] = useState([1, 4]);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      if (currentPage - 1 < visibleRange[0]) {
        setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
      if (currentPage + 1 > visibleRange[1]) {
        setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
      }
    }
  };

  const handleFirst = () => {
    paginate(1);
    setVisibleRange([1, 4]);
  };

  const handleLast = () => {
    paginate(totalPages);
    setVisibleRange([totalPages - 3, totalPages]);
  };

  const handleNumberClick = (number) => {
    paginate(number);
    if (number < visibleRange[0]) {
      setVisibleRange([number, number + 3]);
    } else if (number > visibleRange[1]) {
      setVisibleRange([number - 3, number]);
    }
  };

  return (
    <div className="pagination-nav mt-4">
      <ul className="flex justify-center space-x-2">
        <li className="pagination-li">
          <button
            onClick={handleFirst}
            className="pagination-button bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            First
          </button>
        </li>
        <li className="pagination-li">
          <button
            onClick={handlePrev}
            className="pagination-button bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Prev
          </button>
        </li>
        {Array.from({ length: 4 }, (_, i) => visibleRange[0] + i)
          .filter((number) => number <= totalPages)
          .map((number) => (
            <li key={number} className="pagination-li">
              <button
                onClick={() => handleNumberClick(number)}
                className={`pagination-button px-4 py-2 rounded-lg ${
                  number === currentPage ? 'bg-blue-900 text-white' : 'bg-blue-700 text-white'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        <li className="pagination-li">
          <button
            onClick={handleNext}
            className="pagination-button bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </li>
        <li className="pagination-li">
          <button
            onClick={handleLast}
            className="pagination-button bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
