// Function to filter data based on a search term
function filterData(data, searchterm) {
    return data.filter(row => {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          if (row[key].toString().toLowerCase().includes(searchterm.toLowerCase())) {
            return true; // Return true if any field contains the search term
          }
        }
      }
      return false; // Return false if no field contains the search term
    });
  }
  
  module.exports = { filterData };
  