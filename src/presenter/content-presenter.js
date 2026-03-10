import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import { render } from '../framework/render';
import { generateSorts } from '../common/sort';
import { HintTexts } from '../common/consts';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #pointService = null;
  #pointManager = null;

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

    this.#appState.subscribe((state) => {
      this.#handleStateChange(state);
    });
  }

  init() {
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state) {
    this.#contentNode.innerHTML = '';

    this.#renderContent(state);
  }

  #renderContent({ points, isLoading }) {
    if (isLoading) {
      this.#pointManager.renderHint(HintTexts.loading, this.#contentNode);
      return;
    }

    if (points.length === 0) {
      this.#pointManager.renderHint(HintTexts.listEmpty, this.#contentNode);
      return;
    }

    const sorts = generateSorts(this.#pointsModel.points);

    render(new SortView(sorts), this.#contentNode);
    render(this.#list, this.#contentNode);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    let pointComponent = null;
    let formComponent = null;

    const pointData = this.#pointService.getPointData(point);
    const formData = this.#pointService.getFormData(point);

    const pointCallbacks = {
      onEditClick: () => {
        this.#pointManager.openForm({ pointComponent, formComponent });
      },
    };

    const formCallbacks = {
      onFormSubmit: () => {
        this.#pointManager.closeCurrentForm();
      },
      onFormDecline: () => {
        this.#pointManager.closeCurrentForm();
      },
    };

    pointComponent = this.#pointManager.createPointView(
      pointData,
      pointCallbacks,
    );

    formComponent = this.#pointManager.createFormView(formData, formCallbacks);

    render(pointComponent, this.#listElement);
  }
}
