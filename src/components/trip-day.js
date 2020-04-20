import {MONTH_NAMES} from "../const";
import {createTripEventsListTemplate} from "../components/trip-events-list.js";
import {getPoints} from "../mock/trip-day";

const getEventsInPoint = (events, dateDate) => {
  return events.filter((it) => {
    return new Intl.DateTimeFormat(`en-GB`).format(it.dateStart) === dateDate;
  });
};


const getComfortEvents = (events) => {
  const points = getPoints(events);
  const comfortEventsList = {};
  points.forEach((it, i) => {
    comfortEventsList[points[i]] = getEventsInPoint(events, it);
  });
  return comfortEventsList;
};


export const createTripDayTemplate = (point, events) => {
  const pointsInDay = Object.values(getComfortEvents(events))[point];
  const pointsDates = Object.keys(getComfortEvents(events));

  const pointDate = pointsDates[point];
  const pointDay = pointDate.substr(0, 2);
  const pointMonth = MONTH_NAMES[Number(pointDate.substr(3, 2) - 1)];

  const date = `${pointDay} ${pointMonth}`;

  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${point + 1}</span>
         <time class="day__date" datetime="2019-03-18">${date}</time>
       </div>
       ${createTripEventsListTemplate(pointsInDay)}
     </li>`
  );
};
