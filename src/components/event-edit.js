import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDate, formatTime} from "../utils/date.js";
import {TRANSFERS, ACTIVITIES} from "../const";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const createOfferMarkup = (offers) => {
  return offers.map((it, i) => {
    const {price, title} = it;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${i < 2 ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
    );
  }).join(`\n`);
};

const createSectionEventDetailsMarkup = (offers, description, photo) => {
  const isDescription = description ? `${createDescriptionMarkup(description)}` : ``;
  const isPhoto = photo ? `${createPhotoMarkup(photo)}` : ``;

  if (offers.length !== 0) {
    return (
      `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOfferMarkup(offers)}
          </div>
          <section class="event__section  event__section--destination">
          ${isDescription}
          ${isPhoto}
        </section>
        </section>
      </section>
      `
    );
  } else {
    return ``;
  }
};

const createTypeMarkup = (eventType, types) => {
  const eventTypeLowerCase = eventType.toLowerCase();
  return types.map((it) => {
    const inputValue = it.toLowerCase();
    const isChecked = () => {
      if (eventTypeLowerCase === inputValue) {
        return `checked`;
      } else {
        return ``;
      }
    };
    return (
      `<div class="event__type-item">
        <input id="event-type-${inputValue}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${inputValue}" ${isChecked()}>
        <label class="event__type-label  event__type-label--${inputValue}" for="event-type-${inputValue}-1">${it}</label>
      </div>`
    );
  }).join(`\n`);
};

const createDescriptionMarkup = (description) => {
  return (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${description}</p>`
  );
};

const createPhotoMarkup = (photo) => {
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photo}
      </div>
    </div>`
  );
};

const createEditoMarkup = (favorite) => {
  const isFavorite = favorite ? `checked` : ``;
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  );
};


const createEventEditTemplate = (event, options = {}) => {
  const {description, photo, offers, destination, priceValue, dateStart, dateEnd, newEvent} = event;
  const {favorite, eventType} = options;
  const typeIconName = `${eventType.toLowerCase()}.png`;
  const eventDetails = createSectionEventDetailsMarkup(offers, description, photo);
  const dayStart = formatDate(dateStart);
  const timeStart = formatTime(dateStart);
  const dayEnd = formatDate(dateEnd);
  const timeEnd = formatTime(dateEnd);
  const isNewEvent = newEvent ? `` : `${createEditoMarkup(favorite)}`;
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
                    ${createTypeMarkup(eventType, TRANSFERS)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${createTypeMarkup(eventType, ACTIVITIES)}
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
              ${isNewEvent}
              
            </header>
              ${eventDetails}
          </form>
        </li>`
  );
};

const parseFormData = (formData) => {
  return {
    eventType: formData.get(`event-type`),
    destination: formData.get(`event-destination`),
    priceValue: +formData.get(`event-price`),
    dateStart: Date.parse(formData.get(`event-start-time`)),
    dateEnd: Date.parse(formData.get(`event-end-time`)),
    offers: [],
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, onDataChange) {
    super();
    this._onDataChange = onDataChange;
    this._event = event;
    this._favorite = this._event.favorite;
    this._submitHandler = null;
    this._resetHandler = null;
    this._eventType = this._event.eventType;
    this._deleteButtonClickHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickr();
    this._favoritesHandler();
    this._changeType();
  }

  getTemplate() {
    return createEventEditTemplate(this._event, {favorite: this._favorite, eventType: this._eventType});
  }

  removeElement() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
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
      altInput: true,
      allowInput: true,
      altFormat: `d/m/Y`,
      dateFormat: `Z`,
      defaultDate: this._event.dateStart || `today`,
    });

    this._flatpickrEnd = flatpickr(dateElements[1], {
      altInput: true,
      allowInput: true,
      altFormat: `d/m/Y`,
      dateFormat: `Z`,
      defaultDate: this._event.dateEnd || `today`,
    });
  }

  reset() {
    this._favorite = this._event.favorite;
    this._eventType = this._event.eventType;
    this.rerender();
  }

  save() {
    this._event.favorite = this._favorite;
    this._event.eventType = this._eventType;
    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);
    return parseFormData(formData);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setResetHandler(handler) {
    const rollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollupBtn) {
      rollupBtn.addEventListener(`click`, handler);
    }
    this._resetHandler = handler;
  }

  _favoritesHandler() {
    const favoriteBlock = this.getElement().querySelector(`.event__favorite-btn`);
    if (favoriteBlock) {
      favoriteBlock.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._favorite = !this._favorite;
        this.rerender();
      });
    }
  }

  _changeType() {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.type !== `radio`) {
        return;
      }
      evt.target.checked = true;
      this._eventType = evt.target.value;
      this._event.eventType = evt.target.value;
      this.rerender();
    });
  }
}
