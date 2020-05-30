import Event from "../models/event";
import Offer from "../models/offer";
import Destination from "../models/offer";
import {nanoid} from "nanoid";


const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
      .then((events) => {
        const items = createStoreStructure(events.map((event) => event.toRAW()));


        this._store.setItems(items);

        return events;
      });
    }

    const storeEvents = Object.values(this._store.getItems());

    return Promise.resolve(Event.parseEvents(storeEvents));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
      .then((offers) => {
        offers.forEach((offer) => this._store.setItem(offer.type, offer));

        return offers;
      });
    }

    const storeoffers = Object.values(this._store.getItems());

    return Promise.resolve(Offer.parseOffers(storeoffers));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
      .then((destinations) => {
        destinations.forEach((destination) => this._store.setItem(destination.name, destination));

        return destinations;
      });
    }

    const storeDestinations = Object.values(this._store.getItems());

    return Promise.resolve(Destination.parseDestination(storeDestinations));
  }

  createEvent(event) {
    if (isOnline()) {
      return this._api.createEvent(event)
      .then((newEvent) => {
        this._store.setItem(newEvent.id, newEvent.toRAW());

        return newEvent;
      });
    }

    const localNewEventId = nanoid();
    const localNewEvent = Event.clone(Object.assign(event, {id: localNewEventId}));

    this._store.setItem(localNewEvent.id, localNewEvent.toRAW());

    return Promise.resolve(localNewEvent);
  }

  updateEvent(id, event) {
    if (isOnline()) {
      return this._api.updateEvent(id, event)
         .then((newEvent) => {
           this._store.setItem(newEvent.id, newEvent.toRAW());

           return newEvent;
         });
    }

    const localEvent = Event.clone(Object.assign(event, {id}));

    this._store.setItem(id, localEvent.toRAW());

    return Promise.resolve(localEvent);
  }

  deleteEvent(id) {
    if (isOnline()) {
      return this._api.deleteEvent(id)
      .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._store.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
