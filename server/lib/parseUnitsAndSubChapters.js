module.exports = function parseUnitsAndSubChapters(text) {
  var units = [];
var currentUnit = null;

var lines = text.split('\n');
var stopParsing = false; // Added flag to stop parsing when "Appendix" is found

lines.forEach(function (line) {
  if (stopParsing) {
    return; // Stop parsing if the flag is set
  }

  if (line.trim().startsWith('Unit')) {
    if (currentUnit !== null) {
      units.push(currentUnit);
    }
    currentUnit = {
      unitNumber: line.trim(),
      subChapters: [],
    };
  } else if (currentUnit !== null) {
    var subChapterMatch = /(\d+\.\d+)\s+([\s\S]*?)(?=(\d+\.\d+|$))/g;
    var subChapterMatchResult;
    while ((subChapterMatchResult = subChapterMatch.exec(line)) !== null) {
      var subChapterNumber = subChapterMatchResult[1];
      var subChapterTitle = subChapterMatchResult[2].trim();
      currentUnit.subChapters.push({ subChapterNumber, subChapterTitle });
    }

    // Check for the "Appendix" keyword and set the flag to stop parsing
    if (line.trim().startsWith('Appendix')) {
      stopParsing = true;
    }
  }
});

if (currentUnit !== null) {
  units.push(currentUnit);
}

var result = {
  units: units,
};

return result
};
