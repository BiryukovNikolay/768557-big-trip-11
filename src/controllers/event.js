import TripEventComponent from "../components/trip-event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButton = this._onEditButton.bind(this);
    this._onResetButton = this._onResetButton.bind(this);
    this._onEditFormSubmit = this._onEditFormSubmit.bind(this);
  }

  render(event) {
    const oldEventComponent = this._taskComponent;
    const oldEventEditComponent = this._taskEditComponent;

    this._eventComponent = new TripEventComponent(event);
    this._eventComponent.setRollupHandler(this._onEditButton);

    this._eventEditComponent = new EventEditComponent(event, this._onDataChange);
    this._eventEditComponent.setSubmitHandler(this._onEditFormSubmit);
    this._eventEditComponent.setResetHandler(this._onResetButton);

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._eventEditComponent.reset();
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
    this._eventEditComponent.reset();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEditFormSubmit(evt) {
    evt.preventDefault();
    this._eventEditComponent.save();
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
