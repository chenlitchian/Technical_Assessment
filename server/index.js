const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const csvParser = require("csv-parser");
const { upload } = require("./services/uploadService");
const { filterData } = require("./services/filterService");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// API endpoint for file upload
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during upload
      return res.status(400).send("Upload failed");
    } else if (err) {
      // An unknown error occurred
      return res.status(400).send(err.message);
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // File uploaded successfully
    res.status(200).json({ message: "File uploaded successfully" });
  });
});

// Endpoint to read CSV file with pagination and search
app.get("/data", (req, res) => {
  const { search, page, limit } = req.query;
  const filePath = "uploads/data.csv";
  const data = [];
  let totalCount = 0;
  let searchterm = search || "";

  // Read CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      // Apply pagination
      const filteredData = filterData(data, searchterm);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      // Calculate total count for pagination
      totalCount = filteredData.length;

      if (totalCount == 0) {
        res.status(404).json({
          message: "No result found.",
        });
        return;
      }

      res.json({
        data: paginatedData,
        totalCount: totalCount,
      });
    });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = server; // Export the server for testing purposes
