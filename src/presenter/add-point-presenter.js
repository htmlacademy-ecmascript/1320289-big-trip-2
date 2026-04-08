import { remove, render, RenderPosition } from '../framework/render';
import FormView from '../view/form-view';

export default class AddPointPresenter {
  #container = null;
  #pointService = null;
  #pointsModel = null;
  #keyboardManager = null;

  #formComponent = null;
  #point = null;
  #callbacks = null;

  constructor(data) {
    const { container, pointService, pointsModel, keyboardManager, callbacks } =
      data;

    this.#container = container;
    this.#pointService = pointService;
    this.#pointsModel = pointsModel;
    this.#keyboardManager = keyboardManager;
    this.#callbacks = callbacks;
  }

  init() {
    this.#point = this.#pointsModel.newPoint;

    const formData = this.#pointService.getFormData(this.#point);
    this.#formComponent = new FormView({
      formData,
      callbacks: this.#pointService.getFormCallbacks({
        point: this.#point,
        getFormComponent: () => this.#formComponent,
        callbacks: {
          close: () => this.#close(),
        },
      }),
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#keyboardManager.addEscHandler('new-point', () => this.#close());
  }

  resetView() {
    this.#close();
  }

  #close() {
    if (!this.#formComponent) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;
    this.#keyboardManager.removeEscHandler('new-point');
    this.#callbacks.onClose?.();
  }
}
