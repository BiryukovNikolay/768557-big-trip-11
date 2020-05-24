import EventListComponent from "../components/trip-events-list.js";
import TripDayComponent from "../components/trip-day.js";
import DaysListComponent from "../components/trip-days-list.js";
import SortComponent from "../components/sort.js";
import NoEventsComponent from "../components/no-event.js";
import {render, remove} from "../utils/render.js";
import {formatDayMonth, duration} from "../utils/date.js";
import {SortType} from "../components/sort.js";
import EventController, {Mode as EventControllerMode, EmptyEvent} from "./event.js";

const renderEvent = (eventListElement, event, onDataChange, onViewChange) => {
  const eventController = new EventController(eventListElement, onDataChange, onViewChange);

  eventController.render(event, EventControllerMode.DEFAULT);

  return eventController;
};

const getSortedEvents = (events, sortType) => {
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.PRICE_UP:
      return showingEvents.sort((a, b) => b.priceValue - a.priceValue);
    case SortType.DURATION_UP:
      return showingEvents.sort((a, b) => duration(b.dateStart, b.dateEnd) - duration(a.dateStart, a.dateEnd));
    case SortType.DEFAULT:
      return showingEvents;
  }

  return showingEvents;
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
    this._creatingEvent = null;


    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this.onCreateEvents = this.onCreateEvents.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._sortComponent.hide();
    this._daysList.hide();
  }

  show() {
    this._sortComponent.show();
    this._daysList.show();
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

  onCreateEvents() {
    if (this._creatingEvent) {
      return;
    }

    this._showedEventControllers.forEach((it) => {
      it.setDefaultView();
    });
    const eventListElement = this._daysList.getElement();
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }


  _removeEvents() {
    remove(this._daysList);
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _getDefaultDaylist(eventsList) {
    const daysListElement = this._container.querySelector(`.trip-days`);
    const dayEventsList = getDayEventsList(eventsList.sort((a, b) => a.dateStart - b.dateStart));

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
    this._creatingEvent = null;
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
    this._removeEvents();
    this.render();
  }

  _onFilterChange() {
    this._creatingEvent = null;
    this._updateEvents();
  }

  _onDataChange(oldData, newData) {
    const eventController = this._showedEventControllers.find((it) => {
      return oldData.id === it.getEvent().id;
    });

    if (oldData === EmptyEvent) {
      if (newData === null) {
        this._creatingEvent.destroy();
        this._updateEvents();
        this._creatingEvent = null;
      } else {
        this._eventsModel.addEvent(newData);
        this._removeEvents();
        this.render();
        this._creatingEvent = null;
      }

    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEvents(oldData.id, newData);
      if (isSuccess) {
        eventController.render(newData, EventControllerMode.DEFAULT);
      }
    }
  }
}
