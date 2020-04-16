import {formatTime, getFormatDuration} from "../util.js";
const createOfferMarkup = (offers) => {
  const offerLists = [];
  offers.forEach((it) => {
    const offerTitle = it.title;
    const offerPrice = it.price;
    offerLists.push(
        `<li class="event__offer">
          <span class="event__offer-title">${offerTitle}</span>
           &plus;
           &euro;&nbsp;
          <span class="event__offer-price">${offerPrice}</span>
        </li>`
    );
  });
  return offerLists.slice(0, 3).join(`\n`); // выбираем для показа только 3 первых offerLists
};


const createOffersMarkup = (offers) => {
  const offerMarkup = createOfferMarkup(offers);
  if (offers) {
    return (
      `<ul class="event__selected-offers">
         ${offerMarkup}
       </ul>
      `
    );
  } else {
    return ``;
  }
};


export const createTripEventTemplate = (event, offers) => {

  const {eventTipe, dueDateStart, dueDateEnd, destination, priceValue} = event;
  const typeIconName = `${eventTipe}.png`;
  const startTime = formatTime(dueDateStart);
  const endTime = formatTime(dueDateEnd);
  const startDate = dueDateStart;
  const endDate = dueDateEnd;
  const duration = getFormatDuration(dueDateStart, dueDateEnd);
  const offersMarkup = createOffersMarkup(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIconName}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTipe} to ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}">${endTime}</time>
          </p>
          <p class="event__duration">${duration.days ? `${duration.days}D` : ``} ${duration.hours ? `${duration.hours}H` : ``} ${duration.minutes ? `${duration.minutes}M` : ``} </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;
          <span class="event__price-value">${priceValue}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
          ${offersMarkup}
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};
