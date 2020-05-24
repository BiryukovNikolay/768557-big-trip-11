import {DESTINATIONS} from "../const";
import {getRandomArrayItem, getRandomInteger} from "../utils/random.js";

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

const getRundomNumberOfPhotos = (startInterval, endInterval) => {
  return new Array(getRandomInteger(startInterval, endInterval))
    .fill(``)
    .map(generatePhotos)
    .join(``);
};

const generatePhotos = () => {
  return (`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
};

export const generateDestinationList = () => {

  return DESTINATIONS.map((it) => {
    return (
      {
        "description": generateDescription(),
        "name": it,
        "pictures": [
          {
            "src": getRundomNumberOfPhotos(1, 5),
            "description": generateDescription(),
          }
        ]
      }
    );
  });
};
