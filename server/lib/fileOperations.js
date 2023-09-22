/**
 * This module provides functions for file system operations and working with file paths.
 * It includes functions for saving text and JSON data to specified file paths.
 * 
 * @author Your Name
 * @version 1.0
 * @since 2023-09-08
 */

// Import necessary modules for file system operations and working with file paths.
const fs = require('fs');

/**
 * Saves the provided text to a specified file path.
 *
 * @param {string} text - The text content to be saved to the file.
 * @param {string} outputTextPath - The path of the file where the text should be saved.
 * @param {function} callback - A callback function to handle success or error.
 *   If successful, the callback is called with null; otherwise, it's called with an error object.
 */
const saveTextToFile = (text, outputTextPath, callback) => {
  // Use the 'fs' module to write the 'text' to the specified 'outputTextPath' file.
  fs.writeFile(outputTextPath, text, function (err) {
    if (err) {
      // If an error occurs during file writing, call the 'callback' with the error.
      callback(err);
    } else {
      // If the file writing is successful, log a message indicating the file has been saved.
      console.log('Text saved to', outputTextPath);
      
      // Call the 'callback' with 'null' to indicate success.
      callback(null);
    }
  });
}

/**
 * Saves the provided JSON data to a specified file path.
 *
 * @param {object} data - The JSON data object to be saved to the file.
 * @param {string} outputJsonPath - The path of the file where the JSON data should be saved.
 * @param {function} callback - A callback function to handle success or error.
 *   If successful, the callback is called with null; otherwise, it's called with an error object.
 */
const saveJsonToFile = (data, outputJsonPath, callback) => {
  // Convert the 'data' object to a formatted JSON string.
  const jsonContent = JSON.stringify(data, null, 2);

  // Use the 'fs' module to write the JSON content to the specified 'outputJsonPath' file.
  fs.writeFile(outputJsonPath, jsonContent, function (err) {
    if (err) {
      // If an error occurs during file writing, call the 'callback' with the error.
      callback(err);
    } else {
      // If the file writing is successful, log a message indicating the JSON data has been saved.
      console.log('JSON data saved to', outputJsonPath);
      
      // Call the 'callback' with 'null' to indicate success.
      callback(null);
    }
  });
}

// Export the 'saveTextToFile' and 'saveJsonToFile' functions for use in other modules.
module.exports = {
  saveTextToFile,
  saveJsonToFile,
};
