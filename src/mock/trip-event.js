import {getRandomInteger, getRandomArrayItem} from "../utils/random.js";
import {formatISO} from "../utils/date.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const";

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

export const availableOffers = (offerNames, eventType) => {
  const toUpperCaseTitle = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return offerNames.find((it) => {
    return it.type === toUpperCaseTitle(eventType);
  });
};

const generateOffers = (offerNames, eventType) => {
  const offersOfType = availableOffers(offerNames, eventType);

  const maxCount = offersOfType.offers.length - 1;
  return offersOfType.offers.slice(Math.floor(Math.random() * maxCount), Math.floor(Math.random() * maxCount));
};

const generateEvent = () => {
  const eventType = getRandomArrayItem(EVENT_TYPES);
  return {
    id: String(new Date() + Math.random()),
    eventType,
    destination: getRandomArrayItem(DESTINATIONS),
    priceValue: Math.floor(Math.random() * 100),
    dateStart: formatISO(getRandomDate(new Date(), false)),
    dateEnd: formatISO(getRandomDate(new Date(), true)),
    offers: generateOffers(OFFERS, eventType),
    favorite: false
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};
