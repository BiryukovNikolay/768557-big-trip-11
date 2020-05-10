import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDate, formatTime} from "../utils/date.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const createOfferMarkup = (offers) => {
  const offerLists = [];
  offers.forEach((it, i) => {
    const offerTitle = it.title;
    const offerPrice = it.price;
    offerLists.push(
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${i < 2 ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offerTitle}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
          </label>
        </div>`
    );
  });
  return offerLists.join(`\n`);
};

const createSectionOffersMarkup = (offers) => {
  const offerMarkup = createOfferMarkup(offers);
  if (offers.length !== 0) {
    return (
      `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offerMarkup}
          </div>
        </section>
      </section>
      `
    );
  } else {
    return ``;
  }
};


const createEventEditTemplate = (event, options = {}) => {

  const {offers, destination, priceValue, dateStart, dateEnd} = event;
  const {favorite, eventType} = options;
  const typeIconName = `${eventType.toLowerCase()}.png`;
  const avalibleOffer = createSectionOffersMarkup(offers);
  const dayStart = formatDate(dateStart);
  const timeStart = formatTime(dateStart);
  const dayEnd = formatDate(dateEnd);
  const timeEnd = formatTime(dateEnd);
  const isFavorite = favorite ? `checked` : ``;

  return (
    `<li class="trip-events__item trip-form">
      <form class="event trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${typeIconName}" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${eventType}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayStart} ${timeStart}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayEnd} ${timeEnd}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${priceValue}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>

              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
              ${avalibleOffer}
          </form>
        </li>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._favorite = this._event.favorite;
    this._submitHandler = null;
    this._resetHandler = null;
    this._eventType = this._event.eventType;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._applyFlatpickr();
    this._favoritesHandler();
    this._changeType();

  }

  getTemplate() {
    return createEventEditTemplate(this._event, {favorite: this._favorite, eventType: this._eventType});
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setResetHandler(this._resetHandler);
    this._favoritesHandler();
    this._changeType();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd = null;
    }

    const dateElements = this.getElement().querySelectorAll(`.event__input--time`);
    this._flatpickrStart = flatpickr(dateElements[0], {
      allowInput: true,
      dateFormat: `d/m/Y`,
      defaultDate: this._event.dateStart || `today`,
    });

    this._flatpickrEnd = flatpickr(dateElements[1], {
      allowInput: true,
      dateFormat: `d/m/Y`,
      defaultDate: this._event.dateEnd || `today`,
    });
  }

  reset() {
    this._favorite = this._event.favorite;
    this._eventType = this._event.eventType;
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.trip-events__item`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setResetHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._resetHandler = handler;
  }

  _favoritesHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._favorite = !this._favorite;
      this.rerender();
    });
  }

  _changeType() {
    const tripTypes = this.getElement().querySelectorAll(`input[type="radio"]`);
    tripTypes.forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._eventType = evt.target.value;
        this.rerender();
      });
    });
  }
}
