import AbstractComponent from "./abstract-component.js";

const createListLoadTemplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Loading...</p>
    </section>`
  );
};


export default class ListLoad extends AbstractComponent {
  getTemplate() {
    return createListLoadTemplate();
  }
}
