import AbstractView from '../framework/view/abstract-view';

const getSortItems = ({ name, disabled }) => `
  <div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" checked ${disabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>
`;

const getContentTemplate = (sorts) => {
  const sortsTemplate = sorts.map((sort) => getSortItems(sort)).join('');

  return `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortsTemplate}
    </form>`;
};

export default class SortView extends AbstractView {
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return getContentTemplate(this.#sorts);
  }
}
