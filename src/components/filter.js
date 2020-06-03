import AbstractSmartComponent from "./abstract-smart-component.js";
const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = ({name, checked}) => {
  console.log(name, checked);
  
  return (
    `<div class="trip-filters__filter">
       <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${checked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
     </div>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
     </form>`
  );
};

export default class Filter extends AbstractSmartComponent {
  constructor(filters) {
    super();

    this._filters = filters;
    this._changeFilterHandler = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._changeFilterHandler);
  }

  rerender() {
    super.rerender();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
      this._changeFilterHandler = handler;
    });
  }
}
