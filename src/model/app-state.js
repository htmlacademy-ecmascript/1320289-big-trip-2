import { FilterTypes, SortTypes, UpdateTypes } from '../common/consts';

export default class AppState {
  #isLoading = true;
  #currentFilter = FilterTypes.EVERYTHING;
  #currentSort = SortTypes.DAY;
  #observers = [];
  #points;

  set isLoading(isLoading) {
    this.#isLoading = isLoading;
    this.#notify(UpdateTypes.FullChange);
  }

  set points(points) {
    this.#points = new Map(points.map((point) => [point.id, point]));
    this.#notify(UpdateTypes.FullChange);
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
    this.#notify(UpdateTypes.FullChange);
  }

  set currentSort(sort) {
    this.#currentSort = sort;
    this.#notify(UpdateTypes.FullChange);
  }

  get isLoading() {
    return this.#isLoading;
  }

  get points() {
    return Array.from(this.#points.values());
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  get currentSort() {
    return this.#currentSort;
  }

  get state() {
    return {
      isLoading: this.#isLoading,
      points: this.points,
      currentFilter: this.#currentFilter,
      currentSort: this.#currentSort,
    };
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  #notify(updateType = UpdateTypes.FullChange, restData = {}) {
    this.#observers.forEach((observer) =>
      observer(this.state, updateType, restData),
    );
  }

  updatePoint(point) {
    if (this.#points.get(point.id)) {
      this.#points.set(point.id, point);
      this.#notify(UpdateTypes.SinglePointUpdate, { pointId: point.id });
    }
  }
}
