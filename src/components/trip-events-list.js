import {createTripEventTemplate} from "../components/trip-event.js";
import {createElement} from "../utils.js";

const createTripEventsListTemplate = (events) => {
  const getEvents = () => {
    return events.map((it) => {
      return createTripEventTemplate(it);
    })
    .join(`\n`);
  };
  return (
    `<ul class="trip-events__list">
      ${getEvents()}
    </ul>`
  );
};

export default class EventList {
  constructor(events) {
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createTripEventsListTemplate(this._events);
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

