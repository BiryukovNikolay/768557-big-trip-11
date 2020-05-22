import AbstractComponent from "./abstract-component.js";

const createTripPageTemplate = () => {
  return (
    `<div class="page-body__container">
        <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
       </section>
    </div>`
  );
};

export default class TripPage extends AbstractComponent {
  getTemplate() {
    return createTripPageTemplate();
  }
}
