import {formatTime, formatDuration} from "../utils/date.js";
import AbstractComponent from "./abstract-component.js";

const createOfferMarkup = (offers) => {
  return offers.map((it) => {
    const {title, price} = it;
    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
           &plus;
           &euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`;
  })
  .slice(0, 3)
  .join(`\n`);
};

const createOffersMarkup = (offers) => {
  const offerMarkup = createOfferMarkup(offers);
  if (offers.length !== 0) {
    return (
      `<h4 class="visually-hidden">Offers:</h4>
       <ul class="event__selected-offers">
         ${offerMarkup}
       </ul>
      `
    );
  } else {
    return ``;
  }
};


const createTripEventTemplate = (event) => {

  const {eventType, dateStart, dateEnd, destination, priceValue} = event;
  const typeIconName = `${eventType.toLowerCase()}.png`;
  const startTime = formatTime(dateStart);
  const endTime = formatTime(dateEnd);
  const startDate = dateStart;
  const endDate = dateEnd;
  const duration = formatDuration(dateStart, dateEnd);
  const durationDays = duration.days ? `${duration.days}D` : ``;
  const durationHours = duration.hours ? `${duration.hours}H` : ``;
  const durationMinutes = duration.minutes ? `${duration.minutes}M` : ``;
  const offersMarkup = createOffersMarkup(event.offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIconName}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} to ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}">${endTime}</time>
          </p>
          <p class="event__duration">${durationDays} ${durationHours} ${durationMinutes} </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;
          <span class="event__price-value">${priceValue}</span>
        </p>
          ${offersMarkup}
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class TripEvent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  setRollupHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
