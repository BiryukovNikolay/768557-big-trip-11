
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
  return offerLists.slice(0, 2).join(`\n`); // выбираем для показа только два первых offerLists
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

  const {} = event;

  const eventTipe = `taxi`;
  const typeIconName = `${eventTipe}.png`;
  const destination = `Amsterdam`;
  const startTime = `10:30`;
  const endTime = `11:00`;
  const startDate = `2019-03-18`;
  const endDate = `2019-03-18`;
  const duration = `30M`;
  const priceValue = `20`;
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
            <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
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
