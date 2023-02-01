import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { v4 as uuidv4 } from 'uuid';

interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize}: PaginationProps) => {
  //sibling count cantidad de paginas al los lados de la pagina seleccionada

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      key={`paginator-item-ul-${uuidv4()}`}
      className="flex items-center justify-center transition duration-150 ease-in-out mt-10"
    >
      <li className={currentPage === 1 ? "text-gray-300 dark:text-white" : "text-gray-700 dark:text-gray-300"}>
        <button
          className="py-2 px-3  rounded focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </li>
      {paginationRange.map((pageNumber :any) => {
        //puntos suspensivos cuando son muchas páginas en el medio
        if (pageNumber === DOTS) {
          return (
            <li key={"item-dots"} className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </li>
          );
        }

        return (
          <li
            key={`paginator-item-li-${uuidv4()}`}
            className="text-white "
          >
            <button
              className={
                currentPage === pageNumber
                  ? "py-2 px-3  font-bold text-gray-700 dark:text-white text-xl "
                  : "py-2 px-4 text-gray-400 dark:text-gray-500 font-medium text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
              }
              disabled={currentPage === pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li
        className={currentPage === lastPage ? "text-gray-300 dark:text-white" : "text-gray-700 dark:text-gray-300"}
      >
        <button
          className="py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
