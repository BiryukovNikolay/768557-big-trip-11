const EVENT_COUNT = 15;

import EventsModel from "./models/trip-events.js";
import MenuControlComponent from "./components/menu-control.js";
import RouteAndPriceComponent from "./components/route-and-price-information.js";
import DaysListController from "./controllers/trip-days-list.js";
import FilterController from "./controllers/filters.js";
import {generateEvents} from "./mock/trip-event.js";
import {render, RenderPosition} from "./utils/render.js";


const events = generateEvents(EVENT_COUNT);
const eventsModel = new EventsModel();
eventsModel.setTasks(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(tripControlElement, new MenuControlComponent());

const filterController = new FilterController(tripControlElement, eventsModel, RenderPosition.AFTERBEGIN);
filterController.render();

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new RouteAndPriceComponent(events), RenderPosition.AFTERBEGIN);
const daysListController = new DaysListController(tripEventsElement, eventsModel);
daysListController.render(events);
