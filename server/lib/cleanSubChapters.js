/**
 * @module cleanSubChapters
 */

/**
 * Cleans the subChapterTitle by removing the trailing dots and page number.
 * Adds a pageNumber key with the extracted number to each subChapter object.
 *
 * @param {Object[]} units - The array of unit objects to clean.
 * @returns {Object[]} The cleaned array of unit objects with updated subChapterTitles and pageNumbers.
 */
module.exports = function cleanSubChapters(units) {
  return units.map(unit => {
    const cleanedSubChapters = unit.subChapters.map(subChapter => {
      // Extract the page number using a regex match
      const match = subChapter.subChapterTitle.match(/(\d+)$/);
      const pageNumber = match ? parseInt(match[1], 10) : null;

      // Remove the page number from the title
      const titleWithoutPageNumber = subChapter.subChapterTitle.replace(/\d+$/, '').trim();
      // Remove the trailing dots from the title
      const titleWithoutTrail = titleWithoutPageNumber.replace(/(?: \.|\.\ )+$/g, '').trim();

      return {
        ...subChapter,
        subChapterTitle: titleWithoutTrail,
        pageNumber,
      };
    });

    return {
      ...unit,
      subChapters: cleanedSubChapters
    };
  });
}
