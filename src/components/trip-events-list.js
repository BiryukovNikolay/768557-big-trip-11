import {createTripEventTemplate} from "../components/trip-event.js";

export const createTripEventsListTemplate = (events) => {
  const getEvents = () => {
    return events.map((it) => {
      return createTripEventTemplate(it);
    })
    .join(`\n`);
  };
  return (
    `<ul class="trip-events__list">
      ${getEvents()}
    </ul>`
  );
};
