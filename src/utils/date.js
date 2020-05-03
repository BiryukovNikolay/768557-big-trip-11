export const formatStartDate = (startDate) => {
  const options = {month: `short`, day: `numeric`};
  return new Intl.DateTimeFormat(`en-GB`, options).format(startDate);
};

export const getDayEventsList = (events) => {

  const dayEventList = new Map();
  events.forEach((it) => {
    const dataDay = formatStartDate(it.dateStart);
    if (!dayEventList.has(dataDay)) {
      dayEventList.set(dataDay, []);
    }
    dayEventList.get(dataDay).push(it);
  });
  return dayEventList;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const duration = (dateStart, dateEnd) => {
  const timeStart = dateStart.getTime();
  const timeEnd = dateEnd.getTime();
  return Math.abs(timeEnd - timeStart);
};

export const formatDuration = (dateStart, dateEnd) => {
  const hourDiff = duration(dateStart, dateEnd);
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
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = `${date.getFullYear()}`;

  return `${day}/0${month}/${year.substring(2, 4)}`;
};
