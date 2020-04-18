import {getRandomInteger, getRandomArrayItem} from "../util.js";
import {EVENT_TYPES, DESTINATION, OFFER_NAMES} from "../const";

const DescriptionItem = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateDescription = () => {
  return getRandomArrayItem(DescriptionItem);
};

const getRandomNumderDescriptionBlock = (startInterval, endInterval) => {
  return new Array(getRandomInteger(startInterval, endInterval))
    .fill(``)
    .map(generateDescription)
    .join(``);
};


const generatePhotos = () => {
  return (`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
};

const getRundomNumberOfPhotos = (startInterval, endInterval) => {
  return new Array(getRandomInteger(startInterval, endInterval))
    .fill(``)
    .map(generatePhotos)
    .join(``);
};

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
    eventTipe: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(DESTINATION),
    priceValue: Math.floor(Math.random() * 100),
    description: getRandomNumderDescriptionBlock(1, 5),
    dateStart: getRandomDate(new Date(), false),
    dateEnd: getRandomDate(new Date(), true),
    photo: getRundomNumberOfPhotos(1, 5),
    offers: generateOffers(OFFER_NAMES)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent)
    .sort((a, b) => {
      return a.dateStart.getTime() - b.dateStart.getTime();
    });
};


export {generateEvent, generateEvents};
