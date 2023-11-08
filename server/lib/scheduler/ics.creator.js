/**
 * @module icsCreator
 * @description This module provides a function to generate an ICS (iCalendar) schedule based on a given set of data. It schedules topics and subchapters and avoids scheduling during certain hours. It outputs an ICS file which can be imported into most calendar applications.
 */

const { writeFileSync } = require('fs');
const ics = require('ics');

/**
 * Creates an ICS (iCalendar) file with a schedule based on the provided data and saves it to the specified path.
 *
 * The function calculates the distribution of study hours across topics and subchapters and avoids scheduling during specified hours.
 * Each topic and subchapter is treated as an event in the ICS file. Breaks are also scheduled between study sessions.
 *
 * @param {object} data - The data object containing units and subchapters to schedule.
 * @param {string} savePath - The file system path where the ICS file will be saved.
 */
function icsCreator(data, savePath) {
  // Constants
  const totalHours = 150;
  const startDate = new Date(2023, 11, 15, 8, 0, 0);
  const avoidStartTime = 23;
  const avoidEndTime = 5;
  const maxStudyDuration = 1;

  // Initialize the schedule
  const schedule = [];

  // Calculate the distribution of hours
  const topics = data.units;
  const topicHours = totalHours / topics.length;

  // Loop through each topic
  for (const topic of topics) {
    const subChapters = topic.subChapters;
    const subChapterHours = topicHours / subChapters.length;

    // Loop through sub-chapters within the topic
    for (const subChapter of subChapters) {
      const startTime = new Date(startDate);
      const endTime = new Date(startTime.getTime() + subChapterHours * 60 * 60 * 1000);

      if (startTime.getHours() >= avoidStartTime || endTime.getHours() <= avoidEndTime) {
        startTime.setHours(avoidEndTime);
        endTime.setHours(avoidEndTime);
      }

      // Define an event for each subchapter
      const event = {
        title: `Unit ${topic.unitNumber} - Subchapter ${subChapter.subChapterNumber}`, // Title of the event
        description: subChapter.subChapterTitle, // Description of the event
        start: [startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(), startTime.getHours(), startTime.getMinutes()], // Start time of the event
        duration: { hours: subChapterHours }, // Duration of the event in hours
      };

      schedule.push(event);

      startDate.setTime(endTime.getTime());

      const breakDuration = maxStudyDuration - subChapterHours;
      if (breakDuration > 0) {
        const breakStartTime = new Date(startDate);
        const breakEndTime = new Date(startDate.getTime() + breakDuration * 60 * 60 * 1000);

        if (breakStartTime.getHours() >= avoidStartTime || breakEndTime.getHours() <= avoidEndTime) {
          breakStartTime.setHours(avoidEndTime);
          breakEndTime.setHours(avoidEndTime);
        }

        // Define a break event
        const breakEvent = {
          title: 'Break', // Title of the break event
          description: 'Take a break', // Description of the break event
          start: [breakStartTime.getFullYear(), breakStartTime.getMonth() + 1, breakStartTime.getDate(), breakStartTime.getHours(), breakStartTime.getMinutes()], // Start time of the break event
          duration: { hours: breakDuration }, // Duration of the break in hours
        };

        schedule.push(breakEvent);

        startDate.setTime(breakEndTime.getTime());
      }
    }
  }

  const { error, value } = ics.createEvents(schedule);

  if (error) {
    console.error(error);
    return;
  }

  writeFileSync(savePath, value);
  console.log(`Schedule saved as ${savePath}`);
}

module.exports = icsCreator;
