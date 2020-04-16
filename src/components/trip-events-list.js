import {createTripEventTemplate} from "../components/trip-event.js";

export const createTripEventsListTemplate = (events, offers) => {
  const getEvents = () => {
    const eventsList = [];
    events.forEach((it) => {
      eventsList.push(createTripEventTemplate(it, offers));
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
