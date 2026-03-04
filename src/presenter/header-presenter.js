import { generateFilters } from '../common/sort';
import { render, RenderPosition } from '../framework/render';
import FiltersView from '../view/filters-view';
import InfoView from '../view/info-view';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #filters = null;

  constructor({ contentNode, pointsModel }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#filters = generateFilters(this.#pointsModel.points);

    render(
      new InfoView({
        title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
        description: '18&nbsp;&mdash;&nbsp;20 Mar',
        cost: '1230',
      }),
      this.#contentNode,
      RenderPosition.AFTERBEGIN,
    );

    render(new FiltersView({ filters: this.#filters }), this.#contentNode);
  }
}
