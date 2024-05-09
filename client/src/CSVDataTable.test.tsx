import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CSVDataTable from "./CSVDataTable";

describe("CSVDataTable", () => {
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

  const mockProps = {
    data: mockData,
    currentPage: 1,
    totalPages: 2,
    totalCount: 10,
    dataLoading: false,
    prevPage: jest.fn(),
    nextPage: jest.fn(),
    goToPage: jest.fn(),
  };

  it('renders "No data available." message when there is no data', () => {
    const { getByText } = render(<CSVDataTable {...mockProps} data={[]} />);
    expect(getByText("No data available.")).toBeInTheDocument();
  });

  it("renders table with data", () => {
    const { getByText } = render(<CSVDataTable {...mockProps} />);
    expect(getByText("Name 1")).toBeInTheDocument();
    expect(getByText("email3@example.com")).toBeInTheDocument();
  });

  it("calls prevPage and nextPage functions when Previous and Next buttons are clicked", () => {
    const { getByText } = render(<CSVDataTable {...mockProps} />);
    const nextPageButton = screen.getByTestId("next-page-button");

    fireEvent.click(nextPageButton);
    expect(mockProps.nextPage).toHaveBeenCalled();
  });

  it("calls prevPage Previous buttons is clicked", () => {
    const { getByText } = render(
      <CSVDataTable {...mockProps} currentPage={2} />
    );
    const prevPageButton = screen.getByTestId("prev-page-button");
    fireEvent.click(prevPageButton);
    expect(mockProps.prevPage).toHaveBeenCalled();
  });

  it("calls goToPage function with correct page number when a page button is clicked", () => {
    const { getByText } = render(<CSVDataTable {...mockProps} />);
    const pageButton = screen.getByTestId("page-button-2");
    fireEvent.click(pageButton); 
    expect(mockProps.goToPage).toHaveBeenCalledWith(2);
    expect(getByText("email11@example.com")).toBeInTheDocument();
  });

});
