import {MONTH_NAMES} from "../const";

export const createTripDayTemplate = (point, day) => {
  const numberOfDays = point;
  const date = `${day.day} ${MONTH_NAMES[day.month]}`;
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${numberOfDays}</span>
         <time class="day__date" datetime="2019-03-18">${date}</time>
       </div>
     </li>`
  );
};
