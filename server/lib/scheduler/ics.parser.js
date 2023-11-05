// ics.parser.js
const moment = require('moment-timezone'); // Make sure to install moment-timezone

function parseICS(icsData) {
  const lines = icsData.split(/\r\n|\n|\r/);
  const events = [];
  let currentEvent = {};

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      currentEvent = {};
    } else if (line.startsWith("END:VEVENT")) {
      // Convert and format start time
      if (currentEvent.dtstart) {
        const startTime = moment.utc(currentEvent.dtstart).tz("America/New_York"); // Change to your timezone
        currentEvent.start = startTime.format();
      }

      // Calculate and format end time if duration is provided
      if (currentEvent.dtstart && currentEvent.duration) {
        const startTime = moment.utc(currentEvent.dtstart).tz("America/New_York"); // Change to your timezone
        const duration = currentEvent.duration;
        const durationParts = duration.match(/PT(\d+H)?(\d+M)?/);

        if (durationParts) {
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

  return events;
}

module.exports = parseICS;
