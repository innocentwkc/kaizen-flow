/**
 * This script sets up an Express server to handle API requests for PDF file uploads.
 * It utilizes middleware for handling file uploads and employs CORS for cross-origin requests.
 */
const path = require('path');
const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { folderExists, createFolder } = require('./lib/folderOperations');
const uploadMiddleware = require('./middleware/upload');
const { extractPDFInformation } = require('./extractor');

const app = express();

// The port on which the server will listen for incoming requests
const PORT = 3020;

// Configure NODE_ENV variable
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';
const isProduction = process.env.NODE_ENV == 'production';

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "..", isProduction ? 'public' : 'dist')));
// app.use('/data', express.static('./data/modules'));

const router = express.Router();

// Run server pre checks by creating data folders
const foldersToCheck = ['logs', 'modules', 'results', 'uploads'];

for (const folder of foldersToCheck) {
  const dataPath = path.join(__dirname, `data/${folder}`)
  if (!folderExists(dataPath)) {
    createFolder(dataPath);
  } else {
    console.log(`Folder already exists at: ${dataPath}`);
    // Send code to logs and tests
  }
}

router.get('/get-uploads', async (req, res) => {
  try {
    const { fileList, directoryList } = await fetchFileAndDirList(path.join(__dirname, './data/uploads'));
    // const { fileList, directoryList } = await fetchFileAndDirList('./data');
    res.json({ fileList, directoryList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

router.get('/get-modules', async (req, res) => {
  try {
    const { fileList, directoryList } = await fetchFileAndDirList(path.join(__dirname, './data/modules'));
    // const { fileList, directoryList } = await fetchFileAndDirList('./data');
    res.json({ fileList, directoryList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

async function fetchFileAndDirList(directoryPath) {
  try {
    const files = [];
    const directories = [];

    const dirContents = await fs.readdir(directoryPath);

    for (const content of dirContents) {
      const contentPath = path.join(directoryPath, content);
      const contentStats = await fs.stat(contentPath);

      if (contentStats.isFile()) {
        files.push(content);
      } else if (contentStats.isDirectory()) {
        directories.push(content);
      }
    }

    return { fileList: files, directoryList: directories };
  } catch (error) {
    throw new Error('Error reading directory:', error);
  }
}

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

  let tableOfContents = extractPDFInformation(req.file.filename, './server/data/uploads/' + req.file.filename) 

  res.json({ message: 'PDF file uploaded successfully', filename: req.file.filename, tableofcontents: tableOfContents });
});

// Mount the router at the '/api' path
app.use('/api', router);

// const directoryPath =  path.join(__dirname, './data/uploads');

// Handle every other route with index.html, which will contain your Vue application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, isProduction ? 'public' : 'dist', 'index.html'));
});


// console.log('NODE_ENV:', process.env.NODE_ENV);

/**
 * Start the Express server and listen for incoming connections on the specified port.
 *
 * @param {number} PORT - The port number on which the server will listen for requests.
 * @param {function} () - Callback function to be executed once the server starts.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
