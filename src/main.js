const EVENT_COUNT = 15;

import EventsModel from "./models/trip-events.js";
import MenuControlComponent, {MenuItem} from "./components/menu-control.js";
import BtnNewEventComponent from "./components/btn-new-event.js";
import DaysListController from "./controllers/trip-days-list.js";
import RouteAndPriceController from "./controllers/header.js";
import FilterController from "./controllers/filters.js";
import {generateEvents} from "./mock/trip-event.js";
import {render} from "./utils/render.js";


const events = generateEvents(EVENT_COUNT);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(tripControlElement, new MenuControlComponent());

const filterController = new FilterController(tripControlElement, eventsModel);
filterController.render();

const btnNewEvent = new BtnNewEventComponent();
render(tripMainElement, btnNewEvent);

const tripEventsElement = document.querySelector(`.trip-events`);

const headerController = new RouteAndPriceController(tripMainElement, eventsModel);
headerController.render();

//render(tripMainElement, new RouteAndPriceComponent(eventsModel), RenderPosition.AFTERBEGIN);
const daysListController = new DaysListController(tripEventsElement, eventsModel);
daysListController.render();

btnNewEvent.setClickHandler(() => {
  daysListController.createEvents();
});
