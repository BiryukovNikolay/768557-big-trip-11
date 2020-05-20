import AbstractSmartComponent from "./abstract-smart-component.js";

export const createBtnNewEventTemplate = () => {

  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class BtnNewEvent extends AbstractSmartComponent {

  getTemplate() {
    return createBtnNewEventTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, () => {
      handler();
    });
  }
}
