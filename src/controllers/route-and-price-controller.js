import RouteAndPriceComponent from "../components/route-and-price.js";
import {render, replace, RenderPosition} from "../utils/render.js";


export default class RouteAndPriceController {
  constructor(container, eventsModel) {
    this._routeAndPriceComponent = null;
    this._container = container;
    this._eventsModel = eventsModel;
    this._onDataChange = this._onDataChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEventsAll();

    const oldComponent = this._routeAndPriceComponent;

    this._routeAndPriceComponent = new RouteAndPriceComponent(events);

    if (oldComponent) {
      replace(this._routeAndPriceComponent, oldComponent);
    } else {
      render(container, this._routeAndPriceComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
