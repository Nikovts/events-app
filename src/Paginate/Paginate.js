import React from "react";
import "./Paginate.css";
function Paginate({ totalPages, paginate, firstPage, lastPage, currentPage }) {
  const pageNumbers = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={firstPage} className="page-number">
          First
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </li>
        ))}
        <li onClick={lastPage} className="page-number">
          Last
        </li>
      </ul>
    </div>
  );
}

export default Paginate;
