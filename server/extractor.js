/**
 * This script extracts text and structural information from a PDF file.
 * It extracts the text, table of contents, units, and sub-chapters, and saves the results in various formats.
 * 
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

// Import necessary modules
const path = require('path');  // Path module for handling file paths
const extract = require('pdf-text-extract');  // PDF text extraction library
const extractTOC = require('./lib/extractTOC');  // Custom function to extract the table of contents
const parseChapters = require('./lib/parseChapters');  // Custom function to parse units and sub-chapters from text
const fileOperations = require('./lib/fileOperations');  // Custom file operation functions

var pdfToTextCommand = path.join(__dirname, 'bin', 'pdftotext');

var options = {
  cwd: path.join(__dirname, 'bin')
};

/**
 * Extract text, table of contents, units, and sub-chapters from a PDF file.
 * @param {string} filePath - Path to the PDF file to extract information from.
 */
const extractPDFInformation = (fileName = 'DefaultPDF', filePath) => {
  // Extract text from the PDF file using the 'pdf-text-extract' library
  extract(filePath, options, pdfToTextCommand, function (err, pages) {
    if (err) {
      console.error('Error extracting text from PDF:');
      console.error(err);
      return;
    }

    // Join the extracted text pages into a single string
    const text = pages.join('\n');

    // Define the path to save the extracted text as a .txt file
    const outputTextPath = path.join(__dirname, `data/logs/${fileName}-output.txt`);

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
      // return 'Table of contents not found.';
    }

    // Parse units and sub-chapters from the extracted text using a custom function
    // The units object contains the extracted units
    const units = parseChapters(text);

    // Define the path to save the result as a .json file
    const outputJsonPath = path.join(__dirname, `data/modules/${fileName}.json`);

    // Save the result as a .json file using custom file operation functions
    fileOperations.saveJsonToFile(units, outputJsonPath, function (err) {
      if (err) {
        console.error('Error saving units and sub-chapters to output.json:');
        console.error(err);
        return err;
      }

      console.log('Units and sub-chapters extracted and saved to output.json');
      // return outputJsonPath;
    });
  });
}

module.exports = {
  extractPDFInformation
};
