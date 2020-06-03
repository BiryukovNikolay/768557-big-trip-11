import TripEventComponent from "../components/trip-event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  favorite: false,
  eventType: `bus`,
  destination: ``,
  priceValue: `0`,
  dateStart: new Date(),
  dateEnd: new Date(),
  offers: [],
  photo: null,
  newEvent: true,
};


export default class EventController {
  constructor(container, onDataChange, onViewChange, destinations, offers) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._destinations = destinations;
    this._offers = offers;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButton = this._onEditButton.bind(this);
    this._onResetButton = this._onResetButton.bind(this);
    this._onEditFormSubmit = this._onEditFormSubmit.bind(this);
  }

  render(event, mode) {

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;
    this._event = event;
    this._eventComponent = new TripEventComponent(this._event);
    this._eventComponent.setRollupHandler(this._onEditButton);

    this._eventEditComponent = new EventEditComponent(this._event, this._onDataChange, this._destinations, this._offers);
    this._eventEditComponent.setSubmitHandler(this._onEditFormSubmit);
    this._eventEditComponent.setResetHandler(this._onResetButton);

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
        disableform: `disabled`,
        readonly: `readonly`,
      });

      this._onDataChange(event, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventComponent && oldEventEditComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent);
        }
        break;
      case Mode.ADDING:
        if (oldEventComponent && oldEventEditComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  getEvent() {
    return this._event;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventEditComponent.getElement().querySelector(`.event--edit`).style.border = `2px solid rgba(214, 15, 15, 0.5)`;


    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        deleteButtonText: `Delete`,
        saveButtonText: `Save`,
        disableform: ``,
        readonly: ``,
      });


    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    if (this._mode === Mode.ADDING) {
      remove(this._eventEditComponent);
    }
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {

        this._onDataChange(EmptyEvent, null);
        remove(this._eventEditComponent);
        this._mode = Mode.DEFAULT;
      }

      this._eventEditComponent.reset();
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEditButton(evt) {
    evt.preventDefault();
    if (this._mode === Mode.ADDING) {
      this._onDataChange(EmptyEvent, null);
    }
    this._replaceEventToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onResetButton(evt) {
    if (this._mode === Mode.ADDING) {
      this._onDataChange(EmptyEvent, null);
      remove(this._eventEditComponent);
      this._mode = Mode.DEFAULT;
    }
    evt.preventDefault();
    this._eventEditComponent.reset();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEditFormSubmit(evt) {
    evt.preventDefault();
    this._eventEditComponent.save();
    const destinationsList = this._eventEditComponent.getElement().querySelector(`#event-destination-1`);
    if (this._event.destination !== ``) {
      this._eventEditComponent.getElement().querySelector(`.event--edit`).style.border = ``;

      const inputs = this._eventEditComponent.getElement().querySelectorAll(`.event__input`);
      inputs.forEach((it) => {
        it.setAttribute(`readonly`, true);
      });

      const data = this._eventEditComponent.getData();
      this._onDataChange(this._event, data);
      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
        disableform: `disabled`,
        readonly: `readonly`
      });
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    } else {
      destinationsList.setCustomValidity(`Сhoose an option from the list`);
    }
  }
}
