import React from "react";
import { render, fireEvent, screen, getByTestId, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UploadCSV from "./UploadCSV";
import axios from "axios";
jest.mock("axios");

const mockData = [
    { id: 1, name: "Name 1", email: "email1@example.com", body: "Body 1" },
    { id: 2, name: "Name 2", email: "email2@example.com", body: "Body 2" },
    { id: 3, name: "Name 3", email: "email3@example.com", body: "Body 3" },
    { id: 4, name: "Name 4", email: "email4@example.com", body: "Body 4" },
    { id: 5, name: "Name 5", email: "email5@example.com", body: "Body 5" },
    { id: 6, name: "Name 6", email: "email6@example.com", body: "Body 6" },
    { id: 7, name: "Name 7", email: "email7@example.com", body: "Body 7" },
    { id: 8, name: "Name 8", email: "email8@example.com", body: "Body 8" },
    { id: 9, name: "Name 9", email: "email9@example.com", body: "Body 9" },
    { id: 10, name: "Name 10", email: "email10@example.com", body: "Body 10" },
    { id: 11, name: "Name 11", email: "email11@example.com", body: "Body 11" },
    { id: 12, name: "Name 12", email: "email12@example.com", body: "Body 12" },
    { id: 13, name: "Name 13", email: "email13@example.com", body: "Body 13" },
    { id: 14, name: "Name 14", email: "email14@example.com", body: "Body 14" },
    { id: 15, name: "Name 15", email: "email15@example.com", body: "Body 15" },
    { id: 16, name: "Name 16", email: "email16@example.com", body: "Body 16" },
    { id: 17, name: "Name 17", email: "email17@example.com", body: "Body 17" },
    { id: 18, name: "Name 18", email: "email18@example.com", body: "Body 18" },
    { id: 19, name: "Name 19", email: "email19@example.com", body: "Body 19" },
    { id: 20, name: "Name 20", email: "email20@example.com", body: "Body 20" },
  ];
describe("UploadCSV Component", () => {
  it("renders all elements correctly and triggers events on button click", async() => {
    // Mock props and functions
    const mockProps = {
      dataLoading: false,
      csvData: [], // Mock CSV data
      currentPage: 1,
      totalPages: 5,
      totalCount: 50,
      prevPage: jest.fn(),
      nextPage: jest.fn(),
      goToPage: jest.fn(),
    };
    const mockPostResponse = {
        message: "File uploaded successfully" 
      };
    axios.post = jest.fn().mockResolvedValue(mockPostResponse);

    // axios.post.mockResolvedValueOnce(mockPostResponse); // Mock axios get method to return mockResponse


    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <UploadCSV />
    );

    // Check if "Upload CSV" text is present
    expect(getByText("Upload CSV")).toBeInTheDocument();

    // // Simulate file change event
    const fileInput = screen.getByTestId("upload-csv-file");
    fireEvent.change(fileInput, {
      target: { files: [new File([""], "data.csv", { type: "text/csv" })] },
    });

    // // Simulate form submission
    const uploadButton = screen.getByTestId("upload-button");
    fireEvent.click(uploadButton);
    // Check if the upload function is called
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1); // Assert axios.get is called once
      });

  });

  it("fetches data correctly", async () => {
    const mockResponse = {
      data: {
        data: mockData,
        totalCount: 20, // Mock total count
      },
    };

    //axios.get.mockResolvedValueOnce(mockResponse); // Mock axios get method to return mockResponse
    axios.get = jest.fn().mockResolvedValue(mockResponse);
    const { getByText, getByLabelText } = render(<UploadCSV />); // Render your component

    const searchInput = screen.getByTestId("search-input"); // Get search input field

    // Simulate user input
    fireEvent.change(searchInput, { target: { value: "email10" } });

    // Simulate pressing "Enter"
    fireEvent.keyPress(searchInput, { key: "Enter", code: 13, charCode: 13 });

    // Wait for API call to resolve
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1); // Assert axios.get is called once
      expect(getByText("email10@example.com")).toBeInTheDocument(); // match seach result
    });
  });
});
