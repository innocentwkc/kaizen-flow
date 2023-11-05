/**
 * This script generates an iCalendar (.ics) file with custom events using the 'ics' library.
 *
 * @see {@link https://www.npmjs.com/package/ics}
 */
const { writeFileSync } = require('fs');
const ics = require('ics');

/**
 * Create custom events using the 'ics' library and store the result in the 'error' and 'value' variables.
 *
 * @type {object} The result object containing 'error' and 'value'.
 * @property {string|null} error - An error message if event creation fails, or null if successful.
 * @property {string|null} value - The generated iCalendar data in string format, or null if an error occurred.
 */
const { error, value } = ics.createEvents([
  {
    title: 'Custom Lunch',
    description: 'Nightly thing I do',
    busyStatus: 'FREE',
    start: [2023, 11, 15, 6, 30],
    duration: { minutes: 45 },
  },
  {
    title: 'Custom Dinner',
    description: 'Nightly thing I do',
    busyStatus: 'FREE',
    start: [2023, 11, 15, 10, 30],
    duration: { hours: 1, minutes: 30 },
  }
]);

/**
 * If an error occurred during event creation, log the error message to the console and exit.
 */
if (error) {
  console.log(error);
  return;
}

/**
 * Log the generated iCalendar data to the console and write it to an '.ics' file.
 */
console.log(value);
writeFileSync(`${__dirname}/event.ics`, value);
