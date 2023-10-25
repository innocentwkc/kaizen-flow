/**
 * Generates a schedule based on the provided JSON data, total hours, start date, and filename.
 * @param {string} jsonFilePath - The path to the JSON file containing the data.
 * @param {number} totalHours - The total available study hours.
 * @param {string} filename - The name of the output ICS file.
 * @param {Date} startDate - The start date and time for the schedule.
*/


const fs = require('fs');
const ics = require('ics');


const generateSchedule = (jsonFilePath, totalHours, filename, startDate) => {
  const data = require(jsonFilePath);

  // Initialize the schedule
  const schedule = [];

  // Calculate the distribution of hours
  const topics = data.units.units;
  const topicHours = totalHours / topics.length;

  // Define the time window to avoid (23:00 to 05:00)
  const avoidStartTime = 23;
  const avoidEndTime = 5;

  // Define the maximum study duration (in hours) before taking a break
  const maxStudyDuration = 1;

  // Loop through each topic
  for (const topic of topics) {
    const subChapters = topic.subChapters;
    const subChapterHours = topicHours / subChapters.length;

    // Loop through sub-chapters within the topic
    for (const subChapter of subChapters) {
      // Calculate start and end times for the sub-chapter
      const startTime = new Date(startDate);
      const endTime = new Date(startTime.getTime() + subChapterHours * 60 * 60 * 1000);

      // Avoid the time window (23:00 to 05:00)
      if (startTime.getHours() >= avoidStartTime || endTime.getHours() <= avoidEndTime) {
        startTime.setHours(avoidEndTime);
        endTime.setHours(avoidEndTime);
      }

      // Create an event for the sub-chapter
      const event = {
        title: `Unit ${topic.unitNumber} - Subchapter ${subChapter.subChapterNumber}`,
        description: subChapter.subChapterTitle,
        start: [startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(), startTime.getHours(), startTime.getMinutes()],
        duration: { hours: subChapterHours },
      };

      // Add the event to the schedule
      schedule.push(event);

      // Update the start time for the next sub-chapter
      startDate.setTime(endTime.getTime());

      // Calculate the break time
      const breakDuration = maxStudyDuration - subChapterHours;
      if (breakDuration > 0) {
        // Add a break event
        const breakStartTime = new Date(startDate);
        const breakEndTime = new Date(startDate.getTime() + breakDuration * 60 * 60 * 1000);

        // Avoid the time window (23:00 to 05:00)
        if (breakStartTime.getHours() >= avoidStartTime || breakEndTime.getHours() <= avoidEndTime) {
          breakStartTime.setHours(avoidEndTime);
          breakEndTime.setHours(avoidEndTime);
        }

        const breakEvent = {
          title: 'Break',
          description: 'Take a break',
          start: [breakStartTime.getFullYear(), breakStartTime.getMonth() + 1, breakStartTime.getDate(), breakStartTime.getHours(), breakStartTime.getMinutes()],
          duration: { hours: breakDuration },
        };

        // Add the break event to the schedule
        schedule.push(breakEvent);

        // Update the start time for the next sub-chapter or break
        startDate.setTime(breakEndTime.getTime());
      }
    }
  }

  // Generate the ICS content
  const { error, value } = ics.createEvents(schedule);

  if (error) {
    console.error(error);
  } else {
    // Save the ICS file to disk
    fs.writeFileSync(filename, value);
    console.log(`Schedule saved as ${filename}`);
  }
};

// Export the function as a module
module.exports = generateSchedule;
