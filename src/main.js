import API from "./api.js";
import EventsModel from "./models/trip-events.js";
import DestinationsModel from "./models/destinations.js";
import OffersModel from "./models/offers.js";
import MenuControlComponent, {MenuItem} from "./components/menu-control.js";
import BtnNewEventComponent from "./components/btn-new-event.js";
import TripPageComponent from "./components/trip-page.js";
import StatisticsComponent from "./components/statistics.js";
import DaysListController from "./controllers/trip-days-list.js";
import RouteAndPriceController from "./controllers/header.js";
import FilterController from "./controllers/filters.js";
import {render} from "./utils/render.js";

const AUTHORIZATION = `Basic t54e590ik29jg7r`;


const api = new API(AUTHORIZATION);
const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const siteMenuComponent = new MenuControlComponent();
const filterController = new FilterController(tripControlElement, eventsModel);
const btnNewEvent = new BtnNewEventComponent();
const bodyContainer = document.querySelector(`.page-body__page-main`);
const tripPageElement = new TripPageComponent();
const headerController = new RouteAndPriceController(tripMainElement, eventsModel);
const daysListController = new DaysListController(tripPageElement.getElement(), eventsModel, destinationsModel, offersModel, api);
const statisticsComponent = new StatisticsComponent({events: eventsModel});


render(tripControlElement, siteMenuComponent);
filterController.render();
render(tripMainElement, btnNewEvent);
render(tripMainElement, btnNewEvent);
render(bodyContainer, tripPageElement);
headerController.render();
btnNewEvent.setClickHandler(daysListController.onCreateEvents);
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

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  });

api.getEvents()
   .then((events) => {
     eventsModel.setEvents(events);
   })
   .then(() => {
     daysListController.render();
   });

