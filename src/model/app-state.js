import {
  AppStates,
  FilterTypes,
  SortTypes,
  UpdateTypes,
} from '../common/config';

export default class AppState {
  #renderState = AppStates.LOADING;
  #currentFilter = FilterTypes.EVERYTHING;
  #currentSort = SortTypes.DAY;
  #currentOpenFormId = null;
  #observers = [];

  set renderState(state) {
    this.#renderState = state;
    this.#notify(UpdateTypes.MAJOR);
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
    this.#currentSort = SortTypes.DAY;
    this.#notify(UpdateTypes.MAJOR);
  }

  set currentSort(sort) {
    this.#currentSort = sort;
    this.#notify(UpdateTypes.MAJOR);
  }

  set currentOpenFormId(id) {
    this.#currentOpenFormId = id;
  }

  get renderState() {
    return this.#renderState;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  get currentSort() {
    return this.#currentSort;
  }

  get currentOpenFormId() {
    return this.#currentOpenFormId;
  }

  get state() {
    return {
      renderState: this.#renderState,
      currentFilter: this.#currentFilter,
      currentSort: this.#currentSort,
    };
  }

  resetFilterAndSort() {
    this.#currentFilter = FilterTypes.EVERYTHING;
    this.#currentSort = SortTypes.DAY;
    this.#notify(UpdateTypes.MAJOR);
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  notifyPointUpdated(point) {
    this.#notify(UpdateTypes.MINOR, { pointId: point.id });
  }

  notifyPointsChanged() {
    this.#notify(UpdateTypes.MAJOR);
  }

  #notify(updateType = UpdateTypes.MAJOR, restData = {}) {
    this.#observers.forEach((observer) =>
      observer(this.state, updateType, restData),
    );
  }
}
