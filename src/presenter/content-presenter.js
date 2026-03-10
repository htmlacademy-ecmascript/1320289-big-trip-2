import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import { render } from '../framework/render';
import { generateSorts } from '../common/sort';
import { HintTexts, UpdateTypes } from '../common/consts';
import PointPresenter from './point-presenter';
import HintView from '../view/hint-view';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #pointService = null;
  #pointManager = null;
  #pointComponents = new Map();

  #list = new ListView();
  #listElement = this.#list.element;

  constructor(data) {
    const { contentNode, pointsModel, appState, pointService, pointManager } =
      data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#pointService = pointService;
    this.#pointManager = pointManager;

    this.#appState.subscribe((state, updateType, restData) => {
      this.#handleStateChange(state, updateType, restData);
    });
  }

  init() {
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state, updateType, restData) {
    if (updateType === UpdateTypes.SinglePointUpdate) {
      const { pointId } = restData;
      this.#updatePoint(pointId);
      return;
    }

    this.#contentNode.innerHTML = '';

    this.#renderContent(state);
  }

  #renderContent({ points, isLoading }) {
    if (isLoading) {
      this.#renderHint(HintTexts.loading, this.#contentNode);
      return;
    }

    if (points.length === 0) {
      this.#renderHint(HintTexts.listEmpty, this.#contentNode);
      return;
    }

    this.#pointComponents.clear();

    const sorts = generateSorts(points);

    render(new SortView(sorts), this.#contentNode);
    render(this.#list, this.#contentNode);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listElement,
      callbacks: this.#createPointCallbacks(point),
      pointService: this.#pointService,
      pointManager: this.#pointManager,
    });

    pointPresenter.init(point);
    this.#pointComponents.set(point.id, pointPresenter);
  }

  #createPointCallbacks(point) {
    return {
      onFavoriteClick: () => {
        point.isFavorite = !point.isFavorite;
        this.#pointsModel.updatePoint(point);
        this.#appState.updatePoint(point);
      },
    };
  }

  #updatePoint(pointId) {
    const pointPresenter = this.#pointComponents.get(pointId);

    if (!pointPresenter) {
      return;
    }

    const updatedPoint = this.#pointsModel.getPointById(pointId);

    if (!updatedPoint) {
      return;
    }

    pointPresenter.init(updatedPoint);
  }

  #renderHint(message, container) {
    container.innerHTML = '';
    render(new HintView({ message }), container);
  }
}
