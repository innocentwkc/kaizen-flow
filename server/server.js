/**
 * @file This script sets up an Express server to handle API requests for PDF file uploads.
 * It utilizes middleware for handling file uploads and employs CORS for cross-origin requests.
 */

const path = require('path');
const fs = require('fs').promises;
const kleur = require('kleur');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { folderExists, createFolder } = require('./lib/folderOperations');
const uploadMiddleware = require('./middleware/upload');
const { extractPDFInformation } = require('./extractor');

const app = express();

/** @const {number} SERVER_PORT - The port on which the server will listen for incoming requests */
const SERVER_PORT = 5001;

/** Configure NODE_ENV variable */
// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';
const isProduction = process.env.NODE_ENV == 'production';

/** Enable Cross-Origin Resource Sharing (CORS) for all routes */
app.use(cors());

/** Parse incoming JSON requests */
app.use(bodyParser.json());

/** Parse URL-encoded requests */
app.use(bodyParser.urlencoded({ extended: true }));

/** Serve static files from the dist directory */
app.use(express.static(path.join(__dirname, "..", isProduction ? 'public' : 'dist')));

/** Define a public path for the "data/modules" directory */
const publicPath = path.join(__dirname, 'data', 'modules');
app.use('/data/modules', express.static(publicPath));

const router = express.Router();

/** 
 * Run server pre-checks by creating data folders.
 * @param {string[]} foldersToCheck - The folders to check and create if not exist.
 */
const foldersToCheck = ['calenders', 'logs', 'modules', 'results', 'uploads'];
for (const folder of foldersToCheck) {
  const dataPath = path.join(__dirname, `data/${folder}`);
  if (!folderExists(dataPath)) {
    createFolder(dataPath);
  } else {
    console.log(`Folder already exists at: ${dataPath}`);
    // Send code to logs and tests
  }
}

/**
 * API endpoint to retrieve the list of uploaded files.
 * @name get-uploads
 * @path {GET} /get-uploads
 * @response {object} JSON response containing the lists of files and directories.
 */
router.get('/get-uploads', async (req, res) => {
  try {
    const { fileList, directoryList } = await fetchFileAndDirList(path.join(__dirname, './data/uploads'));
    // const { fileList, directoryList } = await fetchFileAndDirList('./data');
    res.json({ fileList, directoryList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

/**
 * API endpoint to retrieve the list of modules or a specific module file.
 * @name get-modules
 * @path {GET} /get-modules
 * @query {string} [file] Optional. The specific module file to retrieve.
 * @response {object} JSON response containing the lists of module files and directories, or the content of a specific file.
 */
router.get('/get-modules', async (req, res) => {
  const { file } = req.query;

  if (!file) {
    try {
      const { fileList, directoryList } = await fetchFileAndDirList(path.join(__dirname, './data/modules'));

      return res.json({ fileList, directoryList });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
  }

  const filePath = path.join(publicPath, file);

   try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ error: 'File not found.', details: error });
  }

});

/**
 * Fetches the file and directory list from a given directory.
 * @param {string} directoryPath - The path to the directory.
 * @throws {Error} If the directory cannot be read.
 * @returns {object} An object containing arrays of file names and directory names.
 */
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
 * @name /upload
 * @path {POST} /upload
 * @middleware {function} uploadMiddleware Middleware function for handling file uploads.
 * @response {object} JSON response indicating the success or failure of the upload.
 */
router.post('/upload', uploadMiddleware, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  let tableOfContents = extractPDFInformation(req.file.filename, './server/data/uploads/' + req.file.filename) 

  res.json({ message: 'PDF file uploaded successfully', filename: req.file.filename + '.json', tableofcontents: tableOfContents });
});

// Mount the router at the '/api' path
app.use('/api', router);

// const directoryPath =  path.join(__dirname, './data/uploads');

// Handle every other route with index.html, which will render the Vue application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, isProduction ? 'public' : 'dist', 'index.html'));
});


// console.log('NODE_ENV:', process.env.NODE_ENV);

/**
 * Start the Express server and listen for incoming connections on the specified port.
 *
 * @param {number} SERVER_PORT - The port number on which the server will listen for requests.
 * @param {function} () - Callback function to be executed once the server starts.
 * @returns {void}
 */
app.listen(SERVER_PORT, () => {
  console.log('\n');
  console.log(`${kleur.green('➜')}  ${kleur.bold().yellow('API Server')}:   ${kleur.cyan(`http://localhost:${ kleur.bold(SERVER_PORT) }/`)}`); 
}); 
