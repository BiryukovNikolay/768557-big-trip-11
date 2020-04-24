import {createTripEventsListTemplate} from "../components/trip-events-list.js";
import {createElement} from "../utils.js";

const createTripDayTemplate = (events, date, point) => {
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${point}</span>
         <time class="day__date" datetime="2019-03-18">${date}</time>
       </div>
       ${createTripEventsListTemplate(events)}
     </li>`
  );
};


export default class TripDay {
  constructor(events, date, point) {
    this._date = date;
    this._point = point;
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._events, this._date, this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

