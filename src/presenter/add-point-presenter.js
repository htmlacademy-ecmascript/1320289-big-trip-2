import { remove, render, RenderPosition } from '../framework/render';
import FormView from '../view/form-view';

export default class AddPointPresenter {
  #container = null;
  #callbacks = null;
  #pointService = null;
  #pointsModel = null;
  keyboardManager = null;

  #formComponent = null;
  #point = null;

  constructor(data) {
    const { container, callbacks, pointService, pointsModel, keyboardManager } =
      data;

    this.#container = container;
    this.#callbacks = callbacks;
    this.#pointService = pointService;
    this.#pointsModel = pointsModel;
    this.keyboardManager = keyboardManager;
  }

  init() {
    this.#point = this.#pointsModel.newPoint;

    const formData = this.#pointService.getFormData(this.#point);
    this.#formComponent = new FormView({
      formData,
      callbacks: this.#getFormCallbacks(),
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.keyboardManager.addEscHandler('new-point', () => this.destroy());
  }

  destroy() {
    if (!this.#formComponent) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;
    this.keyboardManager.removeEscHandler('new-point');
    this.#callbacks?.onCancel();
  }

  #getFormCallbacks() {
    return {
      onFormSubmit: () => {
        this.#pointsModel.addPoint(this.#point);
        this.#callbacks?.onPointAdd();
        this.destroy();
      },
      onFormDecline: () => this.destroy(),
      onTypeChange: (newType) => {
        this.#point = this.#point.setType(newType);
        this.#formComponent.updateElement(
          this.#pointService.getFormData(this.#point),
        );
      },
      onOfferSelect: (offerId) => {
        this.#point = this.#point.toggleOffer(offerId);
        this.#formComponent.updateElement(
          this.#pointService.getFormData(this.#point),
        );
      },
      onDestinationChange: (destination) => {
        const id = this.#pointService.getDestinationIdByName(destination);

        if (id === undefined) {
          return;
        }

        this.#point = this.#point.setDestination(id);
        this.#formComponent.updateElement(
          this.#pointService.getFormData(this.#point),
        );
      },
    };
  }
}
