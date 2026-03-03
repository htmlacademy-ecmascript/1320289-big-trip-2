import ItemView from '../view/item-view';
import ListView from '../view/list-view';
import FormView from '../view/form-view';
import SortView from '../view/sort';
import { SORTS } from '../common/consts';
import { render } from '../framework/render';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #currentPoint = null;
  #points = null;

  #list = new ListView();
  #listElement = this.#list.element;
  #currentPointId = 2;

  constructor({ contentNode, pointsModel }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#currentPoint = this.#pointsModel.getPointById(this.#currentPointId);
    this.#points = [...this.#pointsModel.points];

    render(new SortView(SORTS), this.#contentNode);

    render(this.#list, this.#contentNode);

    // Edit
    render(
      new FormView({
        types: this.#pointsModel.types,
        point: this.#pointsModel.getPointById(this.#currentPointId),
        offers: this.#pointsModel.getOffersByType(this.#currentPoint.type),
        checkedOffers: [
          ...this.#pointsModel.getOffersById(
            this.#currentPoint.type,
            this.#currentPoint.offers,
          ),
        ],
        destinations: this.#pointsModel.destinations,
        details: this.#pointsModel.getDestinationById(
          this.#currentPoint.destination,
        ),
      }),
      this.#listElement,
    );

    // Create
    render(
      new FormView({
        types: this.#pointsModel.types,
        point: this.#pointsModel.newPoint,
        offers: this.#pointsModel.getOffersByType(
          this.#pointsModel.newPoint.type,
        ),
        destinations: this.#pointsModel.destinations,
      }),
      this.#listElement,
    );

    this.#points.forEach((point) => {
      render(
        new ItemView({
          point: point,
          offers: this.#pointsModel.getOffersById(point.type, point.offers),
          destination: this.#pointsModel.getDestinationById(point.destination),
        }),
        this.#listElement,
      );
    });
  }
}
