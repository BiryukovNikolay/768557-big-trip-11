const EVENT_COUNT = 10;

import TripEventComponent from "./components/trip-event";
import EventListComponent from "./components/trip-events-list.js";
import TripDayComponent from "./components/trip-day.js";
import DaysListComponent from "./components/trip-days-list.js";
import EventEditComponent from "./components/event-edit.js";
import SortComponent from "./components/sort.js";
import FilterComponent from "./components/filter.js";
import MenuControlComponent from "./components/menu-control.js";
import RouteAndPriceComponent from "./components/route-and-price-information.js";
import {generateEvents} from "./mock/trip-event.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition, getDayEventsList} from "./util.js";

const events = generateEvents(EVENT_COUNT);
const dayEventsList = getDayEventsList(events);

const filters = generateFilters();


const renderEvent = (eventListElement, event) => {

  const onEditButtonClick = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const editFormToggle = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onResetButton = (evt) => {
    evt.preventDefault();
    editFormToggle();
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    editFormToggle();
  };

  const eventComponent = new TripEventComponent(event);
  const eventRollup = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  eventRollup.addEventListener(`click`, onEditButtonClick);

  const eventEditComponent = new EventEditComponent(event);
  const eventEdit = eventEditComponent.getElement().querySelector(`.trip-events__item`);
  const reset = eventEditComponent.getElement().querySelector(`.event__reset-btn`);
  eventEdit.addEventListener(`submit`, onEditFormSubmit);
  reset.addEventListener(`click`, onResetButton);

  render(eventListElement, eventComponent.getElement());
};


const renderDaysList = (tripEventsElement, eventsList) => {
  render(tripEventsElement, new SortComponent().getElement());
  render(tripEventsElement, new DaysListComponent().getElement());

  const daysListElement = tripEventsElement.querySelector(`.trip-days`);
  let pointCount = 1;
  eventsList.forEach((eventPoint, day) => {
    const dayEventList = new TripDayComponent(day, pointCount).getElement();
    const eventList = new EventListComponent().getElement();

    eventPoint.forEach((it) => {
      renderEvent(eventList, it);
    });

    render(dayEventList, eventList);
    render(daysListElement, dayEventList);
    pointCount++;
  });

};


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripControlElement, new MenuControlComponent().getElement());
render(tripMainElement, new RouteAndPriceComponent(events).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlElement, new FilterComponent(filters).getElement());
renderDaysList(tripEventsElement, dayEventsList);
