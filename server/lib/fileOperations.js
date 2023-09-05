const fs = require('fs');
const path = require('path');

function saveTextToFile(text, outputTextPath, callback) {
  fs.writeFile(outputTextPath, text, function (err) {
    if (err) {
      callback(err);
    } else {
      console.log('Text saved to', outputTextPath);
      callback(null);
    }
  });
}

function saveJsonToFile(data, outputJsonPath, callback) {
  const jsonContent = JSON.stringify(data, null, 2);

  fs.writeFile(outputJsonPath, jsonContent, function (err) {
    if (err) {
      callback(err);
    } else {
      console.log('JSON data saved to', outputJsonPath);
      callback(null);
    }
  });
}

module.exports = {
  saveTextToFile,
  saveJsonToFile,
};
