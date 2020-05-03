import AbstractComponent from "./abstract-component.js";

const createTripDayTemplate = (date, point) => {

  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${point}</span>
         <time class="day__date" datetime="2019-03-18">${date}</time>
       </div>
     </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(date, point) {
    super();

    this._date = date;
    this._point = point;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._point);
  }
}
