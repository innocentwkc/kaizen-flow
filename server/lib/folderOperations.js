/**
 * @module folderOperations
 * @description This module handles folder operations such as checking if certain folders exists, creating folders and deleting folders .
 * 
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

const fs = require('fs');

/**
 * Check if a folder exists at the specified path.
 * @function
 * @param {string} folderPath - The path to the folder.
 * @returns {boolean} True if the folder exists, false otherwise.
 */
function folderExists(folderPath) {
  return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
}

/**
 * Create a folder at the specified path.
 * @function
 * @param {string} folderPath - The path to create the folder.
 */
function createFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Folder created at: ${folderPath}`);
}

/**
 * Rename a folder.
 * @function
 * @param {string} oldFolderPath - The old path of the folder.
 * @param {string} newFolderPath - The new path of the folder.
 */
function renameFolder(oldFolderPath, newFolderPath) {
  fs.renameSync(oldFolderPath, newFolderPath);
  console.log(`Folder renamed from: ${oldFolderPath} to: ${newFolderPath}`);
}

/**
 * Delete a folder.
 * @function
 * @param {string} folderPath - The path of the folder to be deleted.
 */
function deleteFolder(folderPath) {
  fs.rmdirSync(folderPath, { recursive: true });
  console.log(`Folder deleted: ${folderPath}`);
}

module.exports = { folderExists, createFolder, renameFolder, deleteFolder };
