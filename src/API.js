import Event from "./models/event.js";
import Destinations from "./models/destination.js";
import Offers from "./models/offer.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Destinations.parseDestinations);
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Offers.parseOffers);
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);
    console.log(id, data);
    

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvent);
  }
};

export default API;
