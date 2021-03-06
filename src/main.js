import Index from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import EventsModel from "./models/events.js";
import DestinationsModel from "./models/destinations.js";
import OffersModel from "./models/offers.js";
import MenuControlComponent, {MenuItem} from "./components/menu-control.js";
import BtnNewEventComponent from "./components/btn-new-event.js";
import ListLoadComponent from "./components/list-load.js";
import TripPageComponent from "./components/trip-page.js";
import StatisticsComponent from "./components/statistics.js";
import DaysListController from "./controllers/days-list-controller.js";
import RouteAndPriceController from "./controllers/route-and-price-controller.js";
import FilterController from "./controllers/filters-controller.js";
import {render, remove} from "./utils/render.js";

const AUTHORIZATION = `Basic t54e670er889jg7r`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Index(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
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
const daysListController = new DaysListController(tripPageElement.getElement(), eventsModel, destinationsModel, offersModel, apiWithProvider);
const statisticsComponent = new StatisticsComponent({events: eventsModel});
const listLoadComponent = new ListLoadComponent();

render(tripControlElement, siteMenuComponent);
filterController.render();
render(tripMainElement, btnNewEvent);
render(bodyContainer, tripPageElement);
headerController.render();
btnNewEvent.setClickHandler(() => {
  filterController.defaultFitler();
  daysListController.onCreateEvents();
});


siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      btnNewEvent.setDisabled();
      daysListController.closeAllEdit();
      daysListController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TABLE:
      btnNewEvent.setAvailable();
      statisticsComponent.hide();
      daysListController.show();
      break;
  }
});

const destinationList = apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  });

const offersList = apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  });


Promise.all([offersList, destinationList]).then(() => {
  apiWithProvider.getEvents()
   .then(
       render(bodyContainer, listLoadComponent)
   )
   .then((events) => {
     remove(listLoadComponent);
     eventsModel.setEvents(events);
     daysListController.render();
     render(bodyContainer, statisticsComponent);
     statisticsComponent.hide();
   });
});


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

