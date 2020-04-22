import {createTripDayTemplate} from "../components/trip-day.js";

const formatStartDate = (startDate) => {
  const options = {month: `short`, day: `numeric`};
  return new Intl.DateTimeFormat(`en-GB`, options).format(startDate);
};

const getDayEventsList = (events) => {
  const dayEventList = new Map();
  events.forEach((it) => {
    const dataDay = formatStartDate(it.dateStart);
    if (!dayEventList.has(dataDay)) {
      dayEventList.set(dataDay, []);
    }
    dayEventList.get(dataDay).push(it);
  });
  return dayEventList;
};

const createTripDays = (events) => {
  const tripDays = [];
  let pointCount = 1;
  events.forEach((eventPoints, day) => {
    tripDays.push(createTripDayTemplate(eventPoints, day, pointCount));
    pointCount++;
  });
  return tripDays.join(`\n`);
};

export const createTripDaysListTemplate = (events) => {
  return (
    `<ul class="trip-days">
      ${createTripDays(getDayEventsList(events))}
     </ul>`
  );
};
