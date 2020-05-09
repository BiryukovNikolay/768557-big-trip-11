import TripEventComponent from "../components/trip-event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace} from "../utils/render.js";

export default class EventController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButton = this._onEditButton.bind(this);
    this._onResetButton = this._onResetButton.bind(this);
    this._onEditFormSubmit = this._onEditFormSubmit.bind(this);
  }

  render(event) {
    this._eventComponent = new TripEventComponent(event);
    this._eventComponent.setRollupHandler(this._onEditButton);

    this._eventEditComponent = new EventEditComponent(event);
    this._eventEditComponent.setSubmitHandler(this._onEditFormSubmit);
    this._eventEditComponent.setResetHandler(this._onResetButton);

    render(this._container, this._eventComponent);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEditButton(evt) {
    evt.preventDefault();
    this._replaceEventToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onResetButton(evt) {
    evt.preventDefault();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEditFormSubmit(evt) {
    evt.preventDefault();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
