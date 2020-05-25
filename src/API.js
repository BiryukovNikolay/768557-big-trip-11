import Event from "./models/event.js";
import Destinations from "./models/destination.js";
import Offers from "./models/offer.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
       .then((response) => response.json())
       .then(Event.parseEvents);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
       .then((response) => response.json())
       .then(Destinations.parseDestinations);
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
       .then((response) => response.json())
       .then(Offers.parseOffers);
  }
};

export default API;
