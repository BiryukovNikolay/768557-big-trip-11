import Event from "../models/event.js";
import Destinations from "../models/destination.js";
import Offers from "../models/offer.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Index {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Destinations.parseDestinations);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Offers.parseOffers);
  }

  createEvent(event) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Event.parseEvent);
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvent);
  }

  deleteEvent(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
       .then(checkStatus)
       .catch((err) => {
         throw err;
       });
  }
}

export default Index;
