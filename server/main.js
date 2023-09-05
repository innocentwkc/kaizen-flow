const fs = require('fs');
const path = require('path');
const extract = require('pdf-text-extract');
const extractTableOfContents = require('./lib/extractTableOfContents');
const parseUnitsAndSubChapters = require('./lib/parseUnitsAndSubChapters');
const fileOperations = require('./lib/fileOperations');

const filePath = path.join(__dirname, 'test-data/test4.pdf');

extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err);
    return;
  }

  const text = pages.join('\n');

  const outputTextPath = path.join(__dirname, 'test-data/results/output.txt');
  fileOperations.saveTextToFile(text, outputTextPath, function (err) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log('Extracted text saved to output.txt');
  });

  // Extract table of contents
  const tableOfContentsText = extractTableOfContents(text);

  if (!tableOfContentsText) {
    console.log("Table of contents not found.");
    return;
  }

  const units = parseUnitsAndSubChapters(text);

  const result = {
    units: units,
  };

  const outputJsonPath = path.join(__dirname, 'test-data/results/output.json');
  fileOperations.saveJsonToFile(result, outputJsonPath, function (err) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log('Units and sub-chapters extracted and saved to output.json');
  });
});
