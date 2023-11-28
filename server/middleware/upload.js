/**
 * @module uploadMiddleware
 * @description Module for handling file uploads using Multer middleware. 
 * This module configures Multer to handle file uploads, storing them in a specified destination with unique filenames. 
 * It's designed to integrate with Express.js to provide file uploading capabilities.
 * 
 * @requires multer
 * @requires path
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

const multer = require('multer');
const path = require('path');

/**
 * Multer disk storage configuration for file uploads.
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({
  /**
   * Specifies the destination folder for storing uploaded files.
   * @function
   * @param {Express.Request} req - Express request object.
   * @param {Express.Multer.File} file - Uploaded file object.
   * @param {function(Error, string)} cb - Callback function to set the destination path.
   */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../data/uploads'));
  },

  /**
   * Generates a unique filename for the uploaded file.
   * @function
   * @param {Express.Request} req - Express request object.
   * @param {Express.Multer.File} file - Uploaded file object.
   * @param {function(Error, string)} cb - Callback function to set the filename.
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9); // TODO: use username for custom file name
    cb(null, `module-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

/**
 * Multer middleware configuration for handling file uploads.
 * @type {multer.Instance}
 */
const upload = multer({ storage });

/**
 * Middleware function to handle single file uploads named 'pdf'.
 * @function
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const uploadMiddleware = upload.single('pdf');

/**
 * Middleware to handle the file upload process and error handling.
 * @function
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
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
