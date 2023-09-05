module.exports = extractTableOfContents = (text) => {
  const lines = text.split('\n');
  let tableOfContentsStart = -1;
  let tableOfContentsEnd = -1;
  let isInTableOfContents = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/Table of Contents/i.test(line) || /TABLE OF CONTENTS/.test(line)) {
      tableOfContentsStart = i;
      isInTableOfContents = true;
      continue;
    }

    if (isInTableOfContents) {
      if (line.match(/^\d+\s+/)) {
        tableOfContentsEnd = i - 1;
        break;
      }
    }
  }

  if (tableOfContentsStart !== -1 && tableOfContentsEnd !== -1) {
    const tableOfContents = lines.slice(tableOfContentsStart, tableOfContentsEnd + 1).join('\n');
    return tableOfContents;
  } else {
    return null;
  }
};