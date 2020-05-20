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

  setActiveItem(menuItem) {
    const item = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    const textMenu = item.map((it) => {
      return it.textContent;
    });

    const activeIndex = textMenu.indexOf(menuItem);

    if (item[activeIndex]) {
      item[activeIndex].active = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.textContent;

      handler(menuItem);
    });
  }
}
