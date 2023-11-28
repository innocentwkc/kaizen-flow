/**
 * @module parseChapters
 * @description This module provides a function to parse units and their sub-chapters from a given text. 
 * It processes the text to extract information about units and sub-chapters, organizing them into a structured format.
 * This is useful for processing and organizing textual data into a more manageable format.
 * 
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

/**
 * Parses units and their sub-chapters from the given text.
 * This function processes the text and extracts information about units and their sub-chapters,
 * returning them in a structured object format.
 *
 * @function parseChapters
 * @param {string} text - The text content to be parsed.
 * @returns {object} An object containing the parsed units and sub-chapters.
 */
module.exports = function parseChapters(text) {
  // Initialize an array to store parsed units.
  var units = [];

  // Initialize a variable to keep track of the current unit being parsed.
  var currentUnit = null;

  // Split the 'text' into an array of lines for processing.
  var lines = text.split('\n');

  // Initialize a flag to stop parsing when the "Appendix" keyword is found.
  var stopParsing = false;

  // Iterate through each line in the 'text'.
  lines.forEach(function (line) {
    // If the flag to stop parsing is set, return and stop further parsing.
    if (stopParsing) {
      return;
    }

    // Check if the line starts with 'Unit' indicating the start of a new unit.
    if (line.trim().startsWith('Unit')) {
      // If a current unit exists, push it to the 'units' array.
      if (currentUnit !== null) {
        units.push(currentUnit);
      }

      // Create a new 'currentUnit' object with the unit number and an empty subChapters array.
      currentUnit = {
        unitNumber: line.trim(),
        subChapters: [],
      };
    } else if (currentUnit !== null) {
      // Use regular expressions to extract sub-chapter numbers and titles.
      var subChapterMatch = /(\d+\.\d+)\s+([\s\S]*?)(?=(\d+\.\d+|$))/g;
      var subChapterMatchResult;
      while ((subChapterMatchResult = subChapterMatch.exec(line)) !== null) {
        var subChapterNumber = subChapterMatchResult[1];
        var subChapterTitle = subChapterMatchResult[2].trim();

        // Add the extracted sub-chapter information to the current unit's subChapters array.
        currentUnit.subChapters.push({ subChapterNumber, subChapterTitle });
      }

      // Check for the "Appendix" keyword and set the flag to stop parsing.
      if (line.trim().startsWith('Appendix')) {
        stopParsing = true;
      }
    }
  });

  // If a current unit exists, push it to the 'units' array.
  if (currentUnit !== null) {
    units.push(currentUnit);
  }

  // Create a result object containing the parsed units and their sub-chapters.
  var result = {
    units: units,
  };

  // Return the result object.
  return result;
};
