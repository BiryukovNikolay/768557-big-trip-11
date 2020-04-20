import {MONTH_NAMES} from "../const";
import {createTripEventsListTemplate} from "../components/trip-events-list.js";
import {getPoints} from "../mock/trip-day";

const getEventsInPoint = (events, dateDate) => {
  const event = events.filter((it) => {
    return it.dateStart.getDate() === dateDate;
  });
  return event;
};


const getComfortEvents = (events) => {
  const points = getPoints(events);
  const comfortEventsList = {};
  points.forEach((it, i) => {
    comfortEventsList[i + 1] = getEventsInPoint(events, it);
  });
  return comfortEventsList;
};


export const createTripDayTemplate = (point, events) => {


  const pointsInDay = Object.values(getComfortEvents(events))[point];
  const startDay = pointsInDay[0];
  const startDate = startDay.dateStart.getDate();
  const startMonth = MONTH_NAMES[startDay.dateStart.getMonth()];
  const date = `${startDate} ${startMonth}`;

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
