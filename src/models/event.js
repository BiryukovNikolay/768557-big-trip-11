import {formatDateIso} from "../utils/date.js";

const getParametr = (obj, key) => {
  return obj[key];
};

export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.description = getParametr(data[`destination`], `description`);
    this.destination = getParametr(data[`destination`], `name`);
    this.photo = getParametr(data[`destination`], `pictures`);
    this.dateStart = formatDateIso(data[`date_from`]);
    this.dateEnd = formatDateIso(data[`date_to`]);
    this.offers = data[`offers`];
    this.favorite = Boolean(data[`is_favorite`]);
    this.priceValue = data[`base_price`];
    this.eventType = data[`type`];
  }

  toRAW() {
    return {
      "id": this.id,
      "destination": {name: this.destination, description: this.description, pictures: this.photo},
      "date_from": this.dateStart,
      "date_to": this.dateEnd,
      "base_price": this.priceValue,
      "is_favorite": this.favorite,
      "is_archived": this.isArchive,
      "offers": this.offers,
      "type": this.eventType
    };
  }


  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }

  static clone(data) {
    return new Event(data.toRAW());
  }
}
