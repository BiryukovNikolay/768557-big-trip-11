import {createElement} from "../util.js";

const createTripDaysListTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

export default class DaysList {
  constructor(events) {
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createTripDaysListTemplate(this._events);
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

