import EventListComponent from "../components/trip-events-list.js";
import TripDayComponent from "../components/trip-day.js";
import DaysListComponent from "../components/trip-days-list.js";
import SortComponent from "../components/sort.js";
import NoEventsComponent from "../components/no-event.js";
import {render} from "../utils/render.js";
import {getDayEventsList, duration} from "../utils/date.js";
import {SortType} from "../components/sort.js";
import EventController from "./event.js";

const renderEvent = (eventListElement, event, onDataChange) => {
  const eventController = new EventController(eventListElement, onDataChange);

  eventController.render(event);

  return eventController;
};

const getSortedEvents = (events, sortType) => {
  let sortedTasks = [];
  const showingTasks = events.slice();

  switch (sortType) {
    case SortType.PRICE_UP:
      sortedTasks = showingTasks.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case SortType.DURATION_UP:
      sortedTasks = showingTasks.sort((a, b) => duration(b.dateStart, b.dateEnd) - duration(a.dateStart, a.dateEnd));
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }
  return sortedTasks;
};

export default class DaysListController {
  constructor(container) {

    this._events = [];
    this._showedEventControllers = [];
    this._container = container;
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._eventList = new EventListComponent();
    this._daysList = new DaysListComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;
    if (this._events.length === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._daysList);

    this._getDefaultDaylist(this._events);
  }

  _getDefaultDaylist(eventsList) {
    const daysListElement = this._container.querySelector(`.trip-days`);
    const dayEventsList = getDayEventsList(eventsList);
    let pointCount = 1;
    dayEventsList.forEach((eventPoint, day) => {
      const dayEventList = new TripDayComponent(day, pointCount);
      const eventList = new EventListComponent();

      eventPoint.forEach((it) => {
        const newEvents = renderEvent(eventList.getElement(), it, this._onDataChange);
        this._showedEventControllers = this._showedEventControllers.concat(newEvents);
      });

      render(dayEventList.getElement(), eventList);
      render(daysListElement, dayEventList);
      pointCount++;
    });
  }

  _onSortTypeChange(type) {
    if (type === SortType.DEFAULT) {
      this._daysList.getElement().innerHTML = ``;
      this._getDefaultDaylist(this._events);
      return;
    }

    const sortEvents = getSortedEvents(this._events, type);
    this._daysList.getElement().innerHTML = ``;
    const dayEventList = new TripDayComponent(``, ``);
    const eventList = new EventListComponent();
    render(this._daysList.getElement(), dayEventList);
    render(dayEventList.getElement(), eventList);
    sortEvents.forEach((it) => {
      const newEvents = renderEvent(eventList.getElement(), it, this._onDataChange);
      this._showedEventControllers = this._showedEventControllers.concat(newEvents);
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    this._showedEventControllers[index].render(this._events[index]);

  }
}
