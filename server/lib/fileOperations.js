// Import necessary modules for file system operations and working with file paths.
const fs = require('fs');

// Define a function 'saveTextToFile' that saves text to a specified file path.
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

// Define a function 'saveJsonToFile' that saves JSON data to a specified file path.
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
