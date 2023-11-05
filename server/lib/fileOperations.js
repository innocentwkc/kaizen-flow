/**
 * @module fileOperations
 * @description This module provides functions for file system operations and working with file paths.
 * It includes functions for saving text and JSON data to specified file paths.
 * 
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

const fs = require('fs');

/**
 * Saves the provided text to a specified file path.
 *
 * @function saveTextToFile
 * @param {string} text - The text content to be saved to the file.
 * @param {string} outputTextPath - The path of the file where the text should be saved.
 * @param {function} callback - A callback function to handle success or error.
 *   If successful, the callback is called with null; otherwise, it's called with an error object.
 * @returns {void}
 */
const saveTextToFile = (text, outputTextPath, callback) => {
  fs.writeFile(outputTextPath, text, function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Text saved to', outputTextPath);
    callback(null);
  });
};

/**
 * Saves the provided JSON data to a specified file path.
 *
 * @function saveJsonToFile
 * @param {object} data - The JSON data object to be saved to the file.
 * @param {string} outputJsonPath - The path of the file where the JSON data should be saved.
 * @param {function} callback - A callback function to handle success or error.
 *   If successful, the callback is called with null; otherwise, it's called with an error object.
 * @returns {void}
 */
const saveJsonToFile = (data, outputJsonPath, callback) => {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFile(outputJsonPath, jsonContent, function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log('JSON data saved to', outputJsonPath);
    callback(null);
  });
};

module.exports = {
  saveTextToFile,
  saveJsonToFile,
};
