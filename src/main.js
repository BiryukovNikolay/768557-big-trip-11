const EVENT_COUNT = 3;

import {createTripEventTemplate} from "./components/trip-event.js";
import {createTripEventsListTemplate} from "./components/trip-events-list.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripDaysListTemplate} from "./components/trip-days-list.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilterTemplate} from "./components/filter.js";
import {createMenuControlTemplate} from "./components/menu-control.js";
import {createRouteAndPriceInformationTemplate} from "./components/route-and-price-information.js";
import {generateFilters} from "./mock/filter.js";


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, createRouteAndPriceInformationTemplate(), `afterbegin`);
render(tripControlElement, createMenuControlTemplate());

const filters = generateFilters();
render(tripControlElement, createFilterTemplate(filters));

render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventEditTemplate());
render(tripEventsElement, createTripDaysListTemplate());

const tripDaysListElement = document.querySelector(`.trip-days`);

render(tripDaysListElement, createTripDayTemplate());

const tripDaysItemElement = document.querySelector(`.trip-days__item`);

render(tripDaysItemElement, createTripEventsListTemplate());

const tripEventListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventListElement, createTripEventTemplate());
}
