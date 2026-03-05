import ItemView from '../view/item-view';
import ListView from '../view/list-view';
import FormView from '../view/form-view';
import SortView from '../view/sort';
import { SORTS } from '../common/consts';
import { render, replace } from '../framework/render';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #points = null;
  #currentOpenForm = null;

  #list = new ListView();
  #listElement = this.#list.element;

  constructor({ contentNode, pointsModel }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new SortView(SORTS), this.#contentNode);
    render(this.#list, this.#contentNode);

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

    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    let pointConponent = null;
    let formConponent = null;

    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#closeForm({ pointConponent, formConponent, escKeydownHandler });
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const offers = this.#pointsModel.getOffersById(point.type, point.offers);
    const destination = this.#pointsModel.getDestinationById(point.destination);

    pointConponent = new ItemView({
      point,
      offers: offers,
      destination: destination,
      onEditClick: () => {
        this.#openForm({ pointConponent, formConponent, escKeydownHandler });
      },
    });

    formConponent = new FormView({
      point: point,
      types: this.#pointsModel.types,
      offers: this.#pointsModel.getOffersByType(point.type),
      checkedOffers: offers,
      destinations: this.#pointsModel.destinations,
      details: destination,
      onFormSubmit: () => {
        this.#closeForm({ pointConponent, formConponent, escKeydownHandler });
      },
      onFormDecline: () => {
        this.#closeForm({ pointConponent, formConponent, escKeydownHandler });
      },
    });

    render(pointConponent, this.#listElement);
  }

  #closeCurrentForm() {
    if (this.#currentOpenForm) {
      this.#currentOpenForm.close();
      this.#currentOpenForm = null;
    }
  }

  #openForm({ formConponent, pointConponent, escKeydownHandler }) {
    this.#closeCurrentForm();

    replace(formConponent, pointConponent);
    document.addEventListener('keydown', escKeydownHandler);

    this.#currentOpenForm = {
      close: () => {
        replace(pointConponent, formConponent);
        document.removeEventListener('keydown', escKeydownHandler);
      },
    };
  }

  #closeForm({ pointConponent, formConponent, escKeydownHandler }) {
    replace(pointConponent, formConponent);
    document.removeEventListener('keydown', escKeydownHandler);
    this.#currentOpenForm = null;
  }
}
