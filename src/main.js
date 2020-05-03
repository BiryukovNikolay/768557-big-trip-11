const EVENT_COUNT = 20;

import FilterComponent from "./components/filter.js";
import MenuControlComponent from "./components/menu-control.js";
import RouteAndPriceComponent from "./components/route-and-price-information.js";
import DaysListController from "./controllers/trip-days-list.js";
import {generateEvents} from "./mock/trip-event.js";
import {generateFilters} from "./mock/filter.js";
import {getDayEventsList} from "./utils/date.js";
import {render, RenderPosition} from "./utils/render.js";

const events = generateEvents(EVENT_COUNT);
const dayEventsList = getDayEventsList(events);

const filters = generateFilters();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripControlElement, new MenuControlComponent());
render(tripMainElement, new RouteAndPriceComponent(events), RenderPosition.AFTERBEGIN);
render(tripControlElement, new FilterComponent(filters));
const daysListController = new DaysListController(tripEventsElement);
daysListController.render(dayEventsList);
