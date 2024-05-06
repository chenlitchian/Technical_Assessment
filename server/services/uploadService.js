const multer = require('multer');

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

module.exports = { upload };