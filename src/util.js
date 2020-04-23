const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDuration = (dateStart, dateEnd) => {
  const timeStart = dateStart.getTime();
  const timeEnd = dateEnd.getTime();
  const hourDiff = Math.abs(timeEnd - timeStart);
  const minDiff = hourDiff / 60 / 1000;
  const hDiff = hourDiff / 60 / 60 / 1000;
  const dDiff = hourDiff / 3600 / 1000 / 24;
  const daysDuration = Math.floor(dDiff);
  const humanReadable = {
    days: daysDuration,
    hours: Math.floor(hDiff - 24 * daysDuration),
    minutes: Math.floor((minDiff - 60 * (24 * daysDuration + Math.floor(hDiff - 24 * daysDuration)))),
  };
  return humanReadable;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = `${date.getFullYear()}`;

  return `${day}/0${month}/${year.substring(2, 4)}`;
};

export const formatDayMonth = (date, mounthNames) => {
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${mounthNames[month]}`;
};

export const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, (array.length - 1));

  return array[randomIndex];
};
