// Import necessary modules
const path = require('path');  // Path module for handling file paths
const extract = require('pdf-text-extract');  // PDF text extraction library
const extractTOC = require('./lib/extractTOC');  // Custom function to extract the table of contents
const parseChapters = require('./lib/parseChapters');  // Custom function to parse units and sub-chapters from text
const fileOperations = require('./lib/fileOperations');  // Custom file operation functions

// Define the path to the PDF file you want to extract text from
const filePath = path.join(__dirname, 'test-data/test4.pdf'); // TODO: convert to 

// Extract text from the PDF file using the 'pdf-text-extract' library
extract(filePath, function (err, pages) {
  if (err) {
    console.error('Error extracting text from PDF:');
    console.error(err);
    return;
  }

  // Join the extracted text pages into a single string
  const text = pages.join('\n');

  // Define the path to save the extracted text as a .txt file
  const outputTextPath = path.join(__dirname, 'test-data/results/output.txt');

  // Save the extracted text to a .txt file using custom file operation functions
  fileOperations.saveTextToFile(text, outputTextPath, function (err) {
    if (err) {
      console.error('Error saving extracted text to output.txt:');
      console.error(err);
      return;
    }
    console.log('Extracted text saved to output.txt');
  });

  // Extract table of contents from the extracted text using a custom function
  const tableOfContentsText = extractTOC(text);

  if (!tableOfContentsText) {
    console.log('Table of contents not found.');
    return;
  }

  // Parse units and sub-chapters from the extracted text using a custom function
  const units = parseChapters(text);

  // Create a result object containing the extracted units
  const result = {
    units: units,
  };

  // Define the path to save the result as a .json file
  const outputJsonPath = path.join(__dirname, 'test-data/results/output.json');

  // Save the result as a .json file using custom file operation functions
  fileOperations.saveJsonToFile(result, outputJsonPath, function (err) {
    if (err) {
      console.error('Error saving units and sub-chapters to output.json:');
      console.error(err);
      return;
    }
    console.log('Units and sub-chapters extracted and saved to output.json');
  });
});
