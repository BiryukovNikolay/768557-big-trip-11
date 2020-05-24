const EVENT_COUNT = 15;

import EventsModel from "./models/trip-events.js";
import MenuControlComponent, {MenuItem} from "./components/menu-control.js";
import BtnNewEventComponent from "./components/btn-new-event.js";
import TripPageComponent from "./components/trip-page.js";
import StatisticsComponent from "./components/statistics.js";
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
const siteMenuComponent = new MenuControlComponent();
render(tripControlElement, siteMenuComponent);

const filterController = new FilterController(tripControlElement, eventsModel);
filterController.render();

const btnNewEvent = new BtnNewEventComponent();
render(tripMainElement, btnNewEvent);

const bodyContainer = document.querySelector(`.page-body__page-main`);

const tripPageElement = new TripPageComponent();
render(bodyContainer, tripPageElement);

const headerController = new RouteAndPriceController(tripMainElement, eventsModel);
headerController.render();

const daysListController = new DaysListController(tripPageElement.getElement(), eventsModel);
daysListController.render();

btnNewEvent.setClickHandler(daysListController.onCreateEvents);

const statisticsComponent = new StatisticsComponent({events: eventsModel});
render(bodyContainer, statisticsComponent);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      daysListController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TABLE:
      statisticsComponent.hide();
      daysListController.show();
      break;
  }
});
