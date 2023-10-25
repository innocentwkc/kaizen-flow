/**
 * Module for handling file uploads using Multer middleware.
 * The uploaded files are stored in a specified destination with unique filenames.
 * @module uploadMiddleware
 */

const multer = require('multer');
const path = require('path');

/**
 * Multer disk storage configuration for file uploads.
 * @const {object}
 */
const storage = multer.diskStorage({
  /**
   * Specifies the destination folder for storing uploaded files.
   * @param {object} req - Express request object.
   * @param {object} file - Uploaded file object.
   * @param {function} cb - Callback function to set the destination path.
   * @returns {void}
   */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../data/uploads'));
  },

  /**
   * Generates a unique filename for the uploaded file.
   * @param {object} req - Express request object.
   * @param {object} file - Uploaded file object.
   * @param {function} cb - Callback function to set the filename.
   * @returns {void}
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9); // TODO: use username custom file name
    cb(null, 'module-' + uniqueSuffix + path.extname(file.originalname));
  }
});

/**
 * Multer middleware configuration for handling file uploads.
 * @const {object}
 */
const upload = multer({ storage });

/**
 * Middleware function to handle single file uploads named 'pdf'.
 * @function
 * @name uploadMiddleware
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const uploadMiddleware = upload.single('pdf');

// Call next() to proceed to the next middleware or route handler
const handleFileUpload = (req, res, next) => {
  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error uploading file: ' + err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Error uploading file: ' + err.message });
    }
    // No error, proceed to the next middleware or route handler
    next();
  });
};

module.exports = handleFileUpload;
