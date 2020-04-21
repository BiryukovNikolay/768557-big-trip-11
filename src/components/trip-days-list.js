import {createTripDayTemplate} from "../components/trip-day.js";
import {MONTH_NAMES} from "../const";

const getDayEventsList = (events) => {
  const DayEventList = new Map();
  events.forEach((it) => {
    const dataDay = it.dateStart;
    const pointDay = dataDay.getDate();
    const pointMonth = MONTH_NAMES[dataDay.getMonth()];
    const dateName = `${pointDay} ${pointMonth}`;
    if (DayEventList.has(dateName)) {
      DayEventList.get(dateName).push(it);
    } else {
      DayEventList.set(dateName, []);
      DayEventList.get(dateName).push(it);
    }
  });
  return DayEventList;
};

const createTripDays = (events) => {
  const tripDays = [];
  let pointCount = 1;
  events.forEach((it, i) => {
    tripDays.push(createTripDayTemplate(it, i, pointCount));
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
