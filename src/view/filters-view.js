import { FILTERS } from '../common/consts';
import AbstractView from '../framework/view/abstract-view';

const getFilterTemplate = ({ name, checked }) => {
  const isChecked = checked ? 'checked' : '';

  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `;
};

const getContentTemplate = () => {
  const filtersTemplate = FILTERS.map((filter) =>
    getFilterTemplate(filter),
  ).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FiltersView extends AbstractView {
  get template() {
    return getContentTemplate();
  }
}
