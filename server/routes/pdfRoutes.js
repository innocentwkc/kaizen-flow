const express = require('express');
const path = require('path');
const extract = require('pdf-text-extract');
const extractTOC = require('../lib/extractTOC');
const parseChapters = require('../lib/parseChapters');
const fileOperations = require('../lib/fileOperations');

const router = express.Router();

router.post('/extract-text', (req, res) => {
  const { filePath } = req.body;

  extract(filePath, (err, pages) => {
    if (err) {
      return res.status(500).json({ error: 'Error extracting text from PDF', details: err });
    }

    const text = pages.join('\n');

    const outputTextPath = path.join(__dirname, '..', 'test-data/results/output.txt');
    fileOperations.saveTextToFile(text, outputTextPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving extracted text to output.txt', details: err });
      }
      console.log('Extracted text saved to output.txt');
    });

    const tableOfContentsText = extractTOC(text);

    if (!tableOfContentsText) {
      console.log('Table of contents not found.');
      return res.json({ success: false, message: 'Table of contents not found.' });
    }

    const units = parseChapters(text);

    const result = {
      units: units,
    };

    const outputJsonPath = path.join(__dirname, '..', 'test-data/results/output.json');
    fileOperations.saveJsonToFile(result, outputJsonPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving units and sub-chapters to output.json', details: err });
      }
      console.log('Units and sub-chapters extracted and saved to output.json');
      return res.json({ success: true, message: 'Units and sub-chapters extracted and saved to output.json' });
    });
  });
});

module.exports = router;
