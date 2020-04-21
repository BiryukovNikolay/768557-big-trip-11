import {createTripEventsListTemplate} from "../components/trip-events-list.js";

export const createTripDayTemplate = (events, date, point) => {
  const dateValue = `${date}`;
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${point}</span>
         <time class="day__date" datetime="2019-03-18">${dateValue}</time>
       </div>
       ${createTripEventsListTemplate(events)}
     </li>`
  );
};
