import AbstractComponent from "./abstract-component.js";

const createTripDaysListTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createTripDaysListTemplate();
  }
}
