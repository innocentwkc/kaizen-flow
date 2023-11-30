/**
 * @module icsParser
 * @description This module provides a function to parse ICS (iCalendar) data. 
 * It takes raw ICS data, processes it, and converts it into a structured format of calendar events. 
 * This is useful for extracting and manipulating calendar data from ICS files programmatically.
 * 
 * @requires moment-timezone
 * @author Innocent W.K Chinyemba
 * @version 1.0
 * @since 2023-09-08
 */

/**
 * Parses ICS (iCalendar) data.
 * This function takes raw ICS data, processes each line, and constructs an array of event objects, 
 * each representing a single calendar event. It uses 'moment-timezone' for date-time manipulations.
 *
 * @function parseICS
 * @param {string} icsData - The raw ICS data string to be parsed.
 * @returns {Object[]} An array of event objects representing the parsed calendar events.
 */

const moment = require('moment-timezone'); // Make sure to install moment-timezone

/**
 * Parses ICS (iCalendar) data and converts it into an array of event objects.
 *
 * @param {string} icsData - The ICS data as a string.
 * @returns {Object[]} An array of event objects parsed from the ICS data.
 */
function parseICS(icsData) {
    // Splitting the raw ICS data into lines for processing
  const lines = icsData.split(/\r\n|\n|\r/);
  const events = []; // Initializing an array to hold the parsed events
  let currentEvent = {}; // Object to store data for the current event being parsed

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      // Resetting currentEvent when a new event block starts
      currentEvent = {};
    } else if (line.startsWith("END:VEVENT")) {
      // Processing and finalizing the current event when its block ends

      // Convert and format start time
      if (currentEvent.dtstart) {
        // Converting the start time to a moment object and formatting it
        const startTime = moment.utc(currentEvent.dtstart).tz("Africa/Harare"); // TODO: Adjust custom timezone as needed, make parameter
        currentEvent.start = startTime.format();
      }

      // Calculate and format end time if duration is provided
      if (currentEvent.dtstart && currentEvent.duration) {
        // Reusing the start time and adding duration to get the end time
        const startTime = moment.utc(currentEvent.dtstart).tz("Africa/Harare"); // TODO: Adjust custom timezone as needed make paramter
        const duration = currentEvent.duration;
        // Extracting hours and minutes from the duration string
        const durationParts = duration.match(/PT(\d+H)?(\d+M)?/);

        if (durationParts) {
          // Logic to add duration to the start time to calculate end time
          const hours = parseInt(durationParts[1], 10) || 0;
          const minutes = parseInt(durationParts[2], 10) || 0;
          startTime.add(hours, 'hours').add(minutes, 'minutes');
          currentEvent.end = startTime.format();
        }
      }

      // Map to the desired keys while preserving all others
      const event = {
        ...currentEvent,
        title: currentEvent.summary || '',
      };

      events.push(event);
    } else if (line.startsWith("UID:")) {
      currentEvent.uid = line.substring(4);
    } else if (line.startsWith("SUMMARY:")) {
      currentEvent.summary = line.substring(8);
    } else if (line.startsWith("DTSTAMP:")) {
      currentEvent.dtstamp = line.substring(8);
    } else if (line.startsWith("DTSTART:")) {
      currentEvent.dtstart = line.substring(8);
    } else if (line.startsWith("DESCRIPTION:")) {
      currentEvent.description = line.substring(12);
    } else if (line.startsWith("DURATION:")) {
      currentEvent.duration = line.substring(9);
    }
  }

  // Return the array of parsed events
  return events;
}

module.exports = parseICS;
