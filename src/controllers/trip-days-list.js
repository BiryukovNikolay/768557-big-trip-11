import EventListComponent from "../components/trip-events-list.js";
import TripDayComponent from "../components/trip-day.js";
import DaysListComponent from "../components/trip-days-list.js";
import SortComponent from "../components/sort.js";
import NoEventsComponent from "../components/no-event.js";
import {render, remove} from "../utils/render.js";
import {formatDayMonth, duration, formatDayMonthYear} from "../utils/date.js";
import {SortType} from "../components/sort.js";
import EventController, {Mode as EventControllerMode, EmptyEvent} from "./event.js";

const renderEvent = (eventListElement, event, onDataChange, onViewChange, destinations, offers) => {

  const eventController = new EventController(eventListElement, onDataChange, onViewChange, destinations, offers);

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
    const dataDay = formatDayMonthYear(it.dateStart);
    if (!dayEventList.has(dataDay)) {
      dayEventList.set(dataDay, []);
    }
    dayEventList.get(dataDay).push(it);
  });
  return dayEventList;
};


export default class DaysListController {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {

    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

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

  closeAllEdit() {
    this._onViewChange();
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

    const destinstions = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();

    if (events.length === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._daysList);

    this._getDefaultDaylist(events, destinstions, offers);
  }

  onCreateEvents() {
    const destinations = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();

    if (this._creatingEvent) {
      return;
    }

    this._showedEventControllers.forEach((it) => {
      it.setDefaultView();
    });

    this._onFilterChange();

    if (this._eventsModel.getEvents().length === 0) {
      remove(this._noEventsComponent);
      render(this._container, this._daysList);
    }
    const eventListElement = this._daysList.getElement();
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange, destinations, offers);
    this._showedEventControllers = this._showedEventControllers.concat(this._creatingEvent);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }


  _removeEvents() {
    remove(this._daysList);
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _getDefaultDaylist(eventsList) {
    if (this._noEventsComponent) {
      remove(this._noEventsComponent);
      render(this._container, this._daysList);
    }
    const daysListElement = this._container.querySelector(`.trip-days`);
    const dayEventsList = getDayEventsList(eventsList.sort((a, b) => {
      return Date.parse(a.dateStart) - Date.parse(b.dateStart);
    }));
    const destinstions = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();

    let pointCount = 1;
    dayEventsList.forEach((eventPoint, day) => {
      const dayEventList = new TripDayComponent(formatDayMonth(day), pointCount);
      const eventList = new EventListComponent();

      eventPoint.forEach((it) => {
        const newEvents = renderEvent(eventList.getElement(), it, this._onDataChange, this._onViewChange, destinstions, offers);
        this._showedEventControllers = this._showedEventControllers.concat(newEvents);
      });
      render(dayEventList.getElement(), eventList);
      render(daysListElement, dayEventList);
      pointCount++;
    });
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
    if (this._creatingEvent) {
      this._creatingEvent.destroy();
      this._creatingEvent = null;
    }
  }

  _onSortTypeChange(type) {
    const destinstions = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();
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
      const newEvents = renderEvent(eventList.getElement(), it, this._onDataChange, this._onViewChange, destinstions, offers);
      this._showedEventControllers = this._showedEventControllers.concat(newEvents);
    });
  }

  _resetSort() {
    remove(this._sortComponent);
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onSortTypeChange(SortType.DEFAULT);
  }

  _updateEvents() {
    this._removeEvents();
    this.render();
  }

  _onFilterChange() {
    this._resetSort();
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
        this._resetSort();
        this._updateEvents();
        this._creatingEvent = null;
      } else {
        this._api.createEvent(newData)
           .then((eventsModel) => {
             this._eventsModel.addEvent(eventsModel);
             this._resetSort();
             this._updateEvents();
             this._creatingEvent = null;
           })
           .catch(() => {
             eventController.shake();
           });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
         .then(() => {
           this._eventsModel.removeEvent(oldData.id);
           this._resetSort();
           this._updateEvents();
         }).catch(() => {
           eventController.shake();
         });
    } else {
      this._api.updateEvent(oldData.id, newData)
         .then((eventModel) => {
           const isSuccess = this._eventsModel.updateEvents(oldData.id, eventModel);
           if (isSuccess) {
             eventController.render(eventModel, EventControllerMode.DEFAULT);
             if (oldData.dateStart !== newData.dateStart || oldData.dateEnd !== newData.dateEnd) {
               this._resetSort();
               this._updateEvents();
             }
           }
         })
         .catch(() => {
           eventController.shake();
         });
    }
  }
}
