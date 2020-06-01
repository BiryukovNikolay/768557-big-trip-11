import AbstractComponent from "./abstract-component.js";

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const createMenuControlTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
       <a class="trip-tabs__btn" href="#">Stats</a>
     </nav>`
  );
};

export default class MenuControl extends AbstractComponent {
  getTemplate() {
    return createMenuControlTemplate();
  }

  setOnChange(handler) {
    const tripTabsBtns = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    tripTabsBtns.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        tripTabsBtns.forEach((i) => {
          i.classList.remove(`trip-tabs__btn--active`);
        });
        it.classList.add(`trip-tabs__btn--active`);
        const menuItem = evt.target.textContent;
        handler(menuItem);
      });
    });
  }
}
