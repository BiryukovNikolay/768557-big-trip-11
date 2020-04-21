const EVENT_COUNT = 10;

import {createTripDaysListTemplate} from "./components/trip-days-list.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilterTemplate} from "./components/filter.js";
import {createMenuControlTemplate} from "./components/menu-control.js";
import {createRouteAndPriceInformationTemplate} from "./components/route-and-price-information.js";
import {generateFilters} from "./mock/filter.js";
import {generateEvents} from "./mock/trip-event.js";

const events = generateEvents(EVENT_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripControlElement, createMenuControlTemplate());

const filters = generateFilters();

render(tripMainElement, createRouteAndPriceInformationTemplate(events), `afterbegin`);
render(tripControlElement, createFilterTemplate(filters));

render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventEditTemplate(events));
render(tripEventsElement, createTripDaysListTemplate(events));


