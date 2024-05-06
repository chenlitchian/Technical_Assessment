const { filterData } = require('../filterService');

describe('filterData function', () => {
  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Alice Johnson', age: 35 }
  ];

  test('should filter data based on search term', () => {
    const searchTerm = 'John';
    const filteredData = filterData(data, searchTerm);
    expect(filteredData.length).toBe(2);
  });

  test('should return empty array if no match found', () => {
    const searchTerm = 'xyz';
    const filteredData = filterData(data, searchTerm);
    expect(filteredData.length).toBe(0);
  });

  test('should be case insensitive', () => {
    const searchTerm = 'jane';
    const filteredData = filterData(data, searchTerm);
    expect(filteredData.length).toBe(1);
  });
});