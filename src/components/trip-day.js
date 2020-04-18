import {MONTH_NAMES} from "../const";
import {createTripEventsListTemplate} from "../components/trip-events-list.js";


export const createTripDayTemplate = (point, events) => {
  const pointsInDay = Object.values(events)[point];
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
