import React from "react";

interface CSVDataTableProps {
  data:any;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  dataLoading: boolean;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
}

const CSVDataTable: React.FC<CSVDataTableProps> = ({
  data,
  currentPage,
  totalPages,
  totalCount,
  dataLoading,
  prevPage,
  nextPage,
  goToPage,
}) => {

  // if no data is available
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  // get list of pages. previous 5 page and next 5 page
  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 5);
    i <= Math.min(totalPages, currentPage + 5);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <div className="mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="border border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 w-1/10">ID</th>
              <th className="border p-2 w-3/20">Name</th>
              <th className="border p-2 w-3/20">Email</th>
              <th className="border p-2 w-3/5">Body</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border p-2 w-1/10">{row["id"]}</td>
                <td className="border p-2 w-3/20">{row["name"]}</td>
                <td className="border p-2 w-3/20">{row["email"]}</td>
                <td className="border p-2 w-3/5">{row["body"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          data-testid='prev-page-button'
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            disabled={currentPage === pageNumber}
            className={`px-4 py-2 rounded ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`
          }
          data-testid={`page-button-${pageNumber}`} 
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          data-testid='next-page-button'
        >
          Next
        </button>

        <b  className="m-4" > {currentPage*10 - 10 + 1} - {currentPage*10 - 10 + data.length} of {totalCount} </b>
        {dataLoading && <p className="mt-2">data is loading...</p>}
      </div>
    </div>
  );
};

export default CSVDataTable;
