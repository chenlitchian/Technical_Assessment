import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import CSVDataTable from "./CSVDataTable";
interface CSVDataResponse {
  data: string[][];
  totalCount: number;
}
const UploadCSV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataLoading, setdataLoading] = useState<boolean>(false);
  const [csvData, setCSVData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(searchText, currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(searchText, currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchData(searchText, page);
  };


  const fetchData = async (search: string, page: number) => {
    try {
      setdataLoading(true);
      const response = await axios.get<CSVDataResponse>(
        "http://localhost:4000/data",
        {
          params: {
            search,
            page
          },
        }
      );
      setCSVData(response.data.data);
      setTotalPages(Math.ceil(response.data.totalCount / 10));
      setTotalCount(response.data.totalCount)
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    } finally {
      setdataLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setUploadMessage("");
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Handle success response
      setUploadMessage(response.data.message); // Update message state
      fetchData('',1)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData(searchText, 1);
    }
  };

  useEffect(() => {
    fetchData("", 1); // Fetch initial data with empty search, page 1
  }, []);

  return (
    <div className="m-4 border-2 border-black">
      <div className="bg-blue-500 text-white p-4">Upload CSV</div>
      <div className="flex items-center m-4 ">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex">
            <input type="file" data-testid="upload-csv-file" onChange={handleFileChange} className="mr-2" />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              data-testid="upload-button"
            >
              Upload
            </button>
          </form>
          {loading && <p className="mt-2">Uploading...</p>}
          {uploadMessage && <p className="mt-2">{uploadMessage}</p>}
        </div>
        <div>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search..."
            className="border border-gray-300 px-4 py-2 rounded mr-2"
            data-testid="search-input"
          />
        </div>
      </div>

      <div className="m-4">
        <CSVDataTable
          dataLoading={dataLoading}
          data={csvData}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          prevPage={prevPage}
          nextPage={nextPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default UploadCSV;
