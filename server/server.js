/**
 * This script sets up an Express server to handle API requests for PDF file uploads.
 * It utilizes middleware for handling file uploads and employs CORS for cross-origin requests.
 */
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadMiddleware = require('./middleware/upload');

const app = express();

// The port on which the server will listen for incoming requests
const PORT = 3020;

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Parse incoming JSON requests
app.use(express.json());

const router = express.Router();

/**
 * API endpoint to handle PDF file uploads.
 *
 * @param {string} '/upload' - The route for handling file uploads.
 * @param {function} uploadMiddleware - Middleware function for handling file uploads.
 * @param {function} (req, res) - Callback function to handle the POST request.
 * @returns {object} - JSON response indicating success or failure of the upload.
 */
router.post('/upload', uploadMiddleware, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  res.json({ message: 'PDF file uploaded successfully', filename: req.file.filename });
});

// Mount the router at the '/api' path
app.use('/api', router);

/**
 * Start the Express server and listen for incoming connections on the specified port.
 *
 * @param {number} PORT - The port number on which the server will listen for requests.
 * @param {function} () - Callback function to be executed once the server starts.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
