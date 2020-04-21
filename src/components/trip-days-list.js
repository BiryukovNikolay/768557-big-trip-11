import {createTripDayTemplate} from "../components/trip-day.js";
import {MONTH_NAMES} from "../const";

const formatStartDate = (startDate) => {
  return new Intl.DateTimeFormat(`en-GB`).format(startDate);
};

const getDayEventsList = (events) => {
  const DayEventList = new Map();
  events.forEach((it) => {
    const dataDay = formatStartDate(it.dateStart);
    const pointDay = dataDay.substr(0, 2);
    const pointMonth = MONTH_NAMES[Number(dataDay.substr(3, 2) - 1)];
    const dataName = `${pointDay} ${pointMonth}`;
    if (DayEventList.has(dataName)) {
      DayEventList.get(dataName).push(it);
    } else {
      DayEventList.set(dataName, []);
      DayEventList.get(dataName).push(it);
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
