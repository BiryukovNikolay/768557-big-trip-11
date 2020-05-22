import {formatMonthDay, formatMonth, formatDay} from "../utils/date.js";
import AbstractComponent from "./abstract-smart-component.js";

const createRouteAndPriceInformationTemplate = (eventsList) => {
  const events = eventsList.sort((a, b) => a.dateStart - b.dateStart);
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

    const startDate = formatMonthDay(startDay.dateStart);
    const startMonth = formatMonth(startDay.dateStart);
    const endDate = formatMonthDay(lastDay.dateEnd);
    const endMonth = formatMonth(startDay.dateEnd);
    const endDay = formatDay(startDay.dateEnd);


    route = `${startLocation} &mdash;${events.length > 3 ? ` ... ` : `${middleLocation}`} &mdash; ${lastLocation}`;
    date = `${startDate}&nbsp;&mdash;&nbsp;${endMonth === startMonth ? `${endDay}` : `${endDate}`}`;

    const getTotalPriceOfOffer = (offers) => {
      if (offers.length > 0) {
        return offers.reduce((acc, it) => {
          return acc + it.price;
        }, 0);
      } else {
        return 0;
      }
    };

    fullPrice = events.reduce((acc, it) => {
      return acc + it.priceValue + getTotalPriceOfOffer(it.offers);
    }, 0);
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

export default class RouteAndPrice extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }
  getTemplate() {
    return createRouteAndPriceInformationTemplate(this._events);
  }
}
