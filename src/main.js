const EVENT_COUNT = 8;

import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripDaysListTemplate} from "./components/trip-days-list.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilterTemplate} from "./components/filter.js";
import {createMenuControlTemplate} from "./components/menu-control.js";
import {createRouteAndPriceInformationTemplate} from "./components/route-and-price-information.js";
import {generateFilters} from "./mock/filter.js";
import {generateEvents} from "./mock/trip-event.js";
import {generateOffers} from "./mock/offer.js";
import {getPoints, getDays} from "./mock/trip-day";

const events = generateEvents(EVENT_COUNT);
console.log(events);
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, createRouteAndPriceInformationTemplate(events), `afterbegin`);
render(tripControlElement, createMenuControlTemplate());

const filters = generateFilters();


render(tripControlElement, createFilterTemplate(filters));

render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventEditTemplate(events[0], generateOffers()));
render(tripEventsElement, createTripDaysListTemplate());

const tripDaysListElement = document.querySelector(`.trip-days`);

const days = getDays(events);
const points = getPoints(days);

for (let i = 0; i < points.length; i++) {
  render(tripDaysListElement, createTripDayTemplate((i + 1), days[i], points[i], events, generateOffers()));
}
