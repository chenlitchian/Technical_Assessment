const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Set up multer with storage configuration
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Allow only CSV files
    if (file.mimetype !== 'text/csv') {
      return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
  }
}).single('file'); // 'file' is the name of the file input field in the form

// API endpoint for file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during upload
      return res.status(400).send('Upload failed');
    } else if (err) {
      // An unknown error occurred
      return res.status(400).send(err.message);
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // File uploaded successfully
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app; // Export the server for testing purposes
