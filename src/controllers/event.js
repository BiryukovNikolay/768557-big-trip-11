import TripEventComponent from "../components/trip-event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  id: String(new Date() + Math.random()),
  favorite: false,
  eventType: `bus`,
  destination: ``,
  priceValue: `0`,
  dateStart: new Date(),
  dateEnd: new Date(),
  offers: [],
  photo: [],
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
    this.event = event;

    this._eventComponent = new TripEventComponent(this.event);
    this._eventComponent.setRollupHandler(this._onEditButton);

    this._eventEditComponent = new EventEditComponent(this.event, this._onDataChange, this._destinations, this._offers);
    this._eventEditComponent.setSubmitHandler(this._onEditFormSubmit);
    this._eventEditComponent.setResetHandler(this._onResetButton);
    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(event, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventComponent && oldEventEditComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
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
    return this.event;
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

  _onDeleteButton(evt) {
    evt.preventDefault();
    this._eventEditComponent.reset();
    this._destroy();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
    const data = this._eventEditComponent.getData();
    this._onDataChange(this.event, data);
    this._eventEditComponent.save();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
