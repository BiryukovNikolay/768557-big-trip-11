import AbstractSmartComponent from "./abstract-smart-component.js";
import EventModel from "../models/event.js";
import {formatDate, formatTime, formatDateIso} from "../utils/date.js";
import flatpickr from "flatpickr";
import {ACTIVITIES} from "../const.js";

import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
  disableform: ``,
};

const availableOffers = (offerNames, eventType) => {
  if (offerNames.length !== 0) {
    return offerNames.find((it) => {
      return it.type === eventType;
    }).offers;
  } else {
    return [];
  }
};

const createOfferMarkup = (offers, checkedOffers) => {
  return offers.map((it) => {
    const {price, title} = it;
    const titleForAttribute = title.toLowerCase().replace(/ /g, `-`);
    const checkedOffer = checkedOffers.find((that) => {
      return that.title === it.title;
    });

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${titleForAttribute}-1" type="checkbox" aria-label="${title}" name="event-offer-${titleForAttribute}" ${checkedOffer ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${titleForAttribute}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
    );
  }).join(`\n`);
};

const createOfferBlock = (offers, checkedOffers) => {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferMarkup(offers, checkedOffers)}
        </div>
      </section>`
    );
  } else {
    return ``;
  }
};

const createPhoto = (photos) => {
  return photos.map((it) => {
    return (
      `<img class="event__photo" src="${it.src}" alt="${it.description}">`
    );
  }).join(`\n`);
};

const createPhotoMarkup = (photos) => {
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhoto(photos)}
      </div>
    </div>`
  );
};

const createSectionEventDetailsMarkup = (offers, description, photo, checkedOffers) => {
  const isDescription = description ? `${createDescriptionMarkup(description)}` : ``;
  const isPhoto = photo ? `${createPhotoMarkup(photo)}` : ``;

  if (offers.length !== 0 || description || photo) {
    return (
      `<section class="event__details">
          ${createOfferBlock(offers, checkedOffers)}
          <section class="event__section  event__section--destination">
          ${isDescription}
          ${isPhoto}
          </section>
      </section>`
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

const createDestinationsMarkup = (destinations) => {
  return destinations.map((it) => {
    return `<option value="${it.name}"></option>`;
  }).join(`\n`);
};

const createDescriptionMarkup = (description) => {
  return (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${description}</p>`
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


const getDescription = (destination, destinationList) => {
  return destinationList.find((it) => {
    return it.name === destination;
  }).description;
};

const getPhotos = (destination, destinationList) => {
  return destinationList.find((it) => {
    return it.name === destination;
  }).photo;
};

const getTypes = (ar) => {
  return ar.map((it) => {
    return it.type;
  });
};

const isActivities = (type) => {
  return ACTIVITIES.some((it) => {
    return it === type;
  });
};


const createEventEditTemplate = (event, options = {}) => {
  const {priceValue, dateStart, dateEnd, newEvent} = event;
  const {offers, destinations, favorite, checkedOffers, eventType, destination, availableTypeOffers, description, photo, externalData} = options;
  const types = getTypes(offers);
  const descriptionType = description ? description : ``;
  const typeIconName = `${eventType.toLowerCase()}.png`;
  const eventDetails = createSectionEventDetailsMarkup(availableTypeOffers, descriptionType, photo, checkedOffers);
  const dayStart = formatDate(dateStart);
  const timeStart = formatTime(dateStart);
  const dayEnd = formatDate(dateEnd);
  const timeEnd = formatTime(dateEnd);
  const isNewEvent = newEvent ? `` : `${createEditoMarkup(favorite)}`;
  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;
  const disableForm = externalData.disableform;
  const pretext = isActivities(eventType) ? `in` : `to`;

  const isDeleteBtn = newEvent ? `Cancel` : deleteButtonText;
  return (
    `<li class="trip-events__item trip-form">
      <form class="event trip-events__item  event  event--edit" action="#" method="post" disabled>
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
                    ${createTypeMarkup(eventType, types)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${eventType} ${pretext}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                ${createDestinationsMarkup(destinations)}
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

              <button class="event__save-btn  btn  btn--blue" type="submit" ${disableForm}>${saveButtonText}</button>
              <button class="event__reset-btn" type="reset" ${disableForm}>${isDeleteBtn}</button>
              ${isNewEvent}
              
            </header>
              ${eventDetails}
          </form>
        </li>`
  );
};

const parseFormData = (formData) => {
  return {
    "type": formData.get(`event-type`),
    "destination": {name: formData.get(`event-destination`)},
    "base_price": +formData.get(`event-price`),
    "date_from": formatDateIso(formData.get(`event-start-time`)),
    "date_to": formatDateIso(formData.get(`event-end-time`)),
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, onDataChange, destinations, offers) {
    super();
    this._onDataChange = onDataChange;
    this._event = event;
    this._photo = this._event.photo;
    this._favorite = this._event.favorite;
    this._destinations = destinations;
    this._description = this._event.description;
    this._offers = offers;
    this._submitHandler = null;
    this._resetHandler = null;
    this._eventType = this._event.eventType;
    this._eventDestination = this._event.destination;
    this._availableOffers = availableOffers(this._offers, this._eventType);
    this._eventOffers = this._event.offers;
    this._externalData = DefaultData;
    this._deleteButtonClickHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickr();
    this._favoritesHandler();
    this._changeType();
    this._changeDestination();
    this._changeOffers();
    this._changePrice();
  }

  getTemplate() {
    return createEventEditTemplate(this._event, {offers: this._offers, destinations: this._destinations, checkedOffers: this._eventOffers, favorite: this._favorite, eventType: this._eventType, destination: this._eventDestination, availableTypeOffers: this._availableOffers, description: this._description, photo: this._event.photo, externalData: this._externalData});
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
    this._changeDestination();
    this._changeOffers();
    this._changePrice();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._favorite = this._event.favorite;
    this._eventType = this._event.eventType;
    this.rerender();
  }

  save() {
    this._event.favorite = this._favorite;
    this._event.eventType = this._eventType;
    this._event.destination = this._eventDestination;
    this._event.offers = this._eventOffers;
    this._event.photo = this._photo;
    this.rerender();
  }


  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);
    const parsedData = parseFormData(formData);
    parsedData.destination = Object.assign({description: this._description, pictures: this._photo}, parsedData.destination);
    return new EventModel(Object.assign({id: this._event.id, offers: this._eventOffers}, parsedData));
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
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

  _applyFlatpickr() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd = null;
    }

    const getFLetpickrEnd = () => {
      return flatpickr(dateElements[1], {
        altInput: true,
        allowInput: true,
        altFormat: `Y/m/d H:i`,
        dateFormat: `Z`,
        defaultDate: this._event.dateEnd || this._flatpickrStart.latestSelectedDateObj || `today`,
        minDate: this._flatpickrStart.latestSelectedDateObj,
      });
    };

    const dateElements = this.getElement().querySelectorAll(`.event__input--time`);
    dateElements[0].addEventListener(`change`, () => {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = getFLetpickrEnd();
    });

    this._flatpickrStart = flatpickr(dateElements[0], {
      altInput: true,
      allowInput: true,
      altFormat: `Y/m/d H:i`,
      dateFormat: `Z`,
      defaultDate: this._event.dateStart || `today`,
    });

    this._flatpickrEnd = getFLetpickrEnd();
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
      this._availableOffers = availableOffers(this._offers, this._eventType);
      this._eventOffers = [];
      this.rerender();
    });
  }

  _changePrice() {
    const priceInput = this.getElement().querySelector(`.event__input--price`);

    priceInput.addEventListener(`focus`, (evt) => {
      if (evt.target.value === `0`) {
        evt.target.value = ``;
      }
    });

    priceInput.addEventListener(`input`, (evt) => {
      evt.target.value = evt.target.value.replace(/[^\d]/g, ``);
    });
  }

  _changeDestination() {
    const destinationsList = this.getElement().querySelector(`#event-destination-1`);
    const destinationNames = this._destinations.map((it) => {
      return it.name;
    });
    destinationsList.addEventListener(`change`, (evt) => {
      if (!destinationNames.some((it) => {
        return it === evt.target.value;
      }) || !evt.target.value) {
        destinationsList.setCustomValidity(`Сhoose an option from the list`);
      } else {
        this._eventDestination = evt.target.value;
        this._description = getDescription(this._eventDestination, this._destinations);
        this._photo = getPhotos(this._eventDestination, this._destinations);
        this.rerender();
      }
    });
  }

  _changeOffers() {
    const listOfOffers = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    listOfOffers.forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        if (evt.target.checked) {
          this._eventOffers.push(
              this._availableOffers.find((that) => {
                return evt.target.ariaLabel === that.title;
              })
          );
        } else {
          const unCheckedOffer = this._eventOffers.find((that) => {
            return evt.target.ariaLabel === that.title;
          });
          const index = this._eventOffers.indexOf(unCheckedOffer);
          if (index > -1) {
            this._eventOffers.splice(index, 1);
          }
        }
      });
    });
  }
}
