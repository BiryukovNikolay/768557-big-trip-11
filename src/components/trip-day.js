import {MONTH_NAMES} from "../const";
import {createTripEventsListTemplate} from "../components/trip-events-list.js";

const getEventsInPoint = (events, dateDate) => {
  const event = events.filter((it) => {
    return it.dueDateStart.getDate() === dateDate;
  });
  return event;
};

export const createTripDayTemplate = (point, day, dateDate, events, offers) => {
  const numberOfDays = point;
  const date = `${dateDate} ${MONTH_NAMES[day.month]}`;
  const eventsInPoint = getEventsInPoint(events, dateDate);

  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${numberOfDays}</span>
         <time class="day__date" datetime="2019-03-18">${date}</time>
       </div>
       ${createTripEventsListTemplate(eventsInPoint, offers)}
     </li>`
  );
};
