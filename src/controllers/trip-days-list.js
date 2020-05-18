import EventListComponent from "../components/trip-events-list.js";
import TripDayComponent from "../components/trip-day.js";
import DaysListComponent from "../components/trip-days-list.js";
import SortComponent from "../components/sort.js";
import NoEventsComponent from "../components/no-event.js";
import {render} from "../utils/render.js";
import {formatDayMonth, duration} from "../utils/date.js";
import {SortType} from "../components/sort.js";
import EventController from "./event.js";

const renderEvent = (eventListElement, event, onDataChange, onViewChange) => {
  const eventController = new EventController(eventListElement, onDataChange, onViewChange);

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

const getDayEventsList = (events) => {
  const dayEventList = new Map();
  events.forEach((it) => {
    const dataDay = formatDayMonth(it.dateStart);
    if (!dayEventList.has(dataDay)) {
      dayEventList.set(dataDay, []);
    }
    dayEventList.get(dataDay).push(it);
  });
  return dayEventList;
};

export default class DaysListController {
  constructor(container, eventsModel) {

    this._container = container;
    this._eventsModel = eventsModel;

    this._showedEventControllers = [];
    this._container = container;
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._eventList = new EventListComponent();
    this._daysList = new DaysListComponent();

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();
    if (events.length === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._daysList);

    this._getDefaultDaylist(events);
  }

  _removeEvents() {
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _getDefaultDaylist(eventsList) {
    const daysListElement = this._container.querySelector(`.trip-days`);
    const dayEventsList = getDayEventsList(eventsList);
    let pointCount = 1;
    dayEventsList.forEach((eventPoint, day) => {
      const dayEventList = new TripDayComponent(day, pointCount);
      const eventList = new EventListComponent();

      eventPoint.forEach((it) => {
        const newEvents = renderEvent(eventList.getElement(), it, this._onDataChange, this._onViewChange);
        this._showedEventControllers = this._showedEventControllers.concat(newEvents);
      });

      render(dayEventList.getElement(), eventList);
      render(daysListElement, dayEventList);
      pointCount++;
    });
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(type) {
    const events = this._eventsModel.getEvents();
    if (type === SortType.DEFAULT) {
      this._daysList.getElement().innerHTML = ``;
      this._getDefaultDaylist(events);
      return;
    }

    const sortEvents = getSortedEvents(events, type);
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

  _updateEvents() {
    this._daysList.getElement().innerHTML = ``;
    this._removeEvents();
    this.render();
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._eventsModel.updateEvents(oldData.id, newData);
    const eventController = this._showedTaskControllers.find((it) => {
      return oldData.id === it.id;
    });
    if (isSuccess) {
      eventController.render(newData);
    }
  }
}
