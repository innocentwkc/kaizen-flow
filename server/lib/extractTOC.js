/**
 * Extracts the table of contents from the given text.
 *
 * @function extractTOC
 * @param {string} text - The input text containing the table of contents.
 * @return {string|null} The extracted table of contents as a string, or null if not found.
 */

module.exports = extractTOC = (text) => {
  // Split the input 'text' into an array of lines for easier processing.
  const lines = text.split('\n');

  // Initialize variables to keep track of the start and end of the table of contents.
  let tableOfContentsStart = -1;
  let tableOfContentsEnd = -1;

  // Initialize a flag to determine if we are currently processing lines within the table of contents.
  let isInTableOfContents = false;

  // Iterate through each line in the 'text'.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if the current line contains a case-insensitive match for "Table of Contents".
    if (/Table of Contents/i.test(line) || /TABLE OF CONTENTS/.test(line)) {
      // If found, set 'tableOfContentsStart' to the current line number.
      tableOfContentsStart = i;

      // Set the flag to indicate that we are inside the table of contents section.
      isInTableOfContents = true;

      // Continue to the next line.
      continue;
    }

    // If we are inside the table of contents section and the line starts with digits followed by spaces.
    if (isInTableOfContents) {
      if (line.match(/^\d+\s+/)) {
        // Set 'tableOfContentsEnd' to the line number just before this one and exit the loop.
        tableOfContentsEnd = i - 1;
        break;
      }
    }
  }

  // Check if both 'tableOfContentsStart' and 'tableOfContentsEnd' have been set, indicating a valid table of contents.
  if (tableOfContentsStart !== -1 && tableOfContentsEnd !== -1) {
    // Extract the lines between 'tableOfContentsStart' and 'tableOfContentsEnd' and join them into a single string.
    const tableOfContents = lines.slice(tableOfContentsStart, tableOfContentsEnd + 1).join('\n');

    // Return the extracted table of contents.
    return tableOfContents;
  } else {
    // If no valid table of contents was found, return null.
    return null;
  }
};
