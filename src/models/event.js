const getParametr = (obj, key) => {
  return obj[key];
};

export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.description = getParametr(data[`destination`], `description`);
    this.destination = getParametr(data[`destination`], `name`);
    this.photo = getParametr(data[`destination`], `pictures`);
    this.dateStart = data[`date_from`];
    this.dateEnd = data[`date_to`];
    this.offers = data[`offers`];
    this.favorite = Boolean(data[`is_favorite`]);
    this.priceValue = data[`base_price`];
    this.eventType = data[`type`];
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }
}
