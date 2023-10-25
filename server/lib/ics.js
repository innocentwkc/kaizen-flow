const { writeFileSync } = require('fs');
const ics = require('ics');

const data = {
  "units": {
    "units": [
      {
        "unitNumber": "Unit 1",
        "subChapters": [
          {
            "subChapterNumber": "1.1",
            "subChapterTitle": "IT Services . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15"
          },
          {
            "subChapterNumber": "1.2",
            "subChapterTitle": "IT Service Management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17"
          },
          {
            "subChapterNumber": "1.3",
            "subChapterTitle": "ITSM Frameworks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19"
          }
        ]
      },
      {
        "unitNumber": "Unit 2",
        "subChapters": [
          {
            "subChapterNumber": "2.1",
            "subChapterTitle": "Stakeholders, Services, and Service Management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24"
          },
          {
            "subChapterNumber": "2.2",
            "subChapterTitle": "Value Contribution of IT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28"
          },
          {
            "subChapterNumber": "2.3",
            "subChapterTitle": "Four Dimensions Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29"
          }
        ]
      },
      {
        "unitNumber": "Unit 3",
        "subChapters": [
          {
            "subChapterNumber": "3.1",
            "subChapterTitle": "Basics and Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34"
          },
          {
            "subChapterNumber": "3.2",
            "subChapterTitle": "Inputs, Outcome, and Governance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 36"
          },
          {
            "subChapterNumber": "3.3",
            "subChapterTitle": "The Service Value Chain (SVC) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37"
          },
          {
            "subChapterNumber": "3.4",
            "subChapterTitle": "Continual Improvement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39"
          }
        ]
      },
      {
        "unitNumber": "Unit 4",
        "subChapters": [
          {
            "subChapterNumber": "4.1",
            "subChapterTitle": "Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44"
          },
          {
            "subChapterNumber": "4.2",
            "subChapterTitle": "Value Orientation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46"
          },
          {
            "subChapterNumber": "4.3",
            "subChapterTitle": "Iterative Procedure and Feedback . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49"
          },
          {
            "subChapterNumber": "4.4",
            "subChapterTitle": "Establish Collaboration and Visibility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 51"
          },
          {
            "subChapterNumber": "4.5",
            "subChapterTitle": "Optimize and Automate . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 54"
          }
        ]
      },
      {
        "unitNumber": "Unit 5",
        "subChapters": [
          {
            "subChapterNumber": "5.1",
            "subChapterTitle": "Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58"
          },
          {
            "subChapterNumber": "5.2",
            "subChapterTitle": "General Management Practices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61"
          },
          {
            "subChapterNumber": "5.3",
            "subChapterTitle": "Service Management Practices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64"
          },
          {
            "subChapterNumber": "5.4",
            "subChapterTitle": "Technical Practices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 68"
          }
        ]
      },
      {
        "unitNumber": "Unit 6",
        "subChapters": [
          {
            "subChapterNumber": "6.1",
            "subChapterTitle": "Structure and Elements of BSI IT Basic Protection Framework . . . . . . . . . . . . . . . . . . . . 72"
          },
          {
            "subChapterNumber": "6.2",
            "subChapterTitle": "Information Security Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 77"
          }
        ]
      }
    ]
  }
};

// Total available hours for the schedule
const totalHours = 150;

// Start date for the schedule (adjust as needed)
const startDate = new Date(2023, 11, 15, 8, 0, 0); // December 15, 2023, 08:00 AM

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
  writeFileSync(`${__dirname}/schedule.ics`, value);
  console.log('Schedule saved as schedule.ics');
}
