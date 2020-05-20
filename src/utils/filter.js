import {FilterType} from "../const.js";
import {dateDiff} from "../utils/date.js";


export const getFutureEvents = (events, date) => {
  return events.filter((event) => dateDiff(event.dateStart, date) > 0);
};

export const getPastEvents = (events, date) => {
  return events.filter((event) => dateDiff(event.dateStart, date) < 0);
};


export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
  }
  return events;
};
