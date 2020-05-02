import {MONTH_NAMES} from "../const";
import {createElement} from "../util.js";

const createRouteAndPriceInformationTemplate = (events) => {
  let route = ``;
  let date = ``;
  let fullPrice = `0`;

  if (events.length !== 0) {
    const startDay = events[0];
    const middleDay = events[Math.floor(events.length / 2)];
    const lastDay = events[events.length - 1];

    const startLocation = startDay.destination;
    const middleLocation = middleDay.destination;
    const lastLocation = lastDay.destination;

    const startDate = startDay.dateStart.getDate();
    const startMonth = MONTH_NAMES[startDay.dateStart.getMonth()];
    const endDay = lastDay.dateStart.getDate();
    const endMonth = MONTH_NAMES[lastDay.dateStart.getMonth()];

    route = `${startLocation}&mdash;${events.length > 3 ? ` ... ` : `${middleLocation}`} &mdash; ${lastLocation}`;
    date = `${startMonth} ${startDate}&nbsp;&mdash;&nbsp;${endMonth === startMonth ? `` : `${endMonth}`}${endDay}`;
    fullPrice = events.reduce((acc, it) => acc + it.priceValue, 0);
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title"> ${route}</h1>
        <p class="trip-info__dates">${date}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
      </p>
    </section>`
  );
};

export default class RouteAndPrice {
  constructor(events) {
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createRouteAndPriceInformationTemplate(this._events);
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

