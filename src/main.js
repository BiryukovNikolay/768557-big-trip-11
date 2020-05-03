const EVENT_COUNT = 20;

import TripEventComponent from "./components/trip-event";
import EventListComponent from "./components/trip-events-list.js";
import TripDayComponent from "./components/trip-day.js";
import DaysListComponent from "./components/trip-days-list.js";
import EventEditComponent from "./components/event-edit.js";
import SortComponent from "./components/sort.js";
import FilterComponent from "./components/filter.js";
import MenuControlComponent from "./components/menu-control.js";
import RouteAndPriceComponent from "./components/route-and-price-information.js";
import NoEventsComponent from "./components/no-event.js";
import {generateEvents} from "./mock/trip-event.js";
import {generateFilters} from "./mock/filter.js";
import {getDayEventsList} from "./util.js";
import {render, replace, RenderPosition} from "./utils/render.js";

const events = generateEvents(EVENT_COUNT);
const dayEventsList = getDayEventsList(events);

const filters = generateFilters();


const renderEvent = (eventListElement, event) => {

  const replaceEventToEdit = () => {
    replace(eventListElement, eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    replace(eventListElement, eventComponent.getElement(), eventEditComponent.getElement());
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
  const eventRollup = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  eventRollup.addEventListener(`click`, onEditButton);

  const eventEditComponent = new EventEditComponent(event);
  const eventEdit = eventEditComponent.getElement().querySelector(`.trip-events__item`);
  const reset = eventEditComponent.getElement().querySelector(`.event__reset-btn`);
  eventEdit.addEventListener(`submit`, onEditFormSubmit);
  reset.addEventListener(`click`, onResetButton);

  render(eventListElement, eventComponent);
};


const renderDaysList = (tripEventsElement, eventsList) => {
  if (eventsList.size === 0) {
    render(tripEventsElement, new NoEventsComponent());
    return;
  }

  render(tripEventsElement, new SortComponent());
  render(tripEventsElement, new DaysListComponent());

  const daysListElement = tripEventsElement.querySelector(`.trip-days`);
  let pointCount = 1;
  eventsList.forEach((eventPoint, day) => {
    const dayEventList = new TripDayComponent(day, pointCount);
    const eventList = new EventListComponent();

    eventPoint.forEach((it) => {
      renderEvent(eventList.getElement(), it);
    });

    render(dayEventList.getElement(), eventList);
    render(daysListElement, dayEventList);
    pointCount++;
  });

};


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripControlElement, new MenuControlComponent());
render(tripMainElement, new RouteAndPriceComponent(events), RenderPosition.AFTERBEGIN);
render(tripControlElement, new FilterComponent(filters));
renderDaysList(tripEventsElement, dayEventsList);
