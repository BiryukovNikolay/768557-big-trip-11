import TripEventComponent from "../components/trip-event.js";
import EventListComponent from "../components/trip-events-list.js";
import TripDayComponent from "../components/trip-day.js";
import DaysListComponent from "../components/trip-days-list.js";
import EventEditComponent from "../components/event-edit.js";
import SortComponent from "../components/sort.js";
import NoEventsComponent from "../components/no-event.js";
import {render, replace} from "../utils/render.js";

const renderEvent = (eventListElement, event) => {

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEditButton = (evt) => {
    evt.preventDefault();
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onResetButton = (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const eventComponent = new TripEventComponent(event);
  eventComponent.setRollupHandler(onEditButton);

  const eventEditComponent = new EventEditComponent(event);
  eventEditComponent.setSubmitHandler(onEditFormSubmit);
  eventEditComponent.setResetHandler(onResetButton);

  render(eventListElement, eventComponent);
};

export default class DaysListController {
  constructor(container) {
    this._container = container;
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._eventList = new EventListComponent();
    this._daysList = new DaysListComponent();
  }

  render(events) {
    if (events.size === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._daysList);

    const daysListElement = this._container.querySelector(`.trip-days`);
    let pointCount = 1;
    events.forEach((eventPoint, day) => {
      const dayEventList = new TripDayComponent(day, pointCount);
      const eventList = new EventListComponent();

      eventPoint.forEach((it) => {
        renderEvent(eventList.getElement(), it);
      });

      render(dayEventList.getElement(), eventList);
      render(daysListElement, dayEventList);
      pointCount++;
    });
  }
}
