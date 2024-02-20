import React from "react";

const NavPages = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onChangePage,
  onChangeItemsPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="navigation d-flex justify-content-between"
      aria-label="Page navigation example"
    >
      <select
        className="pager"
        value={itemsPerPage}
        onChange={(e) => {
          onChangeItemsPerPage(e);
          onChangePage(1);
        }}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>

      <ul className="pagination m-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onChangePage(number)}>
              {number}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              currentPage < totalPages && onChangePage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavPages;
