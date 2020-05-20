import {getRandomInteger, getRandomArrayItem} from "../utils/random.js";
import {formatISO} from "../utils/date.js";
import {EVENT_TYPES, DESTINATIONS, OFFER_NAMES} from "../const";

const diffValue = (isOneEvent, maxValue) => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return isOneEvent ? Math.abs(sign) * getRandomInteger(0, maxValue) : sign * getRandomInteger(0, maxValue);
};

const getRandomDate = (date, isOneEvent) => {
  const targetDate = date;
  targetDate.setDate(targetDate.getDate() + diffValue(isOneEvent, 2));
  targetDate.setHours(targetDate.getHours() + diffValue(isOneEvent, 4));
  targetDate.setMinutes(targetDate.getMinutes() + diffValue(isOneEvent, 30));
  return targetDate;
};

const generateOffers = (offerNames) => {
  return offerNames.slice(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
};

const generateEvent = () => {
  return {
    id: String(new Date() + Math.random()),
    eventType: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(DESTINATIONS),
    priceValue: Math.floor(Math.random() * 100),
    dateStart: formatISO(getRandomDate(new Date(), false)),
    dateEnd: formatISO(getRandomDate(new Date(), true)),
    offers: generateOffers(OFFER_NAMES),
    favorite: false
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};
