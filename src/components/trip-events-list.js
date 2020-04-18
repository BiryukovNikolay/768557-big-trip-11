import {createTripEventTemplate} from "../components/trip-event.js";

export const createTripEventsListTemplate = (events) => {
  const getEvents = () => {
    const eventsList = [];
    events.forEach((it) => {
      eventsList.push(createTripEventTemplate(it));
    }
    );

    return eventsList.join(`\n`);
  };
  return (
    `<ul class="trip-events__list">
      ${getEvents()}
    </ul>`
  );
};
